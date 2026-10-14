import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile,access} from 'node:fs/promises';
import {getStyles,benchmark} from '../src/style-data.js';
const output=new URL('../dist/client/',import.meta.url);
const read=p=>readFile(new URL(p,output),'utf8');
const decode=s=>s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
test('all 150 details have complete localized initial HTML, exact English copy and reciprocal language URLs',async()=>{
 const titles=new Set();
 for(const locale of ['ja','en'])for(const s of getStyles(locale)){
  const html=await read(`${locale}/styles/${s.slug}/index.html`);
  assert.match(html,new RegExp(`<html lang="${locale}">`));
  assert.ok(decode(html).includes(s.definition));
  assert.ok(decode(html).includes(s.watchFor));
  assert.ok(decode(html).includes(s.stylePrompt));
  assert.ok(decode(html).includes(benchmark.characterPrompt));
  for(const text of Object.values(s.characteristics))assert.ok(decode(html).includes(text));
  assert.ok(html.includes(`rel="canonical" href="https://avsl.4roz.com/${locale}/styles/${s.slug}/"`));
  for(const l of ['ja','en','x-default'])assert.ok(html.includes(`hreflang="${l}" href="https://avsl.4roz.com/${l==='x-default'?'en':l}/styles/${s.slug}/"`));
  const title=html.match(/<title>(.*?)<\/title>/)[1];assert.ok(!titles.has(title));titles.add(title);
  assert.doesNotMatch(html,/<script/);assert.ok(html.includes(s.image));
  assert.ok(html.includes(`href="/?lang=${locale}"`), 'brand link preserves locale');
  const appLinks=[...html.matchAll(/href="(\/\?[^"]+)"/g)].map(m=>new URL(decode(m[1]),'https://avsl.4roz.com'));
  for(const url of appLinks){assert.equal(url.pathname,'/');assert.equal(url.searchParams.get('lang'),locale);const slug=url.searchParams.get('style');if(slug)assert.equal(slug,s.slug)}
 }
 assert.equal(titles.size,150);
});
test('all internal links and images resolve to generated files or the existing query app',async()=>{
 for(const locale of ['ja','en']){
  const styles=getStyles(locale),index=await read(`${locale}/styles/index.html`);
  for(const s of styles){assert.ok(index.includes(`href="/${locale}/styles/${s.slug}/"`));
   const html=await read(`${locale}/styles/${s.slug}/index.html`);
   for(const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)){
    const p=match[1];await access(new URL(p.slice(1)+(p.endsWith('/')?'index.html':''),output));
   }
  }
 }
});
test('404 output is noindex and does not become a sitemap URL',async()=>{
 assert.match(await read('404.html'),/name="robots" content="noindex"/);
 assert.doesNotMatch(await read('sitemap.xml'),/404\.html/);
});
