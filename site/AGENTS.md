# Prototype Instructions

## Confirmed design direction

- The user selected the first generated field-guide layout.
- Use the clean white page background from the second generated option instead of the first option's warm ivory background.
- The revised source image is `/Users/yo4e/.codex/generated_images/01a0cc90-aab0-7fc3-9fc1-eb5063543feb/exec-f25de709-d5f3-4441-bbb4-fcc4426c1073.png`.
- Keep visual discovery, controlled benchmark samples, and readable style vocabulary central to this prototype.
- Treat this as a usable prompt library. Keep the character/scene prompt separate from each visual-style prompt so people can copy the style alone for their own subject.
- Write and validate prompts before generating gallery examples. Each published benchmark image must come from the prompt parts shown for that style; record the submitted prompt and image provenance.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Style catalog expansion (2026-10-11)

- Preserve the original six techniques and add forty distinct styles: ten anime/manga, ten light-novel, ten quiet literary, five photographic, and five general-fiction illustration treatments.
- Provide natural English and Japanese labels and explanations, with a persistent language toggle. Keep all copy-ready style prompts and fixed composition instructions in English, independent of display language. Specify line, paint/shading, texture, and selective detail rather than artist names or a fixed subject.
- The user finds AI illustrations too uniformly dense. Offer broken outlines, untouched paper, omitted shadows, simplified backgrounds, and a finished focal area. Do not substitute low resolution, general blur, or reduced quality. Keep rich styles too.
- Superseded by the generic-library direction below: custom subject input and optional cover layout were an earlier temporary workflow.
- Generate one real benchmark per style and record submitted prompts and input/output checksums. Do not reuse another style's image as a new sample. Keep original six prompts and image provenance unchanged.

## International release language (2026-10-11)

- Keep all 46 styles, images, density choices, and comparison in both display languages.
- Copy-ready instructions remain English regardless of display language.
- Current samples must be generated with the exact English full-sample copy text. The user authorized replacing the thirty Japanese-generated samples with English-generated outputs instead of trying to match the old images. Archive previous generation records rather than rewriting their history.
- Default to the stored choice, then Japanese for Japanese browsers and English otherwise. Explicit lang query parameters override the stored choice.

## Final scope and honest samples (2026-10-11)

- Stop at 46 styles for this iteration, including five photographic looks and five general-fiction illustrations.
- Keep subject instructions separate from rendering instructions. The complete conditions used for each sample must be readable and copyable.
- Submit the exact English sample-copy string with no extra style instructions or image references, then record the returned asset and checksums. Preserve the original six images when their English prompts already match.
- Inspect outputs for obvious failures relative to technique names. Do not claim repeated-generation, alternate-subject, or cross-model reproducibility from a single selected output.

## Generic prompt library (2026-10-11)

- The user requested a general-purpose image-generation prompt library, rather than NovelJam-specific or book-cover usage.
- Remove custom subject input and the portrait-cover checkbox. Keep visual style and benchmark subject/scene/composition instructions in two always-visible blocks. Clearly offer style-only, scene-only, and combined copy actions.
- Explain in both languages that people copy instructions and use their own image-generation AI; this site does not generate images. Keep introductions and usage guidance general.
- Preserve all 46 styles, the language toggle, comparison, and exact English sample-generation correspondence.

- Label the two prompt blocks 「絵柄・タッチのプロンプト」 / “Style prompt” and 「人物・場面・構図のプロンプト」 / “Subject, scene & composition prompt”.

## Manga extension (2026-10-11)

- Add eight distinct manga/comic visual treatments to the existing 46. Use generic line, shadow, deformation, and density descriptions; never use magazine, work, or artist names in labels or generation prompts.
- Finalize and save English prompts before generating images. Submit exactly the saved full-sample text, and preserve both independent instruction blocks and three copy actions in both languages.
- Keep the original 46 prompts and images. This addition raises the catalog to 54; the earlier 46-style limit is superseded for this explicit request.
- The user explicitly approved saving the manga extension to PR #4 and publishing it to Cloudflare. Keep the PR draft and unmerged. Explain the geometric comic sample’s faint color in both languages without recoloring it or changing the saved generation prompts.

## Four further techniques (2026-10-11)

- Add four general drawing treatments, bringing the catalog to 58. Inspect official visual materials, then describe generic line, shadow, color, form, and detail traits rather than naming works or artists in public titles, descriptions, or prompts. Do not reproduce original characters, compositions, or signature eye symbols.
- Freeze exact English prompts before generating new benchmark images. Preserve the previous 54 prompts and assets, both UI languages, two independent blocks, three copy actions, and comparison.
- The user explicitly approved saving the four additions to existing Draft PR #4 and publishing to the existing Cloudflare project after validation; keep the PR unmerged.

## Support link and domain (2026-10-11)

- The user selected avsl.4roz.com as the formal URL and authorized adding only its DNS record and connecting the existing Pages project.
- Add a quiet Ko-fi coffee link below the usage guide, https://ko-fi.com/yo4e, with natural Japanese/English support copy. Do not add advertising or change payment settings. The user authorized saving to Draft PR #4 and publishing.

## Favicon (2026-10-11)

- Reuse the header’s Phosphor BookOpen light vector and accent color for the favicon. Keep the same book design, with balanced square padding, SVG and 16/32px ICO fallbacks, and an Apple touch icon. The user authorized publishing this to the existing Pages project and Draft PR #4.

## Browser tab title (2026-10-11)

- Keep the HTML title and runtime document.title exactly “AI Visual Style Library” in both languages, including after language changes and reloads. Preserve page text and SEO description. Publish to the existing Pages project and Draft PR #4 as authorized.

## Support copy revision (2026-10-11)

- The Japanese support sentence is exactly “開発者にコーヒーをおごってください”. Keep the existing English sentence and Ko-fi destination. The user confirmed normal access to the formal URL; do not clear DNS caches or perform administrator operations.

## Suspense photos and manga review (2026-10-11)

- The user authorized adding one photorealistic mystery and one photorealistic horror treatment to production, bringing the library to 60. Differentiate using light, color, and photographic behavior while preserving the supplied subject and scene. Freeze English prompts before generation and record actual outputs.
- Review four manga improvement candidates once, moderately, without work or artist names in generation prompts or public titles. Keep these candidates outside the production repository until the user chooses replacements. Preserve all current 58 samples when adding the two photos.

## Public repository presentation and license (2026-10-11)

- Keep GitHub About in English, homepage https://avsl.4roz.com/, and relevant topics. README is English first with purpose, copy/compare usage, local development, deployment, sample provenance/variation, and a clickable Ko-fi coffee button.
- The user selected MIT for project-owned code and prompt documentation. Preserve third-party notices, including copied Phosphor vectors and React runtime licenses. Do not claim that MIT establishes copyright, exclusive rights, or suitability of generated images. Keep README/LICENSE changes on Draft PR #4 until merge is separately requested.
