# Geometry & Trigonometry Lab

A complete static Astro website for visual mathematics. All interactive calculations run in the browser; there are no API keys, accounts, databases, or paid model calls.

## Tools

- Interactive unit circle: pointer dragging, keyboard-accessible angle slider, exact special-angle values, degree/radian display, sine/cosine/tangent, quadrant explanations.
- Triangle solver: SSS, SAS, two angles and a side, and SSA including both possible solutions. To-scale diagrams, input validation, area, perimeter, height, worked calculations.
- Eight shape calculators: rectangle, circle, triangle, trapezoid, sphere, cylinder, cone, and rectangular prism. Formula substitutions and total surface areas.
- Composite shape area calculator on the area page: add rectangles, triangles, trapezoids, and circle parts, and subtract holes or cut-outs, with the working shown.
- Nine printable nets with optional labels and glue tabs, actual millimeter dimensions, SVG download, and browser print/PDF: cube, rectangular prism, triangular prism, hexagonal prism, square pyramid, tetrahedron, octahedron, cylinder, and cone. `/printable-nets/` is the hub (gallery plus a builder for any net), and each net has its own page at `/printable-nets/<shape>/` (`cube`, `rectangular-prism`, `triangular-prism`, `hexagonal-prism`, `square-pyramid`, `tetrahedron`, `octahedron`, `cylinder`, `cone`) with the net at its default size rendered on the server, the pieces and their sizes, the surface area worked out from the net, folding steps, faces/edges/vertices, links to the matching shape page and calculator, and an FAQ. Ready-made SVG files are at `/nets/<shape>-net.svg`.
- A printable unit circle chart (`/unit-circle-chart.svg`) and an exact-value table with sine, cosine, and tangent for all 16 special angles.
- Eight-question practice rounds drawn from 100 questions across geometry, trigonometry, coordinates, polygons, and solids. Includes shuffled answers, worked feedback, mistake review, focused retries, and device-local best scores.
- Sixteen formula guides and three guided learning paths. Each guide opens with a direct answer and the formula, lists every variant and variable, embeds the matching calculator, and adds worked examples, a derivation where useful, common mistakes, and an FAQ. The transformations guide and tool share a coordinate-rules table.
- Eight additional interactive explorations: right triangles, regular polygons, coordinate geometry, circle sectors, angle conversion, trig graphs, transformations, and a draggable triangle discovery sandbox.
- Three single-rule triangle calculators at `/tools/law-of-cosines-calculator/` (SAS to find a side, SSS to find an angle), `/tools/law-of-sines-calculator/` (AAS, ASA, and the ambiguous SSA case, which reports zero, one, or two triangles and draws the swinging side), and `/tools/herons-formula-calculator/` (three sides to area, with the triangle inequality check). Each takes only its own inputs, substitutes the numbers step by step, and draws the triangle to scale. They are entries in `explorations` like the other tools and use the triangle solver’s math (`solveTriangle`, `ssaTriangles`); an entry’s `modeFields` lists which inputs each mode shows and checks. Each calculator links to its formula guide, and the guide links back under its embedded solver (`calculatorLink`) and in its closing strip. They have no worksheet of their own: activities are one per formula guide, and these three guides already have theirs, built on the triangle solver.
- Eight shape-atlas pages, each opening with faces/edges/vertices (or sides/angles), a properties table, and a formula table, then a dedicated calculator, worked example, common mistake, related shapes, and FAQ.
- Searchable catalog of all 20 tools and collections.
- A homepage FAQ and tailored questions beneath all 15 explorers/calculators, eight shape calculators, and nine net pages. Answers are prerendered and native disclosure controls work without JavaScript.
- Printable worksheets with 8, 12, or 20 questions and an optional answer key.

## For teachers

`/teachers/` is the classroom hub: how to use the tools in class, a table of 12 activities (topic, tool, grade band, time, Common Core connection, worksheet, answer key, Share to Google Classroom), links to the other printables, Chromebook and no-login notes, student privacy, and a teacher FAQ.

