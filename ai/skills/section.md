---
name: section
description: Use to add or rework a page section or a repeated element in the Banking repo — data, partial, styles, optional controller class, wiring on the page and in main.js, docs.
---

# Section

## When to use

A new page section, a new repeated element (a card, a list item), or a rework of either. The
rules are `ai/rules/architecture.md`, `html.md`, `css.md`, `oop.md` and `style.md`; this is the
order of the work.

## Path of a section

1. **Data** — if the section has a list or repeated text: a named export in `data/<name>.js`, wired
   in `context` in `vite/handlebars/context.js`. No markup, classes or styles in the data.
2. **Partial** — `partials/sections/<page>/<name>.html` (`shared/` when two pages use it): a root
   `<section class="<name> section">` with a `.container` inside. A repeated part is
   `partials/components/<item>.html` with one root and parameters (a hash, or the context of
   `{{#each}}`). The section's title and text are `{{> components/section-heading }}`. File name =
   BEM block name. Roles and ARIA go in the markup; the root gets `data-<name>`, the children the
   hooks of the component that drives them (`ai/rules/oop.md`). Cards and rows below the first screen carry `data-reveal` (`ai/rules/html.md`).
3. **Styles** — `styles/sections/<name>.css` (and `styles/components/<item>.css`): BEM, native
   nesting, only tokens from `variables.css` (a value that changes with the width is a fluid token); import it in `styles/style.css` beside its kind.
   Compare 1920, 1440 and 390 px with the design.
4. **Controller** — only when the section has behavior: a class in `scripts/controllers/` with
   `constructor(root, options)` and `start()`. A repeated widget (tabs, expander, menu) is a
   component in `scripts/components/` that the controller assembles. When a ready component is
   enough, skip the controller.
5. **Wiring** — `{{> sections/<page>/<name> }}` on every page that needs the section; add a row (`data-<name>` selector and
   controller) to the `SECTIONS` table in `main.js`; a section missing from the page is skipped.
6. **Docs** — `ai/map.md` (partial, stylesheet, script, data file); a decision record if a durable
   decision was made; a rule or this skill if a pattern changed (`ai/rules/docs.md`).

## Check

The checks in `AGENTS.md`; the page in `npm run dev` at 1920, 1440 and 390 px and with the
keyboard; then `ai/rules/definition-of-done.md` and the `review` skill.
