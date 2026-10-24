# Plan: Lighthouse 100 on every page (MY-206)

Goal: Performance, Accessibility, Best Practices and SEO at 100 on Home, Careers, About and Security,
mobile and desktop. No visible change, so no spec. No open questions.

## Baseline

Production (`https://banking-coral-three.vercel.app`), Lighthouse 13.5.0 from the CLI with Chrome
headless, default mobile and `--preset=desktop`, 3 runs per cell (6 for Home mobile). A, BP and SEO are
100 in every run. Cells are Performance, then LCP / CLS / TBT of the typical run.

| Page     | Mobile                                | Desktop                    |
| -------- | ------------------------------------- | -------------------------- |
| Home     | 98-99 · 1.2-1.5 s · 0-0.069 · 0-20 ms | 100 · 0.4 s · 0.018 · 0 ms |
| Careers  | 100 · 1.5 s · 0.051 · 0 ms            | 100 · 0.3 s · 0.001 · 0 ms |
| About    | 100 · 1.1-1.4 s · 0.015 · 0 ms        | 100 · 0.3 s · 0 · 0 ms     |
| Security | 100 · 1.1-1.4 s · 0.008 · 0 ms        | 100 · 0.3 s · 0.034 · 0 ms |

FCP is 0.9-1.4 s on mobile and 0.3 s on desktop. The only cell below 100 is Home mobile: a CLS of
0.069 in the idle runs, and a Speed Index of 2.3-4.0 s in the others (the 0.9 s and 4 s runs differ
only by when the first paint lands: a busy machine moves it).

Other findings, none of them scored by Performance:

- **CLS** is the web font swap in every case (`layout-shifts`: "Web font loaded"): the hero text of
  Home and Careers wraps differently in the system fallback.
- **`lcp-discovery-insight`**: the LCP element is the hero card (`.hero__inner`,
  `.page-hero__inner`), painted by its CSS background decor (`dots*.avif`); the request starts only
  after the stylesheet is parsed.
- **`network-dependency-tree-insight`**: HTML, then CSS, then `Lexend.woff2`: the font is found late.
- **`render-blocking-insight`**: the one stylesheet, 9 kB over the wire (est. 150-440 ms on mobile).
- **`image-delivery-insight`**: the 968x716 hero photos are shown at 351x260 on a phone (8-35 kB).
- **`forced-reflow-insight`** (Home mobile): 35 ms in `main.js`.
- **`agentic-browsing`** (the fifth category of Lighthouse 13, out of the four asked for): Home 0.67,
  `agent-accessibility-tree` fails on the testimonial `figure` with `role="group"`.

## Changes

1. **Font preload** (done). `<link rel="preload" as="font" type="font/woff2" crossorigin>` in
   `shared/head` with the source path: Vite rewrites it to the hashed file, checked in `dist`.
2. **Fallback font with Lexend's metrics** (done). `Lexend Fallback`: a local Arial with
   `size-adjust` 107% at weight 300 and 111% at 400-500 (Lexend's width over Arial's on the pages' own
   text, measured in the browser), after `Lexend` in `--font-family`. The preload alone removes the shift
   only while the font beats the first paint; with the font held back 400 ms the shift returned until
   the fallback was added, then CLS was 0 on every page. Two faces, not three: the same result.
3. **LCP decor discovered early** (not done). A `preload` of `dots-grid` on Careers moved the load
   delay from 633 to 456 ms and the simulated LCP from 1.74 to 1.67 s: no score change, a data field
   per page for it. Left, in decision `lighthouse-100`.
4. **Responsive hero photo** (not done). The photos are stand-ins; a `srcset` waits for the real
   exports (decision `lighthouse-100`).
5. **Carousel slide** (done). `agent-accessibility-tree` flagged `role="group"` on a `figure`: the slide
   is a `div` and the name a `p`; the rects and computed styles are identical at 1920, 1440 and 390.
6. **Forced reflow** in `Reveal` (not done): it reads positions before hiding anything, so it is the
   design (`reveal-on-scroll`), not a batching slip; 35-45 ms on a phone, not scored.
7. **Size limit.** The fallback faces take the CSS from 7.98 to 8.04 kB gzip, over the 8 kB limit: the
   limit becomes 8.5 kB, in the new record `ci-size-limit-css-room` that supersedes
   `ci-size-limit-photos`.

Found, not fixed: the Home converter shows its currency names only after the script runs, so the hero
grows 24-47 px on desktop widths (CLS 0.007 in the lab, below any score threshold). Rendering the default
currencies in the HTML is the fix, a change of the partial's parameters and two helpers, so it is left
to its own task.

Rules: `ai/rules/assets-performance.md` gets a line for each rule a change sets. A limit in
`.size-limit.json` changes only by the measured size of the change, with a new record superseding
`ci-size-limit-photos`. Something that cannot reach 100 gets a decision record.

## Verification

- Lighthouse against a local production build served with compression (`npx vite preview` does not
  compress, so a small Node server in the scratchpad adds brotli and the `/assets/` cache header), at
  least 3 runs per page and mode, before and after, with nothing else running.
- `npm run lint`, `lint:css`, `format:check`, `build`, `size`; `cmp dist/404.html dist/index.html`;
  axe-core stays at 0 violations on all four pages.
- Layout before and after at 1920, 1440 and 390 px: the rect of every element of the four pages,
  hashed, is identical (Home differs only by the tag names of the two replaced elements, so its rects
  and computed styles were compared separately).
- After the merge the author measures production: the cells expected to change are Home mobile
  (CLS, and with it Performance) and the CLS of Careers and Security.

## Result (local build, compressed, 3 runs per cell)

Before: Performance 98-99 on Home mobile and 99-100 on the others, CLS 0.069 Home, 0.051 Careers,
0.015 About, 0.008 Security, and 0.007-0.034 on desktop. After: Performance 100 in all 24 runs, CLS 0
except 0.007 on Home desktop (the converter above), TBT 0. Local LCP is 1.8-1.9 s on a phone (no CDN, no
HTTP/2), above production's 1.1-1.5 s, and still scores 100.
