# Plan: bugs from the author's review (MY-213)

Goal: five bugs the author found in the browser. One commit per bug, after this plan. Behavior
changes are small and stated per bug; no spec file. No open questions that block the work, but
bug 1 needs the author's eye (the new questions are text I wrote).

## 1. FAQ: Load All FAQ's shows nothing new

- Reproduced in headless Chrome (real mouse clicks and Enter, Home, Careers and Security, 320 to
  1920 px): the expander works. The fade lifts, the button moves down. Nothing else changes
  because all four questions are already on screen: the preview row is almost the whole second
  row (`--faq-preview`, 295 of 298 px at 1440), and the data has only four questions.
- Cause: content, not the reveal or the heights. `data/question-items.js` has two `additional`
  questions and the preview shows them whole.
- Fix: four more questions in `questionGroups.additional`, and a layout that keeps the preview to
  exactly the first two of them. A single region with `max-height: --faq-preview` would show a
  strip of the next row between the drawn widths (the token is exact only at 1920, 1440 and 390),
  so the expander gets two regions: `faq__more` (the two faded questions, as now) and `faq__rest`
  (the new ones, closed to 0). `Disclosure` controls every `[data-disclosure-region]` in its root.
  The CSS keys on `[inert]` instead of a state class, so the `expandedClass` option and the
  `FAQ.expandedClass` constant go.
- Kept: focus stays on the button, labels, `aria-expanded`/`aria-controls` (both ids), reduced
  motion (global reset), the closed look at 1920, 1440 and 390 unchanged.

## 2. Toggle pills at 1024

- The heading's actions column shrinks to the width of one button when the text is wide, so the
  two buttons wrap onto two lines. Fix in `section-heading.css` (the actions do not shrink) and
  `toggle.css` (a flex row that does not wrap; padding eases down only where a phone is too
  narrow for the drawn padding).

## 3. Learn More at 768

- The button became a link (`a`) when it got an address: a `display: block` link fills the row,
  a `button` did not. Fix: `width: fit-content` with the centred margin at `< 1024`, the label
  centred. This also changes 390 (the same bar with a left label there), to the centred pill the
  rule was written for.

## 4. Header menu at 425

- The open menu keeps the pill radius (100px) on a tall box. Fix in `header.css`: the
  radius of `.header__inner` follows the menu state; closed look unchanged.

## 5. About at 1024

- Mission & Vision rows overlap by `--space-mission-overlap` while the text column is narrower
  than the plate. Fix in `mission-vision.css` for 1024 to 1439; 1440, 1920 and 390 unchanged.

## Docs

- `ai/design-system.md`: the FAQ line (preview and rows), the header open state, the toggle and
  Learn More lines, only if the change made them wrong. `ai/map.md`: nothing moves.
  `ai/rules/oop.md`/`style.md`: the disclosure line only if it names the class.

## Verification

The checks in `AGENTS.md`; `cmp dist/404.html dist/index.html`; headless Chrome over `vite
preview`: the four pages at 1920, 1440, 1024, 768, 425 and 390, before and after, pixel-compared
at the drawn widths; neighbours 1023/1025, 767/769, 375 to 430; the FAQ with mouse and keyboard on
three pages, Show Less, reduced motion; no horizontal overflow 320 to 1920; axe-core 0 violations.
