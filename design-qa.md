# Design QA — selected field-guide layout and prompt library

## Findings

No actionable P0, P1, or P2 differences remain. The final desktop render preserves the selected editorial hierarchy, white background, compact filters, three-column image grid, and two visible rows. The style-only prompt is the first card in each detail view, so it is visible as soon as the user opens a style.

The generated source mock is a concept image, so the six benchmark images are new assets generated from the published two-part prompts rather than crops from the mock. Their character details and exact camera positions vary. This is an accepted content limitation, and the UI describes the benchmark as a controlled brief rather than an identity lock. `site/benchmark-manifest.json` records the submitted text and image checksums.

## Comparison evidence

- Source visual truth: `/Users/yo4e/.codex/generated_images/01a0cc90-aab0-7fc3-9fc1-eb5063543feb/exec-f25de709-d5f3-4441-bbb4-fcc4426c1073.png`
- Current prompt-first implementation: `work/qa/08-prompt-first-desktop.png` from `http://127.0.0.1:4173/`
- Earlier layout implementation: `work/qa/02-desktop-final.png`
- Earlier full-view side-by-side comparison: `work/qa/desktop-comparison-final.png`
- Focused header, hero, and filter comparison: `work/qa/header-comparison-final.png`
- Initial comparison: `work/qa/desktop-comparison.png`
- Responsive evidence: `work/qa/03-mobile.png` (390 × 844), `work/qa/04-mobile-detail.png`, `work/qa/05-mobile-tray.png`, `work/qa/06-mobile-compare.png`, and `work/qa/07-tablet.png` (820 × 900)
- Comparison state: English, light theme, home route, six unfiltered styles, no overlay. The source and desktop implementation are each 1487 × 1058 pixels at a 1487 × 1058 CSS viewport. The captures match at 1 image pixel per CSS pixel, so no density resampling or crop was needed. The side-by-side files place source on the left and implementation on the right.

## Fidelity review

- **Fonts and typography:** The Playfair Display headings and DM Sans utility text preserve the source's serif-led hierarchy. Title wrap, card labels, and small uppercase eyebrow text remain legible. The implementation uses local fallbacks if the web fonts cannot load.
- **Spacing and layout:** After correction, the first grid row begins at about y=396 in the implementation versus y=395 in the source. Hero, search, filters, and both image rows fit the target viewport with similar rhythm. Cards have the intended flat image treatment and narrow gutters.
- **Colors and tokens:** The canvas is white as requested. Ink, pale rules, and restrained terracotta actions follow the selected mock. Focus outlines are added for keyboard use.
- **Images and asset quality:** Six prompt-derived style examples are present, all showing the red-coat/map/platform brief. Every WebP is 960 pixels wide and under 300 KB. No placeholder image or CSS illustration replaces the benchmark imagery.
- **Copy and content:** Search instructions, style traits, prompt vocabulary, and comparison copy are coherent. The search suggestion is a placeholder so the initial six-result state is truthful. The mock's inactive “Sign in” action became a functional “Compare” action because this prototype has no account flow.
- **Icons and controls:** The icons remain consistent in stroke and alignment. The book mark is outlined where the mock used a filled mark; this is a P3 brand refinement.
- **Responsiveness and accessibility:** At 390 and 820 CSS pixels, document width equals viewport width. Mobile details and comparison remain readable. Search, select controls, modal labels, image alt text, visible focus, Escape dismissal, and modal focus containment were checked.

## Comparison history

1. **Initial P2 — grid too low:** In `work/qa/desktop-comparison.png`, the first image row began around y=412, about 17 pixels below the source's y=395. This also pushed second-row descriptions toward the bottom edge. Fixed by reducing desktop hero top and bottom padding in `site/src/styles.css` from 27/22 pixels to 20/12 pixels.
2. **Post-fix pass:** `work/qa/desktop-comparison-final.png` and `work/qa/header-comparison-final.png` show the first row at about y=396 and the two rows within the viewport. No actionable P0/P1/P2 mismatch remains.

## Functional verification

- Browser interactions: text search, native medium filter, style detail, copy feedback, adding two styles, desktop and mobile comparison, Escape dismissal, and focus return.
- Browser console error log: empty.
- `npm run build`: passed.
- `npm run test:sites`: four tests passed.
- `npm run test:prompts`: two integrity tests passed after the prompt-first image update.
- Style-only and combined copy actions were checked in the browser. At 390 CSS pixels, the detail view had no horizontal overflow.

## Follow-up polish

- [P3] Decide the final brand book icon treatment before launch.
- The broader product plan still requires canonical static style pages and additional reviewed entries before public SEO launch. The current image tool did not expose its underlying model version or seed, so the manifest cannot guarantee a pixel-identical replay.

final result: passed
