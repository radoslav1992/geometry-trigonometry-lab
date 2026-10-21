# Geometry & Trigonometry Lab

A complete static Astro website for visual mathematics. All interactive calculations run in the browser; there are no API keys, accounts, databases, or paid model calls.

## Tools

- Interactive unit circle: pointer dragging, keyboard-accessible angle slider, exact special-angle values, degree/radian display, sine/cosine/tangent, quadrant explanations.
- Triangle solver: SSS, SAS, two angles and a side, and SSA including both possible solutions. To-scale diagrams, input validation, area, perimeter, height, worked calculations.
- Eight shape calculators: rectangle, circle, triangle, trapezoid, sphere, cylinder, cone, and rectangular prism. Formula substitutions and total surface areas.
- Composite shape area calculator on the area page: add rectangles, triangles, trapezoids, and circle parts, and subtract holes or cut-outs, with the working shown.
- Printable cube, prism, and square-pyramid nets with optional labels and glue tabs, actual millimeter dimensions, SVG download, and browser print/PDF. A prerendered gallery links ready-made SVG files at `/nets/cube-net.svg`, `/nets/rectangular-prism-net.svg`, and `/nets/square-pyramid-net.svg`.
- A printable unit circle chart (`/unit-circle-chart.svg`) and an exact-value table with sine, cosine, and tangent for all 16 special angles.
- Eight-question practice rounds drawn from 100 questions across geometry, trigonometry, coordinates, polygons, and solids. Includes shuffled answers, worked feedback, mistake review, focused retries, and device-local best scores.
- Sixteen formula guides and three guided learning paths. Each guide opens with a direct answer and the formula, lists every variant and variable, embeds the matching calculator, and adds worked examples, a derivation where useful, common mistakes, and an FAQ. The transformations guide and tool share a coordinate-rules table.
- Eight additional interactive explorations: right triangles, regular polygons, coordinate geometry, circle sectors, angle conversion, trig graphs, transformations, and a draggable triangle discovery sandbox.
- Eight shape-atlas pages, each opening with faces/edges/vertices (or sides/angles), a properties table, and a formula table, then a dedicated calculator, worked example, common mistake, related shapes, and FAQ.
- Searchable catalog of all 17 tools and collections.
- A homepage FAQ and tailored questions beneath all 12 explorers/calculators and eight shape calculators. Answers are prerendered and native disclosure controls work without JavaScript.
- Printable worksheets with 8, 12, or 20 questions and an optional answer key.

## Development

Requires Node.js 22 LTS or newer.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

The production output is `dist/`. JavaScript is delivered only for interactive components; lessons remain usable without it. Tests cover independent known answers, ambiguous and impossible triangle cases, trigonometric singularities, shape formulas, and practice-round consistency.

## Deploy to Cloudflare Pages

1. Push this source to a GitHub repository named `geometry-trigonometry-lab`.
2. In Cloudflare Pages, connect that repository and select the production branch.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Set `NODE_VERSION=22`. The canonical production domain is `https://geometrylab.net`, configured in `astro.config.mjs`.
6. Add `geometrylab.net` as the custom domain. If the production domain changes, update `site` in `astro.config.mjs` and rebuild so canonical links, robots.txt, and the sitemap agree.

The `.openai/hosting.json` file identifies the separate preview deployment and is not needed for Cloudflare Pages. No migrations or runtime bindings are required. The current hosted preview may be private; it does not establish public search-engine indexing.

## Design and content

Warm ivory surfaces, navy typography, teal controls, and yellow/orange accents. A live homepage experiment sits beside a compact introduction; tool and shape cards use geometric SVG previews. Color-coded calculator results, lettered practice answers, explanatory feedback, and a completion ring make progress easier to follow. Responsive desktop/mobile layouts, labeled controls, visible focus indicators, reduced-motion support, and live calculation feedback.

Google Fonts supplies DM Sans and Manrope; system fonts are fallbacks. Google Analytics (G-9CCD0H600F) measures site usage through the shared page layout. Adsterra banner ads are described below. Calculator inputs remain on-device. The About page explains calculation rounding, local storage, and external font requests; `/privacy/` is the privacy policy (analytics, ads, local storage, opt-outs).

## Ads

Adsterra serves banner ads only: no pop-unders, social bars, smartlinks, interstitials, or sticky units. The unit keys live in `src/lib/ads.mjs` (copied from the Adsterra publisher dashboard), and `src/components/AdSlot.astro` renders each slot:

- `leaderboard`: 728×90 on screens 800px and wider, 320×50 on phones. `Layout.astro` places one above the footer on every page; pass `ads={false}` to the layout to omit it (the 404 page does).
- `rectangle`: 300×250, placed after the calculator, solver, or explorer on tool pages, formula guides, shape pages, the triangle solver, unit circle, and area/volume calculators.
- `native`: Adsterra's native banner, placed just before the FAQ on formula guides that have one, the unit circle, and the area/volume calculators. Tool pages, shape pages, and the triangle solver skip it because it would sit right next to another ad.

Hub pages and the homepage show only the leaderboard, so no page has more than three slots. Each slot reserves its size up front so content never jumps, is labeled "Advertisement", and is hidden when printing. The ad scripts load only when a slot nears the viewport and only on `geometrylab.net`, so local development and preview deployments never request ads. Banner scripts share Adsterra's global `atOptions`, so `AdSlot` loads them one at a time. `tests/ads.test.mjs` checks the keys and domain.

## Search metadata

Every page has a canonical URL on `https://geometrylab.net`, a search-focused title and description, and JSON-LD: `WebApplication` for tools and shape pages, `Article`/`LearningResource` for formula guides, `CollectionPage` for hubs, and `WebSite` on the homepage. `Breadcrumbs.astro` renders the visible trail with matching `BreadcrumbList` data, and `Faq.astro` emits `FAQPage` data for the questions shown on the same page. Lesson titles and descriptions live in `src/lib/lessons.mjs`, shape copy in `src/lib/shape-facts.mjs`, and explorer copy in `toolSeo` in `src/lib/explorations.mjs`; `tests/content.test.mjs` keeps them within snippet length and unique.

## Source structure

- `src/lib/math.mjs`: independently tested math functions.
- `src/components`: Astro markup and progressively enhanced custom elements.
- `src/pages`: prerendered routes and reference pages.
- `src/styles/global.css`: shared layout primitives and A4 print styles.
- `src/styles/studio.css`: the shared visual theme, responsive layouts, and practice states.
- `src/components/DiagramThumb.astro`: reusable geometric previews for tools, shapes, and lessons.
- `src/lib/nets.mjs`: printable net generator shared by the live tool, the prerendered preview, and the SVG downloads.
- `src/lib/ads.mjs` and `src/components/AdSlot.astro`: Adsterra unit keys and the lazily loaded ad slot.
- `tests/math.test.mjs`: calculation regression tests.
- `tests/content.test.mjs`: worked-example answers, transformation rules, unit circle values, nets, composite areas, and search metadata.

For printables, use A4 paper at 100% scale, disable browser headers/footers, and verify the 20 mm reference line. The pyramid input is face slant height, not vertical height.

## Repository initialization

If importing a source archive into a new empty GitHub repository:

```sh
git init -b main
git add .
git commit -m "Build Astro geometry and trigonometry lab"
git remote add origin https://github.com/radoslav1992/geometry-trigonometry-lab.git
git push -u origin main
```

Do not commit `node_modules`, `dist`, `.env`, or local runtime files.
