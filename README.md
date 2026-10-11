# AI Visual Style Library

A visual prompt library for choosing a drawing or photographic treatment, comparing generated samples, and copying English instructions into your own image-generation AI.

**[Explore the live library →](https://avsl.4roz.com/)** · [日本語 UI](https://avsl.4roz.com/?lang=ja) · [English UI](https://avsl.4roz.com/?lang=en)

[![Buy me a coffee](docs/coffee-button.svg)](https://ko-fi.com/yo4e)

## Choose a look, then make it your own

1. Browse **60 styles** or filter by visual family and detail density. Search for qualities such as fine lines, flat color, paper texture, or photography.
2. Open a sample to read its line, shading, and texture traits. Select two to four styles to compare them on the same subject.
3. Copy the **Style prompt** for your own subject, the **Subject, scene & composition prompt** used in the sample, or the combined instructions.
4. Paste the instructions into your image-generation tool and adapt the subject or scene there.

The site does not generate images. It offers English and Japanese explanations; copy-ready prompts remain English in both interfaces. The language choice is remembered locally, and `?lang=en` or `?lang=ja` overrides it.

The catalog includes six original techniques, ten anime illustration treatments, ten light-novel treatments, ten quiet literary looks, seven photographic looks, five general-fiction illustration treatments, and twelve manga/comic treatments. The photographic collection includes cinematic mystery and uneasy daylight horror. Density choices include intentionally sparse drawing as well as rich detail.

## What the samples demonstrate

Every sample uses the same benchmark subject and scene so that differences in rendering are easier to compare. Style instructions are separate from the subject, pose, setting, and composition; you can reuse the technique with different content.

The copy-ready combined instructions match the submitted text recorded for each selected output in [the benchmark manifest](site/benchmark-manifest.json). Prompt snapshots and generation records are kept in [site/provenance](site/provenance/). Samples are actual generated outputs, resized and compressed as WebP; they are not proof that a prompt will reproduce the same image or degree of stylization on another run. Results vary with the image tool, model, settings, subject, and generation. Some treatments overlap, and the geometric everyday comic sample retains faint color despite its black-and-white instruction, as disclosed in its description.

See the text-only [Prompt Library](PROMPT_LIBRARY.md) for the same English recipes. The [design notes](DESIGN.md) describe a broader future direction; the runnable site is the current implementation.

## Run locally

The app is React with Vite. Use a recent supported Node.js release and npm.

```sh
cd site
npm ci
npm run dev
```

Create and validate the production build:

```sh
npm run build
npm run test:prompts
npm run test:library
npm run test:sites
```

`npm run preview` serves the built app locally. Style data lives in [site/src/style-data.js](site/src/style-data.js) and its imported modules; UI translations live in [site/src/i18n.jsx](site/src/i18n.jsx).

## Update samples and publish

Finalize the English style and scene instructions before generation. Generate a separate sample for each treatment using its exact combined text, inspect it against the intended line/form/shading traits, and record the submitted prompt and source/output hashes. Keep unrelated examples and existing provenance intact. `npm run export:prompts` refreshes the Markdown prompt library. Integrity tests compare the current prompt text and served image bytes with the manifest.

The generic `npm run sync:benchmark -- /absolute/path/to/source-pngs` command rebuilds the entire benchmark set from `{style-slug}.png` sources. Use a targeted importer when adding only a few styles, rather than rewriting the unchanged samples. Existing import scripts are in [site/scripts](site/scripts/).

Cloudflare Pages uses direct uploads; a GitHub push does not deploy automatically. After building, deploy **only `site/dist/client`**. From `site/`, with an already authorized Cloudflare account:

```sh
npx wrangler pages deploy dist/client --project-name ai-visual-style-library --branch main
```

The [Pages fallback URL](https://ai-visual-style-library.pages.dev/) serves the same site. The additional Sites worker packaging in `dist/server` and `dist/.openai` remains separate. Source PNGs, credentials, and private workspace or reference files are not part of the public deployment.

## License

Project-owned source code and prompt documentation are available under the [MIT License](LICENSE). Third-party dependencies and icon vectors retain their original licenses; see [Third-party notices](THIRD_PARTY_NOTICES.md). The book favicon and coffee icon derive from Phosphor Icons.

The gallery contains AI-generated demonstration images. The MIT license does not establish whether a generated image has copyright protection, grant exclusive rights, or guarantee suitability or clearance for a particular use. Check the terms of the image-generation service you use and review your outputs for your intended publication.

## Support

If you found this useful, buy the developer a coffee. 支援する場合は、開発者にコーヒーをおごってください。

[![Buy me a coffee](docs/coffee-button.svg)](https://ko-fi.com/yo4e)
