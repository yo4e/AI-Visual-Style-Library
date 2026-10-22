import {createContext, useContext, useEffect, useState} from 'react';
import {languageLabels} from "./locale-labels.js";
export {languageLabels};
const english = {
 'この見本について':'About this sample',
 '種類の見本を生成済み':'style samples generated',
 '生成用の場面':'Scene prepared for generation',
 '人物・場面・全身構図を詳しく指定した青年の見本です。絵柄は女の子版と同じです。':'This young-man sample uses detailed instructions for the person, setting and full-body composition. Its rendering prompt is identical to the girl version.',
 'この場面の見本は未生成です。現在の英語プロンプトを表示しています。':'This scene sample has not been generated. The current English prompts are shown here.',
 'この絵柄文の色制約には、駅の見本の物体名が例として残っています。自分の場面に合わせて内容を確認してください。生成時の文をそのまま表示しています。':'This style prompt retains station-object names as examples within its color constraints. Check those examples against your own scene. The original generation wording is preserved.',

 '見本の場面を選ぶ':'Choose the sample scene',
 '駅で地図を広げる女性':'Woman reading a map at the station',
 '夜明けの海辺でひまわりを持つ青年':'Young man with sunflowers by the sea at dawn',
 '青年の場面は、既存の水彩見本1枚を表示しています。':'This scene shows one existing watercolor sample of the young man.',
 '黄色いコートの青年が、夜明けの海辺のバス停でひまわりを持つ場面':'A young man in a yellow coat holds sunflowers at a seaside bus stop at dawn',
 '青年の場面の見本':'Young man scene sample',
 '黄色いコートの青年が、夜明けの海辺のバス停でひまわりを持つ水彩画':'Watercolor of a young man in a yellow coat holding sunflowers at a seaside bus stop at dawn',
 '既存の水彩見本 · 1枚。ほかの絵柄の見本は未生成です。':'One existing watercolor sample. Other styles have not been generated for this scene.',

 'このサイトを応援':'Support this site',
 '開発者にコーヒーをおごってください':'If you found this useful, buy me a coffee.',
 'コーヒーで応援':'Buy me a coffee',
 'ベンチマーク':'Benchmark',
 '画像生成モデル':'Image generation model',
 '絵柄ガイド':'STYLE FIELD GUIDE',
 '画像生成準備中':'Sample image pending',
 '説明とプロンプトは利用できます':'Description and prompt are available',
 '詳しく見る':'Explore style',
 '選択済み':'Added',
 '比較':'Compare',
 '絵柄と場面を、別々に。':'Separate the style and scene.',
 '絵柄だけ、見本の場面だけ、または両方をコピーできます。指示は英語です。コピーして自分の画像生成AIで使ってください。':'Copy the style, sample scene, or both. Instructions are in English. Use them in your own image generator.',
 '絵柄・タッチのプロンプト':'Style prompt',
 '絵柄プロンプトをコピーしました':'Style prompt copied',
 '絵柄をコピー':'Copy style prompt',
 '人物・場面・構図のプロンプト':'Subject, scene & composition prompt',
 '場面をコピーしました':'Scene prompt copied',
 '場面をコピー':'Copy scene prompt',
 '合成プロンプトをコピーしました':'Combined prompt copied',
 '絵柄と場面を両方コピー':'Copy style and scene',
 '絵柄のキーワード':'Prompt vocabulary',
 'キーワードをコピーしました':'Vocabulary copied',
 'キーワードをコピー':'Copy terms',
 '注意点':'Watch for',
 '比較に追加済み':'Added to compare',
 '比較に追加':'Add to compare',
 '一覧へ戻る':'Back to styles',
 '見本は表示した2つの英語プロンプトで生成しています。':'This sample was generated using the two English prompts shown above.',
 '絵柄を比較':'Compare visual styles',
 '同じ場面で絵柄を比較':'CONTROLLED COMPARISON',
 '線・塗り・質感を見比べる。':'Compare lines, shading, and texture.',
 '同じ人物と場面を、異なる描き方で。':'One subject and scene, different rendering techniques.',
 '比較を閉じる':'Close comparison',
 '詳細を閉じる':'Close details',
 '同じ場面から生成した見本です。顔や構図の完全一致は保証されず、モデルや生成ごとに変わります。':'These samples were generated from the same scene. Identity and composition can vary across models and runs.',
 '比較は一度に4種類までです':'Compare up to four styles at a time',
 'コピーできませんでした。もう一度お試しください。':'Could not copy. Please try again.',
 '絵柄一覧へ':'Skip to styles',
 '画像生成の絵柄とプロンプト':'A FIELD GUIDE TO VISUAL LANGUAGES',
 '絵柄一覧':'Explore',
 '使い方':'Field Guide',
 'このサイト':'About',
 '比較する絵柄を2種類以上選んでください':'Choose at least two styles to compare',
 '絵柄を探す':'Explore styles',
 '作りたい画像に、合う絵柄を。':'Find the look for your image.',
 'アニメ、イラスト、版画、絵画、写真表現など77種類。線・塗り・質感や、描き込みの密度から選べます。':'Explore 77 styles across anime, illustration, printmaking, painting, and photography. Choose by lines, shading, texture, or detail density.',
 '名前・特徴で絵柄を検索':'Search styles by name or visual quality',
 '例：フラット、純文学、抜け感':'Try flat, literary, or breathing room',
 '検索':'Search',
 '同じ場面で比較':'A SHARED SUBJECT',
 '同じ人物と駅の場面を、異なる絵柄で描いた見本です。絵柄の指示をコピーして、好きな被写体に使えます。':'Each sample renders the same person and station scene in a different style. Copy the style instructions to use with your own subject.',
 '赤いコートの女性が駅で地図を広げる場面':'A woman in a red coat studies a map on a train platform.',
 '絵柄を絞り込む':'FILTER STYLES',
 'キーワード':'Visual qualities',
 '種類':'styles',
 '絵柄の並び順':'Sort styles',
 'おすすめ順':'Recommended',
 '名前順':'Name A–Z',
 '名前の逆順':'Name Z–A',
 '見た目の特徴から探す':'Start with a visible quality',
 '絵柄の名前を知らなくても、特徴や用途から選べます。':'Choose a quality or use case even if you do not know the technique name.',
 '絞り込み：':'Filtered by:',
 '・選択した条件':' and selected filters',
 '選択した条件':'selected filters',
 '条件をリセット':'Clear all',
 '該当する絵柄がありません':'No styles found',
 '別の言葉や用途を試すか、条件をリセットしてください。':'Try another quality or use case, or clear the filters.',
 'すべての絵柄を表示':'Show all styles',
 'プロンプトの使い方':'HOW TO USE THE PROMPTS',
 '選んで、コピーして、生成する。':'Choose, copy, and generate.',
 '気になる絵柄を開き、絵柄だけ・見本の場面だけ・両方からコピーする内容を選びます。自分の画像生成AIに貼り付け、人物・場面・構図を自由に書き換えて使ってください。このサイトでは画像を生成しません。':'Open a style and copy the style prompt, sample scene, or both. Paste into your own image generator and adapt the subject, scene, and composition. This site does not generate images.',
 '画像生成に使える絵柄と英語プロンプトのライブラリ。画像はAI生成の見本です。作家名に頼らず、線・塗り・質感で指定しています。':'A library of visual styles and English image-generation prompts. Samples are AI-generated interpretations. Prompts describe lines, shading, and texture rather than relying on artist names.',
 '絵柄ライブラリ ·':'Style library ·',
 '比較に選んだ絵柄':'Selected styles for comparison',
 '選択中':'selected',
 'あと1種類選択':'Choose one more style',
 '比較できます':'Ready to compare',
 '選んだ絵柄を比較':'Compare styles',
 '言語':'Language',
 '前の絵柄':'Previous style',
 '次の絵柄':'Next style',
 '詳細':'style details',
 'を詳しく見る':'Explore',
 '比較から削除':'Remove from comparison',
 '比較へ追加':'Add to comparison',
 '比較をクリア':'Clear comparison',
 '検索欄に移動':'Focus style search',
 '絵柄の特徴':'Visual characteristics',
 'コピーできる画像プロンプト':'Copyable image prompts',
 'メインナビゲーション':'Primary navigation',
 '共通の見本について':'About the shared sample',
 '描き込みの密度':'Detail density',
 '用途・系統':'Use case',
 'フラット':'flat', 'ラノベ':'light novel', '純文学':'literary', '線画':'line drawing', '版画':'print',
};
const LanguageContext = createContext(null);
export function initialLanguage() {
 const query = new URLSearchParams(window.location.search).get('lang');
 if (query === 'en' || query === 'ja') return query;
 try { const stored=localStorage.getItem('visual-style-language'); if(stored==='en'||stored==='ja')return stored; }catch{}
 return navigator.language?.toLowerCase().startsWith('ja') ? 'ja' : 'en';
}
export function LanguageProvider({children}) {
 const [locale,setLocale]=useState(initialLanguage);
 useEffect(()=>{
  document.documentElement.lang=locale;
  document.title='AI Visual Style Library';
  const description=locale==='ja'?'水彩・漫画・写真など77種類の絵柄を見本で比較。絵柄と人物・場面・構図の英語プロンプトを別々にコピーして、自分の画像生成AIで使えます。説明は日本語・英語に対応。':'Compare 77 image-generation styles, from watercolor to manga and photography. Copy English style and scene prompts, with English and Japanese descriptions.';
  document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').forEach(meta=>{meta.content=description});
  try{localStorage.setItem('visual-style-language',locale)}catch{}
 },[locale]);
 function changeLanguage(next){setLocale(next);const url=new URL(window.location.href);if(url.searchParams.has('lang')){url.searchParams.set('lang',next);window.history.replaceState({},'',url.pathname+url.search+url.hash)}}
 const t=source=>locale==='en'?(english[source]??source):source;
 return <LanguageContext.Provider value={{locale,setLocale:changeLanguage,t}}>{children}</LanguageContext.Provider>;
}
export function useLanguage(){return useContext(LanguageContext)}
export function LanguageToggle(){
 const {locale,setLocale,t}=useLanguage();
 return <div className="language-toggle" role="group" aria-label={t('言語')}><button type="button" lang="en" aria-pressed={locale==='en'} onClick={()=>setLocale('en')}>EN</button><button type="button" lang="ja" aria-pressed={locale==='ja'} onClick={()=>setLocale('ja')}>日本語</button></div>;
}