- Each activity is a one-page printable worksheet at `/learn/<lesson>/activity/` with a goal, steps that name the tool's real controls, a blank results table, and 5–7 questions. The activities live in `src/lib/activities.mjs`; tool, guide, and shape pages link their activity from a "For teachers" strip (`ClassroomBar.astro`).
- Answer keys at `/teachers/answers/<lesson>/` are linked only from the hub, marked `noindex`, left out of the sitemap (see the filter in `astro.config.mjs`), and show no ads. Every value in a key is computed by `src/lib/math.mjs` or `explore()` in `src/lib/explorations.mjs`, the same code the tools run, and `tests/activities.test.mjs` checks each answer against those numbers within rounding.
- Standards: an activity lists a Common Core code only where it clearly applies; Heron's formula and polygon angle sums list none.
- `ClassroomShare.astro` is a plain link to `https://classroom.google.com/share?url=` plus the encoded canonical URL with `?classroom=1`, which marks a visit as coming from a class (the ad-free rule reads it if ads are ever switched on again). It loads no Google script.

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
6. Add `geometrylab.net` as the custom domain. In the Cloudflare dashboard for the zone, turn on **SSL/TLS → Edge Certificates → Always Use HTTPS** so every `http://` request is redirected to `https://`. A static site cannot redirect by scheme itself, and Search Console has shown an `http://` URL of `/worksheets/`. `public/_headers` sends `Strict-Transport-Security: max-age=31536000; includeSubDomains` on every path so browsers stay on HTTPS after their first visit; do not add host- or scheme-based rules to `_redirects`. If the production domain changes, update `site` in `astro.config.mjs` and rebuild so canonical links, robots.txt, and the sitemap agree.

The `.openai/hosting.json` file identifies the separate preview deployment and is not needed for Cloudflare Pages. No migrations or runtime bindings are required. The current hosted preview may be private; it does not establish public search-engine indexing.

## Design and content

Warm ivory surfaces, navy typography, teal controls, and yellow/orange accents. A live homepage experiment sits beside a compact introduction; tool and shape cards use geometric SVG previews. Color-coded calculator results, lettered practice answers, explanatory feedback, and a completion ring make progress easier to follow. Responsive desktop/mobile layouts, labeled controls, visible focus indicators, reduced-motion support, and live calculation feedback.

Google Fonts supplies DM Sans and Manrope; system fonts are fallbacks. Google Analytics (G-9CCD0H600F) measures site usage through the shared page layout. The site shows no ads (see Ads below). Calculator inputs remain on-device. The About page explains calculation rounding, local storage, and external font requests; `/privacy/` is the privacy policy (analytics, local storage, opt-outs).

## Ads

Geometry Lab shows no ads. `src/lib/ads.mjs` holds no unit keys, so `src/components/AdSlot.astro` renders nothing: no markup, no script, and no request to an ad network. Adsterra was removed in November 2026 because its filters do not block dating and fake-alert ads, which are not acceptable on a site used in classrooms.

The switch is kept so ads could return with a network that is safe for schools. The `<AdSlot>` placements stay in the pages, and `AdUnit.astro` (the unit and its loader) and `AdFree.astro` (no ads for visitors from Google Classroom, Canvas or Schoology) only run when keys are set. The privacy, about and teacher pages say the site has no ads, so restore their advertising sections before setting keys; `tests/ads.test.mjs` fails as a reminder.

Cookie consent: `src/components/ConsentDefaults.astro` runs in `<head>` before the Google tag. It sets Google Consent Mode v2 defaults (analytics and ad storage denied by default in the EEA, the UK and Switzerland, granted elsewhere) and restores a saved choice (`cookieConsent` in localStorage, kept 180 days). Visitors whose time zone is in Europe see `src/components/ConsentBanner.astro`, a small non-blocking banner with equally weighted Accept and Reject buttons. Until they accept, Google Analytics runs without cookies; Reject keeps it cookie-free. *Cookie settings* in the footer reopens the banner. The banner colours are the `--consent-*` variables in `src/styles/global.css`.

## Search metadata

