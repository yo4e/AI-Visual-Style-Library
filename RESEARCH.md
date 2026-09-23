# AI Visual Style Library — Competitive & Product Research

Research date: 2026-09-23

This document records Phase 0 research for Issue #1. It is intended to guide product and content decisions before implementation.

> Scope note: keyword findings below are based on current English-language SERP patterns and competitor content, not paid search-volume data. They should be treated as directional until Search Console or a keyword-volume tool provides real demand data.

## 1. Executive summary

The market is crowded with three common formats:

1. SEO listicles such as “30/50/100 AI art styles”
2. copy-paste prompt galleries
3. model-specific prompt/style libraries, especially for Midjourney

A thin “style card + pretty image + prompt” site would be easy to build but difficult to defend.

The strongest opportunity is to build **a visual dictionary and comparison instrument**, not a prompt dump:

- keep benchmark subjects controlled so users can see what the style actually changes
- give every style a canonical, indexable page
- describe visible properties in plain language: medium, line, texture, palette, light, composition
- support discovery from outcomes and moods, not only formal art-history terminology
- separate reusable prompt vocabulary from one copy-paste prompt
- connect near-neighbor styles through explicit comparisons
- explain caveats and failure modes
- remain model-agnostic at the core, with model-specific notes as secondary metadata

The product should feel closer to a **field guide / visual reference book** than an “AI tools” landing page.

## 2. Closest competitors

