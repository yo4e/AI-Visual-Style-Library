import assert from 'node:assert/strict';
import test from 'node:test';
import {styles,getStyles,benchmark,combinedPrompt,generationPrompt,findStyles} from '../src/style-data.js';
const japanese=/[\u3040-\u9fff]/;
test('54 distinct styles retain the original six and three ten-entry book groups',()=>{
 assert.equal(styles.length,54);assert.equal(new Set(styles.map(s=>s.slug )).size,54);
 assert.deepEqual(styles.slice(0,6).map(s=>s.slug),['watercolor','risograph','gouache','ink-wash','pixel-art','35mm-film']);
 for(const family of ['anime','light-novel','literary'])assert.equal(findStyles({filters:{family}}).length,10);
 assert.equal(findStyles({filters:{family:'manga'}}).length,8);
 for(const family of ['photographic','fiction'])assert.equal(findStyles({filters:{family}}).length,5);
 assert.equal(findStyles({filters:{density:'airy'}}).length,19);
 assert.equal(findStyles({filters:{density:'rich'}}).length,12);
 assert.equal(new Set(styles.slice(6).map(s=>Object.values(s.characteristics).join('|') )).size,48);
});
test('both display languages copy English techniques, vocabulary, and sample instructions',()=>{
 for(const locale of ['en','ja'])for(const style of getStyles(locale)){
  const canonical=styles.find(s=>s.slug===style.slug);
  assert.equal(style.stylePrompt,canonical.stylePrompt);
  assert.ok(!japanese.test(style.stylePrompt),style.slug+' technique');
  assert.ok(!japanese.test(style.vocabulary.join(', ')),style.slug+' vocabulary');
  assert.ok(!japanese.test(combinedPrompt(style)),style.slug+' sample composition');
  assert.equal(generationPrompt(style),generationPrompt(canonical));
 }
 for(const style of getStyles('en'))assert.ok(!japanese.test([style.name,style.short,style.definition,style.familyLabel,style.densityLabel,...Object.values(style.characteristics),style.watchFor,style.coverAdvice].join(' ')),style.slug+' English metadata');
 for(const style of getStyles('ja'))assert.ok(japanese.test(style.name+style.definition+style.watchFor),style.slug+' Japanese metadata');
});
test('the combined sample keeps style and scene independent and matches generation',()=>{
 for(const style of styles){
  const combined=combinedPrompt(style);
  assert.ok(combined.includes(benchmark.characterPrompt));
  assert.ok(combined.includes(style.stylePrompt));
  assert.equal(combined,generationPrompt(style));
  assert.ok(!combined.includes('COVER LAYOUT'));
 }
});
test('filters survive locale changes and search accepts both languages',()=>{
 for(const locale of ['en','ja']){
  assert.equal(findStyles({query:'breathing room',locale}).length,19);
  assert.equal(findStyles({query:'抜け感',locale}).length,19);
  assert.ok(findStyles({query:'flat',locale}).some(s=>s.slug==='flat-anime'));
  assert.ok(findStyles({query:'フラット',locale}).some(s=>s.slug==='flat-anime'));
 }
});

test('manga prompts were fixed before generation and use general visual traits',async()=>{
 const {readFile}=await import('node:fs/promises');
 const frozen=JSON.parse(await readFile(new URL('../provenance/manga-prompts-before-generation.json',import.meta.url),'utf8'));
 const manga=styles.filter(s=>s.family==='manga');assert.equal(frozen.jobs.length,8);
 const forbidden=/jump|corocoro|nakayoshi|afternoon|ジャンプ|コロコロ|なかよし|アフタヌーン/i;
 assert.equal(new Set(manga.map(s=>s.stylePrompt)).size,8);
 for(const style of manga){const job=frozen.jobs.find(j=>j.slug===style.slug);assert.equal(job.stylePrompt,style.stylePrompt);assert.equal(job.scenePrompt,benchmark.characterPrompt);assert.equal(job.prompt,combinedPrompt(style));assert.ok(!forbidden.test(style.name+style.translations.ja.name+style.stylePrompt));assert.ok(!japanese.test(style.stylePrompt));}
});
