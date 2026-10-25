# Definition of Done

A change is done when all of the following hold. Use it as the gate before handing a change
over for approval.

## Code

- New code follows `ai/rules/architecture.md`, `html.md`, `css.md`, `oop.md` and `style.md`:
  data in `data/`, a partial per section or component, BEM, tokens, classes with
  `constructor(root, options)` and `start()`, `main.js` only creating and starting.
- Shared values come from one source: texts from `data/`; colours, radii, the type scale and
  values two blocks share from the tokens; a breakpoint a script reads is one constant.
- A change to images, the font, `assets/` or the page metadata follows
  `ai/rules/assets-performance.md`.
- No comments, no inline styles, no inline event handlers, no state on `window`.
- Stale code, styles, data and assets left behind by the change are removed.
- Nothing from `ai/rules/scope.md` or the decisions it points to slipped in.

## Accessibility and responsive

- Checked in the browser at **1920**, **1440** and **390 px** against the design: grid,
  spacing, type, block order, the menu; no horizontal scroll from 390 to 1920 px, none at
  200% zoom, and the in-between widths (1024, 768) do not break.
- Controls are real elements with an accessible name; everything works from the keyboard
  (Tab order, `Enter`/`Space`, `Escape`, arrows by the pattern in `ai/rules/style.md`) and
  the focus ring is visible; after opening or closing something, focus lands somewhere
  meaningful.
- Text contrast is at least 4.5:1, icons and control borders at least 3:1, in every state,
  hover and focus included.
- New animation takes its duration from `--transition-duration` and does not break under
  `prefers-reduced-motion`.
- Touch targets are at least 44px: a smaller drawn control takes the `hit-area` utility.
- A new page or section keeps the skip link first and `main#main` as its target, one `h1` and
  headings in order, and contrast in every state, checked by a script (axe cannot read text over a
  background image).
- Tab through it: the order follows the reading order, no stop is hidden or lost, no trap.
- Reduced motion (`prefers-reduced-motion: reduce`): no transition, animation or smooth scroll,
  pseudo-elements included.

## Docs (in the same change, within `ai/rules/docs.md`)

- `README.md`: a short line, only if what a user sees, the scripts or the structure changed
  and the repo has one.
- `ai/map.md`: only if a page, partial, stylesheet, script, data file or asset folder was
  added, renamed, removed or moved.
- `ai/rules/*` or `ai/skills/*`: only if the change reshaped a pattern.
- `ai/decisions/`: a new dated record if the change meets the criteria in its `README.md`.
- No doc went over its limit; one that did was trimmed in this change.

## Verification

- Every check listed under "Verification" in `AGENTS.md` passes: `npm run lint`,
  `npm run lint:css`, `npm run format:check`, `npm run build`, `npm run size`. The commit went through the
  pre-commit hook, never `--no-verify`.
- A change to a page was used in the browser (`npm run dev`) — keyboard and mouse, the three
  widths — not just built.
- Reported: what changed, which commands were run, whether they passed, and anything that
  could not be verified. Never claim the project builds or is formatted unless the command
  was run and passed.
- No automated test suite exists — do not add one unless explicitly asked, and do not report
  its absence as a gap.
