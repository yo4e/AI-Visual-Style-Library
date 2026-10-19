import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {benchmark, combinedPrompt, getStyles, styles} from '../src/style-data.js';
import {styleForScene, hasSceneSample} from '../src/scene-data.js';

const sha = value => createHash('sha256').update(value).digest('hex');
const frozenBytes = await readFile(new URL('../provenance/relaxed-simplified-anime-pastel-v3-trial-prompts.json', import.meta.url));
const frozen = JSON.parse(frozenBytes), entry = frozen.entries[0];
const normal = styles.find(style => style.slug === 'anime-relaxed-simplified');
const pastel = styles.find(style => style.slug === 'anime-relaxed-simplified-pastel');

test('adopted pastel variant keeps exact V3 generated text and all preceding76 output records', async () => {
  assert.ok(normal && pastel); assert.notEqual(normal.image, pastel.image);
  assert.equal(pastel.stylePrompt, normal.stylePrompt + '\nUse a pastel-toned color treatment.');
  assert.equal(pastel.stylePrompt, pastel.generationStylePrompt);
  assert.equal(combinedPrompt(pastel), entry.generationPrompt);
  assert.equal(sha(combinedPrompt(pastel)), 'ed0505651266c124e61e383e8e00df1a16d445fcad44bbf65b077710f70aff60');
  const actual = pastel.sampleRecord;
  assert.equal(actual.submittedPrompt, entry.generationPrompt);
  assert.equal(actual.frozenManifestSha256, sha(frozenBytes));
  assert.equal(actual.sourceLibraryFileId, 'libfile_2f543ce204808191ad13be2285fd291c');
  assert.equal(actual.sourceSha256, '6e24a8b394ddcef13b9f13f42f597c2e7418fe5591a88e05c946c339d96de348');
  assert.equal(actual.imageSha256, sha(await readFile(new URL('../public'+pastel.image, import.meta.url))));
  assert.deepEqual(actual.references, []); assert.equal(actual.model, null); assert.equal(actual.seed, null);
  assert.equal(actual.adoptionEvidence.slackMessage, '1792286492.343879');
  const before = JSON.parse(await readFile(new URL('../provenance/benchmark-manifest-before-relaxed-simplified-anime-pastel.json', import.meta.url)));
  const current = JSON.parse(await readFile(new URL('../benchmark-manifest.json', import.meta.url)));
  assert.equal(before.images.length, 76); assert.equal(current.images.length, 77);
  const preColor = JSON.parse(await readFile(new URL('../provenance/benchmark-manifest-before-station-color-adoption.json', import.meta.url)));
  assert.deepEqual(preColor.images.slice(0,76), before.images);
  assert.deepEqual(current.images.at(-1), actual);
});

test('both variants copy reusable English rendering traits separately from the benchmark scene', () => {
  const sceneSpecific = /\b(?:woman|women|East Asian|rust-red|dark brown|black backpack|paper map|station|train|commuter|platform|16:9|waist|left of center)\b/i;
  for (const locale of ['en','ja']) for (const canonical of [normal,pastel]) {
    const style = styleForScene(getStyles(locale).find(style => style.slug === canonical.slug));
    assert.equal(style.stylePrompt, canonical.stylePrompt);
    assert.ok(!sceneSpecific.test(style.stylePrompt));
    assert.ok(style.stylePrompt.includes('For human figures'));
    assert.equal(style.sampleBenchmark.characterPrompt, benchmark.characterPrompt);
    assert.ok(!style.sampleBenchmark.characterPrompt.includes('pastel-toned'));
    assert.equal(combinedPrompt(style, style.sampleBenchmark), style.sampleRecord.submittedPrompt);
    assert.equal(hasSceneSample('station', style.slug), true);
    const youth = styleForScene(style, 'young-man');
    assert.equal(youth.sampleModel, null);
    assert.equal(youth.imageStatus,'ready');
    assert.equal(youth.image,'/images/young-man-full-body-detailed/'+style.slug+'.webp');
    assert.equal(youth.sampleRecord.submittedPrompt,combinedPrompt(youth,youth.sampleBenchmark));
    assert.equal(hasSceneSample('young-man',style.slug),true);
  }
});
