# AI Visual Style Library - Product & Technical Design

Status: research-informed v2

See also: [`RESEARCH.md`](./RESEARCH.md)

## 1. Product summary

**AI Visual Style Library** is an English-language visual reference site for discovering, comparing, understanding, and describing visual styles for AI image generation.

The core user problem is:

> “I know roughly what I want it to look like, but I do not know what the style is called or how to describe it.”

The site should solve that problem visually first, then provide the vocabulary needed to reproduce the look.

This is not primarily a prompt gallery. It is a **searchable visual dictionary and comparison instrument** for creators.

Long-term goals:

- become a bookmark-worthy visual reference, not a one-visit prompt list
- attract international organic search traffic
- scale to hundreds or thousands of high-quality style pages without semantic chaos
- make style differences easy to compare under controlled conditions
- provide model-agnostic visual vocabulary with optional model-specific notes
- support future advertising without degrading trust or usability

## 2. Product position

Positioning statement:

> **AI Visual Style Library is a structured visual vocabulary for people who can recognize a look before they know its name, with controlled examples for comparing styles and reusable language for reproducing them.**

A useful quality test:

> If the copy-prompt button disappeared, would the page still be worth bookmarking?

If the answer is no, the page is too thin.

## 3. Core product principles

### 3.1 Visual first

A visitor should understand the difference between styles before reading a long explanation.

### 3.2 Controlled comparison is core infrastructure

Every canonical style should include a benchmark image created from a controlled reference subject and repeatable generation brief.

For MVP:

- use one fictional human benchmark subject across all compatible styles
- keep identity, framing, and base composition as stable as practical
- allow style requirements to override clothing/material details when necessary
- record the benchmark subject ID and generation metadata

Post-MVP:

Add additional benchmark tracks, especially:

- environment / landscape
- object / product
- optional poster / graphic composition

A portrait-only atlas is visually clear but can bias the library toward character transformation, so the data model must support multiple benchmark subjects from day one.

### 3.3 One canonical style, one canonical page

Every true style gets an indexable URL:

```text
/styles/watercolor
/styles/risograph
/styles/art-deco
/styles/film-noir
```

Do not inflate the style count by treating output formats, camera angles, or use cases as styles.

### 3.4 Search by desired result, not only terminology

The library must work for people who do not know art-history or design vocabulary.

Useful discovery language includes:

- soft paper texture
- bold outlines
- limited colors
- rough handmade print
- glossy 3D
- dreamy pastel
- hard-flash photo
- geometric poster
- luxury editorial
- vintage sci-fi

### 3.5 Prompt vocabulary before magic prompts

Each page should explain the visible building blocks of the style:

- medium / process
- line / edge behavior
- palette
- texture / surface
- lighting
- composition
- era cues

A full example prompt is useful, but it should demonstrate the vocabulary rather than replace it.

### 3.6 Model-agnostic core

The durable layer is visual language, not syntax for one generator.

Model-specific tips can be added when they materially improve results, but a style page should remain useful when a model version changes.

### 3.7 Related styles form a graph

Every style should link to 3 to 6 related styles with a short relationship explanation, such as:

- same medium, cleaner geometry
- similar texture, more saturated palette
- same era, different printing process
- similar mood, more photographic treatment

This supports both discovery and internal linking.

## 4. Target audiences

Primary:

1. AI image-generation users looking for visual vocabulary
2. designers and illustrators exploring directions
3. writers, game developers, and video creators building moodboards
4. marketers and content creators selecting a look
5. beginners who know the desired result but not its name

Secondary:

- educators and students learning visual language
- developers building prompt / creative interfaces
- researchers comparing model behavior across styles

## 5. Information architecture

### Home

Purpose:

- explain the product in one sentence
- make visual discovery immediate
- surface major style families and use cases
- demonstrate the controlled benchmark concept

Suggested sections:

1. hero search / reverse-discovery entry
2. benchmark comparison strip
3. Browse by Medium / Movement / Aesthetic
4. Browse by Mood / Visual Trait
5. Browse by Use Case
6. Popular Styles
7. Recently Added
8. Compare Styles

### Style index

Route:

```text
/styles/
```

Features:

- dense visual grid
- text search
- faceted filtering
- URL-persisted filter state
- alphabetical / popular / newest sorting

Primary filter dimensions:

- style family
- medium / process
- era / cultural context
- visual attributes
- mood
- compatible use cases

Do not mix output formats and modifiers into the same “style category” filter.

