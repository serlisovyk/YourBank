# Font: preloaded, a plain fallback stack, a small swap shift accepted

Date: 2026-10-25 · Status: accepted

## Context

`lighthouse-100` removed the layout shift of the font swap with a `Lexend Fallback` face: a local Arial
scaled by `size-adjust`, two `@font-face` rules whose ratios were measured and had to be re-measured for
every new weight. The author prefers a plain font stack to that machinery, and accepts the shift it
brought back: CLS up to about 0.07 on Home on a phone, Performance 98-99 there, the other cells unchanged.

## Decision

- **Removed:** both `Lexend Fallback` faces. `--font-family` is `'Lexend', arial, sans-serif`, set once on
  `body` and repeated only by form controls (`css.md`); no second stack after it.
- **Stays from `lighthouse-100`:** Lexend is preloaded in `shared/head` with the source path (Vite rewrites it
  to the hashed file), `font-display` stays `swap`, and the things Lighthouse lists but nothing scores stay
  as they are: the LCP decor requested after the stylesheet, the render-blocking stylesheet, the
  stand-in photos larger than their phone size, the forced reflow of `Reveal`.
- The font file is `lexend.woff2`, in lower case like every other asset.
- The CSS limit stays 8.5 kB (`ci-size-limit-css-room`); the CSS is smaller now, the room is not given back.

## Consequences

- A score of 98-99 on Home mobile with a CLS of 0.05-0.07 is the expected cost of the swap, not a regression;
  a larger shift, or one on another page, is questioned first.
- A new weight needs nothing but the `font-weight` range of the one `@font-face`.
- Rejected: restoring a metrics-matched fallback face (the machinery this record removes); `font-display: optional`
  or a block period (a first visit would show the system font, or no text); dropping the preload
  (the font would again wait for the stylesheet).
