import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [, , slug, sourceFolder, ...files] = process.argv;

if (!slug || !sourceFolder || files.length === 0) {
  console.error(
    "Usage: node scripts/optimize-gallery.mjs <slug> <source-folder> <file1> [file2...]",
  );
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const sourceDir = path.join(root, sourceFolder);
const destDir = path.join(root, "public", "images", "portfolio", slug);

await mkdir(destDir, { recursive: true });

for (const [index, file] of files.entries()) {
  const input = path.join(sourceDir, file.endsWith(".jpg") ? file : `${file}.jpg`);
  const output = path.join(destDir, `${String(index + 1).padStart(2, "0")}.jpg`);

  await sharp(input)
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(output);

  console.log(`Wrote ${output}`);
}
