import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scrapbookDir = path.join(__dirname, "../public/images/home/scrapbook");

const files = [{ name: "texture-middle.png", tolerance: 28 }];

function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

async function removeBackground(fileName, tolerance) {
  const input = path.join(scrapbookDir, fileName);
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];

  const bg = corners
    .map(([x, y]) => {
      const i = (y * width + x) * channels;
      return [data[i], data[i + 1], data[i + 2]];
    })
    .reduce(
      (acc, [r, g, b]) => [acc[0] + r, acc[1] + g, acc[2] + b],
      [0, 0, 0],
    )
    .map((v) => Math.round(v / corners.length));

  const visited = new Uint8Array(width * height);
  const queue = [...corners];

  for (const [x, y] of corners) {
    visited[y * width + x] = 1;
  }

  while (queue.length) {
    const [x, y] = queue.pop();
    const i = (y * width + x) * channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (colorDistance(r, g, b, bg[0], bg[1], bg[2]) <= tolerance) {
      data[i + 3] = 0;

      for (const [nx, ny] of [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ]) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const idx = ny * width + nx;
          if (!visited[idx]) {
            visited[idx] = 1;
            queue.push([nx, ny]);
          }
        }
      }
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile(input);

  console.log(`${fileName}: bg rgb(${bg.join(",")}), ${width}x${height}`);
}

for (const file of files) {
  await removeBackground(file.name, file.tolerance);
}
