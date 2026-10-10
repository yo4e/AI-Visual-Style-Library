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
