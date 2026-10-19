import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { combinedPrompt, styles } from '../src/style-data.js';
import { youngManBenchmark } from '../src/young-man-scene.js';

const sha = value => createHash('sha256').update(value).digest('hex');
const frozenPath = new URL('../provenance/young-man-prompts-before-generation.json', import.meta.url);
const outputDir = new URL('../../../evidence/phase2/prompts/', import.meta.url);
const pilotSlugs = styles.slice(0, 6).map(style => style.slug);
const entries = styles.map((style, index) => ({
  order: index + 1,
  slug: style.slug,
  name: style.name,
  phase: index < 6 ? 'pilot-first-six' : 'remaining-not-requested-for-generation',
  stylePrompt: style.stylePrompt,
  stylePromptSha256: sha(style.stylePrompt),
  scenePrompt: youngManBenchmark.characterPrompt,
  scenePromptSha256: sha(youngManBenchmark.characterPrompt),
  generationPrompt: combinedPrompt(style, youngManBenchmark),
  generationPromptSha256: sha(combinedPrompt(style, youngManBenchmark)),
  statusAtFreeze: 'not-sent',
  expectedImagePath: `/images/young-man/${style.slug}.webp`,
  compatibilityNotes: [
    ...(/\b(?:woman|map|train|commuters)\b/i.test(style.stylePrompt) ? ['Existing style text contains station-specific subject/object instructions. Preserved verbatim; review before any later generation. Do not silently adapt.'] : []),
    ...(style.slug === 'risograph' || style.slug === 'ink-wash' ? ['The unchanged style palette can override the yellow coat/sunflowers. Do not add yellow or modify the style prompt.'] : []),
  ],
}));
const manifest = {
  schemaVersion: 1,
  frozenAt: new Date().toISOString(),
  baseCommit: '3f5e417d5e52a5841d9633495a475f223c957429',
  benchmarkId: youngManBenchmark.id,
  benchmarkVersion: youngManBenchmark.version,
  scene: youngManBenchmark,
  scenePromptSha256: sha(youngManBenchmark.characterPrompt),
  pilotSlugs,
  references: [],
  generationContract: 'Send entries[].generationPrompt exactly as UTF-8, with no image references and no added text, prefixes, suffixes, palette overrides, or revised style instructions. Record the actual call text and its hash with each output. This file is a pre-generation plan, not proof of generation. Never rewrite it to fit a generated image; use a new scene/manifest version for any future prompt revision.',
  historicalReference: { libraryFileId: 'libfile_c31d0e4f304881919b495428212c873f', sourceSha256: '9d6e0c44ecca9bf76cb4da233ad61ecb061b2cc3df5d7149141b771510e09c02', usage: 'Scene-selector thumbnail only. Historical shorter dawn brief, not a generated result for this controlled scene version.' },
  entries,
};
// Never overwrite a previously frozen prompt artifact.
await writeFile(frozenPath, JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx' });
const bytes = await readFile(frozenPath);
await writeFile(new URL('../provenance/young-man-prompts-before-generation.sha256', import.meta.url), `${sha(bytes)}  young-man-prompts-before-generation.json\n`, { flag: 'wx' });
await mkdir(outputDir, { recursive: true });
for (const entry of entries.slice(0, 6)) {
  // No trailing newline: these file bytes are exactly the tool's prompt value.
  await writeFile(new URL(entry.slug + '.txt', outputDir), entry.generationPrompt, { flag: 'wx' });
}
const pilot = { benchmarkId: manifest.benchmarkId, benchmarkVersion: manifest.benchmarkVersion, frozenAt: manifest.frozenAt, manifestSha256: sha(bytes), generationContract: manifest.generationContract, entries: entries.slice(0, 6) };
await writeFile(new URL('young-man-first-six-prompts.json', outputDir), JSON.stringify(pilot, null, 2) + '\n', { flag: 'wx' });
const remaining = entries.slice(6).map(({order,slug,name,compatibilityNotes}) => [order,slug,name,compatibilityNotes.join(' ')].map(value=>'"'+String(value).replaceAll('"','""')+'"').join(','));
await writeFile(new URL('young-man-remaining-69.csv', outputDir), 'order,slug,name,compatibility_notes\n' + remaining.join('\n') + '\n', { flag: 'wx' });
console.log(JSON.stringify({ manifest: fileURLToPath(frozenPath), manifestSha256:sha(bytes),pilotSlugs, count:entries.length, sceneSpecificStyles:entries.filter(entry=>entry.compatibilityNotes.some(note=>note.includes('station-specific'))).map(entry=>entry.slug) },null,2));