### Individual style page

Route:

```text
/styles/{slug}
```

Recommended order:

1. style name
2. one-sentence definition
3. controlled benchmark image
4. before/after or benchmark comparison control
5. visible-characteristic chips
6. copyable prompt vocabulary
7. what defines this style
8. line / color / texture / light / composition breakdown
9. suitable subjects / use cases
10. example prompt
11. common failure modes / “watch for” notes
12. optional model-specific notes
13. related styles
14. compare-with links
15. provenance / generation metadata

### Compare

Route:

```text
/compare/
```

MVP or first post-launch goal:

- compare 2 styles side by side using the same benchmark subject
- preserve selection in the URL
- make useful comparison states shareable

Growth version:

- compare 2 to 4 styles
- index selected editorial comparison pages such as `/compare/watercolor-vs-gouache`
- highlight differences in prompt vocabulary
- switch benchmark subjects

### Categories / style families

Category pages must be indexable landing pages, not JavaScript-only filters.

Examples:

```text
/categories/painting-and-drawing
/categories/printmaking
/categories/photography
/categories/graphic-design
/categories/illustration
/categories/comics-and-animation
/categories/digital-and-3d
/categories/historical-movements
```

### Use cases

Use-case pages should appear relatively early because search intent is strong and practical.

Initial candidates:

```text
/use-cases/childrens-book-illustration
/use-cases/editorial-illustration
/use-cases/poster-design
/use-cases/game-concept-art
/use-cases/product-advertising
/use-cases/album-cover
```

A use-case page should recommend multiple compatible styles rather than pretending the use case itself is one style.

### Glossary / modifiers

Later, create a separate vocabulary layer for framing, lighting, camera, and process terms.

Examples:

```text
/glossary/halftone
/glossary/chiaroscuro
/glossary/low-angle
/glossary/hard-flash
```

These terms can be reusable across many style pages without polluting the style taxonomy.

## 6. Taxonomy

The system should separate different semantic dimensions.

### 6.1 Style identity

The canonical thing that can receive a style page:

- recognized movement or tradition
- medium or visual process
- durable, recognizable aesthetic

Examples:

- watercolor
- risograph
- Art Nouveau
- Swiss International Style
- film noir
- pixel art

### 6.2 Visual attributes

Examples:

- flat
- painterly
- geometric
- photorealistic
- minimal
- maximalist
- grainy
- glossy
- hand-drawn
- high-contrast
- limited-palette

### 6.3 Era / cultural context

Examples:

- 1920s
- mid-century
- 1970s
- 1990s
- Y2K

### 6.4 Mood

Examples:

- dreamy
- eerie
- cheerful
- elegant
- nostalgic
- dramatic
- whimsical
- severe

### 6.5 Use case

Examples:

- editorial
- children's book
- fashion
- product advertising
- concept art
- game asset
- poster
- album cover

### 6.6 Output format

Examples:

- portrait
- poster
- card
- icon
- sprite
- album cover
- magazine cover

### 6.7 Modifiers

Examples:

- framing
- camera angle
- aspect ratio
- lens / film cues
- lighting treatment
- viewpoint

The library should allow combinations across these dimensions rather than flattening all of them into one giant style list.

## 7. Content model

Use structured content rather than hard-coded page markup.

Suggested shape:

```ts
interface VisualStyle {
  slug: string;
  name: string;
  aliases?: string[];
  shortDescription: string;
  definition: string;

  family: string;
  mediums: string[];
  visualAttributes: string[];
  eras: string[];
  moods: string[];
  useCases: string[];
  compatibleFormats?: string[];

  visualCharacteristics: {
    line?: string[];
    color?: string[];
    texture?: string[];
    lighting?: string[];
    composition?: string[];
  };

  promptVocabulary: string[];
  examplePrompt: string;
  avoidOrWatchFor?: string[];

  relatedStyles: {
    slug: string;
    relation: string;
  }[];

  images: {
    src: string;
    alt: string;
    benchmarkSubjectId?: string;
    model?: string;
    modelVersion?: string;
    promptVersion?: string;
    seed?: string;
    generationNotes?: string;
    provenance?: string;
  }[];

  editorialStatus?: "draft" | "reviewed" | "published";
  publishedAt: string;
  updatedAt?: string;
}
```

Content can live in Astro content collections using Markdown/MDX plus schema-validated front matter, or structured JSON/YAML. Choose the format that makes bulk editorial work easiest without changing application logic.

