import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.join(
  process.cwd(),
  "_incoming/usable-travel/Usable_",
);
const OUTPUT_DIR = path.join(process.cwd(), "public/images/about/travel");

const outputs = {
  "IMG_6406.jpg": "lauren-desert-bw.jpg",
  "IMG_3720.JPG": "lauren-camper-van.jpg",
  "LNP_2073-2.jpg": "coastal-cliffs.jpg",
  "DSC_6441.jpg": "joshua-tree-night.jpg",
  "DSC_1441.jpg": "lauren-red-rocks.jpg",
};

async function optimizeFile(inputName, outputName) {
  const inputPath = path.join(SOURCE_DIR, inputName);
  const outputPath = path.join(OUTPUT_DIR, outputName);

  await sharp(inputPath)
    .rotate()
    .resize({ width: 2200, height: 2200, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outputPath);

  const meta = await sharp(outputPath).metadata();
  console.log(`${outputName}: ${meta.width}x${meta.height}`);
}

await mkdir(OUTPUT_DIR, { recursive: true });

const sourceFiles = await readdir(SOURCE_DIR);
for (const [inputName, outputName] of Object.entries(outputs)) {
  if (!sourceFiles.includes(inputName)) {
    console.warn(`Missing source file: ${inputName}`);
    continue;
  }

  await optimizeFile(inputName, outputName);
}

console.log("Done.");
