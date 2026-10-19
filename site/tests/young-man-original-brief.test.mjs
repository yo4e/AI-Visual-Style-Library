import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import test from 'node:test';
import {styles,getStyles,combinedPrompt} from '../src/style-data.js';
import {styleForScene,hasSceneSample} from '../src/scene-data.js';
import {youngManOriginalBenchmark} from '../src/young-man-original-scene.js';
import {validateSubmission} from '../scripts/import-young-man-results.mjs';

const newlyGenerated=JSON.parse(await readFile(new URL('../provenance/young-man-all-current-styles-generation-results.json',import.meta.url))).images;
const activeSlugs=new Set(['watercolor','anime-relaxed-simplified',...newlyGenerated.map(r=>r.slug)]);
const sha=v=>createHash('sha256').update(v).digest('hex');
const frozenBytes=await readFile(new URL('../provenance/young-man-original-brief-relaxed-simplified-prompts-before-generation.json',import.meta.url));
const frozen=JSON.parse(frozenBytes),entry=frozen.entries[0];
const results=JSON.parse(await readFile(new URL('../provenance/young-man-original-brief-generation-results.json',import.meta.url)));

test('corrected output matches original short brief, unchanged girl style and exact pre-generation record',async()=>{
  assert.equal(sha(frozenBytes),'2d0d181489993cefc9384981a5d1351082a90ae922cd06996acf582f1145a2f1');
  assert.equal(results.images.length,1);const r=results.images[0];
  assert.equal(r.submittedPrompt,entry.generationPrompt);
  assert.equal(r.submittedPromptSha256,'c0bece1875e32172d7fbf00f4beb969de69f5d8201e016455aecaa12b3ef2817');
  assert.equal(r.frozenManifestSha256,sha(frozenBytes));
  assert.equal(entry.scenePrompt,youngManOriginalBenchmark.characterPrompt);
  assert.ok(!/pocket|waist|both hands/i.test(entry.scenePrompt));
  assert.equal(r.sourceLibraryFileId,'libfile_e6b72cf2da248191969df22caa56b671');
  assert.equal(r.sourceSha256,'c933dc4881e49f86d6ebdf80f5aca1581951d9e0b6e3c382c4be01ef9d19445c');
  assert.equal(r.sourceBytes,2345830);assert.deepEqual(r.references,[]);
  assert.ok(Date.parse(r.submittedAt)>Date.parse(frozen.frozenAt));
  assert.equal(r.model,null);assert.equal(r.seed,null);
  assert.equal(sha(await readFile(new URL('../public'+r.imagePath,import.meta.url))),r.imageSha256);
  const legacy=JSON.parse(await readFile(new URL('../provenance/young-man-generation-results.json',import.meta.url)));
  assert.equal(legacy.images.length,7);assert.ok(!legacy.images.some(old=>old.sourceSha256===r.sourceSha256));
});

test('original brief stays archived separately while active rendering prompts still match the girl version',()=>{
  assert.deepEqual(styles.filter(s=>hasSceneSample('young-man',s.slug)).map(s=>s.slug),styles.filter(s=>activeSlugs.has(s.slug)).map(s=>s.slug));
  for(const locale of ['en','ja'])for(const style of getStyles(locale)){
    const youth=styleForScene(style,'young-man');
    assert.equal(youth.stylePrompt,style.stylePrompt);
    assert.notEqual(youth.sampleBenchmark,youngManOriginalBenchmark);
    if(hasSceneSample('young-man',style.slug)){
      assert.equal(youth.imageStatus,'ready');
      assert.notEqual(combinedPrompt(youth,youth.sampleBenchmark),entry.generationPrompt);
      assert.notEqual(youth.sampleRecord.sourceSha256,results.images[0].sourceSha256);
    }else{
      assert.equal(youth.image,null);assert.equal(youth.sampleRecord,null);
      assert.equal(youth.imageStatus,'pending');assert.equal(youth.sampleModel,null);
    }
  }
});

test('corrected import validation rejects the old expanded prompt, source reuse and pre-freeze submissions',()=>{
  const source=Buffer.from('validation fixture only'),r={...results.images[0],sourceSha256:sha(source)};
  assert.doesNotThrow(()=>validateSubmission(r,entry,frozen,source));
  const old={...r,benchmarkId:'sunflowers-bus-stop-v1'};
  assert.throws(()=>validateSubmission(old,entry,frozen,source));
  assert.throws(()=>validateSubmission({...r,submittedPrompt:r.submittedPrompt+' Put a hand in a pocket.'},entry,frozen,source));
  assert.throws(()=>validateSubmission({...r,submittedAt:'2026-09-23T06:44:39Z'},entry,frozen,source));
  assert.throws(()=>validateSubmission(r,entry,frozen,source,new Set([sha(source)])));
});
