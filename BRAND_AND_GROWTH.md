# Brand, SEO, Domain, and Monetization Direction

Status: product decision recorded during Phase 0 research

## 1. Brand name

Use **AI Visual Style Library** as the working public brand name.

Reasoning:

- `visual` is broad enough to include illustration, photography, graphic design, posters, flyers, album covers, advertising, 3D, and other output types
- the project should not define itself only as an `AI art` prompt gallery
- the name accurately describes the long-term product: a visual reference library and comparison tool

Do not rename the product solely to chase an exact-match SEO keyword.

## 2. SEO naming strategy

Keep the brand name distinct from page-level SEO titles.

Suggested homepage metadata direction:

```text
Brand: AI Visual Style Library
SEO title: AI Art Styles & Image Style Library | AI Visual Style Library
H1: Explore AI Image Styles
```

Possible supporting copy:

> Compare visual styles for illustrations, posters, album covers, ads, photography, and more.

Important keyword families to use naturally across page titles, headings, category pages, and copy include:

- AI art styles
- AI image styles
- AI visual styles
- AI style prompts
- visual style reference
- image generation styles
- specific style names
- use-case phrases such as poster styles, album cover styles, editorial illustration styles, product advertising styles, etc.

The homepage does not need to rank for every generic head term. Style pages, use-case pages, category hubs, and comparison pages should carry much of the organic-search strategy.

## 3. Initial hosting

Prototype and early public versions should use **Cloudflare Pages**.

Goals:

- keep deployment simple and cheap
- avoid delaying product validation for domain or monetization work
- preserve a static-first, fast-loading architecture
- allow the site to be publicly tested before committing to a permanent brand domain

The initial Cloudflare Pages hostname is temporary infrastructure, not the intended long-term canonical SEO origin.

## 4. Custom domain strategy

A custom domain is part of the intended public growth path, but it does not need to block the first usable release.

Recommended sequence:

1. build and publish the prototype on Cloudflare Pages
2. validate information architecture, image workflow, performance, and editorial process
3. choose the final public brand/domain before serious SEO promotion and large-scale indexing
4. connect the custom domain to Cloudflare
5. make the custom domain the canonical origin before sustained content expansion

Domain criteria:

- short and memorable
- easy to spell and say
- brandable rather than awkwardly stuffed with search keywords
- broad enough to support illustration, design, photography, advertising, covers, and other visual formats
- avoid names confusingly close to existing style-atlas brands

Do not purchase a domain only because it contains an exact-match keyword.

## 5. Monetization intent

Long-term goal: **organic international traffic + restrained advertising revenue**.

Advertising is not part of the first implementation milestone.

### Phase A: usefulness first

Prioritize:

- strong visual reference value
- consistent benchmark examples
- useful style and use-case pages
- search indexing
- repeat visits and bookmarks
- internal discovery
- backlinks and citations

### Phase B: domain and growth

Once the product and public brand are stable:

- move to the custom domain
- connect analytics and webmaster/search tools
- expand pages based on real search behavior
- improve internal linking and comparison coverage

### Phase C: advertising

Introduce display advertising only after meaningful traffic exists.

Advertising rules:

- no aggressive interstitials
- no ads disguised as style cards or reference content
- no ad placement that interrupts the core comparison interaction
- reserve stable layout space to reduce CLS
- preserve image browsing speed and Core Web Vitals
- keep the reference library trustworthy and pleasant enough to bookmark

Potential placements later:

- after useful introductory/reference content on long style pages
- between clearly separated groups on long index/use-case pages
- optional sidebar positions on desktop editorial pages

Potential future revenue beyond display ads may include selective tool referrals, clearly labeled sponsorships, downloadable reference packs, or premium export/comparison features, but none should distort the core reference function.

## 6. Product principle

The order of operations is intentional:

> useful library first -> stable brand/domain -> organic growth -> restrained monetization

The site should earn the right to show ads by becoming useful enough that people return even when they are not immediately generating an image.
