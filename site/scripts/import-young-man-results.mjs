import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {styles, historicalStyles, combinedPrompt} from '../src/style-data.js';

const sha = value => createHash('sha256').update(value).digest('hex');
const frozenPath = new URL('../provenance/young-man-prompts-before-generation.json', import.meta.url);
const additionalFrozenPath = new URL('../provenance/young-man-relaxed-simplified-prompts-before-generation.json', import.meta.url);
const resultsPath = new URL('../provenance/young-man-generation-results.json', import.meta.url);

export function validateSubmission(item, entry, frozen, sourceBytes, forbiddenHashes = new Set()) {
  if (!entry || item.slug !== entry.slug) throw Error('Unknown style slug');
  if (item.benchmarkId !== frozen.benchmarkId || item.benchmarkVersion !== frozen.benchmarkVersion) throw Error(`${item.slug}: wrong scene/version`);
  if (item.submittedPrompt !== entry.generationPrompt || item.submittedPromptSha256 !== entry.generationPromptSha256 || sha(item.submittedPrompt) !== entry.generationPromptSha256) throw Error(`${item.slug}: actual submitted text differs from the frozen prompt`);
  if (item.tool !== 'image_gen' || !Array.isArray(item.references) || item.references.length) throw Error(`${item.slug}: expected reference-free parent ImageGen output`);
  if (!Number.isFinite(Date.parse(item.submittedAt)) || Date.parse(item.submittedAt) < Date.parse(frozen.frozenAt)) throw Error(`${item.slug}: generation must be submitted after prompt freeze`);
  if (item.sourceSha256 !== sha(sourceBytes)) throw Error(`${item.slug}: source checksum mismatch`);
  if (forbiddenHashes.has(item.sourceSha256) || item.sourceSha256 === frozen.historicalReference?.sourceSha256 || item.sourceSha256 === frozen.sourceVerification?.originalImageSha256) throw Error(`${item.slug}: cannot reuse a station, historical or another style's image`);
}

async function main() {
  if (!process.argv[2]) throw Error('Usage: node scripts/import-young-man-results.mjs /absolute/path/results.json');
  const promptSets = await Promise.all([frozenPath, additionalFrozenPath].map(async path => {
    const bytes = await readFile(path);
    const hash = (await readFile(new URL(path.href.replace(/\.json$/, '.sha256')), 'utf8')).split(/\s/)[0];
    if (sha(bytes) !== hash) throw Error('Frozen prompt manifest checksum changed');
    return {frozen:JSON.parse(bytes), frozenHash:hash, frozenManifestFile:basename(fileURLToPath(path))};
  }));
  const current = JSON.parse(await readFile(resultsPath, 'utf8'));
  const station = JSON.parse(await readFile(new URL('../benchmark-manifest.json', import.meta.url), 'utf8'));
  const incoming = JSON.parse(await readFile(resolve(process.argv[2]), 'utf8'));
  if (!Array.isArray(incoming.images) || !incoming.images.length) throw Error('Expected a nonempty images array');
  const forbidden = new Set([...station.images.flatMap(item=>[item.sourceSha256,item.imageSha256]),...current.images.flatMap(item=>[item.sourceSha256,item.imageSha256])]);
  const slugs = new Set(current.images.map(item=>item.slug));
  const prepared = [];
  for (const item of incoming.images) {
    if (slugs.has(item.slug)) throw Error(`${item.slug}: refusing to overwrite a recorded output`);
    const matches = promptSets.flatMap(set => set.frozen.entries.filter(entry => entry.slug === item.slug).map(entry => ({...set, entry})));
    if (matches.length !== 1) throw Error(`${item.slug}: expected exactly one approved frozen prompt`);
    const {entry, frozen, frozenHash, frozenManifestFile} = matches[0];
    const style = historicalStyles.find(style => style.slug === item.slug) || styles.find(style => style.slug === item.slug);
    if (!style || style.stylePrompt !== entry.stylePrompt || combinedPrompt(style, frozen.scene) !== entry.generationPrompt) throw Error(`${item.slug}: frozen style or scene differs from the catalog`);
    const sourceBytes = await readFile(resolve(item.sourcePath));
    validateSubmission(item, entry, frozen, sourceBytes, forbidden);
    const outputBytes = await sharp(sourceBytes).resize({width:960,withoutEnlargement:true,kernel:item.slug==='pixel-art'?sharp.kernel.nearest:sharp.kernel.lanczos3}).webp({quality:86,effort:6}).toBuffer();
    const dimensions = await sharp(outputBytes).metadata();
    const {sourcePath,...actual} = item;
    const record = {...actual,sourceFile:basename(sourcePath),imagePath:entry.expectedImagePath,imageSha256:sha(outputBytes),imageWidth:dimensions.width,imageHeight:dimensions.height,imageBytes:outputBytes.length,frozenManifestSha256:frozenHash,frozenManifestFile,conversion:{resizeWidth:960,kernel:item.slug==='pixel-art'?'nearest':'lanczos3',format:'webp',quality:86,crop:false,colorEdits:false},model:item.model||null,seed:item.seed??null};
    prepared.push({record,outputBytes});slugs.add(item.slug);forbidden.add(item.sourceSha256);
  }
  // Validate the whole incoming batch before writing. The frozen manifest is never changed.
  await mkdir(new URL('../public/images/young-man/', import.meta.url), {recursive:true});
  for (const {record,outputBytes} of prepared) await writeFile(new URL('../public'+record.imagePath, import.meta.url), outputBytes, {flag:'wx'});
  const next = {...current,images:[...current.images,...prepared.map(item=>item.record)]};
  const temporary = new URL('./young-man-generation-results.json.tmp', resultsPath);
  await writeFile(temporary, JSON.stringify(next,null,2)+'\n');await rename(temporary,resultsPath);
  console.log(JSON.stringify({imported:prepared.map(item=>item.record.slug),manifestUnchanged:true},null,2));
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error=>{console.error(error.message);process.exitCode=1});