## 8. Search and discovery

MVP search should support:

- style name and aliases
- medium
- visible attributes
- mood
- use case
- keywords

Do not require semantic/vector search for launch.

Later, add a natural-language reverse lookup such as:

> “rough two-color indie print with bad registration”

Expected matches could include risograph, screen print, halftone duotone, zine collage, etc.

Reverse lookup is strategically valuable, but only after the taxonomy and content are clean enough to support it.

## 9. Image strategy

### MVP

- one controlled benchmark subject
- one primary benchmark image per style
- consistent aspect ratio
- responsive formats and sizes
- pre-optimized images
- lazy loading below the fold
- explicit alt text
- provenance metadata stored with each image

### Benchmark protocol

Maintain a versioned benchmark brief containing:

- subject identity / description
- framing
- background constraints
- aspect ratio
- content that should remain fixed
- which fields a style may intentionally override

If the benchmark prompt changes materially, increment the version rather than silently regenerating inconsistent images.

### Later benchmark tracks

1. human / character
2. environment / landscape
3. object / product
4. optional graphic composition

## 10. SEO strategy

SEO is a product requirement from the first public release.

### Technical SEO

Required:

- semantic HTML
- unique title and meta description for every canonical page
- canonical URLs
- XML sitemap
- robots.txt
- Open Graph metadata
- social card metadata
- image alt text
- breadcrumb structured data
- appropriate schema markup where useful
- fast Core Web Vitals
- minimal client-side rendering for indexable content
- stable canonical domain before serious indexing begins

### Content SEO

Each style page should answer a query cluster:

- What is `{style}`?
- What does `{style}` look like?
- What visual characteristics define `{style}`?
- What words describe `{style}`?
- How do I prompt `{style}` in AI image generators?
- What is similar to `{style}`?
- What is the difference between `{style}` and `{related style}`?

### Page families

Priority order:

1. canonical style pages
2. category/style-family hubs
3. strong use-case landing pages
4. curated comparison pages
5. glossary/modifier pages
6. editorial guides driven by real search-query data

Generic “AI art styles” terms are crowded by large brands and listicles, so growth should not depend on the homepage ranking for one head term.

## 11. Editorial and quality rules

1. Every style page contains original explanatory text.
2. The page must describe visible properties, not only provide a style label.
3. Prompt vocabulary must be separable into reusable components.
4. Generated images must have clear provenance metadata.
5. Historical claims should be checked against reliable sources.
6. Historically recognized movements must be distinguished from informal AI-era aesthetics.
7. Naming must be consistent across slugs, page titles, tags, and related links.
8. Avoid turning output formats or use cases into fake “styles.”
9. Do not make living artists' names canonical style entries.
10. Prefer descriptive techniques, periods, materials, and visual properties over artist-name imitation.
11. Avoid franchise/studio names when a durable descriptive term works.
12. Publish a provenance / rights / takedown policy before public launch.

Examples of durable naming:

- `feature-animation-3d` rather than a studio trademark
- `mid-century-editorial-illustration` rather than a living illustrator's name

## 12. Legal / provenance stance

This is an editorial/product policy, not legal advice.

The library should assume that “style” and “specific copyrighted expression” are different questions and design conservatively around the distinction.

Required practices:

- generated or clearly licensed images only
- store generator/model metadata when available
- record whether a benchmark image is AI-generated
- do not imply endorsement by artists, studios, or brands
- provide a contact / takedown route
- review trademark/franchise-specific terminology before publication

## 13. Technical direction

### Hosting

Use the Cloudflare ecosystem.

Initial architecture:

- Cloudflare Pages
- static-first rendering
- Cloudflare CDN
- Cloudflare Web Analytics initially
- Cloudflare R2 later if image scale justifies separate media storage

### Framework

Recommended: **Astro**.

Reasons:

- strong static generation for SEO-heavy content
- very low JavaScript by default
- content collections suit structured editorial pages
- easy componentization for cards, filters, comparison UI, and related-style modules
- straightforward Cloudflare deployment

A React-heavy stack is unnecessary unless future interaction requirements materially exceed Astro islands/components.

### Styling

Prefer a small design system:

- CSS variables / design tokens
- modern CSS
- optional Tailwind only if it clearly improves implementation speed

Visual direction:

- contemporary reference library / field guide
- image-led, typographically disciplined
- neutral enough that the content's styles remain the visual focus
- avoid generic “AI startup” gradients, glowing blobs, and tool-dashboard chrome