Every page has a canonical URL on `https://geometrylab.net`, a search-focused title and description, and JSON-LD: `WebApplication` for tools and shape pages, `Article`/`LearningResource` for formula guides, `LearningResource` with Common Core alignments for classroom activities, `CollectionPage` for hubs, `AboutPage` and `WebPage` for the About and privacy pages, and `WebSite` on the homepage. `Breadcrumbs.astro` renders the visible trail with matching `BreadcrumbList` data, and `Faq.astro` emits `FAQPage` data for the questions shown on the same page. Lesson titles and descriptions live in `src/lib/lessons.mjs`, shape copy in `src/lib/shape-facts.mjs`, and explorer copy in `toolSeo` in `src/lib/explorations.mjs`; `tests/content.test.mjs` keeps them within snippet length and unique, and checks the wording that Search Console queries ask for (for example “properties” and “formulas” in shape titles, “rules” in the transformations guide, “sandbox” on the triangle sandbox). A lesson can set `h1` to give the page a longer heading than the short `heading` used in links and breadcrumbs, and `tools` to link extra tools; a `toolSeo` entry can set `h1` and `intro` in the same way. The unit circle page leads with the labeled chart (`/unit-circle-chart.svg`) and a text table of sin, cos and tan, followed by the interactive circle; the transformations guide shows the coordinate-rules table directly under its introduction.

## Source structure

- `src/lib/math.mjs`: independently tested math functions.
- `src/components`: Astro markup and progressively enhanced custom elements.
- `src/pages`: prerendered routes and reference pages.
- `src/styles/global.css`: shared layout primitives and A4 print styles.
- `src/styles/studio.css`: the shared visual theme, responsive layouts, and practice states.
- `src/components/DiagramThumb.astro`: reusable geometric previews for tools, shapes, and lessons.
- `src/lib/nets.mjs`: printable net generator shared by the live tool, the prerendered previews, the net pages, and the SVG downloads. Polyhedra are 3D meshes unfolded along a tree of fold edges, so each face is true size and joined along a real edge; every remaining (cut) edge gets one glue tab, placed where it covers no face. The cylinder is a rectangle 2πr wide with two circles; the cone is a sector of angle 360° × r ÷ slant height with a circle. `netDetails()` lists the pieces and the surface-area working shown on the net pages.
- `src/lib/net-pages.mjs`: titles, descriptions, folding steps, and links for the net pages; `src/components/NetLab.astro` is the net builder used by the hub and by every net page (`src/pages/printable-nets/[slug].astro`).
- `src/lib/ads.mjs`, `src/components/AdSlot.astro` and `src/components/AdUnit.astro`: the ad switch (off: no unit keys), the slot that renders nothing while it is off, and the unit with its loader.
- `src/lib/activities.mjs`: classroom activities, their worksheet steps and questions, and answer-key values computed from the tools' math.
- `tests/math.test.mjs`: calculation regression tests.
- `tests/triangle-calculators.test.mjs`: the law of cosines, law of sines, and Heron’s formula calculators against independent formulas and the guides’ worked examples, including every SSA case (none, one right triangle, two, one) and impossible triangles.
- `tests/activities.test.mjs`: activity completeness, control names that exist in each tool, known standards codes, and answer-key values.
- `tests/content.test.mjs`: worked-example answers, transformation rules, unit circle values, nets, composite areas, and search metadata.
- `tests/nets.test.mjs`: net geometry: total net area equals the solid’s surface area, meshes are closed solids with the stated faces, edges and vertices, faces unfold congruent and without overlap, one tab per cut edge, the cone sector angle and arc length, the cylinder’s 2πr rectangle, page fit, and the net pages’ copy.

For printables, use A4 paper at 100% scale, disable browser headers/footers, and verify the 20 mm reference line. The pyramid input is face slant height, not vertical height, and the cone input is slant height along its side. The print styles in `studio.css` fix the net drawing at 190 mm wide so page padding cannot shrink it.

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

## llms.txt

`public/llms.txt` is a plain-text guide to the site for AI assistants (see llmstxt.org): one line per page with
its title and description. ChatGPT is one of the site's main sources of visitors, and it can only recommend a
tool it can read about. The file is generated from the built pages, so regenerate it after changing a title or
description, or adding a page:

```sh
npm run build && npm run llms
```

`tests/llms.test.mjs` fails if a tool is missing from the file.
