import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {getStyles} from '../src/style-data.js';
import {styleForScene} from '../src/scene-data.js';

const youthResults=JSON.parse(await readFile(new URL('../provenance/young-man-all-current-styles-generation-results.json',import.meta.url)));

test('the two historical station observations never replace the youth generation observations',()=>{
  const cases=[
    ['manga-geometric-comedy',{en:'retains faint local color',ja:'白黒指定でも淡い色が残っています'}],
    ['anime-adult-everyday-cel',{en:'than the analyzed reference',ja:'参考画像より目が丸く'}]
  ];
  for(const [slug,stationClaim]of cases)for(const locale of ['ja','en']){
    const style=getStyles(locale).find(s=>s.slug===slug),station=styleForScene(style,'station'),youth=styleForScene(style,'young-man');
    assert.ok(station.sampleNotes[locale].includes(stationClaim[locale]));
    assert.ok(!station.watchFor.includes(stationClaim[locale]));
    assert.ok(!youth.sampleNotes[locale].includes(stationClaim[locale]));
    assert.deepEqual(youth.sampleNotes,youthResults.images.find(r=>r.slug===slug).qualityNotes);
    assert.equal(youth.watchFor,station.watchFor);
    assert.equal(youth.stylePrompt,station.stylePrompt);
  }
});