## 14. Recommended MVP scope

Launch target: **40 curated styles**.

MVP features:

- English only
- homepage
- `/styles/` index
- 40 canonical style pages
- one controlled benchmark image per style
- text search
- faceted filtering
- prompt vocabulary
- example prompt
- common failure modes
- related styles
- provenance metadata
- responsive layout
- Cloudflare deployment
- sitemap and metadata
- analytics

Compare can ship in MVP if the 2-style version remains simple. Otherwise it is the first post-launch feature.

Do not trade page quality for hitting 100 styles at launch.

## 15. Candidate launch styles

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

- Cyberpunk is useful but partly a genre/content label, so classify it carefully if added.
- Children's book is a use case, not one style.
- Magazine cover, album cover, game sprite, and professional headshot are output/use-case dimensions, not style entries.

## 16. Monetization strategy

### Phase 1

No ads or minimal monetization.

Optimize for:

- content quality
- indexing
- repeat use
- backlinks
- internal discovery

### Phase 2

Restrained display advertising after meaningful traffic exists.

Design rules:

- no aggressive interstitials
- no ad that visually imitates a style card
- stable reserved slots to avoid layout shift
- no interruption of the main benchmark comparison interaction

Possible placements:

- after introductory/reference content on long style pages
- within long index pages at clearly separated boundaries
- optional desktop sidebar on editorial guides

### Phase 3

Possible extensions:

- selective affiliate links to relevant creative tools
- downloadable reference packs
- clearly labeled sponsorships
- premium export / comparison features if real user demand appears

Monetization must not compromise neutral reference credibility.

## 17. Development phases

### Phase 0 - Research

Completed in `RESEARCH.md`:

- competitor landscape
- SERP/search-intent patterns
- taxonomy review
- monetization patterns
- legal/editorial considerations
- differentiation choices

### Phase 1 - Foundation

- create Astro project
- configure Cloudflare deployment
- define content schema
- define benchmark protocol
- define design tokens and base components
- create 3 to 5 representative style entries before scaling content

### Phase 2 - MVP content and UI

- create the 40 launch entries
- generate benchmark images
- build index and faceted filters
- build individual style pages
- implement related-style graph
- implement SEO requirements
- implement simple search

### Phase 3 - Launch

- production custom domain
- Cloudflare analytics
- Search Console / webmaster setup
- submit sitemap
- validate metadata, accessibility, crawlability, and Core Web Vitals
- publish provenance / rights / takedown page

### Phase 4 - Growth

- 2-style comparison pages
- 4 to 6 use-case landing pages
- second benchmark subject
- editorial comparisons
- query-driven content expansion based on Search Console data
- reverse lookup prototype

### Phase 5 - Monetization

- evaluate traffic and session behavior
- test restrained advertising
- monitor Core Web Vitals and user engagement after ads

## 18. Success metrics

Early:

- indexed canonical pages
- organic impressions and clicks
- ranking queries per style page
- style-page to style-page navigation
- internal search usage
- filter usage
- compare usage when launched
- return visitors
- backlinks / citations

Content quality signals:

- time spent on style pages
- related-style clickthrough
- prompt-vocabulary copy actions
- comparison-page engagement

Later monetization:

- RPM
- revenue per 1,000 sessions
- ad viewability
- Core Web Vitals after ads

## 19. Domain decision

Use a custom domain for the indexed public launch, but do not let domain acquisition block prototype work.

Guidelines:

- choose a short, brandable name rather than an awkward exact-match keyword domain
- acquire it once the final public brand is chosen
- set stable canonical URLs before serious indexing
- do not treat the current prototype host as the permanent SEO origin

Domain availability must be verified separately before purchase.

## 20. Implementation brief for Codex

When implementation begins, Codex should treat these as non-negotiable product constraints:

1. Astro + Cloudflare, static-first.
2. Content-driven architecture. Adding a style must not require application-logic edits.
3. Keep style, use case, output format, and modifiers as separate concepts.
4. Build the benchmark image system into the schema from the start.
5. Do not hard-code the first benchmark subject into component logic.
6. Every style page must be fully indexable without client-side rendering.
7. Filters may be interactive, but canonical category/use-case/style content must exist as normal URLs.
8. Preserve room for a future second benchmark subject and 2-style comparison route.
9. Keep visual design quiet enough that the example images remain the star.
10. No ad implementation in the initial build, only layout choices that do not make future restrained placements impossible.
