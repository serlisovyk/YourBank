# Breakpoints and fluid values: two queries, ramps between the drawn widths

Date: 2026-10-25 · Status: accepted

## Context

`breakpoint-scheme` wrote every fluid size as a `clamp()` of `vw`, kept twice (`:root` and an `@media
(width < 1440px)` copy): `clamp(28px, 0.952vw + 24.29px, 38px)`. Nobody reads 28 / 38 / 48 in that, and
about 230 declarations, single-use ones included, sat in `variables.css`.

## Decision

- Structure changes in two queries, sizes do not: `width < 1024px` (side-by-side compositions stack) and
  `width < 768px` (other grids become one column, the header becomes the menu button); none at 1440.
  The design is exact at 390, 1440 and 1920 and flat outside them.
- A fluid value is its size at 390 plus the growth of each segment, with the design numbers:
  `calc(28px + (38 - 28) * var(--ramp-390-1440) + (48 - 38) * var(--ramp-1440-1920))`; a flat segment
  leaves its term out. The ramps run 0 to 1px over their segment and live in `variables.css` with the
  codebase's one `@media (width < 1440px)`, which sets `--ramp-390-1440` to 1px from 1440 up (`vw` leaves
  out the stable scrollbar gutter, the query does not, so a 1440 wide window gets exactly the 1440 sizes).
- A value on other anchors writes its own `clamp(0px, …, 1px)` ramp in its stylesheet; the one that ends
  at 1440 (`--ramp-768-1440`, the Security panel) stays beside the query.
- A value one block uses is written in that block's stylesheet; used twice there, it is a custom
  property on the block's root rule; a token is the palette, a radius, a step of the documented type
  scale or a value two or more blocks share.

## Consequences

- No second copy of a token below 1440; a rule's 390, 1440 and 1920 sizes are the design numbers.
- Rejected: a query per drawn width (three copies of every rule); one `clamp()` from 390 to 1920 (about
  42 px at 1440 against the drawn 38); container queries and mobile-first `min-width` queries; a unitless
  0 to 1 progress (`(100vw - 1440px) / 480px`: dividing lengths is not supported everywhere); a token
  for every fluid value (what made `variables.css` unreadable).
