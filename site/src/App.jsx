import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowsDownUp,
  BookOpen,
  CaretDown,
  Check,
  Copy,
  MagnifyingGlass,
  Plus,
  SlidersHorizontal,
  X,
} from "@phosphor-icons/react";
import { benchmark, combinedPrompt, filterDefinitions, findStyles, quickTraits, styles } from "./style-data";

const knownSlugs = new Set(styles.map((style) => style.slug));
const initialParams = new URLSearchParams(window.location.search);
const initialCompare = (initialParams.get("compare") || "")
  .split(",")
  .filter((slug) => knownSlugs.has(slug))
  .slice(0, 4);
const initialDetail = knownSlugs.has(initialParams.get("style")) ? initialParams.get("style") : null;

function syncUrl({ detail, compare }) {
  const url = new URL(window.location.href);
  if (detail) url.searchParams.set("style", detail);
  else url.searchParams.delete("style");
  if (compare?.length >= 2) url.searchParams.set("compare", compare.join(","));
  else url.searchParams.delete("compare");
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function FilterSelect({ definition, value, onChange }) {
  return (
    <label className="filter-select">
      <span className="sr-only">Filter by {definition.label.toLowerCase()}</span>
      <select value={value || ""} onChange={(event) => onChange(definition.key, event.target.value)}>
        <option value="">{definition.label}</option>
        {definition.values.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      <CaretDown size={14} weight="bold" aria-hidden="true" />
    </label>
  );
}

function StyleCard({ style, selected, onOpen, onCompare, eager }) {
  return (
    <article className="style-card">
      <button className="style-image-button" type="button" onClick={() => onOpen(style.slug)} aria-label={`Explore ${style.name}`}>
        <img src={style.image} alt={`${style.name} interpretation of ${benchmark.alt}`} loading={eager ? "eager" : "lazy"} />
        <span className="image-open-label">Explore style <ArrowRight size={16} aria-hidden="true" /></span>
      </button>
      <div className="card-heading-row">
        <button className="card-title" type="button" onClick={() => onOpen(style.slug)}>{style.name}</button>
        <button className={`card-compare ${selected ? "is-selected" : ""}`} type="button" aria-pressed={selected} onClick={() => onCompare(style.slug)} aria-label={`${selected ? "Remove" : "Add"} ${style.name} ${selected ? "from" : "to"} comparison`}>
          {selected ? <Check size={16} weight="bold" aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
          <span>{selected ? "Added" : "Compare"}</span>
        </button>
      </div>
      <p className="card-short">{style.short}</p>
    </article>
  );
}

function ModalFrame({ children, label, onClose, wide = false }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const panel = panelRef.current;
    panel?.querySelector('button[aria-label^="Close"]')?.focus();

    function keepFocusInside(event) {
      if (event.key !== "Tab" || !panel) return;
      const focusable = [...panel.querySelectorAll('button:not(:disabled), a[href], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])')]
        .filter((element) => element.getClientRects().length > 0);
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

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={panelRef} className={`modal-panel ${wide ? "modal-wide" : ""}`} role="dialog" aria-modal="true" aria-label={label}>
        {children}
      </section>
    </div>
  );
}

function DetailModal({ style, onClose, onCompare, isCompared, onCopy, onNavigate }) {
  const index = styles.findIndex((item) => item.slug === style.slug);
  const previous = styles[(index - 1 + styles.length) % styles.length];
  const next = styles[(index + 1) % styles.length];
  return (
    <ModalFrame label={`${style.name} style details`} onClose={onClose} wide>
      <div className="detail-layout">
        <div className="detail-visual">
          <img src={style.image} alt={`${style.name} benchmark example at a train platform`} />
          <div className="detail-image-foot">
            <span>BENCHMARK / {benchmark.id.toUpperCase()}</span>
            <div className="detail-steps">
              <button type="button" onClick={() => onNavigate(previous.slug)} aria-label={`Previous style: ${previous.name}`}><ArrowLeft size={20} /></button>
              <span>{String(index + 1).padStart(2, "0")} / {String(styles.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => onNavigate(next.slug)} aria-label={`Next style: ${next.name}`}><ArrowRight size={20} /></button>
            </div>
          </div>
        </div>
        <div className="detail-copy">
          <div className="modal-topline"><span>STYLE FIELD GUIDE / {style.family.toUpperCase()}</span><button type="button" onClick={onClose} aria-label="Close details"><X size={22} /></button></div>
          <h2>{style.name}</h2>
          <p className="detail-definition">{style.definition}</p>
          <section className="prompt-recipes" aria-label="Copyable image prompts">
            <h3>Two parts. Your choice.</h3>
            <p className="prompt-intro">Copy the style alone for your own subject, or combine it with this scene to approach the example.</p>
            <div className="prompt-recipe prompt-recipe--style">
              <div className="prompt-recipe-head"><span>VISUAL STYLE · USE WITH ANY SUBJECT</span><button type="button" onClick={() => onCopy(style.stylePrompt, "Style prompt copied")}><Copy size={16} /> Copy style prompt</button></div>
              <p>{style.stylePrompt}</p>
            </div>
            <div className="prompt-recipe">
              <div className="prompt-recipe-head"><span>EXAMPLE SUBJECT · CHARACTER &amp; SCENE</span><button type="button" onClick={() => onCopy(benchmark.characterPrompt, "Character prompt copied")}><Copy size={16} /> Copy scene prompt</button></div>
              <p>{benchmark.characterPrompt}</p>
            </div>
            <button className="combined-copy" type="button" onClick={() => onCopy(combinedPrompt(style), "Combined prompt copied")}><Copy size={17} /> Copy both for this example</button>
          </section>
          <div className="trait-list" aria-label="Visual characteristics">
            {Object.entries(style.characteristics).map(([label, value]) => <div className="trait-row" key={label}><span>{label}</span><p>{value}</p></div>)}
          </div>
          <div className="vocab-heading"><h3>Prompt vocabulary</h3><button type="button" onClick={() => onCopy(style.vocabulary.join(", "), "Vocabulary copied")}><Copy size={17} /> Copy terms</button></div>
          <div className="vocab-chips">{style.vocabulary.map((term) => <span key={term}>{term}</span>)}</div>
          <p className="watch-for"><strong>Watch for</strong> {style.watchFor}</p>
          <div className="detail-actions">
            <button className="primary-button" type="button" onClick={() => onCompare(style.slug)}>{isCompared ? <Check size={18} /> : <Plus size={18} />}{isCompared ? "Added to compare" : "Add to compare"}</button>
            <button className="text-button" type="button" onClick={onClose}>Back to styles <ArrowRight size={17} /></button>
          </div>
          <p className="provenance">AI-generated from the two prompt parts above · Subject brief {benchmark.version}</p>
        </div>
      </div>
    </ModalFrame>
  );
}

function CompareModal({ selected, onClose, onRemove, onCopy }) {
  return (
    <ModalFrame label="Compare visual styles" onClose={onClose} wide>
      <div className="compare-modal">
        <div className="compare-modal-header">
          <div><span className="eyebrow">CONTROLLED COMPARISON</span><h2>See what the style changes.</h2><p>Same subject and composition. A clearer creative vocabulary.</p></div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close comparison"><X size={22} /></button>
        </div>
        <div className={`compare-columns count-${selected.length}`}>
          {selected.map((style) => <article className="compare-column" key={style.slug}>
            <img src={style.image} alt={`${style.name} interpretation of the shared benchmark subject`} />
            <div className="compare-column-title"><h3>{style.name}</h3><button type="button" onClick={() => onRemove(style.slug)} aria-label={`Remove ${style.name} from comparison`}><X size={17} /></button></div>
            <p>{style.definition}</p>
            <dl>{Object.entries(style.characteristics).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <button className="copy-vocab" type="button" onClick={() => onCopy(style.vocabulary.join(", "), `${style.name} vocabulary copied`)}><Copy size={18} /> Copy style vocabulary</button>
          </article>)}
        </div>
        <p className="comparison-note">These are AI-generated interpretations of one versioned brief, not an identity-locking test. Results vary across models and runs.</p>
      </div>
    </ModalFrame>
  );
}

export function App() {
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
  const results = useMemo(() => findStyles({ query: submittedQuery, filters, sort }), [submittedQuery, filters, sort]);
  const selected = compareIds.map((slug) => styles.find((style) => style.slug === slug)).filter(Boolean);
  const detail = styles.find((style) => style.slug === detailSlug);
  const activeFilters = Object.values(filters).filter(Boolean).length + (submittedQuery ? 1 : 0);

  useEffect(() => { syncUrl({ detail: detailSlug, compare: compareOpen ? compareIds : [] }); }, [detailSlug, compareOpen, compareIds]);
  useEffect(() => {
    if (!detail && !compareOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => { if (event.key === "Escape") { setDetailSlug(null); setCompareOpen(false); } };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKeyDown); };
  }, [detail, compareOpen]);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function submitSearch(event) {
    event.preventDefault();
    setSubmittedQuery(searchText.trim());
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function changeFilter(key, value) { setFilters((current) => ({ ...current, [key]: value })); }
  function resetSearch() { setSearchText(""); setSubmittedQuery(""); setFilters({}); setSort("relevant"); }
  function selectTrait(trait) { const next = submittedQuery === trait ? "" : trait; setSearchText(next); setSubmittedQuery(next); }
  function toggleCompare(slug) {
    setCompareIds((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= 4) { setToast("Compare up to four styles at a time"); return current; }
      return [...current, slug];
    });
  }
  async function copyText(value, successText) {
    try { await navigator.clipboard.writeText(value); setToast(successText); }
    catch { setToast("Could not copy. Please try again."); }
  }

  return (
    <>
      <a className="skip-link" href="#explore">Skip to styles</a>
      <header className="site-header"><div className="header-inner">
        <a className="brand" href="/" aria-label="AI Visual Style Library home"><BookOpen size={42} weight="light" aria-hidden="true" /><span><strong>AI Visual Style Library</strong><small>A FIELD GUIDE TO VISUAL LANGUAGES</small></span></a>
        <nav className="primary-nav" aria-label="Primary navigation"><a className="is-active" href="#explore">Explore</a><a href="#field-guide">Field Guide</a><a href="#about">About</a></nav>
        <div className="header-actions"><button className="header-search" type="button" onClick={() => { searchRef.current?.focus(); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Focus style search"><MagnifyingGlass size={21} /></button><button className="header-compare" type="button" onClick={() => compareIds.length >= 2 ? setCompareOpen(true) : setToast("Choose at least two styles to compare")}>Compare{compareIds.length ? ` (${compareIds.length})` : ""}</button><button className="header-cta" type="button" onClick={() => { searchRef.current?.focus(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Get Started</button></div>
      </div></header>

      <main>
        <section className="hero page-shell" aria-labelledby="page-title"><div className="hero-main">
          <h1 id="page-title">Find the look you can picture</h1>
          <p>Describe what you see. Discover visual styles, compare examples, and learn their distinct traits.</p>
          <form className="search-form" onSubmit={submitSearch} role="search"><MagnifyingGlass size={24} aria-hidden="true" /><label className="sr-only" htmlFor="style-search">Search styles by name or visual quality</label><input id="style-search" ref={searchRef} value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Try “grainy two-color print”" /><button type="submit">Search</button></form>
        </div><aside className="benchmark-note" aria-label="About the shared example"><span className="eyebrow">A SHARED SUBJECT</span><p>All examples show the same scene so you can focus on the style differences, not the subject.</p><div>{benchmark.description.split(". ")[0]}.</div></aside></section>

        <section className="explore-section page-shell" id="explore" aria-label="Explore visual styles"><div className="filters-bar">
          <div className="filter-group"><span className="filters-label">VISUAL TRAITS</span>{filterDefinitions.map((definition) => <FilterSelect key={definition.key} definition={definition} value={filters[definition.key]} onChange={changeFilter} />)}<button className={`more-filters ${moreOpen ? "is-open" : ""}`} type="button" onClick={() => setMoreOpen((open) => !open)} aria-expanded={moreOpen}><SlidersHorizontal size={19} /> More Filters</button></div>
          <div className="results-controls"><span aria-live="polite">{results.length} {results.length === 1 ? "result" : "results"}</span><span className="control-separator" aria-hidden="true" /><ArrowsDownUp size={17} aria-hidden="true" /><label className="sr-only" htmlFor="style-sort">Sort styles</label><select id="style-sort" value={sort} onChange={(event) => setSort(event.target.value)}><option value="relevant">Most relevant</option><option value="name-asc">Name A–Z</option><option value="name-desc">Name Z–A</option></select><CaretDown size={14} aria-hidden="true" /></div>
        </div>
          {moreOpen && <div className="more-panel"><div><strong>Start with a visible quality</strong><p>Choose a description even if you do not know the style name.</p></div><div className="quick-traits">{quickTraits.map((trait) => <button className={submittedQuery === trait ? "active" : ""} key={trait} type="button" onClick={() => selectTrait(trait)}>{trait}</button>)}</div></div>}
          {activeFilters > 0 && <div className="active-search"><span>Showing styles for {submittedQuery && <strong>“{submittedQuery}”</strong>}{submittedQuery && activeFilters > 1 ? " and selected traits" : !submittedQuery ? "selected traits" : ""}</span><button type="button" onClick={resetSearch}>Clear all <X size={15} /></button></div>}
          <div id="results" className="styles-grid">{results.map((style, index) => <StyleCard key={style.slug} style={style} eager={index < 3} selected={compareIds.includes(style.slug)} onOpen={setDetailSlug} onCompare={toggleCompare} />)}</div>
          {results.length === 0 && <div className="empty-state"><h2>No styles found</h2><p>Try a simpler visual quality, such as “grainy”, “soft”, or “retro”.</p><button className="primary-button" type="button" onClick={resetSearch}>Show all styles</button></div>}
        </section>
        <section className="guide-section page-shell" id="field-guide"><span className="eyebrow">HOW TO USE THE FIELD GUIDE</span><div><h2>Look first. Name it second.</h2><p>Each sample starts from the same scene. Browse by appearance, inspect the line, color, and texture that define a style, then compare close alternatives before writing your next image brief.</p></div><a href="#explore">Explore the library <ArrowRight size={18} /></a></section>
      </main>
      <footer className="site-footer" id="about"><div className="page-shell footer-inner"><span>AI Visual Style Library</span><p>A visual vocabulary for makers. The benchmark images shown here are AI-generated interpretations, not historical source artworks.</p><span>Prototype · {styles.length} styles</span></div></footer>

      {compareIds.length > 0 && !compareOpen && !detail && <div className="compare-tray" aria-label="Selected styles for comparison"><div className="tray-thumbs">{selected.map((style) => <img src={style.image} alt="" key={style.slug} />)}</div><span>{compareIds.length} / 4 selected <small>{compareIds.length < 2 ? "Choose one more style" : "Ready to compare"}</small></span><button className="tray-compare" type="button" disabled={compareIds.length < 2} onClick={() => setCompareOpen(true)}>Compare styles <ArrowRight size={18} /></button><button className="tray-clear" type="button" onClick={() => setCompareIds([])} aria-label="Clear comparison"><X size={20} /></button></div>}
      {detail && <DetailModal style={detail} onClose={() => setDetailSlug(null)} onCompare={toggleCompare} isCompared={compareIds.includes(detail.slug)} onCopy={copyText} onNavigate={setDetailSlug} />}
      {compareOpen && selected.length >= 2 && <CompareModal selected={selected} onClose={() => setCompareOpen(false)} onRemove={(slug) => { setCompareIds((current) => current.filter((item) => item !== slug)); if (compareIds.length <= 2) setCompareOpen(false); }} onCopy={copyText} />}
      {toast && <div className="toast" role="status"><Check size={17} /> {toast}</div>}
    </>
  );
}
