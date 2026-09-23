# UI Reference Notes

## Reference: STYLE / ATLAS 100

These notes are based on screenshots supplied during Phase 0 research. They are design references, not a request to clone the site's branding or exact layout.

## What works well

### 1. Browse first, explain second

The primary surface is a dense visual grid. Users can scan many styles quickly before opening any explanatory text.

The flow is roughly:

1. choose a category in the left rail
2. scan style cards
3. open a card for detail
4. copy useful style language
5. optionally add the style to comparison

This matches the desired role of AI Visual Style Library as a visual reference rather than a text-heavy article collection.

### 2. Persistent category navigation

A left-side category list with item counts makes the collection legible at a glance. The counts also communicate scope without requiring a separate statistics page.

For our implementation, the categories should reflect the cleaner taxonomy defined in `DESIGN.md`; do not reproduce the reference site's broader habit of mixing style, output format, and use case.

### 3. Dense card grid

The reference uses a compact multi-column layout that keeps many examples visible at once. The image is dominant, while the style name and ID remain subordinate.

Our cards should similarly prioritize the visual example and avoid oversized copy blocks in the index.

### 4. Detail modal as a quick-inspection layer

The modal pattern is useful because it lets the user inspect a style without losing their place in the atlas.

Useful elements visible in the reference:

- large-but-bounded preview image
- style name and category
- copyable style description / prompt language
- tabs or separation between style-only language and a full prompt
- add-to-compare action
- previous / next navigation
- image enlargement control

For SEO, our canonical style page must still exist as a normal URL. A modal may be used as a browsing convenience, but it must not replace indexable detail pages.

### 5. Comparison is lightweight and always nearby

The reference exposes comparison directly from the browsing surface and allows a small selection set. This is preferable to hiding comparison behind a separate workflow.

For MVP, support two selected styles if the implementation stays simple. The schema and UI should leave room for 2–4 later.

### 6. Image-size control is useful but secondary

The reference allows small / medium / large card sizing. This is a nice browsing affordance, but not essential for launch. Responsive density should come first.

## Benchmark interpretation

The screenshots include an important note: the examples are not intended to preserve an identical character across every style. Facial features and hair can be redrawn by the style.

For our benchmark system, the goal should therefore be:

> Keep the **subject brief, framing, scene role, and composition constraints** stable enough for comparison, without forcing exact character identity when doing so weakens the style.

The benchmark is a controlled comparison protocol, not an identity-locking test.

Recommended fixed fields:

- subject roles
- approximate pose / framing
- scene type
- camera distance
- aspect ratio
- important objects

Allowed to drift when the style requires it:

- facial construction
- hair rendering
- clothing details
- material interpretation
- background simplification
- proportion and anatomy conventions

## Our visual direction

Borrow the useful interaction logic, not the brand surface.

Keep:

- quiet neutral UI
- image-led grid
- strong whitespace
- persistent filtering / category access
- quick-inspection modal
- compare action close to each style
- compact metadata

Do not copy:

- logo / visual identity
- exact typography
- exact color accent
- exact category labels
- exact card proportions
- exact modal composition

Our site should feel more like a structured visual dictionary / field guide and less like a fixed “100 styles” showcase.

# Image asset budget

The project does not need high-resolution source art in Git. Images are reference samples, not downloadable masters.

## MVP source image target

- square or near-square benchmark format
- **640×640 px preferred**
- 768×768 px acceptable when fine texture materially benefits
- WebP preferred for repository assets
- target **100–200 KB per primary image**
- soft cap **250 KB**
- investigate / recompress anything over **300 KB** unless there is a clear visual reason

At 40 launch styles:

- 150 KB average ≈ 6 MB of primary images
- 200 KB average ≈ 8 MB
- 250 KB average ≈ 10 MB

At 100 styles:

- 200 KB average ≈ 20 MB

This remains small enough for an ordinary Git-backed project and keeps cloning, builds, and review practical.

## Derivatives

Do not commit multiple manual thumbnail copies of every image.

Prefer:

- one optimized source asset in the repository
- Astro/build-time generation of smaller responsive derivatives where practical
- generated build output kept out of Git

If build-time image processing becomes awkward, a single 640–768 px WebP is acceptable for both cards and detail views for the MVP.

## Quality principle

Do not optimize for image resolution beyond what the interface can visibly benefit from.

A style difference that cannot be understood at roughly 600–700 px is probably better explained with text or an additional crop later than with multi-megabyte source images.
