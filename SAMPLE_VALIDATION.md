# Sample-to-prompt correspondence

## What was checked

The current local catalog has 54 styles: the original six, thirty anime/light-novel/literary additions, five photographic looks, five general-fiction illustration treatments, and eight manga/comic techniques. The user approved publishing the manga extension after local validation.

The original six English generation instructions already matched the current sample copy and their image hashes were retained. The thirty Japanese-generated additions are replaced by new outputs generated from their English copy-ready instructions. The ten new photographic/general-fiction styles also use their final English instructions.

For the thirty replacements, the full-sample prompt was read from the actual public clipboard. For the ten unpublished additions, it was read from the final local UI clipboard. Each string was checked against `combinedPrompt(style)` before submission. The built-in Codex ImageGen call received that exact string and `transparent_background: false`, with no reference image and no extra style instruction. The import script checks the submitted string against the final copied text before writing any asset.

The shared subject block specifies the woman, red coat, map, train platform, wide 16:9 shape, and composition. The separate visual-style block specifies rendering technique. The former custom-subject/portrait-cover composer was separate from the wide benchmark and has been removed for the general-purpose library; its instructions were never added to sample generation. The complete benchmark conditions remain readable and copyable in each style detail.

## Evidence and scope

`site/benchmark-manifest.json` records the exact current submitted string, prompt hash, source-image hash, final WebP hash, dimensions, and generation tool. Previous records are archived in `site/provenance/benchmark-manifest-before-english-samples.json`. The earlier Japanese instructions are history, not the conditions of the current English-generated samples.

Selected outputs are screened for obvious category/technique failures: photographic vs. drawn forms; line and paint treatment; rough print/collage/pencil surfaces; intentional open areas vs. rich detail. The technique families are distinguishable in the selected outputs. This is a check of one real output per instruction set, not a statistical test of repeated generation. Fine negative constraints, such as absolutely no shadows in flat anime, can be only partly obeyed.

The current local UI checks separately cover both display languages, always-visible style and scene blocks, all three exact English copy actions, absence of custom input/cover controls, filters, four-style comparison, locale persistence, reload, and mobile layout. Those checks establish software behavior, not cross-model style reproducibility.

## Limits

The tool does not expose its underlying model version, seed, or internal prompt revision. No identical-image, repeated-run, or cross-model guarantee is made. Alternate subjects were not tested in this final simplified workflow; replace the subject block to try your own scene while retaining the style block. Titles and author names should be typeset afterward.

## Manga extension

Eight manga/comic styles are added after the original 46. Their English technique prompts and complete benchmark inputs were saved in `site/provenance/manga-prompts-before-generation.json` before ImageGen was called. Each actual call uses that complete string with `transparent_background: false`, no image references, and no hidden scene or style additions. The importer checks saved text, actual submission, current copy text, and prompt hash before writing any asset. The original 46 manifest entries and assets are retained. One-output technique screening does not establish repeatability or cross-model reproduction.

All eight selected outputs were screened visually for their broad line, proportion, value, and print-surface treatment. The geometric everyday comic retains some faint local color despite its black-and-white instruction; fine negative constraints are not a strict guarantee. The samples are actual submitted-prompt outputs, not retrofitted style descriptions.
