import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowsDownUp, BookOpen, CaretDown, Check, Copy, MagnifyingGlass, Plus, SlidersHorizontal, X } from "@phosphor-icons/react";
import { benchmark, combinedPrompt, composePrompt, filterDefinitions, findStyles, quickTraits, styles, getStyles } from "./style-data";
import { LanguageToggle, useLanguage, languageLabels } from "./i18n.jsx";
const knownSlugs = new Set(styles.map(style => style.slug));
const initialParams = new URLSearchParams(window.location.search);
const initialCompare = (initialParams.get("compare") || "").split(",").filter(slug => knownSlugs.has(slug)).slice(0, 4);
const initialDetail = knownSlugs.has(initialParams.get("style")) ? initialParams.get("style") : null;
function syncUrl({
  detail,
  compare
}) {
  const url = new URL(window.location.href);
  if (detail) url.searchParams.set("style", detail);else url.searchParams.delete("style");
  if (compare?.length >= 2) url.searchParams.set("compare", compare.join(","));else url.searchParams.delete("compare");
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}
function StyleImage({
  style,
  ...props
}) {
  const {
    locale,
    t
  } = useLanguage();
  if (style.imageStatus === 'pending') return <div className="sample-pending" role="img" aria-label={`${style.name}: ${t("画像生成準備中")}`}><span>{t("画像生成準備中")}</span><small>{t("説明とプロンプトは利用できます")}</small></div>;
  return <img src={style.image} {...props} />;
}
function PromptComposer({
  style,
  onCopy
}) {
  const {
    locale,
    t
  } = useLanguage();
  const [subject, setSubject] = useState(() => {
    try {
      return localStorage.getItem('noveljam-subject') || '';
    } catch {
      return '';
    }
  });
  const [cover, setCover] = useState(true);
  function update(value) {
    setSubject(value);
    try {
      localStorage.setItem('noveljam-subject', value);
    } catch {}
  }
  return <section className="subject-composer" aria-label={t("自分の場面と合成")}><h3>{t("自分の人物・場面と合成")}</h3><label htmlFor="own-subject">{t("人物・場面（この端末に保存）")}</label><textarea id="own-subject" rows={4} value={subject} onChange={e => update(e.target.value)} placeholder={t("例：帰省した主人公が、誰もいない実家の台所で古い手紙を読む。")} /><label className="cover-toggle"><input type="checkbox" checked={cover} onChange={e => setCover(e.target.checked)} />{t("表紙用：縦長2:3・上部25％に文字用の余白")}</label><button className="primary-button" type="button" disabled={!subject.trim()} onClick={() => onCopy(composePrompt(style, subject, cover), "自分の場面と合成してコピーしました")}><Copy size={16} />{t("自分の場面と合成してコピー")}</button></section>;
}
function FilterSelect({
  definition,
  value,
  onChange
}) {
  const {
    locale,
    t
  } = useLanguage();
  return <label className="filter-select">
      <span className="sr-only">{t(definition.label)}</span>
      <select value={value || ""} onChange={event => onChange(definition.key, event.target.value)}>
        <option value="">{t(definition.label)}</option>
        {definition.values.map(option => <option key={option} value={option}>{languageLabels[locale][definition.key][option]}</option>)}
      </select>
      <CaretDown size={14} weight="bold" aria-hidden="true" />
    </label>;
}
function StyleCard({
  style,
  selected,
  onOpen,
  onCompare,
  eager
}) {
  const {
    locale,
    t
  } = useLanguage();
  return <article className="style-card">
      <button className="style-image-button" type="button" onClick={() => onOpen(style.slug)} aria-label={`${t("詳しく見る")}: ${style.name}`}>
        <StyleImage style={style} alt={locale === "ja" ? `${style.name}で描いた、赤いコートの女性が駅で地図を見る場面` : `${style.name} interpretation of ${benchmark.alt}`} loading={eager ? "eager" : "lazy"} />
        <span className="image-open-label">{t("詳しく見る")}<ArrowRight size={16} aria-hidden="true" /></span>
      </button>
      <div className="card-heading-row">
        <button className="card-title" type="button" onClick={() => onOpen(style.slug)}>{style.name}</button>
        <button className={`card-compare ${selected ? "is-selected" : ""}`} type="button" aria-pressed={selected} onClick={() => onCompare(style.slug)} aria-label={`${selected ? t("比較から削除") : t("比較へ追加")}: ${style.name}`}>
          {selected ? <Check size={16} weight="bold" aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
          <span>{selected ? t("選択済み") : t("比較")}</span>
        </button>
      </div>
      <p className="card-short">{style.short}</p><div className="style-tags"><span>{style.familyLabel}</span><span>{style.densityLabel}</span></div>
    </article>;
}
function ModalFrame({
  children,
  label,
  onClose,
  wide = false
}) {
  const panelRef = useRef(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const panel = panelRef.current;
    panel?.querySelector('button[data-modal-close]')?.focus();
    function keepFocusInside(event) {
      if (event.key !== "Tab" || !panel) return;
      const focusable = [...panel.querySelectorAll('button:not(:disabled), a[href], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])')].filter(element => element.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", keepFocusInside);
    return () => {
      document.removeEventListener("keydown", keepFocusInside);
      previouslyFocused?.focus?.();
    };
  }, []);
  return <div className="modal-backdrop" role="presentation" onMouseDown={event => {
    if (event.target === event.currentTarget) onClose();
  }}>
      <section ref={panelRef} className={`modal-panel ${wide ? "modal-wide" : ""}`} role="dialog" aria-modal="true" aria-label={label}>
        {children}
      </section>
    </div>;
}
function DetailModal({
  style,
  onClose,
  onCompare,
  isCompared,
  onCopy,
  onNavigate
}) {
  const {
    locale,
    t
  } = useLanguage();
  const library = getStyles(locale);
  const index = library.findIndex(item => item.slug === style.slug);
  const previous = library[(index - 1 + library.length) % library.length];
  const next = library[(index + 1) % library.length];
  return <ModalFrame label={`${style.name}: ${t("詳細")}`} onClose={onClose} wide>
      <div className="detail-layout">
        <div className="detail-visual">
          <StyleImage style={style} alt={locale === "ja" ? `${style.name}で描いた駅の比較用見本` : `${style.name} benchmark example at a train platform`} />
          <div className="detail-image-foot">
            <span>BENCHMARK / {benchmark.id.toUpperCase()}</span>
            <div className="detail-steps">
              <button type="button" onClick={() => onNavigate(previous.slug)} aria-label={`${t("前の絵柄")}: ${previous.name}`}><ArrowLeft size={20} /></button>
              <span>{String(index + 1).padStart(2, "0")} / {String(styles.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => onNavigate(next.slug)} aria-label={`${t("次の絵柄")}: ${next.name}`}><ArrowRight size={20} /></button>
            </div>
          </div>
        </div>
        <div className="detail-copy">
          <div className="modal-topline"><LanguageToggle /><span>STYLE FIELD GUIDE / {style.familyLabel.toUpperCase()}</span><button type="button" onClick={onClose} data-modal-close aria-label={t("詳細を閉じる")}><X size={22} /></button></div>
          <h2>{style.name}</h2>
          <p className="detail-definition">{style.definition}</p>
          <section className="prompt-recipes" aria-label={t("コピーできる画像プロンプト")}>
            <h3>{t("絵柄を、自分の物語へ。")}</h3>
            <p className="prompt-intro">{t("コピーする指示は常に英語です。自分の人物・場面は入力した言語のまま合成できます。")}</p>
            <div className="prompt-recipe prompt-recipe--style">
              <div className="prompt-recipe-head"><span>{t("絵柄 · 被写体を自由に")}</span><button type="button" onClick={() => onCopy(style.stylePrompt, "絵柄プロンプトをコピーしました")}><Copy size={16} />{t("絵柄をコピー")}</button></div>
              <p lang="en">{style.stylePrompt}</p>
            </div>
            <PromptComposer style={style} onCopy={onCopy} /><p className="cover-advice">{style.coverAdvice}</p>
            <details className="benchmark-recipe"><summary>{t("見本の人物・場面を使う（任意）")}</summary><div className="prompt-recipe">
              <div className="prompt-recipe-head"><span>{t("比較用の人物・場面")}</span><button type="button" onClick={() => onCopy(benchmark.characterPrompt, "場面をコピーしました")}><Copy size={16} />{t("場面をコピー")}</button></div>
              <p lang="en">{benchmark.characterPrompt}</p>
            </div>
            <button className="combined-copy" type="button" onClick={() => onCopy(combinedPrompt(style), "合成プロンプトをコピーしました")}><Copy size={17} />{t("見本の場面と合成してコピー")}</button></details>
          </section>
          <div className="trait-list" aria-label={t("絵柄の特徴")}>
            {Object.entries(style.characteristics).map(([label, value]) => <div className="trait-row" key={label}><span>{label}</span><p>{value}</p></div>)}
          </div>
          <div className="vocab-heading"><h3>{t("絵柄のキーワード")}</h3><button type="button" onClick={() => onCopy(style.vocabulary.join(", "), "キーワードをコピーしました")}><Copy size={17} />{t("キーワードをコピー")}</button></div>
          <div className="vocab-chips">{style.vocabularyLabels.map(term => <span key={term}>{term}</span>)}</div>
          <p className="watch-for"><strong>{t("注意点")}</strong> {style.watchFor}</p>
          <div className="detail-actions">
            <button className="primary-button" type="button" onClick={() => onCompare(style.slug)}>{isCompared ? <Check size={18} /> : <Plus size={18} />}{isCompared ? t("比較に追加済み") : t("比較に追加")}</button>
            <button className="text-button" type="button" onClick={onClose}>{t("一覧へ戻る")}<ArrowRight size={17} /></button>
          </div>
          <p className="provenance">{t("生成時の原文は記録済み。コピーするプロンプトは英語版です。")}</p>
        </div>
      </div>
    </ModalFrame>;
}
function CompareModal({
  selected,
  onClose,
  onRemove,
  onCopy
}) {
  const {
    locale,
    t
  } = useLanguage();
  return <ModalFrame label={t("絵柄を比較")} onClose={onClose} wide>
      <div className="compare-modal">
        <div className="compare-modal-header">
          <div><span className="eyebrow">{t("同じ場面で絵柄を比較")}</span><h2>{t("線・塗り・質感を見比べる。")}</h2><p>{t("同じ人物と場面を、異なる描き方で。")}</p></div>
          <LanguageToggle /><button className="modal-close" type="button" onClick={onClose} data-modal-close aria-label={t("比較を閉じる")}><X size={22} /></button>
        </div>
        <div className={`compare-columns count-${selected.length}`}>
          {selected.map(style => <article className="compare-column" key={style.slug}>
            <StyleImage style={style} alt={locale === "ja" ? `${style.name}で描いた共通場面の見本` : `${style.name} interpretation of the shared benchmark subject`} />
            <div className="compare-column-title"><h3>{style.name}</h3><button type="button" onClick={() => onRemove(style.slug)} aria-label={`${t("比較から削除")}: ${style.name}`}><X size={17} /></button></div>
            <p>{style.definition}</p>
            <dl>{Object.entries(style.characteristics).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <button className="copy-vocab" type="button" onClick={() => onCopy(style.stylePrompt, "絵柄プロンプトをコピーしました")}><Copy size={18} />{t("絵柄をコピー")}</button>
          </article>)}
        </div>
        <p className="comparison-note">{t("同じ場面から生成した見本です。顔や構図の完全一致は保証されず、モデルや生成ごとに変わります。")}</p>
      </div>
    </ModalFrame>;
}
export function App() {
  const {
    locale,
    t
  } = useLanguage();
  const searchRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("relevant");
  const [moreOpen, setMoreOpen] = useState(false);
  const [compareIds, setCompareIds] = useState(initialCompare);
  const [detailSlug, setDetailSlug] = useState(initialDetail);
  const [compareOpen, setCompareOpen] = useState(initialCompare.length >= 2);
  const [toast, setToast] = useState("");
  const library = useMemo(() => getStyles(locale), [locale]);
  const results = useMemo(() => findStyles({
    query: submittedQuery,
    filters,
    sort,
    locale
  }), [submittedQuery, filters, sort, locale]);
  const selected = compareIds.map(slug => library.find(style => style.slug === slug)).filter(Boolean);
  const detail = library.find(style => style.slug === detailSlug);
  const activeFilters = Object.values(filters).filter(Boolean).length + (submittedQuery ? 1 : 0);
  useEffect(() => {
    syncUrl({
      detail: detailSlug,
      compare: compareOpen ? compareIds : []
    });
  }, [detailSlug, compareOpen, compareIds]);
  useEffect(() => {
    if (!detail && !compareOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = event => {
      if (event.key === "Escape") {
        setDetailSlug(null);
        setCompareOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [detail, compareOpen]);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);
  function submitSearch(event) {
    event.preventDefault();
    setSubmittedQuery(searchText.trim());
    document.getElementById("results")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
  function changeFilter(key, value) {
    setFilters(current => ({
      ...current,
      [key]: value
    }));
  }
  function resetSearch() {
    setSearchText("");
    setSubmittedQuery("");
    setFilters({});
    setSort("relevant");
  }
  function selectTrait(trait) {
    const next = submittedQuery === trait ? "" : trait;
    setSearchText(next);
    setSubmittedQuery(next);
  }
  function toggleCompare(slug) {
    setCompareIds(current => {
      if (current.includes(slug)) return current.filter(item => item !== slug);
      if (current.length >= 4) {
        setToast("比較は一度に4種類までです");
        return current;
      }
      return [...current, slug];
    });
  }
  async function copyText(value, successText) {
    try {
      await navigator.clipboard.writeText(value);
      setToast(successText);
    } catch {
      setToast("コピーできませんでした。もう一度お試しください。");
    }
  }
  return <>
      <a className="skip-link" href="#explore">{t("絵柄一覧へ")}</a>
      <header className="site-header"><div className="header-inner">
        <a className="brand" href="/" aria-label="AI Visual Style Library home"><BookOpen size={42} weight="light" aria-hidden="true" /><span><strong>AI Visual Style Library</strong><small>{t("物語のための絵柄とプロンプト")}</small></span></a>
        <nav className="primary-nav" aria-label={t("メインナビゲーション")}><a className="is-active" href="#explore">{t("絵柄一覧")}</a><a href="#field-guide">{t("使い方")}</a><a href="#about">{t("このサイト")}</a></nav>
        <div className="header-actions"><LanguageToggle /><button className="header-search" type="button" onClick={() => {
            searchRef.current?.focus();
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }} aria-label={t("検索欄に移動")}><MagnifyingGlass size={21} /></button><button className="header-compare" type="button" onClick={() => compareIds.length >= 2 ? setCompareOpen(true) : setToast("比較する絵柄を2種類以上選んでください")}>{t("比較")}{compareIds.length ? ` (${compareIds.length})` : ""}</button><button className="header-cta" type="button" onClick={() => {
            searchRef.current?.focus();
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }}>{t("絵柄を探す")}</button></div>
      </div></header>

      <main>
        <section className="hero page-shell" aria-labelledby="page-title"><div className="hero-main">
          <h1 id="page-title">{t("あなたの物語に、合う絵柄を。")}</h1>
          <p>{t("フラットなアニメからラノベ、静かな純文学まで。抜け感と描き込みの密度から選べる36種類。")}</p>
          <form className="search-form" onSubmit={submitSearch} role="search"><MagnifyingGlass size={24} aria-hidden="true" /><label className="sr-only" htmlFor="style-search">{t("名前・特徴で絵柄を検索")}</label><input id="style-search" ref={searchRef} value={searchText} onChange={event => setSearchText(event.target.value)} placeholder={t("例：フラット、純文学、抜け感")} /><button type="submit">{t("検索")}</button></form>
        </div><aside className="benchmark-note" aria-label={t("共通の見本について")}><span className="eyebrow">{t("同じ場面で比較")}</span><p>{t("同じ人物と駅の場面を描き分けています。被写体は自分の物語に置き換えられます。")}</p><div>{t("赤いコートの女性が駅で地図を広げる場面")}.</div></aside></section>

        <section className="explore-section page-shell" id="explore" aria-label={t("絵柄一覧")}><div className="filters-bar">
          <div className="filter-group"><span className="filters-label">{t("絵柄を絞り込む")}</span>{filterDefinitions.map(definition => <FilterSelect key={definition.key} definition={definition} value={filters[definition.key]} onChange={changeFilter} />)}<button className={`more-filters ${moreOpen ? "is-open" : ""}`} type="button" onClick={() => setMoreOpen(open => !open)} aria-expanded={moreOpen}><SlidersHorizontal size={19} />{t("キーワード")}</button></div>
          <div className="results-controls"><span aria-live="polite">{results.length} {t("種類")}</span><span className="control-separator" aria-hidden="true" /><ArrowsDownUp size={17} aria-hidden="true" /><label className="sr-only" htmlFor="style-sort">{t("絵柄の並び順")}</label><select id="style-sort" value={sort} onChange={event => setSort(event.target.value)}><option value="relevant">{t("おすすめ順")}</option><option value="name-asc">{t("名前順")}</option><option value="name-desc">{t("名前の逆順")}</option></select><CaretDown size={14} aria-hidden="true" /></div>
        </div>
          {moreOpen && <div className="more-panel"><div><strong>{t("見た目の特徴から探す")}</strong><p>{t("絵柄の名前を知らなくても、特徴や用途から選べます。")}</p></div><div className="quick-traits">{quickTraits.map(trait => <button className={submittedQuery === trait ? "active" : ""} key={trait} type="button" onClick={() => selectTrait(t(trait))}>{t(trait)}</button>)}</div></div>}
          {activeFilters > 0 && <div className="active-search"><span>{t("絞り込み：")} {submittedQuery && <strong>“{submittedQuery}”</strong>}{submittedQuery && activeFilters > 1 ? t("・選択した条件") : !submittedQuery ? t("選択した条件") : ""}</span><button type="button" onClick={resetSearch}>{t("条件をリセット")}<X size={15} /></button></div>}
          <div id="results" className="styles-grid">{results.map((style, index) => <StyleCard key={style.slug} style={style} eager={index < 3} selected={compareIds.includes(style.slug)} onOpen={setDetailSlug} onCompare={toggleCompare} />)}</div>
          {results.length === 0 && <div className="empty-state"><h2>{t("該当する絵柄がありません")}</h2><p>{t("別の言葉や用途を試すか、条件をリセットしてください。")}</p><button className="primary-button" type="button" onClick={resetSearch}>{t("すべての絵柄を表示")}</button></div>}
        </section>
        <section className="guide-section page-shell" id="field-guide"><span className="eyebrow">{t("装丁での使い方")}</span><div><h2>{t("描くところと、抜くところ。")}</h2><p>{t("気になる絵柄を開き、自分の人物・場面を入力して合成。表紙用の余白を指定できます。タイトルや著者名は生成後に組版してください。抜け感は低品質ではなく、焦点以外を意図的に省く設計です。")}</p></div><a href="#explore">{t("絵柄を探す")}<ArrowRight size={18} /></a></section>
      </main>
      <footer className="site-footer" id="about"><div className="page-shell footer-inner"><span>AI Visual Style Library</span><p>{t("物語や装丁のための絵柄ライブラリ。画像はAI生成の見本です。作家名に頼らず、線・塗り・質感で指定しています。")}</p><span>{t("絵柄ライブラリ ·")} {styles.length} {t("種類")}</span></div></footer>

      {compareIds.length > 0 && !compareOpen && !detail && <div className="compare-tray" aria-label={t("比較に選んだ絵柄")}><div className="tray-thumbs">{selected.map(style => <StyleImage style={style} alt="" key={style.slug} />)}</div><span>{compareIds.length} / 4 {t("選択中")} <small>{compareIds.length < 2 ? t("あと1種類選択") : t("比較できます")}</small></span><button className="tray-compare" type="button" disabled={compareIds.length < 2} onClick={() => setCompareOpen(true)}>{t("選んだ絵柄を比較")}<ArrowRight size={18} /></button><button className="tray-clear" type="button" onClick={() => setCompareIds([])} aria-label={t("比較をクリア")}><X size={20} /></button></div>}
      {detail && <DetailModal style={detail} onClose={() => setDetailSlug(null)} onCompare={toggleCompare} isCompared={compareIds.includes(detail.slug)} onCopy={copyText} onNavigate={setDetailSlug} />}
      {compareOpen && selected.length >= 2 && <CompareModal selected={selected} onClose={() => setCompareOpen(false)} onRemove={slug => {
      setCompareIds(current => current.filter(item => item !== slug));
      if (compareIds.length <= 2) setCompareOpen(false);
    }} onCopy={copyText} />}
      {toast && <div className="toast" role="status"><Check size={17} /> {t(toast)}</div>}
    </>;
}
