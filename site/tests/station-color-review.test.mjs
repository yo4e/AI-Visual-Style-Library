import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import test from 'node:test';
import {preColorReviewStyles as styles, benchmark, combinedPrompt} from '../src/style-data.js';
import {stationColorReview,revisedStationColorPrompt} from '../src/station-color-review-v1.js';

const sha=x=>createHash('sha256').update(x).digest('hex');
const bytes=await readFile(new URL('../provenance/station-local-color-review-v1-prompts-before-generation.json',import.meta.url));
const frozen=JSON.parse(bytes);

test('color review scope is the original16 plus separate hair63 and excludes grading/new-style work',()=>{
  assert.deepEqual(frozen.entries.map(e=>e.catalogIndex).sort((a,b)=>a-b),[2,3,4,5,54,60,63,65,66,67,68,69,70,71,72,73,74]);
  assert.equal(frozen.status,'local-review-only-not-active-not-published');
  assert.equal(frozen.scene.characterPrompt,benchmark.characterPrompt);
  assert.equal(new Set(frozen.entries.map(e=>e.slug)).size,17);
  for(const index of [1,6,56,59,62,64,75,76,77])assert.ok(!frozen.entries.some(e=>e.catalogIndex===index));
});

test('revised candidates are frozen separately and do not relabel historical pre-color images',async()=>{
  const expected=(await readFile(new URL('../provenance/station-local-color-review-v1-prompts-before-generation.sha256',import.meta.url),'utf8')).split(/\s/)[0];
  assert.equal(sha(bytes),expected);
  for(const entry of frozen.entries){
    const style=styles[entry.catalogIndex-1],source=stationColorReview.entries.find(e=>e.slug===entry.slug);
    assert.equal(style.slug,entry.slug);
    assert.equal(style.stylePrompt,entry.originalStylePrompt);
    assert.equal(combinedPrompt(style),entry.originalSample.generationPrompt);
    assert.equal(style.image,entry.originalSample.imagePath);
    assert.equal(sha(await readFile(new URL('../public'+style.image,import.meta.url))),entry.originalSample.imageSha256);
    assert.equal(entry.originalSample.status,'historical-before-color-revision');
    assert.equal(entry.sampleStatus,'not-generated-for-this-revision');
    assert.equal(revisedStationColorPrompt(style,source),entry.revisedStylePrompt);
    assert.notEqual(entry.originalStylePrompt,entry.revisedStylePrompt);
    assert.equal(sha(entry.revisedStylePrompt),entry.revisedStylePromptSha256);
    assert.equal(combinedPrompt({...style,stylePrompt:entry.revisedStylePrompt}),entry.generationPrompt);
    assert.equal(sha(entry.generationPrompt),entry.generationPromptSha256);
  }
});

test('monochrome media, drawing inks and general tone survive the specific color corrections',()=>{
  const prompt=slug=>frozen.entries.find(e=>e.slug===slug).revisedStylePrompt;
  assert.ok(prompt('ink-wash').includes('black ink diluted into soft gray tonal washes'));
  assert.ok(prompt('ink-wash').includes('Render the remaining areas as grayscale'));
  assert.ok(prompt('fiction-ballpoint').includes('fine cobalt-blue lines'));
  assert.ok(prompt('fiction-spare-continuous-line').includes('long cobalt-blue monoline curves'));
  assert.ok(prompt('fiction-looping-flat').includes('dark brown contour'));
  assert.ok(prompt('photo-horror').includes('pale sickly cyan-green highlights with desaturated gray shadows'));
  assert.ok(prompt('pixel-art').includes('roughly 320 by 180 logical pixels'));
  assert.ok(!prompt('pixel-art').includes('do not add colors to match literal scene hues'));
  assert.ok(!prompt('manga-bold-scruffy-ink').includes('Make the hair and a few overlapping cloth folds read as simple black ink masses'));
  assert.ok(prompt('manga-bold-scruffy-ink').includes('masses in its supplied local color'));
});
