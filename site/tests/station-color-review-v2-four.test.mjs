import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import test from 'node:test';
import {benchmark,combinedPrompt,preColorReviewStyles as styles} from '../src/style-data.js';
import {stationColorReviewV2Four} from '../src/station-color-review-v2-four.js';

const sha=x=>createHash('sha256').update(x).digest('hex');
const bytes=await readFile(new URL('../provenance/station-color-review-v2-four-prompts-before-generation.json',import.meta.url));
const frozen=JSON.parse(bytes);
const v1=JSON.parse(await readFile(new URL('../provenance/station-local-color-review-v1-prompts-before-generation.json',import.meta.url)));

test('four medium-rule revisions are frozen separately and keep the shared scene/pre-color catalog intact',async()=>{
  assert.deepEqual(frozen.entries.map(e=>e.catalogIndex),[2,54,4,5]);
  assert.equal(frozen.paletteStatus,'provisional-executor-proposal-not-owner-final-color-choice');
  assert.equal(frozen.scene.characterPrompt,benchmark.characterPrompt);
  assert.equal(sha(bytes),(await readFile(new URL('../provenance/station-color-review-v2-four-prompts-before-generation.sha256',import.meta.url),'utf8')).split(/\s/)[0]);
  for(const entry of frozen.entries){
    const previous=v1.entries.find(e=>e.slug===entry.slug);
    assert.equal(styles[entry.catalogIndex-1].stylePrompt,previous.originalStylePrompt);
    assert.equal(entry.priorV1.stylePrompt,previous.revisedStylePrompt);
    assert.equal(entry.priorV1.generationPromptSha256,previous.generationPromptSha256);
    assert.notEqual(entry.generationPromptSha256,previous.generationPromptSha256);
    assert.equal(combinedPrompt({stylePrompt:entry.stylePrompt},benchmark),entry.generationPrompt);
    assert.equal(sha(entry.generationPrompt),entry.generationPromptSha256);
  }
});

test('two inks include drawing ink, ink-wash has one accent, and pixel palette is an explicit provisional16',()=>{
  const riso=frozen.entries.find(e=>e.slug==='risograph'),comic=frozen.entries.find(e=>e.slug==='manga-limited-color-print'),ink=frozen.entries.find(e=>e.slug==='ink-wash'),pixel=frozen.entries.find(e=>e.slug==='pixel-art');
  assert.equal(riso.palette.length,2);assert.equal(comic.palette.length,2);
  assert.ok(riso.stylePrompt.includes('exactly two printing inks throughout'));
  assert.ok(comic.stylePrompt.includes('Near-black counts as one of the two inks'));
  assert.ok(ink.stylePrompt.includes('just one accent hue in addition to the black ink and gray washes'));
  assert.equal(pixel.palette.length,16);assert.equal(new Set(pixel.palette).size,16);
  for(const hex of pixel.palette){assert.match(hex,/^#[0-9A-F]{6}$/);assert.ok(pixel.stylePrompt.includes(hex));}
  assert.deepEqual(pixel.palette,stationColorReviewV2Four.entries.find(e=>e.slug===pixel.slug).palette);
  assert.ok(pixel.stylePrompt.includes('Remap all supplied local colors'));
});
