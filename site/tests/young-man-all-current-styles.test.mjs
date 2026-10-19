import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import test from 'node:test';
import {styles,getStyles,combinedPrompt,benchmark} from '../src/style-data.js';
import {styleForScene,hasSceneSample} from '../src/scene-data.js';
import {youngManDetailedBenchmark} from '../src/young-man-detailed-scene.js';
const sha=v=>createHash('sha256').update(v).digest('hex');
const read=async p=>readFile(new URL('../'+p,import.meta.url));
const frozenBytes=await read('provenance/young-man-all-current-styles-prompts-before-generation.json');
const frozen=JSON.parse(frozenBytes);
const added=JSON.parse(await read('provenance/young-man-all-current-styles-generation-results.json')).images;
const preserved=(await Promise.all(['young-man-full-body-detailed-generation-results.json','young-man-detailed-watercolor-generation-results.json'].map(async f=>JSON.parse(await read('provenance/'+f)).images))).flat();

test('all77 youth mappings were frozen with the owner scene and the current girl style, name and tags',()=>{
  assert.equal(sha(frozenBytes),'f8cb62c7d87525820079c71226a57c5b061089cfde38b121dc19cc923e4469e1');
  assert.equal(frozen.entries.length,77);assert.deepEqual(frozen.counts,{total:77,reused:2,newRequired:75});
  assert.equal(frozen.sceneSource.slackMessage,'1792396914.905449');
  assert.equal(frozen.sceneSource.sha256,'26bbe9b259679c9561cb875f96e35f959c80ddef0e21048576e3ece67125af5e');
  assert.deepEqual(frozen.scene,youngManDetailedBenchmark);assert.deepEqual(frozen.girlBenchmarkUnchanged,benchmark);
  for(const [i,e]of frozen.entries.entries()){
    assert.equal(e.slug,styles[i].slug);assert.equal(e.catalogIndex,i+1);
    assert.equal(e.stylePrompt,styles[i].stylePrompt);assert.equal(sha(e.stylePrompt),e.stylePromptSha256);
    assert.equal(e.scenePrompt,youngManDetailedBenchmark.characterPrompt);assert.equal(sha(e.scenePrompt),e.scenePromptSha256);
    assert.equal(e.generationPrompt,combinedPrompt(styles[i],youngManDetailedBenchmark));assert.equal(sha(e.generationPrompt),e.generationPromptSha256);
    assert.equal(e.girlImagePath,styles[i].image);assert.deepEqual(e.references,[]);assert.equal(e.transparent_background,false);
    for(const locale of ['en','ja']){
      const s=getStyles(locale)[i];assert.equal(s.name,e[locale==='en'?'titleEn':'titleJa']);
      assert.deepEqual([s.familyLabel,s.densityLabel],e[locale==='en'?'tagsEn':'tagsJa']);
      assert.ok(s.familyLabel);assert.ok(s.densityLabel);assert.ok(!/original six|既存6種類/i.test(s.familyLabel));
    }
  }
});

test('only exact matching new outputs and the two preserved correct samples enter the youth scene',async()=>{
  assert.equal(preserved.length,2);assert.equal(added.length,75);
  assert.equal(new Set([...added,...preserved].map(r=>r.sourceSha256)).size,added.length+2);
  const records=[...added,...preserved];
  for(const e of frozen.entries){
    const r=records.find(r=>r.slug===e.slug);assert.equal(hasSceneSample('young-man',e.slug),!!r);
    if(e.reusedSample){assert.ok(r);assert.equal(r.sourceSha256,e.reusedSample.sourceSha256);assert.equal(r.imageSha256,e.reusedSample.imageSha256);}
    if(!r)continue;
    assert.equal(r.imagePath,e.expectedImagePath);assert.equal(r.submittedPrompt,e.generationPrompt);
    assert.equal(r.submittedPromptSha256,e.generationPromptSha256);assert.equal(r.benchmarkId,e.sceneId);
    assert.equal(sha(await read('public'+r.imagePath)),r.imageSha256);
    if(!e.reusedSample){
      assert.equal(r.visualReview.status,'inspected');
      assert.equal(r.frozenManifestSha256,sha(frozenBytes));assert.ok(Date.parse(r.submittedAt)>=Date.parse(frozen.frozenAt));
      assert.equal(r.submissionEvidence.kind,'actual-built-in-imagegen-call');
      assert.deepEqual(r.references,[]);assert.deepEqual(r.toolParameters,{transparent_background:false});
      assert.equal(r.model,null);assert.equal(r.seed,null);assert.equal(r.conversion.colorEdits,false);assert.equal(r.conversion.crop,false);
      assert.ok(r.imageBytes<=300000);assert.equal(r.imageWidth,960);
    }
    for(const locale of ['en','ja']){
      const girl=getStyles(locale).find(s=>s.slug===e.slug),youth=styleForScene(girl,'young-man');
      assert.equal(youth.name,girl.name);assert.equal(youth.familyLabel,girl.familyLabel);assert.equal(youth.densityLabel,girl.densityLabel);
      assert.equal(youth.stylePrompt,girl.stylePrompt);assert.equal(youth.image,r.imagePath);assert.equal(youth.imageStatus,'ready');
      assert.notEqual(youth.image,girl.image);assert.equal(combinedPrompt(youth,youth.sampleBenchmark),r.submittedPrompt);
      assert.ok(youth.sampleRecord.qualityNotes[locale]);
    }
  }
});
