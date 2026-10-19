import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {styles,getStyles,combinedPrompt} from '../src/style-data.js';
import {styleForScene,hasSceneSample} from '../src/scene-data.js';

const sha=value=>createHash('sha256').update(value).digest('hex');
const frozenBytes=await readFile(new URL('../provenance/young-man-relaxed-simplified-prompts-before-generation.json',import.meta.url));
const frozen=JSON.parse(frozenBytes),entry=frozen.entries[0];

test('archived expanded-scene result preserves its actual prompt and previous six',async()=>{
  assert.equal(sha(frozenBytes),'5fe950c5a1edc9674c9c4ff4adb0bae2409f4ec6917ce34c533d10f8e320687f');
  assert.equal(sha(await readFile(new URL('../provenance/young-man-prompts-before-generation.json',import.meta.url))),frozen.baseYouthFrozenManifestSha256);
  const beforeBytes=await readFile(new URL('../provenance/young-man-generation-results-before-relaxed-simplified.json',import.meta.url));
  assert.equal(sha(beforeBytes),frozen.existingYouthResultsSha256);
  const before=JSON.parse(beforeBytes),results=JSON.parse(await readFile(new URL('../provenance/young-man-generation-results.json',import.meta.url)));
  assert.equal(before.images.length,6);assert.equal(results.images.length,7);
  assert.deepEqual(results.images.slice(0,6),before.images);
  const record=results.images.at(-1);
  assert.equal(record.slug,entry.slug);assert.equal(record.submittedPrompt,entry.generationPrompt);
  assert.equal(record.submittedPromptSha256,'3c469230fc80e444b1b245eb114790d7a583b18f77877c422526dd686dfbe713');
  assert.equal(record.frozenManifestSha256,sha(frozenBytes));
  assert.equal(record.sourceLibraryFileId,'libfile_e9b6b93243b481918f94fceb1b4f1ff4');
  assert.equal(record.sourceSha256,'e376dcfa51f89df0218104544e184feb8bb77eb524192910e6dd755ef91c9843');
  assert.equal(record.sourceBytes,2207368);assert.deepEqual(record.references,[]);
  assert.ok(Date.parse(record.submittedAt)>Date.parse(frozen.frozenAt));
  assert.equal(record.imageSha256,sha(await readFile(new URL('../public'+record.imagePath,import.meta.url))));
  assert.equal(record.model,null);assert.equal(record.seed,null);
  const station=JSON.parse(await readFile(new URL('../benchmark-manifest.json',import.meta.url)));
  assert.ok(!station.images.some(row=>[row.sourceSha256,row.imageSha256].includes(record.sourceSha256)));
});

test('both languages retain the girl style but exclude the rejected wrong-scene sample',async()=>{
  const rejected=JSON.parse(await readFile(new URL('../provenance/young-man-rejected-samples.json',import.meta.url)));
  assert.ok(rejected.samples.some(item=>item.slug===entry.slug&&item.sourceSha256==='e376dcfa51f89df0218104544e184feb8bb77eb524192910e6dd755ef91c9843'));
  for(const locale of ['ja','en']){
    const girl=styleForScene(getStyles(locale).find(s=>s.slug===entry.slug),'station');
    const youth=styleForScene(girl,'young-man');
    assert.equal(youth.stylePrompt,girl.stylePrompt);assert.equal(youth.stylePrompt,entry.stylePrompt);
    assert.notEqual(youth.sampleBenchmark.characterPrompt,entry.scenePrompt);
    assert.notEqual(combinedPrompt(youth,youth.sampleBenchmark),entry.generationPrompt);
    assert.equal(youth.image,'/images/young-man-full-body-detailed/anime-relaxed-simplified.webp');
    assert.equal(youth.imageStatus,'ready');
    assert.notEqual(youth.sampleRecord.sourceSha256,'e376dcfa51f89df0218104544e184feb8bb77eb524192910e6dd755ef91c9843');
    assert.equal(hasSceneSample('young-man',entry.slug),true);
    assert.equal(hasSceneSample('young-man','anime-relaxed-simplified-pastel'),true);
  }
  assert.equal(styles.length,77);
});
