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

## Approved manga variation options (2026-10-11)

- The user approved all four reviewed manga candidates as additional options, not replacements. Preserve the existing 60 records and images and append four clearly named variants, bringing the catalog to 64.
- Reuse the exact English instructions frozen at 2026-10-11T03:11:17.234Z and the actual generated outputs. Catalog aliases and display names may change after review; preserve generationSlug and hashes to make the correspondence explicit. Do not change the prompts after generation.
- PR #4 is merged. Create a new Draft PR from current main, push and publish the approved 64-style build. Do not merge the new PR without another request. Keep About description free of a catalog count.

## Adult fiction illustrations (2026-10-11)

- The user authorized five additional nonphotographic treatments for human drama and workplace fiction, based on observation of published covers but described only through generic rendering traits. Do not name authors or works in public titles, descriptions, or English prompts; do not copy cover compositions or characters.
- Preserve all 64 existing styles and assets; append five adult editorial illustrations. Keep natural adult faces, varied line/paint/texture choices, and two airy options. Freeze exact English prompts before reference-free generation, inspect actual outputs, and keep style and scene copy instructions independent in both languages.
- The user explicitly approved GitHub saving and production publishing for this addition after local verification. Create a new Draft PR and use the existing Cloudflare Pages project. Do not merge without another request.

## Bold editorial simplification (2026-10-11)

- The user found the five adult illustrations insufficiently different and requested bold deformation and fewer elements. Preserve all 69 existing styles; add five clearly simplified design treatments as separate options. Shape simplification, symbolic faces, omitted clothing/background details, flat planes and open space must be visually evident, rather than merely new media or colors.
- Freeze English prompts before generation, submit the exact saved text without references, compare actual outputs with the previous five, and revise/re-generate if they remain realistically detailed. Keep independent English prompt copy in both UI languages and existing comparison/filter behavior.
- GitHub saving to a new Draft PR and production publishing to the existing Pages project are authorized for this addition. Do not merge this PR without separate permission. Keep author and work names out of public metadata and prompts.

## User-reference adult cel animation (2026-10-11)

- Add one animation treatment based on actual visual inspection of the supplied Library reference. Preserve all current 74 styles, assets and prompts. Use adult proportions, naturally drawn modest eyes, thin outlines, restrained cel shadows and quiet observed backgrounds; do not copy the reference characters, costumes, poster collage or typography.
- Keep author and work names out of public metadata and generation prompts. Freeze English instructions before reference-free generation and submit exactly the saved sample text. Preserve separate style/scene blocks, all three copy actions, both languages, comparison and filters.
- New Draft PR saving and production publication to the existing Pages project are authorized. Do not merge this PR without separate permission. The uploaded reference is analysis-only and remains outside the repository and deployment.
## Benchmark model caption (2026-10-11)

- The user explicitly requested “ベンチマーク / STATION-MAP-V3” followed by “画像生成モデル / GPT Image 2” under the detail sample, with English “Benchmark / STATION-MAP-V3” and “Image generation model / GPT Image 2”. Keep the two lines readable on mobile and preserve navigation.
- The label follows the official built-in image-generation documentation at https://learn.chatgpt.com/docs/image-generation. Individual historical manifest model/seed fields remain unchanged because they were not recorded by generation responses. Preserve all 75 styles, images and prompts. Publishing the display correction is authorized; keep a new Draft PR unmerged until separately requested.

## Scene-selector preview (2026-10-15)

- The user requested small image-only scene choices near the hero's shared-scene explanation. Keep visible text labels out of the thumbnail buttons; provide accessible names, a selected border, and keyboard focus.
- Preview only station and the owner-confirmed original young man with sunflowers. The youth scene displays just that one historical watercolor image; never reuse the 75 station samples for the youth scene. The historical source prompt says dawn. No new generation is authorized for this preview.
- Preserve all 75 station styles, STATION-MAP-V3, prompts, and provenance. Returning to station retains filters, search, sorting, and comparison selections.
- Keep this prototype local for owner review. Do not push, merge, publish, deploy, incur charges, or include the separate 152-page SEO prototype. Use background commands and headless browser checks without occupying the owner's Mac screen.

