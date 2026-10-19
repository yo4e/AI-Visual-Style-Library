import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import test from 'node:test';
import {styles,getStyles,combinedPrompt} from '../src/style-data.js';
import {styleForScene,hasSceneSample} from '../src/scene-data.js';
import {youngManDetailedBenchmark} from '../src/young-man-detailed-scene.js';
const newlyGenerated=JSON.parse(await readFile(new URL('../provenance/young-man-all-current-styles-generation-results.json',import.meta.url))).images;
const activeSlugs=new Set(['watercolor','anime-relaxed-simplified',...newlyGenerated.map(r=>r.slug)]);
const sha=x=>createHash('sha256').update(x).digest('hex');
const bytes=await readFile(new URL('../provenance/young-man-detailed-watercolor-prompts-before-generation.json',import.meta.url));
const frozen=JSON.parse(bytes),entry=frozen.entries[0];
const results=JSON.parse(await readFile(new URL('../provenance/young-man-detailed-watercolor-generation-results.json',import.meta.url)));

test('one fresh watercolor output uses the owner scene verbatim and identical current girl style',async()=>{
  assert.equal(results.images.length,1);const result=results.images[0],girl=styles.find(s=>s.slug==='watercolor');
  assert.equal(entry.scenePrompt,youngManDetailedBenchmark.characterPrompt);
  assert.equal(sha(entry.scenePrompt),'26bbe9b259679c9561cb875f96e35f959c80ddef0e21048576e3ece67125af5e');
  assert.equal(entry.stylePrompt,girl.stylePrompt);
  assert.equal(sha(entry.stylePrompt),'22ee49705cad9533af04d1f20b404fc8714806191d43ac89a6a586af371e2b38');
  assert.equal(combinedPrompt(girl,youngManDetailedBenchmark),result.submittedPrompt);
  assert.equal(sha(result.submittedPrompt),'71e19a6e139e005c69132362e2dea155beb57754d00e8ed4d81ae24afe4974a1');
  assert.equal(result.sourceSha256,'a1c90b41780e251ffdd49a3217aa8f365156373130ce0697b054fab6cc65f2cd');
  assert.equal(result.frozenManifestSha256,sha(bytes));
  assert.equal(sha(bytes),(await readFile(new URL('../provenance/young-man-detailed-watercolor-prompts-before-generation.sha256',import.meta.url),'utf8')).split(/\s/)[0]);
  assert.ok(Date.parse(result.submittedAt)>=Date.parse(frozen.frozenAt));
  assert.equal(result.submissionEvidence.kind,'actual-built-in-imagegen-call');
  assert.deepEqual(result.references,[]);assert.deepEqual(result.toolParameters,{transparent_background:false});
  assert.equal(result.model,null);assert.equal(result.seed,null);
  assert.equal(sha(await readFile(new URL('../public'+result.imagePath,import.meta.url))),result.imageSha256);
});

test('both languages show the new watercolor only on its detailed scene with exact independent copy strings',()=>{
  for(const locale of ['ja','en']){
    const girl=getStyles(locale).find(s=>s.slug==='watercolor'),youth=styleForScene(girl,'young-man');
    assert.equal(youth.image,'/images/young-man-full-body-detailed/watercolor.webp');
    assert.notEqual(youth.image,girl.image);assert.equal(youth.stylePrompt,girl.stylePrompt);
    assert.equal(youth.sampleBenchmark.characterPrompt,entry.scenePrompt);
    assert.equal(combinedPrompt(youth,youth.sampleBenchmark),results.images[0].submittedPrompt);
    assert.equal(youth.imageStatus,'ready');assert.ok(youth.sampleRecord.qualityNotes[locale]);
  }
  assert.deepEqual(styles.filter(s=>hasSceneSample('young-man',s.slug)).map(s=>s.slug),styles.filter(s=>activeSlugs.has(s.slug)).map(s=>s.slug));
  assert.equal(styles.length,77);
});
