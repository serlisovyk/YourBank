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

- Colours (also inside a gradient or a shadow), the font family, radii and the type steps, spacing and
  size values that two or more blocks share are tokens in `styles/general/variables.css`
  (`ai/design-system.md` lists them). `#`, `rgb(` and `hsl(` appear nowhere else; `transparent` and
  `currentColor` stay keywords. Never hard-code a colour or a step of the type scale. Stylelint
  rejects a hex colour outside `variables.css`; `rgb(` and `hsl(` stay a review matter.
- A value one block uses is written in that block's stylesheet, not made a token. A value used
  twice in one block is a custom property on its root rule (`.press-card { --space-press-card: … }`).
  When a second block needs it, it becomes a token on the existing scale (`--green-60`, `--space-card`).
- A token is one exact value: merging near-duplicates changes the look, so it is decided with
  the result in front of you.
- The font is set once on `body` and inherited; buttons repeat it only because a form control
  does not inherit it.
- Text contrast is at least 4.5:1, large text, icons and control borders at least 3:1, in
  every state, hover and focus included.

## Breakpoints and fluid values

- The design is drawn at 1920, 1440 and 390 px (`ai/design-system.md`). Only structure is a
  media query, and only two: `width < 1024px` (side-by-side compositions stack) and
  `width < 768px` (grids become one column, the header becomes the menu button). Type and
  spacing are fluid, so a rule has no per-width values and no query at 1440
  (`ai/decisions/2026-10-25-fluid-ramps.md`).
- A fluid value is its size at 390 plus the growth of each segment, written with the design
  numbers: `calc(28px + (38 - 28) * var(--ramp-390-1440) + (48 - 38) * var(--ramp-1440-1920))` is
  28 at 390, 38 at 1440, 48 at 1920. A segment that stays flat leaves its term out
  (`calc(18px + (20 - 18) * var(--ramp-1440-1920))`); a value that shrinks has a negative
  difference. The ramps in `variables.css` run 0 to 1px over their segment. A value on other anchors
  writes its own `clamp(0px, (100vw - 880px) / 370, 1px)` the same way. Never a bare `vw` coefficient.
- A new rule takes its value from the `ai/design-system.md` tables and is checked at 1920, 1440 and
  390 px. The base rule is the widest layout; a narrower screen overrides it.
- A block drawn at one size that scales as a whole (the Home hero card) sets `font-size` once on its
  root and writes its sizes in `em` of the drawn px / 16. An element with its own `font-size` takes
  its spacing from the container, since its `em` is its own.
- No horizontal scroll from 390 to 1920 px, and none at 200% zoom.

## Motion and focus

- Reduced motion is handled once, in `general/reset.css` (the page transition aside, below); a component never adds its own
  `prefers-reduced-motion` block. A duration comes from `--transition-duration`, or is written in
  the one block that uses it (the reveal).
- A `transition` names its properties, never `all`.
- Pages cross-fade by `@view-transition` (`general/main.css`), only under `no-preference`; a new page
  gets it for free. A `view-transition-name` is unique on its page and sits on an element that has the
  same place on every page (the header), with its group `animation: none`
  (`ai/decisions/2026-10-26-cross-document-view-transitions.md`).
- A state that hides content for an animation applies only under a class a script puts on `<html>`
  (`.js-reveal`), so the page is complete without script.
- One `:focus-visible` rule in `general/main.css` draws the ring for every control (2px
  solid `--green-60`); a hover look never sits on `:focus`, and never `outline: none` without a
  replacement; the one exception is `main`, a `tabindex="-1"` skip-link target, not a control.
- A control drawn under 44 px keeps its drawn size and takes the `hit-area` utility (`ui/`): an
  invisible `::after` that grows the clickable box to `--touch-target`
  (`ai/decisions/2026-10-24-touch-targets-hit-area.md`).
- Use `hidden` or `inert` to take an element out of the page; text for assistive technology
  only is a utility class in `ui/`, not `display: none`, which hides it from them too.
- Every `@keyframes` lives in one stylesheet in `general/`.
