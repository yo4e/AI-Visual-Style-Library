import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import test from 'node:test';
import {styles,getStyles,combinedPrompt} from '../src/style-data.js';
import {youngManDetailedBenchmark} from '../src/young-man-detailed-scene.js';
import {styleForScene,hasSceneSample} from '../src/scene-data.js';

const sha=value=>createHash('sha256').update(value).digest('hex');
const bytes=await readFile(new URL('../provenance/young-man-full-body-detailed-prompts-before-generation.json',import.meta.url));
const frozen=JSON.parse(bytes),entry=frozen.entries[0];
const results=JSON.parse(await readFile(new URL('../provenance/young-man-full-body-detailed-generation-results.json',import.meta.url)));

test('approved detailed image corresponds to saved scene and unchanged normal girl rendering text',async()=>{
  const expected=(await readFile(new URL('../provenance/young-man-full-body-detailed-prompts-before-generation.sha256',import.meta.url),'utf8')).split(/\s/)[0];
  assert.equal(sha(bytes),expected);assert.deepEqual(youngManDetailedBenchmark,frozen.scene);
  assert.equal(results.images.length,1);const sample=results.images[0];
  assert.equal(sample.sourceLibraryFileId,'libfile_665c2e7ac1a08191a13cacfe69a9c1e3');
  assert.equal(sample.sourceFileId,'file_00000000c90081f7a03454545de7a89e');
  assert.equal(sample.sourceSha256,'d946ea5b8bb741cccdb798cdb0beebfacfb37c5121e30b77ba0ac6b618f18883');
  assert.equal(sample.sourceBytes,2582306);
  assert.equal(sample.frozenManifestSha256,sha(bytes));
  assert.equal(sample.submittedPrompt,entry.generationPrompt);
  assert.equal(sample.submittedPromptSha256,'272bf9b11bba8f30b35d875879cd3e6453c31fe792e747e283e3cb95bb7d93d6');
  assert.equal(sha(await readFile(new URL('../public'+sample.imagePath,import.meta.url))),sample.imageSha256);
  assert.equal(sample.submissionEvidence.kind,'trusted-parent-handoff');
  for(const field of ['submittedAt','generatedAt','references','toolParameters','model','seed'])assert.equal(sample[field],null);
  assert.equal(sample.adoption.status,'owner-approved-for-local-working-site');
});

test('old brief and expanded-scene records/images remain intact after active image changes',async()=>{
  const prior=JSON.parse(await readFile(new URL('../provenance/young-man-original-brief-generation-results.json',import.meta.url)));
  const legacy=JSON.parse(await readFile(new URL('../provenance/young-man-generation-results.json',import.meta.url)));
  assert.equal(prior.images.length,1);assert.equal(legacy.images.length,7);
  assert.equal(prior.images[0].sourceSha256,'c933dc4881e49f86d6ebdf80f5aca1581951d9e0b6e3c382c4be01ef9d19445c');
  assert.equal(results.images[0].supersedesActiveSample.sourceSha256,prior.images[0].sourceSha256);
  for(const record of [...prior.images,...legacy.images])assert.equal(sha(await readFile(new URL('../public'+record.imagePath,import.meta.url))),record.imageSha256);
});

const watercolor=JSON.parse(await readFile(new URL('../provenance/young-man-detailed-watercolor-generation-results.json',import.meta.url))).images[0];

const newlyGenerated=JSON.parse(await readFile(new URL('../provenance/young-man-all-current-styles-generation-results.json',import.meta.url))).images;
const activeSamples=[watercolor,...results.images,...newlyGenerated];
test('only matching detailed-scene youth samples are active and both locales keep exact independent prompt parts',()=>{
  assert.deepEqual(styles.filter(style=>hasSceneSample('young-man',style.slug)).map(s=>s.slug),styles.filter(s=>activeSamples.some(r=>r.slug===s.slug)).map(s=>s.slug));
  for(const locale of ['ja','en'])for(const girl of getStyles(locale)){
    const youth=styleForScene(girl,'young-man');
    assert.equal(youth.stylePrompt,girl.stylePrompt);assert.equal(youth.sampleBenchmark,youngManDetailedBenchmark);
    const selected=activeSamples.find(r=>r.slug===girl.slug);
    if(selected){
      assert.equal(youth.image,selected.imagePath);assert.equal(youth.imageStatus,'ready');
      assert.equal(youth.sampleBenchmark.characterPrompt,entry.scenePrompt);
      assert.equal(combinedPrompt(youth,youth.sampleBenchmark),selected.submittedPrompt);
      assert.equal(youth.sampleRecord.sourceSha256,selected.sourceSha256);
    }else{
      assert.equal(youth.image,null);assert.equal(youth.imageStatus,'pending');assert.equal(youth.sampleRecord,null);
    }
  }
});
