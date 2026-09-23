# AI Visual Style Library

An English-language field guide for finding a visual look, understanding its traits, and comparing styles against a shared subject.

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

This is a visual and interaction prototype with six representative entries. The product specification in [`DESIGN.md`](DESIGN.md) calls for a larger, editorially reviewed catalog, canonical style pages, and static SEO routes. The current Vite app uses shareable query URLs for its detail and comparison overlays, but those overlays are not canonical pages. Before public launch, move the content model into the planned static site architecture and add the remaining reviewed styles, metadata, and benchmark tracks.

The benchmark images were regenerated after writing the two-part prompts and compressed to 960-pixel-wide WebP assets in `site/public/images/`. [`site/benchmark-manifest.json`](site/benchmark-manifest.json) records the submitted prompt and checksums for every selected image. The image tool did not expose its model version or seed, and the prompts aim to reproduce a visual treatment rather than exact pixels on every run.

Research, information architecture, visual reference notes, application formats, and growth direction remain in the existing root documents.