| Competitor | Approx. scale / positioning | Useful ideas | Weakness / opening for us |
| --- | --- | --- | --- |
| [AI Style Atlas](https://aistyleatlas.com/en/) | 194 styles, 16 categories, 14 languages. One fictional face held constant across styles. | Excellent controlled comparison; individual style pages; before/after slider; prompts, negative prompts, parameters, tool compatibility, difficulty, tags. | Portrait-first benchmark biases the library toward character transformation. Taxonomy mixes true styles with output formats, game assets, avatars, collectibles, etc. Strong benchmark, but room for a cleaner visual-language taxonomy and broader subject transfer notes. |
| [Art Styles Pro](https://www.artstyles.pro/) | 103 styles across 8 categories; interactive catalog. | Strong visual browsing, search, one-tap prompt phrase, collectible-card presentation. | Prompt utility is emphasized more than deep reference value; opportunity for stronger explanations, comparisons, provenance, and use-case reasoning. |
| [Find Image Prompt — AI Art Styles](https://findimageprompt.com/gallery/ai-art-styles) | 34 style pages with families, prompts, model/settings context. | Individual style pages; model-agnostic language; visible-technique approach; internal funnel from reference to generation tools. | Smaller taxonomy; commercial generator funnel can compete with neutral-reference credibility. |
| [Dreamify — AI Art Styles](https://dreamify.art/fr/styles) | Compact style catalog with prompt keywords and use-case links. | Clear “what defines the look” framing; style + use-case combinations; internal linking to models/glossary. | Limited breadth and comparison depth; opening for richer controlled examples and related-style navigation. |
| [Design Style Book](https://www.designstylebook.com/) | Large non-AI visual reference spanning architecture, graphic design, typography, industrial design, interiors, cinematography, tattoo. | Very strong reference-book identity, historical context, provenance/legal notes, real examples, category depth, compare/prompt extensions. | Much broader than AI prompting; not optimized around reproducible AI image language. This is an important adjacent benchmark for editorial credibility. |
| [Gera Tools — Art Style Prompt Library](https://geratools.com/art-style-prompt-library) | Searchable vocabulary of dozens of movements/styles. | Simple search, concise categories, copy-ready prompt terms, educational intro. | Mostly a single-page utility; limited canonical style-page SEO and comparison structure. |
| [Sean Bair — Artistic Style Prompt Library](https://seanbair.ai/artistic-style-prompt-library.html) | Roughly two dozen styles, prompts for four platforms. | Platform-specific prompt variants; low-friction single-page search. | Small scale, little comparison architecture, weak long-term moat. |
| [AI Visual Prompt Cookbook](https://github.com/VigoZhao/AI-Visual-Prompt-Cookbook) | 100+ structured style systems, multilingual, open-source JSON workflow. | Reusable structured style definitions, variables, repeatability, machine-readable assets. | Technical / workflow-heavy. Less suited to a beginner asking “what look do I want?” Opportunity for human-first discovery with structured data underneath. |
| [VOAO/AI](https://prompts.voao.co/) | 500+ Midjourney prompts / SREF looks with paid access. | Strong browse-copy-generate loop and commercial validation for style discovery. | Midjourney-specific and transactional; less educational, less model-agnostic. |
| [Envato — Best AI art styles](https://elements.envato.com/learn/best-ai-art-styles) | Editorial article using one shared subject across 15 styles. | Validates controlled-subject comparison as an understandable teaching device. | Article/listicle format does not scale into a navigable reference library. |

Large-domain SEO competitors such as Figma, Adobe, Kling and image-generator companies also rank for generic “AI art styles” queries. They are not exact product competitors, but they raise the bar for generic informational keywords.

## 3. Reference-site takeaway

The originally referenced prototype URL (`style-atlas-100.sssscryptoman.chatgpt.site`) was not reliably crawlable during this research pass, so no detailed claims about its current implementation are recorded here.

The important product signal from that reference is still valid: **seeing the same subject transformed across many styles is immediately understandable**. Current competitors independently validate this pattern. AI Style Atlas makes it the core product, and Envato recently used the same-subject method in an editorial guide.

We should adopt the comparison principle without cloning another site's taxonomy or presentation.

## 4. Search / SEO landscape

### Generic head terms

Current search results for queries around:

- `AI art styles`
- `AI image styles`
- `AI style prompts`
- `art styles for AI prompts`

are crowded by:

- major design/tool brands
- generator-company blogs
- “N styles” listicles
- prompt galleries

This means a generic homepage alone is unlikely to be the main organic-growth engine.

### Style-specific terms

Specific style queries such as watercolor, Art Deco, pixel art, risograph, etc. commonly surface dedicated guides or niche prompt pages. This supports the existing **one style, one canonical page** architecture.

Each style page should target a cluster rather than a single phrase:

- `{style} AI prompt`
- `{style} AI art style`
- `{style} prompt keywords`
- `{style} image generation`
- `what is {style}`
- `{style} visual characteristics`
- `{style} vs {related style}`

### Use-case long tail

Queries around outcomes such as children's-book illustration, editorial illustration, posters, advertising, concept art and social content produce dedicated guides. These pages have clearer task intent than generic style lists.

Recommendation: do **not** postpone use-case landing pages too far. Launch with a small number of strong use-case hubs once the first style pages exist.

Early candidates:

- `/use-cases/childrens-book-illustration`
- `/use-cases/editorial-illustration`
- `/use-cases/poster-design`
- `/use-cases/game-concept-art`
- `/use-cases/product-advertising`
- `/use-cases/album-cover`

### Comparison queries

`X vs Y` is a natural fit for the controlled-benchmark system and offers a page type that listicles handle poorly.

Examples:

- risograph vs screen print
- watercolor vs gouache
- Art Nouveau vs Art Deco
- pixel art vs low-poly 3D
- film noir vs neo-noir
- flat vector vs line art

Comparison should therefore be a product feature **and** an indexable content family.

## 5. Taxonomy finding: separate “style” from “output format”

Competitors often mix different ontological levels in one flat library:

- medium: watercolor
- movement: Art Deco
- treatment: duotone
- era aesthetic: Y2K
- output format: magazine cover
- asset type: game sprite
- subject/use case: professional headshot
- camera/framing modifier: bird's-eye view

This increases apparent catalog size but makes the library semantically muddy.

AI Visual Style Library should keep these dimensions separate.

Recommended core dimensions:

1. **Style identity** — the canonical thing that gets a style page
   - movement / tradition
   - medium / process
   - recognizable visual aesthetic
2. **Visual attributes** — flat, grainy, geometric, painterly, glossy, high-contrast, etc.
3. **Era / cultural context** — 1920s, mid-century, Y2K, etc.
4. **Mood** — dreamy, eerie, elegant, playful, severe, nostalgic
5. **Use case** — editorial, children's book, product advertising, poster, game concept art
6. **Output format** — portrait, poster, card, icon, sprite, album cover
7. **Modifiers** — camera angle, framing, lens/film cues, lighting, aspect ratio

This is an important differentiation point. A user should be able to combine these dimensions instead of browsing a single flat list that calls everything a “style.”

## 6. Product differentiation decisions

### A. Controlled benchmark is a core feature, not decoration

For MVP, every style should include one controlled benchmark image generated from the same benchmark brief.

A single portrait is highly legible but can bias the library. Recommendation:

- MVP: one fictional human benchmark, because differences are easy to perceive and it gives the index immediate visual coherence
- post-MVP: add 2–3 additional benchmark subjects, especially an environment and an object/product

Store a `benchmarkSubjectId` and generation metadata from day one so multiple benchmark tracks can be added later without redesigning the content model.

### B. Reverse lookup is strategically valuable

Many users know the desired effect but not the term.

Search/filter language should include observable phrases such as:

- soft paper texture
- bold black outlines
- limited colors
- handmade / imperfect
- glossy 3D
- dreamy pastel
- hard flash photo
- retro print
- geometric poster

This can later support a sentence-style reverse lookup: “I want something rough, two-color, printed, and indie.”

### C. Prompt vocabulary beats “magic prompt” positioning

Each page should expose the reusable building blocks:

- medium / process
- line / edge behavior
- palette
- surface / texture
- lighting
- composition
- era cues

Then provide an example prompt as a demonstration, not as the page's only payload.

### D. Related-style graph should be explicit

Each page should link to 3–6 related styles and explain the relationship:

- “similar texture, cleaner geometry”
- “same era, different medium”
- “same handmade feel, higher color density”

This helps both discovery and internal SEO linking.

### E. Failure modes are useful content

Competitors increasingly provide practical notes, but this is still inconsistent. Include a short “Watch for” section, for example:

- watercolor becoming opaque digital paint
- risograph becoming generic grain overlay
- pixel art becoming smooth low-res illustration
- film noir becoming merely grayscale

## 7. Recommended individual style page

Above the fold:

1. style name + one-sentence definition
2. controlled benchmark image
3. before/after or benchmark comparison control
4. compact visible-characteristics chips
5. copyable **prompt vocabulary**

Reference section:

6. what defines the style
7. visual characteristics: line, color, texture, light, composition
8. where it works well / where it does not
9. example prompt
10. common failure modes
11. model-specific notes only when materially different
12. related styles
13. “compare with …” links
14. provenance / generation metadata

The page should still be useful if the copy button is removed. That is a useful quality test.

## 8. Monetization observations

Comparable sites use four main patterns:

- display ads on long editorial/reference pages
- funnels into their own image generator
- affiliate/tool referrals
- paid prompt libraries / subscriptions

Examples:

- Design Style Book visibly includes advertising while retaining reference content.
- VOAO uses paid access to a Midjourney prompt/SREF library.
- Figma, Adobe, Kling and generator-company guides use style content as a product-acquisition funnel.
- Open-source prompt libraries monetize indirectly through reputation/community rather than ads.

Recommendation for this project:

1. launch without aggressive monetization
2. design stable future ad slots so ads do not cause layout shift
3. keep style cards and ads visually unmistakable
4. prefer neutral reference credibility over early affiliate clutter
5. only add tool referrals when the recommendation genuinely helps the user

## 9. Legal / editorial findings

This is product/editorial guidance, not legal advice.

The U.S. Copyright Office has stated that copyright law does not protect an artistic style as a separate element of a work, while also acknowledging serious concerns around AI systems imitating individual creators. That does **not** make living-artist imitation risk-free: specific outputs may implicate copyrighted expression, publicity/unfair-competition theories may vary by jurisdiction, and names/brands/franchises can create separate trademark concerns.

Editorial rules for this library should therefore be conservative and durable:

- do not make living artists' names canonical style entries
- prefer technique / medium / movement / era / visible-property descriptions
- avoid franchise-name or studio-name style labels when a descriptive alternative works
- distinguish recognized historical movements from informal AI-era aesthetics
- store image provenance and generation metadata
- publish a clear provenance / rights / takedown policy before public launch
- avoid using third-party artwork as decorative reference imagery unless its license/permission is clear

Useful descriptive replacements:

- not `Pixar style` → `feature-animation 3D`
- not a living illustrator's name → describe line quality, palette, material, composition, era, and mood

## 10. Recommended MVP scale

**40 styles** is a better launch target than racing to 100.

Why:

- enough breadth to feel like a real library
- small enough to maintain visual consistency and original writing
- supports meaningful category/use-case hubs
- avoids 60 extra thin pages that dilute quality

The important launch metric is not raw style count. It is whether each page feels worth bookmarking.

## 11. Candidate launch set: 40 styles

Balanced for recognizability, useful prompting vocabulary, medium coverage, comparison potential, and likely search intent.

### Painting / drawing / print

1. Watercolor
2. Gouache
3. Oil Painting
4. Acrylic Painting
5. Ink Wash
6. Graphite Pencil
7. Charcoal Drawing
8. Colored Pencil
9. Risograph
10. Screen Print
11. Linocut / Woodcut
12. Collage

### Historical movements / graphic languages

13. Impressionism
14. Post-Impressionism
15. Art Nouveau
16. Art Deco
17. Bauhaus
18. Swiss / International Typographic Style
19. Constructivism
20. Pop Art
21. Surrealism
22. Ukiyo-e

### Illustration / comics / animation

23. Flat Vector Illustration
24. Editorial Illustration
25. Storybook Illustration
26. Ligne Claire
27. Halftone Comic
28. 1990s Cel Animation
29. Modern Anime / Cel-shaded Illustration
30. Minimal Line Art

### Photography / cinema

31. 35mm Color Film
32. Black-and-White Street Photography
33. Film Noir
34. Fashion Editorial Photography
35. Instant Film

### Digital / 3D / contemporary

36. Pixel Art
37. Low-poly 3D
38. Clay / Stop-motion Look
39. Synthwave
40. Y2K Chrome / Glossy 3D

Notes:

- “Cyberpunk” is useful but behaves partly as genre/content rather than pure style; consider adding it early if user demand warrants it, but tag it carefully.
- “Children's book” should be a use case, with several compatible styles, rather than one canonical style.
- “Magazine cover”, “album cover”, “game sprite”, etc. should be output formats/use cases, not style entries.

## 12. Domain recommendation

Use a custom domain for public launch, but do not let domain acquisition block research or prototype work.

Recommendation:

- acquire a short, brandable domain once the final public name is chosen
- do not over-optimize for an exact-match SEO domain
- keep canonical URLs stable from first indexed launch
- avoid launching the indexed production site on a temporary prototype subdomain if a domain decision is imminent

Domain availability was not treated as verified in this research pass.

## 13. MVP priorities after research

P0:

- controlled benchmark image system
- canonical style pages
- clean taxonomy that separates style, use case, output format and modifiers
- style index with text + faceted filtering
- original visual-language explanations
- prompt vocabulary
- related-style graph
- provenance metadata
- static SEO fundamentals

P1:

- 2-style comparison with shareable/indexable comparison pages
- 4–6 use-case landing pages
- second benchmark subject
- model-specific notes where useful

P2:

- natural-language reverse lookup
- multilingual expansion
- richer comparison matrix / prompt-difference highlighting
- saved collections or exports

## 14. Main design conclusion

The defensible version of AI Visual Style Library is not:

> “Here are 100 cool AI styles and prompts.”

It is:

> **A structured visual vocabulary for people who can recognize a look before they know its name, with controlled examples that let them compare styles and reusable language that lets them reproduce the look.**

That should be the standard used to judge every implementation decision.
