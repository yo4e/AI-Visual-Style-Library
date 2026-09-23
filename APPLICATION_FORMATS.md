# Application Formats and Benchmark Tracks

## Purpose

AI Visual Style Library should not become a character-illustration-only atlas.

Users often begin with a practical output rather than a named visual style:

- flyer
- poster
- album cover
- book cover
- editorial illustration
- product advertisement
- social media graphic
- game concept art
- packaging
- portrait / character illustration

The product should therefore support a second major discovery axis:

> **What am I trying to make?**

This is separate from:

> **What visual style do I want?**

## Core model

Treat the library as a matrix between:

1. **Style**
2. **Application format / use case**

Examples:

- Risograph × gig flyer
- Art Deco × album cover
- Swiss Style × event poster
- Gouache × children's book illustration
- Y2K Chrome × music cover
- Film Noir × book cover
- Flat Vector × product explainer graphic

Do not treat these combinations as new canonical styles.

## Recommended application families

### 1. Character / portrait

Useful for:

- character illustration
- avatar
- editorial portrait
- game character concept

Benchmark properties:

- fixed subject roles
- similar framing
- minimal scene changes

### 2. Poster / flyer

Useful for:

- event flyer
- gig poster
- exhibition poster
- promotional graphic

Benchmark properties:

- fixed headline length
- fixed information hierarchy
- fixed event type
- consistent aspect ratio
- allow typography and layout to change with style

### 3. Album / music cover

Useful for:

- album cover
- single artwork
- playlist cover

Benchmark properties:

- fixed fictional artist name
- fixed fictional album title
- square format
- same musical mood brief
- allow image / typography relationship to vary by style

### 4. Book / editorial cover

Useful for:

- book cover
- magazine cover
- editorial opener

Benchmark properties:

- fixed fictional title / author
- fixed genre brief
- standard portrait format
- consistent copy amount

### 5. Product / advertising

Useful for:

- product advertisement
- launch graphic
- cosmetics / fashion campaign
- ecommerce hero image

Benchmark properties:

- fixed fictional product
- fixed product form / packaging
- consistent message hierarchy
- allow lighting, composition, and graphic treatment to vary

### 6. Social / digital campaign

Useful for:

- social post
- banner
- story / vertical promo
- thumbnail

Benchmark properties:

- compact copy
- platform-friendly dimensions
- strong hierarchy at small display sizes

### 7. Environment / concept art

Useful for:

- game concept art
- environment illustration
- worldbuilding reference
- cinematic moodboard

Benchmark properties:

- fixed location brief
- fixed camera position / scene role
- allow material, architecture, lighting, and rendering language to vary

## Sparse matrix, not full Cartesian product

Do **not** generate every style in every application format.

At 40 styles × 7 application families, a complete matrix would already require 280 images before variants.

Instead:

- every canonical style gets one primary benchmark image
- selected styles get additional application examples
- each application page curates styles that genuinely work well for that output
- gaps are acceptable
- expand combinations based on search demand and actual user interest

This keeps editorial quality high and repository size controlled.

## Navigation implications

The site should support both entry routes.

### Browse by style

Example:

```text
/styles/risograph
```

The style page can show:

- primary benchmark
- compatible applications
- selected examples such as flyer / album cover / editorial

### Browse by application

Example:

```text
/use-cases/album-cover
/use-cases/event-flyer
/use-cases/book-cover
/use-cases/product-advertising
```

The application page should show:

- one shared creative brief
- multiple style interpretations
- recommended styles
- useful prompt vocabulary for that output type
- layout / typography considerations that are specific to the format

## Comparison behavior

Comparisons should happen **within the same benchmark track**.

Good comparison:

- Risograph flyer vs Swiss Style flyer
- Art Deco album cover vs Y2K album cover

Bad comparison:

- Risograph character portrait vs Swiss Style event poster

The benchmark track is therefore part of the comparison identity.

A future shareable comparison URL may look conceptually like:

```text
/compare?track=album-cover&styles=art-deco,y2k-chrome
```

## Content model extension

A style should support multiple visual examples with explicit application metadata.

Conceptual addition:

```ts
images: {
  src: string;
  alt: string;
  benchmarkSubjectId?: string;
  benchmarkTrack?:
    | "character"
    | "poster-flyer"
    | "album-cover"
    | "book-editorial-cover"
    | "product-ad"
    | "social-digital"
    | "environment-concept";
  useCase?: string;
  model?: string;
  modelVersion?: string;
  promptVersion?: string;
  seed?: string;
  generationNotes?: string;
  provenance?: string;
}[];
```

Do not hard-code these track names into presentation components if a data-driven list can be used instead.

## MVP recommendation

Do not require all application families at launch.

Recommended launch sequence:

1. **Primary visual benchmark** for all 40 styles
2. Add **poster / flyer** as the first non-character track
3. Add **album cover** next
4. Expand into product advertising, editorial / book cover, and environment according to search demand

This produces visible proof that the site is broader than a character-style gallery without multiplying launch scope unnecessarily.

## Image budget interaction

The additional tracks must follow the repository image budget in `UI_REFERENCE.md`.

Prefer:

- 640–768 px optimized WebP
- roughly 100–200 KB per image
- no source masters committed to Git
- generated thumbnails excluded from the repository

A sparse matrix keeps both content work and repository size predictable.
