import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import test from 'node:test';
import {styles,preColorReviewStyles,techniqueFamilies,getStyles,benchmark,combinedPrompt,generationPrompt} from '../src/style-data.js';
import {styleForScene,hasSceneSample} from '../src/scene-data.js';
const newlyGenerated=JSON.parse(await readFile(new URL('../provenance/young-man-all-current-styles-generation-results.json',import.meta.url))).images;
const activeSlugs=new Set(['watercolor','anime-relaxed-simplified',...newlyGenerated.map(r=>r.slug)]);
const sha=x=>createHash('sha256').update(x).digest('hex');
const read=async name=>JSON.parse(await readFile(new URL('../'+name,import.meta.url)));
const adopted=await read('provenance/station-color-adoption-active-samples.json');
const before=await read('provenance/benchmark-manifest-before-station-color-adoption.json');
const current=await read('benchmark-manifest.json');
const v1=await read('provenance/station-local-color-review-v1-prompts-before-generation.json');
const v2=await read('provenance/station-color-review-v2-four-prompts-before-generation.json');
const later=new Set(['risograph','ink-wash','pixel-art','manga-limited-color-print']);

test('owner-adopted17 active pairs select later four and exact saved English generation text',async()=>{
  assert.equal(adopted.images.length,17);
  assert.deepEqual(adopted.images.map(i=>styles.findIndex(s=>s.slug===i.slug)+1).sort((a,b)=>a-b),[2,3,4,5,54,60,63,65,66,67,68,69,70,71,72,73,74]);
  for(const record of adopted.images){
    const style=styles.find(s=>s.slug===record.slug),plan=(later.has(record.slug)?v2:v1).entries.find(e=>e.slug===record.slug);
    assert.equal(record.adoptionEvidence.slackMessage,'1792391395.504679');
    assert.equal(record.adoptionEvidence.chosenVersion,later.has(record.slug)?'phase22-v2':'phase21-v1');
    assert.equal(style.stylePrompt,plan.stylePrompt||plan.revisedStylePrompt);
    assert.equal(style.generationStylePrompt,style.stylePrompt);
    assert.equal(combinedPrompt(style),plan.generationPrompt);
    assert.equal(generationPrompt(style),record.submittedPrompt);
    assert.equal(sha(record.submittedPrompt),plan.generationPromptSha256);
    assert.equal(record.scenePrompt,benchmark.characterPrompt);
    assert.equal(sha(await readFile(new URL('../public'+style.image,import.meta.url))),record.imageSha256);
    assert.deepEqual(current.images.find(i=>i.slug===record.slug),record);
    assert.deepEqual(style.sampleRecord,record);
    assert.deepEqual(record.references,[]);assert.equal(record.model,null);assert.equal(record.seed,null);
  }
  const expected={risograph:'f65a9c83333a1fe369c43ee7e409b8b75bbcccd76c5a5515d8dfa67d1f41270b','ink-wash':'ab2f67f130922d2d69bbacf0bd9a98f09f032d50394d377ee7fed0d810feb38a','pixel-art':'402a78a46abe95404915581b1b6e3cd79443237f9904cf85bae4842faba09922','manga-limited-color-print':'8135bcc936f94bc54f07440faa87241aa7686972e9e4bf5fa942c6b8469add7b'};
  for(const [slug,hash]of Object.entries(expected))assert.equal(adopted.images.find(i=>i.slug===slug).sourceSha256,hash);
});

test('other60 current entries and all77 prior image files remain intact',async()=>{
  let retained=0;const chosen=new Set(adopted.images.map(i=>i.slug));
  for(const [index,style]of styles.entries()){
    const old=before.images[index];assert.equal(sha(await readFile(new URL('../public'+old.imagePath,import.meta.url))),old.imageSha256);
    if(chosen.has(style.slug)){assert.notEqual(style.image,old.imagePath);continue;}
    assert.deepEqual(style,{...preColorReviewStyles[index],family:techniqueFamilies[style.slug]||preColorReviewStyles[index].family});assert.deepEqual(current.images[index],old);retained++;
  }
  assert.equal(retained,60);
  assert.equal(hasSceneSample('young-man','anime-relaxed-simplified'),true);
  assert.equal(styleForScene(styles[75],'young-man').image,'/images/young-man-full-body-detailed/anime-relaxed-simplified.webp');
  assert.deepEqual(styles.filter(s=>hasSceneSample('young-man',s.slug)).map(s=>s.slug),styles.filter(s=>activeSlugs.has(s.slug)).map(s=>s.slug));
});

test('both locales keep independent prompt parts and accurate observations rather than color-count guarantees',()=>{
  for(const locale of ['en','ja'])for(const record of adopted.images){
    const style=styleForScene(getStyles(locale).find(s=>s.slug===record.slug));
    assert.equal(style.stylePrompt,record.stylePrompt);assert.equal(style.sampleBenchmark.characterPrompt,benchmark.characterPrompt);
    assert.equal(combinedPrompt(style,style.sampleBenchmark),record.submittedPrompt);
    assert.ok(style.sampleRecord.qualityNotes[locale]);assert.equal(style.sampleModel,null);
  }
  const pixel=adopted.images.find(i=>i.slug==='pixel-art');
  assert.equal(pixel.sourceColorMeasurement.uniqueRgbColorCount,290238);
  assert.equal(pixel.sourceColorMeasurement.exact16ColorPaletteCompliance,false);
  assert.ok(pixel.qualityNotes.en.includes('not achieved'));
  assert.ok(!styles.find(s=>s.slug==='fiction-elastic-symbols').short.includes('Four'));
  assert.ok(!styles.find(s=>s.slug==='fiction-chunky-wax-shapes').short.includes('Five'));
});