## Controlled youth benchmark preparation (2026-10-15; supersedes one-image youth display)

- The owner approved giving youth the same gallery/detail/prompt page structure as station. Keep station as the home/default scene; youth appears only when selected or explicitly requested in the URL. Work on dedicated local branch codex/young-man-benchmark-preparation; preserve previous prototype changes.
- Preserve every current stylePrompt byte. Only the independent subject/scene/composition prompt changes to SUNFLOWERS-BUS-STOP-V1. Its fixed dawn composition is a new version, distinct from the old short-brief PNG.
- Freeze exact full English strings and SHA-256 before generation in provenance/young-man-prompts-before-generation.json. Never backfit prompts to images, modify palettes to force yellow, or use the historical PNG as a generated output for the new version.
- First generation handoff is the original six styles only. Remaining 69 prompts are prepared but not authorized in this handoff. Eight existing style texts contain station-specific instructions: preserve them verbatim and flag for review before later generation.
- This executor prepares code and prompt artifacts only; parent performs ImageGen. Pending youth styles display placeholders, with usable exact prompts and disabled image comparison. Only validated output records may enable images/comparison. Preserve per-scene compare selections and shared filters/search/sort.
- No push, merge, publication, deployment, API charges or browser image generation. Stop after local verification and Library prompt delivery, then wait for generated output handoff.

## Approved station replacements (2026-10-15)

- Owner reviewed and approved regenerated station entries 67–74 with their exact reusable-style-v2-eight prompts. Activate only those eight prompt/image pairs; leave other 67 station images and scene text unchanged. Entries 59/60 remain out of scope.
- Keep original station arrays available as historicalStyles, archive the prior station manifest and prompt export, and retain original image files. Youth v1.0 keeps historical rendering strings and its six actual output records.
- The girl/station remains the home scene. Preserve null model/seed for new outputs and show recorded sample deviations. No push, merge or publishing is authorized. Review other prompts for candidates; do not rewrite or regenerate them without the owner's next instruction.

## Approved six follow-up station replacements (2026-10-15)

- Owner approved entries 3, 5, 39, 45, 59 and 60 with exact station-reusable-style-v3-six-followup prompts and supplied images. Activate those six pairs alongside the previous eight; other 61 original station pairs remain unchanged.
- Preserve the pre-follow-up station manifest/export and all original assets. Youth v1.0 continues to use historicalStyles, including original gouache/pixel-art strings, with unchanged existing youth images/history. No new generation, push, main integration, merge or publication is authorized.

## Relaxed simplified anime preparation (2026-10-18)

- User requested an additional reusable style based on the supplied post, using its reference prompt in English. Direct comparison identifies HU12_zKacAEkDcY as the simplified treatment and HU12_bnaUAEPdq6 as the detailed comparison. Both depict the same three figures and retain a detailed neon setting; reference resolution and figure count do not identify the treatment.
- Focus on broad hair locks, fewer garment folds/accessories/material reflections, simple contours and restrained shadow planes. Preserve supplied age, recognizable design, posture and silhouette. Moderate 5.5–6-head proportions come from post text, not a measured image claim. Avoid chibi anatomy or an emptied background.
- Preserve requested local color identities; soften saturation/contrast without fixing hair, clothing or objects to reference colors or a black/pink/purple palette. Keep artist/work names out of public metadata/prompts. Reference bytes remain analysis-only outside repo/public and are never generation inputs.
- Candidate is prepared separately in relaxed-simplified-anime.js and not yet imported into the live catalog. Latest exact generation handoff is relaxed-simplified-anime-v2-prompts-before-generation.json; v1 is retained as an unsent superseded draft. Parent performs generation; activate only with validated actual output and exact matching frozen instructions. Existing75 station pairs, historical75 and youth-v1 history remain intact. No push, merge or publication authorized.

