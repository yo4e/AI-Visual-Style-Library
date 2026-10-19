import {createHash} from 'node:crypto';
import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {resolve,basename} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
import {styles,combinedPrompt} from '../src/style-data.js';
import {youngManOriginalBenchmark} from '../src/young-man-original-scene.js';
import {validateSubmission} from './import-young-man-results.mjs';

const sha=value=>createHash('sha256').update(value).digest('hex');
const frozenName='young-man-original-brief-relaxed-simplified-prompts-before-generation.json';
const resultsPath=new URL('../provenance/young-man-original-brief-generation-results.json',import.meta.url);

async function main(){
  if(!process.argv[2])throw Error('Expected parent result JSON path');
  const frozenBytes=await readFile(new URL('../provenance/'+frozenName,import.meta.url));
  const frozenHash=(await readFile(new URL('../provenance/'+frozenName.replace('.json','.sha256'),import.meta.url),'utf8')).split(/\s/)[0];
  if(sha(frozenBytes)!==frozenHash)throw Error('Corrected frozen manifest checksum changed');
  const frozen=JSON.parse(frozenBytes);
  if(frozen.benchmarkId!==youngManOriginalBenchmark.id||frozen.benchmarkVersion!==youngManOriginalBenchmark.version||frozen.scene.characterPrompt!==youngManOriginalBenchmark.characterPrompt)throw Error('Wrong original-brief benchmark');
  const current=JSON.parse(await readFile(resultsPath));
  if(current.benchmarkId!==frozen.benchmarkId||current.benchmarkVersion!==frozen.benchmarkVersion)throw Error('Wrong result collection');
  const incoming=JSON.parse(await readFile(resolve(process.argv[2])));
  if(!Array.isArray(incoming.images)||incoming.images.length!==1)throw Error('Only the single approved corrected sample may be imported');
  const station=JSON.parse(await readFile(new URL('../benchmark-manifest.json',import.meta.url)));
  const legacy=JSON.parse(await readFile(new URL('../provenance/young-man-generation-results.json',import.meta.url)));
  const forbidden=new Set([...station.images,...legacy.images,...current.images].flatMap(r=>[r.sourceSha256,r.imageSha256]));
  const item=incoming.images[0],entry=frozen.entries.find(e=>e.slug===item.slug),style=styles.find(s=>s.slug===item.slug);
  if(current.images.some(r=>r.slug===item.slug))throw Error('Refusing to overwrite a recorded original-brief output');
  if(!entry||!style||style.stylePrompt!==entry.stylePrompt||combinedPrompt(style,youngManOriginalBenchmark)!==entry.generationPrompt)throw Error('Girl style or corrected scene differs from frozen text');
  const source=await readFile(resolve(item.sourcePath));
  validateSubmission(item,entry,frozen,source,forbidden);
  const sourceMeta=await sharp(source).metadata();
  if(sourceMeta.format!=='png')throw Error('Expected original PNG');
  const image=await sharp(source).resize({width:960,withoutEnlargement:true}).webp({quality:86,effort:6}).toBuffer(),m=await sharp(image).metadata();
  if(image.length>300000)throw Error('Image exceeds budget');
  const {sourcePath,...actual}=item;
  const record={...actual,sourceFile:basename(sourcePath),imagePath:entry.expectedImagePath,imageSha256:sha(image),imageBytes:image.length,imageWidth:m.width,imageHeight:m.height,frozenManifestFile:frozenName,frozenManifestSha256:frozenHash,conversion:{resizeWidth:960,kernel:'lanczos3',format:'webp',quality:86,crop:false,colorEdits:false},model:item.model||null,seed:item.seed??null};
  await mkdir(new URL('../public/images/young-man-original-brief/',import.meta.url),{recursive:true});
  await writeFile(new URL('../public'+entry.expectedImagePath,import.meta.url),image,{flag:'wx'});
  const temporary=new URL('../provenance/young-man-original-brief-generation-results.tmp',import.meta.url);
  await writeFile(temporary,JSON.stringify({...current,images:[...current.images,record]},null,2)+'\n');
  await rename(temporary,resultsPath);
  console.log(JSON.stringify({imported:item.slug,benchmarkId:frozen.benchmarkId,legacyResultsUnchanged:true,imageBytes:image.length},null,2));
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(error=>{console.error(error.message);process.exitCode=1});
