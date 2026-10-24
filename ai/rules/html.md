# HTML Rules

Pages are assembled from partials by `vite-plugin-handlebars` (`vite.config.js`). Where
everything lives: `ai/map.md`; how the layers relate: `ai/rules/architecture.md`.

## Pages and partials

- A page is a shell: `<html lang="en">`, `<head>{{> sections/shared/head }}</head>`, the header, and a `<main>` holding the list of
  `{{> section }}` calls (the footer goes after it). Section markup is never written on a page.
- Pages are `src/*.html`; partials live in `src/partials/`. `partials/sections/<page>/` — one
  page section: `<section class="<name> section">` with a `.container` inside; `shared/` holds
  what two or more pages use. `partials/components/` — a repeated element (a card, a list item).
- A partial is called by its path under `partials/`, without the extension:
  `{{> sections/home/hero }}`, `{{> components/product-card }}`. The path is the name, so two
  partials never collide; a folder is created with its first file.
- A partial's file name is the name of its BEM block (`product-card.html` → `.product-card`);
  kebab-case.
- A partial has one root element with the block's class. A component is used by sections
  only; a section does not include another section.
- A section's title, text and optional right slot (a toggle) are `components/section-heading`,
  never a per-section `*__title` and `*__text`. The slot is a partial block
  (`{{#> components/section-heading … }}…{{/components/section-heading}}`) rendered by
  `{{> @partial-block }}`. A parameter never carries HTML (Prettier would parse it): a title with
  an accent is `titleStart`, `titleAccent`, `titleEnd`.

## Partial parameters

- A repeated element takes its data as parameters: a hash (`{{> product-card title="…" }}`)
  or the context of `{{#each items}} {{> item }} {{/each}}`.
- A variation is a parameter flag and a BEM modifier
  (`{{#if inverted}} case-item--inverted{{/if}}`).
- The current page reaches a partial as `page` from `context` (an entry of `data/pages.js`); the head partial builds the
  `<title>`, description, canonical and social tags from it and from `site` (`data/site.js`). A new page is a
  record in `data/pages.js` with its `path` (a clean URL), a unique `title` and `description`: the head needs
  nothing else. The navigation is `{{#each navigation}}`; every link has `aria-current`, `page` on
  the current one and `false` on the rest. The condition sits inside the value
  (`aria-current="{{#if (eq key ../page.navKey)}}page{{else}}false{{/if}}"`), never around the
  attribute: Prettier cannot parse a tag with a conditional attribute.
- Template logic stays at `if` / `unless` / `each` and the `eq` helper (registered in `vite.config.js`):
  anything more is computed in `data/`.

## Data

- Texts and lists that repeat or are rendered by a loop live **only** in `data/*.js`, reach
  the templates through `context` in `vite.config.js`, and are never copied into a partial.
  A literal in a partial is for markup unique to that section.
- A `data/` file exports a named constant of plain values; it holds no markup, class names or
  styles. A new file is wired into `context`.

## Semantics and ARIA

- Semantic elements for the page regions (`header`, `nav`, `main`, `section`, `article`,
  `footer`); one `h1` per page, headings in order without skipping a level.
- A button for an action (`<button type="button">`), a link only for going to another
  address; a link that opens a new tab has `target="_blank"` and `rel="noopener"` and says so.
  Every button outside a form has `type="button"`.
- Whatever goes to a place, on the page or off it, is `<a href>` even with the button look
  (`<a class="button">`); whatever acts on the page (open, toggle, submit) is `<button>`. No control
  without an action: a destination is a section, never `href="#"`.
- The logo is a link to `/`; its image is named by `alt="YourBank"`.
- A control with no visible text, or whose text is not enough, has an accessible name
  (`aria-label`); an icon next to text is decorative (`alt=""`, `aria-hidden="true"`).
- Widgets (tabs, disclosure, menu) carry their roles, `aria-controls` and
  `aria-labelledby` in the markup; the script changes only the states
  (`ai/rules/style.md`, "ARIA patterns").
- A hook for a script is a `data-<block>-<role>` attribute, not a BEM class.
- No inline `style`, no inline handlers, no `<br>` for spacing.
- Interface texts follow the design; one action has one name wherever it shows.