## Relaxed simplified anime activation (2026-10-18)

- Parent supplied the actual one-run output as libfile_323f58d92c1c81918aa7040e5d34b415 and explicitly requested local activation and prepublication review. Its trusted handoff confirms exact V2 text, no references/additional instructions, opaque background, submitted 2026-10-18 10:06:59 JST and completed10:07:38 JST. Record this evidence source honestly; no raw call log or exposed model/seed was supplied.
- Append this new station sample as entry76, preserving all previous75 current prompt/image pairs and original historical75. Youth retains six actual outputs; new entry is pending with no inherited station image/model/record. Store original PNG unchanged outside deployed assets and use a separately hashed WebP derivative in public/images.
- Disclose that the sample has broad hair locks/restrained shadows but a conventional anime figure and detailed map/background; the waist-up crop cannot verify full-body5.5–6-head proportions. Do not revise the frozen prompt to fit the output. No further generation, push, merge or publishing authorized.

## Both normal and pastel variants adopted locally (2026-10-18)

- Owner explicitly chose to keep both normal and pastel (Slack1792286492.343879). Add saved V3 trial output libfile_2f543ce204808191ad13be2285fd291c as a separate77th style, preserving the normal sample and preceding75. No new generation requested. Original V3 trial records remain immutable historical records; active record separately records owner's adoption.
- Pastel stylePrompt is exactly the normal stylePrompt plus one LF and “Use a pastel-toned color treatment.”; combined copy must equal the saved V3 full generation text byte for byte. Specific benchmark woman, hair/coat colors, map, station, train and framing belong only in scene instructions. Conditional human proportions/hair locks and general shading/color treatment are rendering traits, not fixed sample subjects. Keep both independent English prompts and all three copy actions in both languages.
- Record that the selected variants look similar; do not promise a large pastel difference. Both new youth samples remain pending. Preserve original PNGs and distinct WebP derivatives. No push, merge, deployment or publication authorized.

## Two-style production publication completed (2026-10-18)

- Owner subsequently authorized publishing only the normal and pastel additions and sharing the comparison/JSON files; parent handles Slack delivery. Both are now published at avsl.4roz.com as entries76/77. No Git push or merge was performed.
- Production deployment5d55bf3c-b50f-4b80-9729-3989f0ce4b2e was built from main3f5e417 plus only these2 additions in /Users/yo4e/Codex/2026-10-15/task-3/evidence/phase13/release. Its original75 pairs are unchanged from previously published main. Current working repo still contains14 unpublished station replacements and youth/scene-selector work; do not deploy this entire working copy as the two-style release. Fixed-palette review remains held.
- Public copy actions in both languages/mobile reproduce exact generatedV2/V3 text, with no specific benchmark subject/setting in style-only prompts. Release build/tests and all77 public image hashes passed. Use evidence/phase13/HANDOFF.txt for production/artifact records and the isolated release source for any follow-up specifically to this deployment.

## One normal-anime youth sample added locally (2026-10-18)

- The requested first sample means the normal anime-relaxed-simplified variant (first of the recent2), not the original catalog's watercolor. Parent supplied fresh output libfile_e9b6b93243b481918f94fceb1b4f1ff4 generated with the exact separately frozen young-man-relaxed-simplified prompt; girl style text is unchanged, only independent youth scene replaces station. Parent-confirmed submission02:24:51Z/completion02:25:18Z; raw call log/model/seed were not supplied.
- Keep original75 youth prompt manifest and original6 result/image pairs untouched. Importer now permits this1 explicit additional frozen manifest, checks hashes and matching catalog style/scene, and appends a7th result. Newer style lookup uses current catalog only when absent from historicalStyles; old75 retain historical prompts. Pastel youth and other pending styles remain ungenerated (7 ready/70 pending).
- Preserve original PNG outside public assets; site receives a separately hashed WebP. Show observed detail/texture limits, unknown model remains null. No further generation/publication/Git push/merge. Continue only in current local codex/young-man-benchmark-preparation and preserve separate color-review hold.

