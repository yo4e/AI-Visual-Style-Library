# AI Visual Style Library

An English/Japanese field guide for finding a visual look, understanding its traits, and comparing styles against a shared subject.

## Interactive prototype

The first implemented screen lives in [`site/`](site/). It follows the selected editorial grid layout with a white background. Six original benchmark images show the same brief interpreted as Watercolor, Risograph, Gouache, Ink Wash, Pixel Art, and 35mm Film.

The prototype supports search by visible qualities, trait filters, style details, copyable prompt vocabulary, and a comparison of two to four styles. Each style now has an independent visual style prompt, while the benchmark has a separate character and scene prompt. Copy either part alone or combine them. The same recipes are exported to [`PROMPT_LIBRARY.md`](PROMPT_LIBRARY.md). Images are optimized WebP files; style content is kept in [`site/src/style-data.js`](site/src/style-data.js).

Run it locally:

```sh
cd site
npm install
npm run dev
```

Build the site with `npm run build` from `site/`.

To update a benchmark, edit the two prompt parts in `site/src/style-data.js`, generate each image from its exact combined prompt in ChatGPT image generation, and save the chosen PNGs under a local `work/benchmark-…/` folder as `{style-slug}.png`. Then run `npm run sync:benchmark -- /absolute/path/to/that/folder`, `npm run export:prompts`, and `npm run test:prompts` from `site/`. The integrity test fails if a published prompt or image changes without updating its recorded counterpart.

## Scope and next phase

This is a visual and interaction prototype with 46 styles. The product specification in [`DESIGN.md`](DESIGN.md) calls for a larger, editorially reviewed catalog, canonical style pages, and static SEO routes. The current Vite app uses shareable query URLs for its detail and comparison overlays, but those overlays are not canonical pages. Future work can move the content model into the planned static site architecture and add reviewed metadata and benchmark tracks.

The benchmark images were regenerated after writing the two-part prompts and compressed to 960-pixel-wide WebP assets in `site/public/images/`. [`site/benchmark-manifest.json`](site/benchmark-manifest.json) records the submitted prompt and checksums for every selected image. The image tool did not expose its model version or seed, and the prompts aim to reproduce a visual treatment rather than exact pixels on every run.

Research, information architecture, visual reference notes, application formats, and growth direction remain in the existing root documents.

## Visual style prompt library: 46 styles

Public Cloudflare Pages site: https://ai-visual-style-library.pages.dev/

The six original styles remain, with forty additional styles: ten anime/manga, ten light-novel illustration styles, ten quiet literary treatments, five photographic looks, and five general-fiction illustrations. English and Japanese explanations distinguish line, shading, and surface technique. Copy-ready style prompts and fixed composition instructions are always English. The density filter offers seventeen styles with intentional breathing room and nine rich treatments.

Open a style to see two always-visible instruction blocks: the visual style and the benchmark subject, scene, and composition. Copy the style alone, the scene alone, or both. Paste the instructions into your own image-generation AI and adapt the subject, scene, or composition there. This site is a prompt library; it does not generate images or accept custom subject input. The samples let you compare rendering techniques on a shared scene, rather than limiting how you use the styles.

### Build and publish

From `site/`, run `npm ci`, `npm run build`, `npm run test:prompts`, `npm run test:library`, and `npm run test:sites`. Deploy **only** `dist/client`:

```sh
wrangler pages deploy dist/client --project-name ai-visual-style-library --branch main
```

This project uses direct uploads. GitHub commits do not trigger deployment automatically. The existing Sites build packaging remains intact and separate from the static Pages directory.

### Image provenance

All forty added samples were independently generated using built-in Codex ImageGen with the exact English full-sample copy. `generationPrompt`, `combinedPrompt`, and each current manifest entry agree. The earlier Japanese-generated image records are retained in `site/provenance/benchmark-manifest-before-english-samples.json`; those images have been replaced. `site/benchmark-manifest.json` records input/output hashes and exact submitted prompts. Model version and seed are not exposed; repeated generations can vary. To import a reviewed set of new sources, run `node scripts/import-book-images.mjs /path/to/slug-to-path.json /path/to/submitted-jobs.json` from `site/`. This checks submitted instructions against the current copy text before converting forty PNGs to WebP, preserves the original six records, and updates the manifest. Source PNGs and private workspace files are not uploaded.

### Display language and prompt language

Use EN / 日本語 in the header, detail view, or comparison. A saved language choice wins over browser preferences; otherwise Japanese browsers start in Japanese and other browsers start in English. An explicit `?lang=en` or `?lang=ja` link takes precedence. The selected locale persists in localStorage.

All copied style prompts, vocabulary, scene instructions, and combined sample instructions are English in either display language. Switching languages changes the explanation, not the copied instructions. The original six image records stay unchanged; the forty additions now use exact English copy text and new output hashes.
