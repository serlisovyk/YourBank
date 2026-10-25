# CSS Rules

Plain CSS with native nesting; no preprocessor, CSS Modules, CSS-in-JS or utility
framework. `styles/style.css` imports every file, in this order: `general`, `ui`,
`components`, `sections` (`ai/map.md`).

## Naming: BEM

- `block__element--modifier`. The block is the partial (`.header`, `.product-card`), an
  element is a part of it (`.product-card__title`), a modifier is a variation or a state
  (`.button--secondary`, `.case-item--inverted`). Stylelint checks the pattern.
- Elements do not nest in the name: `block__element`, never `block__element__sub`; a
  two-word element is hyphenated (`header__nav-link`).
- One block, one stylesheet named like its partial, in `styles/sections/` or
  `styles/components/`; a shared element (`.button`, headings) is in `styles/ui/`. A new
  file is imported in `style.css` beside its kind.
- A state a script sets is a native attribute (`[aria-expanded='true']`, `[hidden]`,
  `[inert]`) or a BEM modifier; a hook for a script is a `data-*` attribute, never a class
  (`ai/rules/style.md`).
- A tag selector appears only inside its block (`.faq__button img`), never globally
  outside `general/`.

## Nesting

- States, pseudo-elements, children and media queries nest inside their rule: `&:hover`,
  `&::after`, `@media (...)`. A media query sits inside the selector it changes, as a strict
  range without `=`: `@media (width < 1024px)`.
- Nesting adds the parent's specificity: stay at two levels, and let order or a more
  specific selector win, never `!important`.
- `:hover` only inside `@media (hover: hover)`, so a tap leaves no hover look.

## Longhands and plain grids

- `background` is never the shorthand: write `background-image`, `background-position`,
  `background-size`, `background-repeat` and `background-color`, each only where it is needed. A
  rule that sets only a colour is `background-color`; one that must drop an image set by another rule
  adds `background-image: none`. A `transition` names `background-color`.
- Spacing on one side is a longhand: `padding-left: X`, never `padding: 0 0 0 X`; `margin-top` and
  `margin-bottom`, `border-left`, `inset-inline` with `bottom`, the same way. An axis is
  `padding-inline` / `padding-block` / `margin-inline`. A `padding: Y X` that sets both axes stays.
- Grid tracks are written plain: `repeat(2, 1fr)`, `1fr auto 1fr`, `664fr 932fr`, never
  `minmax(0, …)`. An item that would push its column past its share gets `min-width: 0`.

## Tokens

- Every value comes from a token in `styles/general/variables.css`: colours (also inside a
  gradient or a shadow), the font family, radii, durations, and the type and spacing scale
  listed in `ai/design-system.md`. `#`, `rgb(` and `hsl(` appear nowhere else; `transparent`
  and `currentColor` stay keywords. Never hard-code a colour, a font size or a section spacing.
  Stylelint rejects a hex colour outside `variables.css`; `rgb(` and `hsl(` stay a review matter.
- A value used in more than one place is a token first, named on the existing scale
  (`--green-60`, `--grey-15`). A one-off layout size (a section's padding, a column's width)
  need not be a token.
- A token is one exact value: merging near-duplicates changes the look, so it is decided with
  the result in front of you.
- The font is set once on `body` and inherited; buttons repeat it only because a form control
  does not inherit it.
- Text contrast is at least 4.5:1, large text, icons and control borders at least 3:1, in
  every state, hover and focus included.

## Breakpoints

- The design is drawn at 1920, 1440 and 390 px (`ai/design-system.md`). Only structure is a
  media query, and only two: `width < 1024px` (side-by-side compositions stack) and
  `width < 768px` (grids become one column, the header becomes the menu button). Type and
  spacing are fluid tokens, so a rule has no per-width values and no query at 1440
  (`ai/decisions/2026-10-23-breakpoint-scheme.md`).
- A value that changes with the width is a fluid token in `variables.css`: `:root` holds the
  1440 to 1920 segment of its `clamp()`, the one `@media (width < 1440px)` the 390 to 1440
  segment; a token that shrinks as the width grows takes its `clamp` bounds the other way round.
  A new rule takes its value from the `ai/design-system.md` tables and is checked at 1920, 1440
  and 390 px.
- The base rule is the widest layout; a narrower screen overrides it.
- No horizontal scroll from 390 to 1920 px, and none at 200% zoom.

## Motion and focus

- Reduced motion is handled once, in `general/reset.css`; a component never adds its own
  `prefers-reduced-motion` block. A duration comes from a token (`--transition-duration`).
- A `transition` names its properties, never `all`.
- A state that hides content for an animation applies only under a class a script puts on `<html>`
  (`.js-reveal`), so the page is complete without script.
- One `:focus-visible` rule in `general/main.css` draws the ring for every control, from the
  token `--focus-ring`; a hover look never sits on `:focus`, and never `outline: none` without a
  replacement; the one exception is `main`, a `tabindex="-1"` skip-link target, not a control.
- A control drawn under 44 px keeps its drawn size and takes the `hit-area` utility (`ui/`): an
  invisible `::after` that grows the clickable box to `--touch-target`
  (`ai/decisions/2026-10-24-touch-targets-hit-area.md`).
- Use `hidden` or `inert` to take an element out of the page; text for assistive technology
  only is a utility class in `ui/`, not `display: none`, which hides it from them too.
- Every `@keyframes` lives in one stylesheet in `general/`.