## Youth scene source correction (2026-10-18)

- Owner clarified that the intended source predates SUNFLOWERS-BUS-STOP-V1 and shows wider framing/one hand in a pocket. Do not treat the normal-anime youth image sourced from the later waist-up/both-hands scene as a correct comparison. Its immutable generation history/PNG remain archived; young-man-rejected-samples.json excludes its exact source hash from display/comparison (original6 stay visible).
- Recovered original generation log (2026-09-23T06:44:39.925Z) and saved sunflower-source-record.json (2026-10-12 08:56 JST) contain identical short dawn scene plus original watercolor paragraph. Issue11 has the same short scene. Original image visibly has one hand in pocket, but prompt contains no pocket or explicit wider-framing instruction. Never invent those words or claim a separate pocket-explicit prompt was found. See evidence/phase17/source-verification.json. Prior SUNFLOWERS-BUS-STOP-V1 is a later separate scene version, not the original saved brief.
- Prioritize source verification. No new combined generation text, image generation or deployment until the corrected source is settled. Preserve unrelated pending work and fixed-color review hold.

- Parent subsequently confirmed the short original scene text from the original Slack record and authorized combining it unchanged with the current normal girl style. Latest corrected generation handoff is young-man-original-brief-relaxed-simplified-prompts-before-generation.json, benchmark sunflowers-original-brief-v1, distinct from the later expanded scene. No pocket or wider-framing clause added, no image generated. Treat any future incoming output against this corrected manifest, preserving the prior wrong-scene output as rejected history.

## Correct original-brief youth output activated locally (2026-10-18)

- Parent supplied fresh libfile_e6b72cf2da248191969df22caa56b671 with exact corrected combined SHA c0bece1875e32172d7fbf00f4beb969de69f5d8201e016455aecaa12b3ef2817, no references, opaque background, generated03:15:18–03:15:46Z. Current girl's normal style is unchanged; original short scene is unchanged with no pocket/framing clause added.
- Active youth selection now uses SUNFLOWERS-ORIGINAL-BRIEF-V1 and only this1 actual sample. Other76 are pending, using the same current girl rendering text. Old6 expanded-scene samples and the rejected7th record/files remain intact in their legacy collection and must not be displayed/compared as matching this new brief. Scene versions and result collections are separate; do not rewrite old provenance or relabel old images.
- New original-brief importer checks frozen text/hash/current girl equality, scene version, fresh source and timing, then writes a separate source-hashed derivative/result. Preserve original PNG. No public deployment, new generation, push or merge; color-review hold remains.

## Approved detailed full-body youth image activated locally (2026-10-18)

- Owner approved1 new detailed composition sample, normal anime-relaxed-simplified only. Parent supplied libfile_665c2e7ac1a08191a13cacfe69a9c1e3, file_00000000c90081f7a03454545de7a89e, based on saved full-body-detailed scene and unchanged normal girl's rendering text. No further generation now; continuation is deferred.
- Active youth track is SUNFLOWERS-FULL-BODY-DETAILED-V1 with1 ready/76 pending. Original short-brief sample, old expanded6 and rejected sample remain in their separate collections/files unchanged. Do not relabel them as detailed-prompt outputs. Draft frozen manifest remains an immutable preapproval snapshot; new result separately records local adoption.
- New PNG is preserved with a distinct WebP derivative. Canonical combined text is assembled from parent-declared saved parts; raw call text/exact times/reference/background parameters were not supplied in this handoff and must not be fabricated. Keep absent call metadata null and provenance explicit. Do not claim repeated-generation framing stability from this1 result.
- Work only in existing local branch, preserving user changes and color-review hold. No publication, Git push or merge. Keep Mac UI untouched during background validation.

## Fixed-color review resumed for Monday (2026-10-18)

