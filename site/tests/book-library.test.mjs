import assert from 'node:assert/strict';
import test from 'node:test';
import {styles,getStyles,composePrompt,combinedPrompt,generationPrompt,findStyles} from '../src/style-data.js';
const japanese=/[\u3040-\u9fff]/;
test('46 distinct styles retain the original six and three ten-entry book groups',()=>{
 assert.equal(styles.length,46);assert.equal(new Set(styles.map(s=>s.slug )).size,46);
 assert.deepEqual(styles.slice(0,6).map(s=>s.slug),['watercolor','risograph','gouache','ink-wash','pixel-art','35mm-film']);
 for(const family of ['anime','light-novel','literary'])assert.equal(findStyles({filters:{family}}).length,10);
 for(const family of ['photographic','fiction'])assert.equal(findStyles({filters:{family}}).length,5);
 assert.equal(findStyles({filters:{density:'airy'}}).length,17);
 assert.equal(findStyles({filters:{density:'rich'}}).length,9);
 assert.equal(new Set(styles.slice(6).map(s=>Object.values(s.characteristics).join('|') )).size,40);
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
test('custom composition preserves user text verbatim and adds only English cover instructions',()=>{
 const subject='  無人の台所に置かれた一通の手紙。\nA quiet memory.\n';
 for(const style of styles){
  const plain=composePrompt(style,subject,false);assert.ok(plain.includes(subject));assert.ok(plain.includes(style.stylePrompt));assert.ok(!plain.includes('rust-red hooded coat'));assert.ok(!plain.includes('COVER LAYOUT'));
  const cover=composePrompt(style,subject,true);assert.ok(cover.includes('upper 25%'));assert.ok(cover.includes('portrait 2:3'));assert.ok(cover.includes('Do not render the title, author name'));
  assert.ok(!japanese.test(cover.replace(subject,'')),style.slug+' fixed instructions');
 }
});
test('filters survive locale changes and search accepts both languages',()=>{
 for(const locale of ['en','ja']){
  assert.equal(findStyles({query:'breathing room',locale}).length,17);
  assert.equal(findStyles({query:'抜け感',locale}).length,17);
  assert.ok(findStyles({query:'flat',locale}).some(s=>s.slug==='flat-anime'));
  assert.ok(findStyles({query:'フラット',locale}).some(s=>s.slug==='flat-anime'));
 }
});
