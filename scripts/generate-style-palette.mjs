import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const portfolioDir = path.join(root, "public", "images", "portfolio");
const outputFile = path.join(root, "src", "lib", "style-palette.ts");

/** Portfolio photos paired with display names for the experience palette. */
const paletteSources = [
  {
    file: "mcminnville-wedding/04.jpg",
    src: "/images/portfolio/mcminnville-wedding/04.jpg",
    alt: "Bride and groom in the forest with a long veil flowing in the wind",
    name: "Forest Moss",
  },
  {
    file: "sedona-portraits/05.jpg",
    src: "/images/portfolio/sedona-portraits/05.jpg",
    alt: "Couple holding hands among red rock formations in Sedona",
    name: "Red Rock Clay",
  },
  {
    file: "las-vegas-wedding/01.jpg",
    src: "/images/portfolio/las-vegas-wedding/01.jpg",
    alt: "Bride and groom exchanging vows in front of the Lady Luck neon sign",
    name: "Neon Terracotta",
    color: "#a04a3f",
  },
  {
    file: "franklin-engagement/02.jpg",
    src: "/images/portfolio/franklin-engagement/02.jpg",
    alt: "Couple embracing in front of the Franklin Theatre",
    name: "Brick Warmth",
  },
  {
    file: "chattanooga-engagement/04.jpg",
    src: "/images/portfolio/chattanooga-engagement/04.jpg",
    alt: "Couple walking through a leaf-covered forest path holding hands",
    name: "Autumn Rust",
  },
  {
    file: "flagstaff-engagement/01.jpg",
    src: "/images/portfolio/flagstaff-engagement/01.jpg",
    alt: "Couple laughing together on a mattress in a snowy aspen forest",
    name: "Aspen Green",
  },
];

function rgbToHsl(r, g, b) {
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

function scorePixel(r, g, b) {
  const { h, s, l } = rgbToHsl(r, g, b);
  if (l > 0.82 || l < 0.05) return 0;

  const isGreenDominant = g >= r && g >= b;
  const greenBoost = isGreenDominant && h >= 55 && h <= 170 ? 1.45 : 1;

  if (s >= 0.1) {
    const darknessScore = 1 - Math.abs(l - 0.34) / 0.34;
    const saturationScore = Math.min(s / 0.55, 1);
    return darknessScore * saturationScore * (0.4 + s) * greenBoost;
  }

  if (l <= 0.3) return 0.28 * (1 - l);
  return 0;
}

function toHex(r, g, b) {
  const channel = (value) =>
    Math.max(0, Math.min(255, Math.round(value)))
      .toString(16)
      .padStart(2, "0");
  return `#${channel(r)}${channel(g)}${channel(b)}`;
}

function averageSamples(samples) {
  const totalWeight = samples.reduce((total, sample) => total + sample.weight, 0);
  if (totalWeight <= 0) return null;

  const blended = samples.reduce(
    (accumulator, sample) => ({
      r: accumulator.r + sample.r * sample.weight,
      g: accumulator.g + sample.g * sample.weight,
      b: accumulator.b + sample.b * sample.weight,
    }),
    { r: 0, g: 0, b: 0 },
  );

  return toHex(
    blended.r / totalWeight,
    blended.g / totalWeight,
    blended.b / totalWeight,
  );
}

async function extractSamplesFromImage(imagePath) {
  const { data, info } = await sharp(imagePath)
    .resize(64, 64, { fit: "cover" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const samples = [];

  for (let index = 0; index < data.length; index += info.channels) {
    const alpha = info.channels === 4 ? data[index + 3] / 255 : 1;
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

function pickDominantColor(samples) {
  const hueBuckets = new Map();

  for (const sample of samples) {
    const bucket = Math.floor(sample.hue / 18);
    const bucketSamples = hueBuckets.get(bucket) ?? [];
    bucketSamples.push(sample);
    hueBuckets.set(bucket, bucketSamples);
  }

  let bestBucket = null;
  let bestBucketScore = 0;

  for (const bucketSamples of hueBuckets.values()) {
    const bucketWeight = bucketSamples.reduce(
      (total, sample) => total + sample.weight,
      0,
    );

    if (bucketWeight > bestBucketScore) {
      bestBucketScore = bucketWeight;
      bestBucket = bucketSamples;
    }
  }

  if (bestBucket) {
    return averageSamples(bestBucket);
  }

  return averageSamples(samples);
}

const swatches = [];

for (const source of paletteSources) {
  const imagePath = path.join(portfolioDir, source.file);
  const samples = await extractSamplesFromImage(imagePath);
  const color = source.color ?? pickDominantColor(samples);

  if (!color) {
    throw new Error(`Could not extract a palette color from ${source.file}`);
  }

  swatches.push({
    color,
    name: source.name,
    src: source.src,
    alt: source.alt,
  });
}

const fileContents = `// Generated by scripts/generate-style-palette.mjs — do not edit by hand.
// Re-run: npm run generate:style-palette

export const stylePaletteSwatches = ${JSON.stringify(swatches, null, 2)} as const;

export type StylePaletteSwatch = (typeof stylePaletteSwatches)[number];

export type StylePaletteColor = StylePaletteSwatch["color"];

/** Flat list of generated palette colors. */
export const stylePalette = stylePaletteSwatches.map((swatch) => swatch.color);
`;

await writeFile(outputFile, fileContents, "utf8");
console.log(`Wrote ${outputFile} with ${swatches.length} swatches:`);
for (const swatch of swatches) {
  console.log(`  ${swatch.name}: ${swatch.color} <- ${swatch.src}`);
}
