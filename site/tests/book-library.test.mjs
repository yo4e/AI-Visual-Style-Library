import assert from 'node:assert/strict';
import test from 'node:test';
import {styles,composePrompt,findStyles} from '../src/style-data.js';
test('36 distinct styles retain six original entries and three ten-entry book groups',()=>{
 assert.equal(styles.length,36);assert.equal(new Set(styles.map(s=>s.slug)).size,36);
 assert.deepEqual(styles.slice(0,6).map(s=>s.slug),['watercolor','risograph','gouache','ink-wash','pixel-art','35mm-film']);
 for(const family of ['アニメ・漫画','ライトノベル','純文学・静かな装丁'])assert.equal(findStyles({filters:{family}}).length,10);
 assert.equal(findStyles({filters:{density:'抜け感'}}).length,13);
 assert.equal(findStyles({filters:{density:'リッチ'}}).length,6);
 assert.equal(new Set(styles.slice(6).map(s=>Object.values(s.characteristics).join('|'))).size,30);
});
test('custom composition keeps the supplied subject separate and adds cover layout only on request',()=>{
 const subject='無人の台所に置かれた一通の手紙。';
 for(const style of styles){
  const plain=composePrompt(style,subject,false);assert.ok(plain.includes(subject));assert.ok(plain.includes(style.stylePrompt));assert.ok(!plain.includes('rust-red hooded coat'));assert.ok(!plain.includes('装丁レイアウト'));
  const cover=composePrompt(style,subject,true);assert.ok(cover.includes('上部25％'));assert.ok(cover.includes('縦長2:3'));assert.ok(cover.includes('タイトル、著者名、ロゴ、透かしは描かず'));
 }
});
