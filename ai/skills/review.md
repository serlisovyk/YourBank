---
name: review
description: Use to self-review a diff in the Banking repo for regressions, scope creep, accessibility, responsive layout, and docs drift before reporting a change done.
---

# Review

## When to use

Self-review pass before handing over any non-trivial change, per `ai/workflow.md`.

## Checklist

Walk the diff against `ai/rules/definition-of-done.md` and the rules of the areas it touches
(`architecture`, `html`, `css`, `oop`, `style`, `scope`, and `assets-performance` for images, the
font or the metadata). Then check what the rules do not cover:

- **Design**: the change matches the design at 1920, 1440 and 390 px — grid, spacing, type, block
  order, button states; values are the design numbers (a token when two blocks share them), not literals tuned by eye.
- **Responsive**: no horizontal scroll from 390 to 1920 px or at 200% zoom; the in-between
  widths (1024, 768) do not break; the mobile menu opens, closes and is not reachable while closed.
- **Keyboard and ARIA**: Tab order is logical and the focus is visible; tabs move with the arrows,
  `Home` and `End`; the menu and the expander close with `Escape` and hand the focus back;
  `aria-expanded`, `aria-selected` and `aria-pressed` match what is on screen; hidden content is
  out of reach (`hidden` or `inert`); one `h1` per page and headings in order.
- **Partials and data**: a section is a partial, a repeated element a component with parameters,
  loop texts live in `data/` and are wired in `context`; every page that needs a section includes
  it, and the navigation marks the current page (`aria-current`).
- **Scripts**: listeners are attached by `start()`, `main.js` only creates and starts, a section
  missing from the page breaks nothing; no module-level state, no inline style except a custom
  property.
- **Motion**: a new animation takes its duration from `--transition-duration` and survives `prefers-reduced-motion`.
- **Build and assets**: every page builds; images and the font are referenced as
  `/assets/…` and come out of the build once, hashed; images have size and `alt`; no unused asset left behind.
- **Scope**: nothing from `ai/rules/scope.md` or the decisions behind it slipped in; no unrelated
  rewrites; removed behavior left no unused code, styles or data; no design link or key in any
  file.
- **Docs drift**: the docs still match the code, none went over its limit (`ai/rules/docs.md`),
  and a decision record exists if a durable decision was made.

## Verification gaps to catch

- Build green, but the change was never used in the browser.
- Checked on desktop only — not at 390 px, and not with the keyboard.
- Checked at one width only, not at 1920, 1440 and 390.
- Checked in the default look only: not on hover, not on focus, not at 200% zoom.
- Animation checked only with motion enabled.

## Report

State what was checked and what was found — fix it or say plainly why a finding is being left
alone, per `ai/workflow.md`'s report step.
