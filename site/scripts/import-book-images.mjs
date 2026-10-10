import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import {bookStyles} from '../src/book-styles.js';
import {combinedPrompt} from '../src/style-data.js';
const sources=JSON.parse(await readFile(process.argv[2],'utf8'));
const manifestPath=new URL('../benchmark-manifest.json',import.meta.url);
const manifest=JSON.parse(await readFile(manifestPath,'utf8'));
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const original=manifest.images.filter(e=>!bookStyles.some(s=>s.slug===e.slug));
const additions=[];
for(const style of bookStyles){
 if(!sources[style.slug])throw new Error('Missing generated source for '+style.slug);
 const source=await readFile(sources[style.slug]);let image,quality;
 for(const q of [86,82,78,74,70]){const candidate=await sharp(source).resize({width:960}).webp({quality:q,effort:6}).toBuffer();if(candidate.length<=300000){image=candidate;quality=q;break;}}
 if(!image)throw new Error('Image exceeds budget: '+style.slug);
 await writeFile(new URL('../public'+style.image,import.meta.url),image);
 const meta=await sharp(image).metadata();const prompt=combinedPrompt(style);
 additions.push({slug:style.slug,imagePath:style.image,sourceFile:path.basename(sources[style.slug]),sourceSha256:hash(source),imageSha256:hash(image),imageWidth:meta.width,imageHeight:meta.height,imageBytes:image.length,webpQuality:quality,generatedOn:new Date().toISOString().slice(0,10),tool:'Codex ImageGen (built-in)',submittedPrompt:prompt,submittedPromptSha256:hash(prompt)});
 console.log(style.slug+': '+meta.width+'x'+meta.height+', '+image.length+' bytes');
 style.imageStatus='ready';
}
manifest.images=[...original,...additions];
await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
await writeFile(new URL('../src/book-styles.js',import.meta.url),'export const bookStyles = '+JSON.stringify(bookStyles,null,2)+';\n');
