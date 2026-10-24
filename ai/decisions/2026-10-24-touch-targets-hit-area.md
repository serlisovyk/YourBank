# Touch targets: the drawn size stays, the hit area grows to 44 px

Date: 2026-10-24 · Status: accepted

## Context

The design draws some controls under 44 px: the menu button (40 px high), the Individuals and
Businesses buttons (41 px), the menu links (41 px) and the logos (26 px high on a phone). A finger
needs about 44 px. Padding would have fixed it but changed the look the design sets.

## Decision

- **The drawn size follows the design; the clickable box is at least `--touch-target` (44 px).** A
  utility class `hit-area` in `styles/ui/` gives the control `position: relative` and an invisible
  `::after` that grows the box on each axis where it is smaller than 44 px, and not at all where it
  is not (`min(0px, …)` in `inset`).
- **A control under 44 px in either direction gets the class in its markup.** A control that is
  already 44 px or more does not.
- A parent with `overflow: hidden` would cut the grown box: it keeps a little padding inside, cancelled by
  a negative margin (the mobile menu list).
- Inline links inside a sentence are exempt (WCAG 2.5.8): they are not made taller than their line.

## Consequences

- No layout or look changes; the growth shows only as a larger tap area.
- A new small control is one class, not a new rule.
- Rejected: `min-height: 44px` or more padding (changes the drawn pill); a grown `::after` written
  per component (the same code repeated).