- Owner's latest instruction authorizes progressing the separately held color review tonight, preparing changes and a few samples for Monday. This supersedes the earlier individual-instructions hold for this scope. Work silently; Mac use is permitted. No publication, push or merge.
- Exact scope: fixed-palette candidates2,4,5,54,60,65,67–74; ambiguous3,66; separate hair63. This is distinct from previous14 subject/scene-generalization replacements and the new76/77 styles/youth track. Keep excluded1,6,56,59,62,64,75 and their background palettes/grading unchanged.
- Preserve original prompt/image pairs. Revised clauses are stored separately in station-color-review-v1.js and the hashed station-local-color-review-v1-prompts-before-generation manifest. Do not import these into the active gallery until matching outputs and the medium tradeoffs have been reviewed; historical images are not examples of revised prompts. This is a data/provenance constraint, not a request for additional approval before preparing the review work.
- Remove mandatory object-surface hue replacement; retain grayish/pale tone, value/saturation controls, paper ground, line/ink colors, monochrome/pencil/charcoal techniques. Ink-wash's forced rust-red accent is in scope, not its grayscale medium. Blue ballpoint/continuous-line ink remains drawing material rather than a blue object-fill mandate.
- Three review outputs only: normal station pixel-art and small-palette risograph; hair63 diagnostic with only dark-brown hair changed to golden-blond. Diagnostic scene is explicitly separate from STATION-MAP-V3. Preserve exact call text, hashes, timestamps and original PNGs in evidence/phase21; no image references or extra prompt text. No activation of these review outputs.
- Monday decisions: strict2-color risograph versus enough scene-derived inks; sparse-color/omitted-color policy for4/68/69/73; whether pixel detail, risograph multicolor and hair-probe line detail preserve the intended visual character. All17 revised normal-station prompts are prepared, only2 have matching normal-station review outputs;63 has a diagnostic output only, other15 normal-station outputs remain ungenerated. Do not claim repeatability from single outputs.

## Remaining normal color-review samples requested (2026-10-19)

- Owner Slack1792383089.398309 explicitly requested generating the revised prompts without samples and adding them to the existing4180 phase21 comparison. This supersedes the earlier three-output limit for this specific review preparation. Preserve existing2 normal outputs and blond diagnostic; generate only the missing15 normal scenes from the exact frozen17-entry manifest, without new style or scene edits, references or extra prompt text.
- New15 outputs are recorded separately in evidence/phase21/additional-normal-generation-plan.json and additional-normal-generation-results.json, with exact actual call records, immutable original PNGs and checksums. No duplicate calls/retries. Normal coverage is now17/17; blond diagnostic remains separate. Earlier frozen manifests and three-result history retain their historical status/content.
- Review page uses each matching normal-scene result beside its old image and keeps the blond probe in a separate section. This does not activate revised styles in the77-entry gallery or modify youth. Keep quality deviations visible: broad accent coverage, extra hues, fine detail, and weakened simplification remain review questions. Do not claim repeatability or a controlled causal comparison from these one-off generations.
- Background generation/file/headless QA only. Keep the foreground browser available for Search Console work. No publication, push or merge requested.

## Four medium rules revised after review (2026-10-19)

- Owner Slack1792390051.650419 chose2-color restrictions for risograph2 and printed comic54; black ink plus1 accent for ink-wash4; pixel5 may remap to8 or16 colors. Parent confirmed testing an explicit16-color proposal first. This supersedes blanket local-color preservation only for these4 review candidates. Other13 V1 candidates and all active catalog/youth records remain unchanged.
- Concrete hues are provisional executor choices, not owner-final choices: risograph ultramarine+ochre; printed comic near-black+vermilion (outline ink counts within2); ink-wash black+muted-teal accent; pixel custom16 listed hexadecimal RGB values. Paper and overlapping ink tones are described separately from ink count. Keep medium/ink count distinct from decoded RGB color count.
- New module station-color-review-v2-four.js and separately hashed frozen manifest retain the exact unchanged STATION-MAP-V3 scene and original medium clauses, with new palette/recoloring priority.4 exact reference-free opaque built-in image_gen calls produced separate original PNGs in evidence/phase22/samples. Do not overwrite or relabel original or V1 outputs.
- Same4180 phase21 comparison now shows original/V1/V2 for only4 target rows. Archive review-v1-preserved.html retains the previous full comparison. All other13 rows remain unchanged. Current images are review outputs, not activated/published replacements.
- Observed limitations stay visible: the pixel PNG has290238 distinct RGB triples, so exact16-color compliance is not achieved; no quantization was applied. Ink-wash places a broad teal accent on the train rather than the requested small main-subject region. Two-ink-looking raster outputs do not prove true2-plate separations. Palette choice, pixel8-vs16 choice and output deviations remain review items. No publication, push or merge.

