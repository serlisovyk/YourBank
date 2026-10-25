# Breakpoints: two structural queries, fluid tokens between the three drawn widths

Date: 2026-10-23 · Status: superseded by 2026-10-25-fluid-ramps.md

## Context

The design is drawn at 1920, 1440 and 390 px. 1920 and 1440 share one structure and differ only in
sizes (title 48 → 38, section gap 150 → 120, card padding 50 → 40); the structure changes at 390
(columns stack). The code repeats `1440`, `1024` and `768` queries by hand in every rule, so a
value is right at the drawn widths and a guess in between.

## Decision

- **Structure changes in media queries, sizes do not.** Two structural queries: `width < 1024px`
  (side-by-side compositions stack) and `width < 768px` (the other multi-column grids become one
  column; the header becomes the menu button). `ai/design-system.md` says which section uses which.
  No component has a query at 1440.
- **Sizes and spacing are tokens that interpolate between the anchors:** a `clamp()` of `vw`, exact
  at 390, 1440 and 1920, flat outside. `:root` holds the 1440 → 1920 segment; one
  `@media (width < 1440px)` in `variables.css` redefines the tokens as the 390 → 1440 segment.
  For lengths `a` at 390, `b` at 1440, `c` at 1920: below 1440 `clamp(a, (b - a) / 10.5 * 1vw +
(a - (b - a) * 0.3714), b)`, above `clamp(b, (c - b) / 4.8 * 1vw + (b - 3 * (c - b)), c)`. A title of
  28 / 38 / 48 is `clamp(28px, 0.952vw + 24.29px, 38px)` and `clamp(38px, 2.083vw + 8px, 48px)`.
- The page content is at most 1596 px wide; the gutter is a token running 16 → 80 px.

## Consequences

- A component writes `font-size: var(--text-title)`, never a per-width value; the one 1440 query
  in the codebase is in `variables.css`.
- Between the anchors the page interpolates, so 1024 or 1700 px are not checked against the
  design; the three drawn widths are. Layout columns are `fr` / `flex`, not drawn pixel widths.
- Until the CSS moves onto the tokens the old `1440 / 1024 / 768` queries stay; that task sets this
  record to `accepted`.
- Rejected: a query per drawn width with fixed values (steps, three copies of every rule); one
  `clamp()` from 390 to 1920 (about 42 px at 1440 against the drawn 38); container queries (more
  moving parts, nothing the page needs); mobile-first `min-width` queries (the base rule is the
  widest layout, `ai/rules/css.md`).
