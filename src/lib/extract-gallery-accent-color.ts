type Rgb = { r: number; g: number; b: number };

type WeightedSample = Rgb & { weight: number; hue: number; saturation: number };

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    switch (max) {
      case rn:
        h = ((gn - bn) / delta + (gn < bn ? 6 : 0)) * 60;
        break;
      case gn:
        h = ((bn - rn) / delta + 2) * 60;
        break;
      default:
        h = ((rn - gn) / delta + 4) * 60;
        break;
    }
  }

  return { h, s, l };
}

function scorePixel(r: number, g: number, b: number) {
  const { h, s, l } = rgbToHsl(r, g, b);

  if (l > 0.82 || l < 0.05) return 0;

  const isGreenDominant = g >= r && g >= b;
  const greenBoost = isGreenDominant && h >= 55 && h <= 170 ? 1.45 : 1;

  if (s >= 0.1) {
    const darknessScore = 1 - Math.abs(l - 0.34) / 0.34;
    const saturationScore = Math.min(s / 0.55, 1);
    return darknessScore * saturationScore * (0.4 + s) * greenBoost;
  }

  if (l <= 0.3) {
    return 0.28 * (1 - l);
  }

  return 0;
}

function toHex({ r, g, b }: Rgb) {
  const channel = (value: number) =>
    Math.max(0, Math.min(255, Math.round(value)))
      .toString(16)
      .padStart(2, "0");

  return `#${channel(r)}${channel(g)}${channel(b)}`;
}

function averageSamples(samples: WeightedSample[]) {
  const totalWeight = samples.reduce(
    (total, sample) => total + sample.weight,
    0,
  );

  if (totalWeight <= 0) return null;

  const blended = samples.reduce(
    (accumulator, sample) => ({
      r: accumulator.r + sample.r * sample.weight,
      g: accumulator.g + sample.g * sample.weight,
      b: accumulator.b + sample.b * sample.weight,
    }),
    { r: 0, g: 0, b: 0 },
  );

  return toHex({
    r: blended.r / totalWeight,
    g: blended.g / totalWeight,
    b: blended.b / totalWeight,
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    image.src = src;
  });
}

async function extractSamplesFromImage(src: string): Promise<WeightedSample[]> {
  const image = await loadImage(src);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) return [];

  const sampleSize = 64;
  canvas.width = sampleSize;
  canvas.height = sampleSize;
  context.drawImage(image, 0, 0, sampleSize, sampleSize);

  const { data } = context.getImageData(0, 0, sampleSize, sampleSize);
  const samples: WeightedSample[] = [];

  for (let index = 0; index < data.length; index += 4) {
    const alpha = data[index + 3] / 255;
    if (alpha < 0.5) continue;

    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const { h, s } = rgbToHsl(r, g, b);
    const weight = scorePixel(r, g, b);

    if (weight <= 0) continue;

    samples.push({ r, g, b, weight, hue: h, saturation: s });
  }

  return samples;
}

function pickAccentFromSamples(samples: WeightedSample[]) {
  if (samples.length === 0) return null;

  const totalWeight = samples.reduce(
    (total, sample) => total + sample.weight,
    0,
  );

  const neutralSamples = samples.filter((sample) => sample.saturation < 0.12);
  const neutralWeight = neutralSamples.reduce(
    (total, sample) => total + sample.weight,
    0,
  );

  if (neutralWeight / totalWeight > 0.42) {
    const darkest = [...neutralSamples]
      .sort(
        (left, right) =>
          rgbToHsl(left.r, left.g, left.b).l -
          rgbToHsl(right.r, right.g, right.b).l,
      )
      .slice(0, Math.max(8, Math.floor(neutralSamples.length * 0.35)));

    const charcoal = averageSamples(darkest);
    if (charcoal) return charcoal;
  }

  const hueBuckets = new Map<number, WeightedSample[]>();

  for (const sample of samples) {
    if (sample.saturation < 0.1) continue;

    const bucket = Math.floor(sample.hue / 10);
    const bucketSamples = hueBuckets.get(bucket) ?? [];
    bucketSamples.push(sample);
    hueBuckets.set(bucket, bucketSamples);
  }

  let bestBucket: WeightedSample[] | null = null;
  let bestBucketScore = 0;

  for (const bucketSamples of hueBuckets.values()) {
    const bucketWeight = bucketSamples.reduce(
      (total, sample) => total + sample.weight,
      0,
    );
    const avgSaturation =
      bucketSamples.reduce(
        (total, sample) => total + sample.saturation * sample.weight,
        0,
      ) / bucketWeight;

    const bucketScore = bucketWeight * (0.45 + avgSaturation);

    if (bucketScore > bestBucketScore) {
      bestBucketScore = bucketScore;
      bestBucket = bucketSamples;
    }
  }

  if (bestBucket) {
    return averageSamples(bestBucket);
  }

  return averageSamples(samples);
}

export async function extractGalleryAccentColor(
  imageSources: string[],
): Promise<string | null> {
  if (imageSources.length === 0) return null;

  const sampleSources =
    imageSources.length <= 5
      ? imageSources
      : [
          imageSources[0],
          imageSources[Math.floor(imageSources.length * 0.25)],
          imageSources[Math.floor(imageSources.length * 0.5)],
          imageSources[Math.floor(imageSources.length * 0.75)],
          imageSources[imageSources.length - 1],
        ];

  const sampleGroups = await Promise.all(
    sampleSources.map((src) => extractSamplesFromImage(src).catch(() => [])),
  );

  const allSamples = sampleGroups.flat();
  return pickAccentFromSamples(allSamples);
}

export function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
