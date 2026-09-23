import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { benchmark, combinedPrompt, styles } from "../src/style-data.js";

const hash = (value) => createHash("sha256").update(value).digest("hex");
const manifest = JSON.parse(await readFile(new URL("../benchmark-manifest.json", import.meta.url), "utf8"));

test("gallery images remain tied to the published prompt version", async () => {
  assert.equal(manifest.benchmarkId, benchmark.id);
  assert.equal(manifest.benchmarkVersion, benchmark.version);
  assert.deepEqual(manifest.images.map(({ slug }) => slug), styles.map(({ slug }) => slug));

  for (const [index, style] of styles.entries()) {
    const entry = manifest.images[index];
    const prompt = combinedPrompt(style);
    const image = await readFile(new URL(`../public${style.image}`, import.meta.url));

    assert.equal(entry.imagePath, style.image, `${style.slug}: image path changed`);
    assert.equal(entry.submittedPrompt, prompt, `${style.slug}: regenerate the image after editing its prompt`);
    assert.equal(entry.submittedPromptSha256, hash(prompt), `${style.slug}: prompt checksum changed`);
    assert.equal(entry.imageSha256, hash(image), `${style.slug}: image differs from the recorded output`);
  }
});

test("exported prompt library contains the current independent prompt parts", async () => {
  const library = await readFile(new URL("../../PROMPT_LIBRARY.md", import.meta.url), "utf8");
  assert.ok(library.includes(benchmark.characterPrompt));
  for (const style of styles) {
    assert.ok(library.includes(style.stylePrompt), `${style.slug}: style prompt not exported`);
    assert.ok(library.includes(`(site/public${style.image})`), `${style.slug}: benchmark image link not exported`);
  }
});
