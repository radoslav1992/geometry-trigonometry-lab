# Geometry & Trigonometry Lab

A complete static Astro website for visual mathematics. All interactive calculations run in the browser; there are no API keys, accounts, databases, or paid model calls.

## Tools

- Interactive unit circle: pointer dragging, keyboard-accessible angle slider, exact special-angle values, degree/radian display, sine/cosine/tangent, quadrant explanations.
- Triangle solver: SSS, SAS, two angles and a side, and SSA including both possible solutions. To-scale diagrams, input validation, area, perimeter, height, worked calculations.
- Eight shape calculators: rectangle, circle, triangle, trapezoid, sphere, cylinder, cone, and rectangular prism. Formula substitutions and total surface areas.
- Printable cube, prism, and square-pyramid nets with optional labels and glue tabs, actual millimeter dimensions, SVG download, and browser print/PDF.
- Eight-question practice rounds drawn from 100 questions across geometry, trigonometry, coordinates, polygons, and solids. Includes shuffled answers, worked feedback, mistake review, focused retries, and device-local best scores.
- Sixteen static formula-reference articles and three guided learning paths, linked to their relevant tools.
- Eight additional interactive explorations: right triangles, regular polygons, coordinate geometry, circle sectors, angle conversion, trig graphs, transformations, and a draggable triangle discovery sandbox.
- Eight shape-atlas pages, each with a dedicated calculator, properties, formulas, worked example, common mistake, and related shapes.
- Searchable catalog of all 17 tools and collections.
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
5. Set `NODE_VERSION=22` and `SITE_URL=https://your-domain.example`.
6. Add the custom domain. Rebuild whenever `SITE_URL` changes so canonical links, robots.txt, and the sitemap agree.

The `.openai/hosting.json` file identifies the separate preview deployment and is not needed for Cloudflare Pages. No migrations or runtime bindings are required. The current hosted preview may be private; it does not establish public search-engine indexing.

## Design and content

Graph-paper workspaces, forest green typography, teal measurements, and orange angles. Responsive desktop/mobile layouts, labeled controls, visible focus indicators, reduced-motion support, and live calculation feedback.

Google Fonts supplies DM Sans and Manrope; system fonts are fallbacks. No analytics or advertising scripts are installed. Calculator inputs remain on-device. The About page explains calculation rounding, local storage, and external font requests.

## Source structure

- `src/lib/math.mjs`: independently tested math functions.
- `src/components`: Astro markup and progressively enhanced custom elements.
- `src/pages`: prerendered routes and reference pages.
- `src/styles/global.css`: shared responsive design and A4 print styles.
- `tests/math.test.mjs`: calculation regression tests.

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
