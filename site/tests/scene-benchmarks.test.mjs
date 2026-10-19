import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {benchmark,combinedPrompt,getStyles,styles,historicalStyles} from '../src/style-data.js';
import {youngManBenchmark} from '../src/young-man-scene.js';
import {youngManDetailedBenchmark} from '../src/young-man-detailed-scene.js';
import {styleForScene,hasSceneSample} from '../src/scene-data.js';
import {validateSubmission} from '../scripts/import-young-man-results.mjs';
const sha=value=>createHash('sha256').update(value).digest('hex');
const bytes=await readFile(new URL('../provenance/young-man-prompts-before-generation.json',import.meta.url));
const frozen=JSON.parse(bytes);
const normalBytes=await readFile(new URL('../provenance/young-man-relaxed-simplified-prompts-before-generation.json',import.meta.url));
const normalFrozen=JSON.parse(normalBytes);
const station=JSON.parse(await readFile(new URL('../provenance/benchmark-manifest-before-station-reusable-v2-eight.json',import.meta.url)));

test('all 75 pre-generation strings change only the independent scene, preserving every style byte',async()=>{
 assert.equal(frozen.entries.length,75);assert.deepEqual(frozen.pilotSlugs,['watercolor','risograph','gouache','ink-wash','pixel-art','35mm-film']);
 assert.equal(frozen.scenePromptSha256,sha(youngManBenchmark.characterPrompt));
 assert.ok(youngManBenchmark.characterPrompt.includes('at dawn'));
 for(const [i,style] of historicalStyles.entries()){
  const e=frozen.entries[i];assert.equal(e.slug,style.slug);assert.equal(e.stylePrompt,style.stylePrompt);assert.equal(e.stylePromptSha256,sha(style.stylePrompt));
  assert.equal(e.generationPrompt,station.images[i].submittedPrompt.replace(benchmark.characterPrompt,youngManBenchmark.characterPrompt));
  assert.equal(e.generationPrompt,combinedPrompt(style,youngManBenchmark));assert.equal(e.generationPromptSha256,sha(e.generationPrompt));assert.equal(e.statusAtFreeze,'not-sent');
 }
 const expected=(await readFile(new URL('../provenance/young-man-prompts-before-generation.sha256',import.meta.url),'utf8')).split(/\s/)[0];assert.equal(sha(bytes),expected);
});

test('youth placeholders never inherit station or historical images; station remains the default',()=>{
 for(const style of styles){
  assert.equal(styleForScene(style).image,style.image);assert.equal(styleForScene(style).sampleBenchmark,benchmark);
  const youth=styleForScene(style,'young-man');assert.equal(youth.stylePrompt,style.stylePrompt);assert.equal(youth.sampleBenchmark,youngManDetailedBenchmark);
  if(!hasSceneSample('young-man',style.slug)){assert.equal(youth.image,null);assert.equal(youth.imageStatus,'pending');assert.equal(youth.sampleModel,null)}
 }
});

test('import gate rejects prompt backfitting, old images, references, wrong scene and pre-freeze generation',()=>{
 const entry=frozen.entries[0],source=Buffer.from('validation-only fixture; no image is generated');
 const valid={slug:entry.slug,benchmarkId:frozen.benchmarkId,benchmarkVersion:frozen.benchmarkVersion,submittedPrompt:entry.generationPrompt,submittedPromptSha256:entry.generationPromptSha256,tool:'image_gen',references:[],submittedAt:frozen.frozenAt,sourceSha256:sha(source)};
 assert.doesNotThrow(()=>validateSubmission(valid,entry,frozen,source));
 for(const delta of [{submittedPrompt:entry.generationPrompt+' Make the coat yellow.'},{submittedPromptSha256:'wrong'},{references:['old.png']},{benchmarkId:benchmark.id},{submittedAt:'2026-09-23T00:00:00Z'},{sourceSha256:'wrong'}])assert.throws(()=>validateSubmission({...valid,...delta},entry,frozen,source));
 assert.throws(()=>validateSubmission(valid,entry,frozen,source,new Set([sha(source)])));
 assert.throws(()=>validateSubmission(valid,entry,{...frozen,historicalReference:{sourceSha256:sha(source)}},source));
});

test('every received youth output matches a frozen pre-generation record and the deployed image hash',async()=>{
 const results=JSON.parse(await readFile(new URL('../provenance/young-man-generation-results.json',import.meta.url)));
 assert.equal(results.benchmarkId,frozen.benchmarkId);assert.equal(results.benchmarkVersion,frozen.benchmarkVersion);
 const forbidden=new Set(station.images.flatMap(image=>[image.sourceSha256,image.imageSha256]));forbidden.add(frozen.historicalReference.sourceSha256);
 const seen=new Set();
 for(const record of results.images){
  const recordFrozen=record.slug==='anime-relaxed-simplified'?normalFrozen:frozen;
  const recordBytes=record.slug==='anime-relaxed-simplified'?normalBytes:bytes;
  const entry=recordFrozen.entries.find(entry=>entry.slug===record.slug);assert.ok(entry);assert.ok(!seen.has(record.slug));seen.add(record.slug);
  assert.equal(record.submittedPrompt,entry.generationPrompt);assert.equal(record.submittedPromptSha256,entry.generationPromptSha256);
  assert.equal(record.benchmarkId,recordFrozen.benchmarkId);assert.equal(record.benchmarkVersion,recordFrozen.benchmarkVersion);assert.equal(record.frozenManifestSha256,sha(recordBytes));
  assert.ok(Date.parse(record.submittedAt)>=Date.parse(recordFrozen.frozenAt));assert.deepEqual(record.references,[]);assert.equal(record.tool,'image_gen');assert.ok(!forbidden.has(record.sourceSha256));forbidden.add(record.sourceSha256);
  assert.equal(record.imagePath,entry.expectedImagePath);const image=await readFile(new URL('../public'+record.imagePath,import.meta.url));assert.equal(sha(image),record.imageSha256);
 }
});
