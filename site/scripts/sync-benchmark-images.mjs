import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { benchmark, combinedPrompt, styles } from "../src/style-data.js";

const sourceDirectory = process.argv[2];
if (!sourceDirectory) {
  throw new Error("Usage: npm run sync:benchmark -- /absolute/path/to/source-pngs");
}

const publicDirectory = fileURLToPath(new URL("../public/images/", import.meta.url));
const manifestPath = fileURLToPath(new URL("../benchmark-manifest.json", import.meta.url));
const hash = (data) => createHash("sha256").update(data).digest("hex");
const images = [];

for (const style of styles) {
  const sourceFile = `${style.slug}.png`;
  const sourcePath = resolve(sourceDirectory, sourceFile);
  const sourceBytes = await readFile(sourcePath);
  const outputPath = join(publicDirectory, `${style.slug}.webp`);
  let outputBytes;
  let quality;

  for (const candidate of [86, 82, 78, 74, 70]) {
    const buffer = await sharp(sourceBytes)
      .resize({ width: 960, kernel: style.slug === "pixel-art" ? sharp.kernel.nearest : sharp.kernel.lanczos3 })
      .webp({ quality: candidate, effort: 6 })
      .toBuffer();
    if (buffer.length <= 300_000) {
      outputBytes = buffer;
      quality = candidate;
      break;
    }
  }

  if (!outputBytes) throw new Error(`${style.slug}: could not meet the 300 KB image budget`);
  await writeFile(outputPath, outputBytes);
  const dimensions = await sharp(outputBytes).metadata();
  const submittedPrompt = combinedPrompt(style);
  images.push({
    slug: style.slug,
    imagePath: style.image,
    sourceFile,
    sourceSha256: hash(sourceBytes),
    imageSha256: hash(outputBytes),
    imageWidth: dimensions.width,
    imageHeight: dimensions.height,
    imageBytes: outputBytes.length,
    webpQuality: quality,
    submittedPrompt,
    submittedPromptSha256: hash(submittedPrompt),
  });
  process.stdout.write(`${style.slug}: ${dimensions.width}x${dimensions.height}, ${outputBytes.length} bytes\n`);
}

const manifest = {
  schemaVersion: 1,
  benchmarkId: benchmark.id,
  benchmarkVersion: benchmark.version,
  generatedOn: new Date().toISOString().slice(0, 10),
  tool: "Codex ImageGen",
  model: null,
  seed: null,
  note: "These are the prompts submitted for the selected outputs. The image tool did not expose its underlying model, seed, or any internal prompt revision. Re-running a submitted prompt is expected to vary.",
  images,
};
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
process.stdout.write(`Wrote ${manifestPath}\n`);