## Owner adopted all17 into the working site (2026-10-19)

- Owner Slack1792391395.504679 explicitly chose all17 replacements for this existing working branch and the later phase22 version for the additional4. This authorizes local activation of risograph2, ink-wash4, pixel5 and printed comic54 from V2; the other13 come from the matching normal STATION-MAP-V3 phase21 V1 outputs. Never use the blond diagnostic as the normal63 sample. No new generation requested.
- Preserve preColorReviewStyles, original historicalStyles, benchmark-manifest-before-station-color-adoption.json, prior PROMPT_LIBRARY export, all original/V1/V2 records and image assets. New adopted17 records live in station-color-adoption-active-samples.json and use distinct /images/station-color-adopted/ WebP derivatives with original PNG and derivative hashes. Current benchmark manifest/export match the exact selected English style+unchanged independent scene text.
- Update only these17 entries, their matching metadata and sample observations. Keep other60 styles/records unchanged, including the normal/pastel additions and active detailed youth image. English/Japanese copy actions always use the same English prompt parts. Preserve actual prompts verbatim rather than revising them after generation; negative sample-color exclusions in the adopted ink prompt are part of its saved rendering instructions.
- Bilingual metadata removes superseded fixed-color/count descriptions where the adopted prompt changed them, including the warm-accent-only ballpoint name and four/five-color claims. Retain visible limitations: pixel16-color request is not exact16-color output, ink accent placement deviates, some sparse treatments have broader color/detail. Original model/seed stay null; do not invent them.
- Work only in codex/young-man-benchmark-preparation and preserve uncommitted changes. Verify source/derivative hashes, exact saved copy strings, both locales, scene switching/comparison, tests/build and background preview. No Git push, merge or production publication.

## One detailed youth watercolor and removal of legacy label (2026-10-19)

- Owner Slack1792393173.554459 requested one fresh youth watercolor using the supplied full-body scene verbatim and the current girl's watercolor style byte for byte. The prior transport-disconnected attempt performed no generation or edits; after Mac reconnection, verified no matching prior record, froze exact parts, and made exactly1 reference-free opaque built-in image_gen call. No other image generation.
- New frozen manifest young-man-detailed-watercolor-prompts-before-generation.json records sceneSHA26bbe9b259679c9561cb875f96e35f959c80ddef0e21048576e3ece67125af5e, styleSHA22ee49705cad9533af04d1f20b404fc8714806191d43ac89a6a586af371e2b38 and combinedSHA71e19a6e139e005c69132362e2dea155beb57754d00e8ed4d81ae24afe4974a1. Preserve user text and girl style unchanged.
- Store the new1 result separately in young-man-detailed-watercolor-generation-results.json; retain original detailed anime record/history unchanged. Both share SUNFLOWERS-FULL-BODY-DETAILED-V1. Active youth now2 ready/75 pending; no old expanded-watercolor image is reused or relabeled. Original PNG, exact call/timestamps and comparison artifacts are in evidence/phase24. Unknown model/seed remain null.
- Owner1792393265.329009 asked to remove the confusing “既存6種類” label from both scenes. Remove its English “Original six” counterpart too, including card chip, detail heading suffix and family-filter option. Keep the internal original family key, six styles, order, density tags, prompts and image records intact. Do not invent a replacement label.
- Keep adopted17 station pairs and remaining station catalog byte-identical. Prepare comparison-only girl/youth watercolor preview, preserve previous outputs, and validate both locale copy actions, no legacy/empty tags, build/tests and background preview. No publication/push/merge.

