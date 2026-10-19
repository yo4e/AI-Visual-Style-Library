import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { benchmark, generationPrompt, combinedPrompt, styles, preColorReviewStyles } from "../src/style-data.js";

const hash = (value) => createHash("sha256").update(value).digest("hex");
const manifest = JSON.parse(await readFile(new URL("../benchmark-manifest.json", import.meta.url), "utf8"));

test("gallery images remain tied to the published prompt version", async () => {
  assert.equal(manifest.benchmarkId, benchmark.id);
  assert.equal(manifest.benchmarkVersion, benchmark.version);
  assert.deepEqual(manifest.images.map(({ slug }) => slug), styles.map(({ slug }) => slug));

  for (const [index, style] of styles.entries()) {
    const entry = manifest.images[index];
    const prompt = generationPrompt(style);
    assert.equal(prompt, combinedPrompt(style), `${style.slug}: final copied conditions differ from generation`);
    assert.ok(!/[\u3040-\u9fff]/.test(prompt), `${style.slug}: fixed generation instructions must be English`);
    const image = await readFile(new URL(`../public${style.image}`, import.meta.url));

    assert.equal(entry.imagePath, style.image, `${style.slug}: image path changed`);
    assert.equal(entry.submittedPrompt, prompt, `${style.slug}: original image-generation instructions changed`);
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

const preColorManifest = JSON.parse(await readFile(new URL('../provenance/benchmark-manifest-before-station-color-adoption.json', import.meta.url)));

test('historical approved station replacements match frozen and actual prompts while old history and 67 other entries remain intact',async()=>{
 const {historicalStyles}=await import('../src/style-data.js');
 const frozen=JSON.parse(await readFile(new URL('../provenance/station-reusable-style-v2-eight-prompts-before-generation.json',import.meta.url)));
 const actual=JSON.parse(await readFile(new URL('../provenance/station-reusable-style-v2-eight-original-results.json',import.meta.url)));
 const requests=JSON.parse(await readFile(new URL('../provenance/station-reusable-style-v2-eight-submitted-requests.json',import.meta.url)));
 const historical=JSON.parse(await readFile(new URL('../provenance/benchmark-manifest-before-station-reusable-v2-eight.json',import.meta.url)));
 assert.deepEqual(frozen.entries.map(e=>e.catalogIndex),[67,68,69,70,71,72,73,74]);
 const eightState=JSON.parse(await readFile(new URL('../provenance/benchmark-manifest-before-station-reusable-v3-six.json',import.meta.url)));
 const changed=new Set(frozen.entries.map(e=>e.slug));let retained=0;
 for(const [i,style] of preColorReviewStyles.slice(0,75).entries()){
  const old=historical.images[i];assert.equal(old.submittedPrompt,combinedPrompt(historicalStyles[i]));
  assert.equal(hash(await readFile(new URL('../public'+old.imagePath,import.meta.url))),old.imageSha256);
  if(!changed.has(style.slug)){assert.deepEqual(eightState.images[i],old);retained++;continue;}
  assert.deepEqual(preColorManifest.images[i],eightState.images[i]);
  const planned=frozen.entries.find(e=>e.slug===style.slug),sent=actual.entries.find(e=>e.slug===style.slug),request=requests.requests.find(e=>e.slug===style.slug),entry=preColorManifest.images[i];
  assert.equal(style.stylePrompt,planned.stylePrompt);assert.equal(combinedPrompt(style),planned.generationPrompt);
  assert.equal(entry.submittedPrompt,sent.actualSentPrompt);assert.equal(entry.submittedPrompt,request.arguments.prompt);assert.equal(entry.submittedPromptSha256,planned.generationPromptSha256);
  assert.equal(entry.sourceSha256,sent.output.sha256);assert.notEqual(style.image,old.imagePath);assert.notEqual(entry.imageSha256,old.imageSha256);
  assert.equal(entry.model,null);assert.equal(entry.seed,null);assert.deepEqual(entry.references,[]);
 }
 assert.equal(retained,67);
});

test('historical six approved follow-up pairs match the frozen and actual requests while previous eight and other 61 remain unchanged',async()=>{
 const frozen=JSON.parse(await readFile(new URL('../provenance/station-reusable-style-v3-six-followup-prompts-before-generation.json',import.meta.url)));
 const actual=JSON.parse(await readFile(new URL('../provenance/station-reusable-style-v3-six-original-results.json',import.meta.url)));
 const requests=JSON.parse(await readFile(new URL('../provenance/station-reusable-style-v3-six-submitted-requests.json',import.meta.url)));
 const before=JSON.parse(await readFile(new URL('../provenance/benchmark-manifest-before-station-reusable-v3-six.json',import.meta.url)));
 assert.deepEqual(frozen.entries.map(e=>e.catalogIndex),[3,5,39,45,59,60]);assert.equal(frozen.scenePrompt,benchmark.characterPrompt);
 const changed=new Set(frozen.entries.map(e=>e.slug));let retained=0;
 for(const [i,style]of preColorReviewStyles.slice(0,75).entries()){
  if(!changed.has(style.slug)){assert.deepEqual(preColorManifest.images[i],before.images[i]);retained++;continue;}
  const f=frozen.entries.find(e=>e.slug===style.slug),a=actual.entries.find(e=>e.slug===style.slug),r=requests.requests.find(e=>e.slug===style.slug),current=preColorManifest.images[i];
  assert.equal(style.stylePrompt,f.stylePrompt);assert.equal(current.submittedPrompt,f.generationPrompt);assert.equal(current.submittedPrompt,a.actualSentPrompt);assert.equal(current.submittedPrompt,r.arguments.prompt);
  assert.equal(current.submittedPromptSha256,f.generationPromptSha256);assert.equal(combinedPrompt(style),f.generationPrompt);assert.equal(current.sourceSha256,a.output.sha256);assert.equal(current.sourceLibraryFileId,a.output.libraryFileId);
  assert.notEqual(style.image,before.images[i].imagePath);assert.equal(current.model,null);assert.equal(current.seed,null);assert.deepEqual(current.references,[]);
  const oldBytes=await readFile(new URL('../public'+before.images[i].imagePath,import.meta.url));assert.equal(hash(oldBytes),before.images[i].imageSha256);
 }
 assert.equal(retained,69);
});
