import {createContext, useContext, useEffect, useState} from 'react';
import {languageLabels} from "./locale-labels.js";
export {languageLabels};
const english = {
 '画像生成準備中':'Sample image pending',
 '説明とプロンプトは利用できます':'Description and prompt are available',
 '自分の場面と合成':'Combine with your scene',
 '自分の人物・場面と合成':'Add your own subject and scene',
 '人物・場面（この端末に保存）':'Subject and scene (saved on this device)',
 '例：帰省した主人公が、誰もいない実家の台所で古い手紙を読む。':'Example: A returning traveler reads an old letter in the empty kitchen of their childhood home.',
 '表紙用：縦長2:3・上部25％に文字用の余白':'Cover layout: portrait 2:3 with title space in the upper 25%',
 '自分の場面と合成してコピー':'Copy with your scene',
 '自分の場面と合成してコピーしました':'Your combined prompt was copied',
 '詳しく見る':'Explore style',
 '選択済み':'Added',
 '比較':'Compare',
 '絵柄を、自分の物語へ。':'A style for your own story.',
 'コピーする指示は常に英語です。自分の人物・場面は入力した言語のまま合成できます。':'Copy the style on its own or combine it with your subject and scene. Prompts are always copied in English; your own text is kept as entered.',
 '絵柄 · 被写体を自由に':'VISUAL STYLE · USE WITH ANY SUBJECT',
 '絵柄プロンプトをコピーしました':'Style prompt copied',
 '絵柄をコピー':'Copy style prompt',
 '見本の人物・場面を使う（任意）':'Use the sample subject and scene (optional)',
 '比較用の人物・場面':'SAMPLE SUBJECT AND SCENE',
 '場面をコピーしました':'Scene prompt copied',
 '場面をコピー':'Copy scene prompt',
 '合成プロンプトをコピーしました':'Combined prompt copied',
 '見本の場面と合成してコピー':'Copy with the sample scene',
 '絵柄のキーワード':'Prompt vocabulary',
 'キーワードをコピーしました':'Vocabulary copied',
 'キーワードをコピー':'Copy terms',
 '注意点':'Watch for',
 '比較に追加済み':'Added to compare',
 '比較に追加':'Add to compare',
 '一覧へ戻る':'Back to styles',
 '生成時の原文は記録済み。コピーするプロンプトは英語版です。':'Original generation instructions are recorded. Copy-ready prompts are English versions.',
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
 '物語のための絵柄とプロンプト':'A FIELD GUIDE TO VISUAL LANGUAGES',
 '絵柄一覧':'Explore',
 '使い方':'Field Guide',
 'このサイト':'About',
 '比較する絵柄を2種類以上選んでください':'Choose at least two styles to compare',
 '絵柄を探す':'Explore styles',
 'あなたの物語に、合う絵柄を。':'Find the look for your story.',
 'フラットなアニメからラノベ、静かな純文学まで。抜け感と描き込みの密度から選べる36種類。':'36 styles for anime, light novels, and literary fiction. Choose intentional breathing room or richer detail.',
 '名前・特徴で絵柄を検索':'Search styles by name or visual quality',
 '例：フラット、純文学、抜け感':'Try flat, literary, or breathing room',
 '検索':'Search',
 '同じ場面で比較':'A SHARED SUBJECT',
 '同じ人物と駅の場面を描き分けています。被写体は自分の物語に置き換えられます。':'Each sample interprets the same person and station scene. Replace the subject with one from your own story.',
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
 '装丁での使い方':'MAKE IT YOUR OWN',
 '描くところと、抜くところ。':'Decide what to draw—and what to leave open.',
 '気になる絵柄を開き、自分の人物・場面を入力して合成。表紙用の余白を指定できます。タイトルや著者名は生成後に組版してください。抜け感は低品質ではなく、焦点以外を意図的に省く設計です。':'Open a style and combine it with your own subject and scene. Add title space for a cover, then typeset the title and author afterward. Breathing room means selective detail, not reduced quality.',
 '物語や装丁のための絵柄ライブラリ。画像はAI生成の見本です。作家名に頼らず、線・塗り・質感で指定しています。':'A visual vocabulary for stories and covers. Samples are AI-generated interpretations. Prompts describe lines, shading, and texture rather than relying on artist names.',
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
  document.title=locale==='ja'?'物語の絵柄を探す | AI Visual Style Library':'Find Your Visual Style | AI Visual Style Library';
  const description=document.querySelector('meta[name="description"]');
  if(description)description.content=locale==='ja'?'物語や装丁に使える36種類の絵柄。コピー用プロンプトは英語、説明は日本語と英語で切替。':'Explore 36 visual styles for stories and book covers. Compare samples and copy English prompts, with English and Japanese descriptions.';
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