## All77 youth styles synchronized before generation (2026-10-19)

- Latest owner1792396914.905449 requests scene-first, identical-girl-style-second, then image generation and local integration, with titles/benchmark corrected (1792396943.654889). Read the actual Slack message and verified its scene bytes equal phase24 user-scene-verbatim.txt and detailed sceneSHA26bbe9b259679c9561cb875f96e35f959c80ddef0e21048576e3ece67125af5e. Do not rewrite any frozen scene/style text.
- Prepared77-entry mapping of canonical style slug/order, identical JA/EN style names, tags, same scene text, current girl style, exact combined prompt and hashes BEFORE new generation. Frozen file young-man-all-current-styles-prompts-before-generation.json/hash; phase25 pre-generation data/UI checks prove ordering. Retain benchmark ID because the actual scene bytes are unchanged, and display the correct localized youth scene title next to it. Global brand/document title remains unchanged.
- Both correct existing watercolor and normal relaxed-anime outputs match the exact planned combined text and hashes; reuse them without regeneration. New generation scope is remaining75, one reference-free opaque built-in call per style. Save each request before invocation and completed call/output before import. Never retry an unresolved request; inspect saved state first. No references, extra text, changed palette, old output reuse, or post-hoc prompt edits.
- New outputs enter young-man-all-current-styles-generation-results.json and distinct previously absent /images/young-man-full-body-detailed/<slug>.webp paths. Preserve old6/short-brief/rejected histories and existing2 accepted records/images. Validate current girl text and frozen mapping on every import. Include honest bilingual observations, especially color/media deviations; one sample does not establish repeatability. Update preview progressively and verify the complete set after generation.
- Owner clarified tags should be appropriate, not only removed. Current first6 now use Painting & drawing / Printmaking / Ink drawing / Pixel art / Photographic categories according to actual technique in both scenes/locales; historical original-family records remain archived. Update current filter options consistently. No “original six” catchall or empty chips. All other style names/technique strings and station image records are preserved.
- Background commands only while Discord uses the foreground browser. No publish, push or merge. Full work and progress/call records are in evidence/phase25.

- Final local coverage is77/77:75 new outputs plus the2 verified reused outputs;0 pending. All75 requests and actual returned originals are preserved, every result has bilingual visual observations, and current girl77 image records/prompt bytes plus the2 prior correct youth records remain unchanged. No additional retries or regeneration.
- Verified50 Node tests,308 detail views,942 exact clipboard checks,154 comparison images,48 filter/search/sort/keyboard scene-switch checks, both locales and320/390/820/1487px widths. Headless browser ran in the normal execution environment after the sandbox blocked Chromium's Mac bootstrap port; no foreground browser was opened. Evidence: phase25/verification.json, controls-verification.json and HANDOFF.txt.
- Keep known output limitations visible: youth pixel PNG has311002 RGB colors, so exact16-color compliance is false; no quantization was applied. Ink-wash retains extra coat/flower hues beyond the requested black+teal, several monochrome outputs retain faint warm color, and many simplified styles keep dense background detail. These are observed deviations in actual saved outputs; do not silently recolor images, revise prompts after generation or claim repeatability. Work remains local and unpublished.

## Owner approved saving the integrated branch (2026-10-19)

- The owner completed review and approved committing and pushing the integrated result to codex/young-man-benchmark-preparation. This supersedes the earlier local-only/no-push restriction for this branch save. Preserve all approved active images, exact prompt parts, titles, tags, benchmarks and required immutable provenance/history. The owner explicitly accepted faint color remaining in some samples; no further recoloring or regeneration is requested.
- Check the actual GitHub branch/PR and latest tree before saving, preserve unrelated local changes, exclude credentials and build/runtime artifacts, and verify the saved remote tree. Keep the existing local origin configuration intact; use a separately verified GitHub destination. No merge, production publication or deployment is authorized. Use background commands only.
