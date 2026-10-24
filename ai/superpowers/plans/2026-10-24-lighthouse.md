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

1. **Font preload.** `<link rel="preload" as="font" type="font/woff2" crossorigin>` in
   `shared/head` for `Lexend.woff2`. Whether Vite rewrites the source path to the hashed one is
   checked first; if it does not, the head gets the hashed URL another way, or this item is dropped.
   Targets: the dependency chain, and the swap happening before the first paint instead of after it.
2. **Fallback font with Lexend's metrics.** A second `@font-face` over a local face with
   `size-adjust`, put after `Lexend` in the stack, so the swap moves no line. Targets: CLS. Kept only
   if it is small and measurably removes the shift.
3. **LCP decor discovered early.** A `preload` of the decor image the LCP paints, if Vite rewrites
   its URL and the gain shows locally. Otherwise left, with a decision record.
4. **Responsive hero photo.** A `srcset` on the hero `<img>` is considered only if the stand-in
   photos can be resized without touching their look; the photos are temporary, so this is likely
   left to the real exports and recorded.
5. **Carousel slide role.** Replace what `agent-accessibility-tree` flags, if a native element does
   the job with no change to what a screen reader announces.
6. **Forced reflow** in `main.js` (Home): looked at; fixed only if it is a one-line batching change.

Rules: `ai/rules/assets-performance.md` gets a line for each rule a change sets. A limit in
`.size-limit.json` changes only by the measured size of the change, with a new record superseding
`ci-size-limit-photos`. Something that cannot reach 100 gets a decision record.

## Verification

- Lighthouse against a local production build served with compression (`npx vite preview` does not
  compress, so a small Node server in the scratchpad adds brotli and the `/assets/` cache header), at
  least 3 runs per page and mode, before and after, with nothing else running.
- `npm run lint`, `lint:css`, `format:check`, `build`, `size`; `cmp dist/404.html dist/index.html`;
  axe-core stays at 0 violations on all four pages.
- Screenshots at 1920, 1440 and 390 px before and after: the look is identical.
- After the merge the author measures production: the cells expected to change are Home mobile
  (CLS, and with it Performance) and the CLS of Careers and Security.
