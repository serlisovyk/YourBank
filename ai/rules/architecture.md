# Architecture Rules

The site is static: Vite builds the pages and their partials into `dist/`. `ai/map.md` says
where every folder lives; `ai/rules/html.md`, `css.md` and `oop.md` cover markup, styles and
scripts.

## Layers

Content flows one way: data → partial → page, and each block's look and behavior sit beside
it. Each folder has one job:

| Layer         | Owns                                                             | Must not                             |
| ------------- | ---------------------------------------------------------------- | ------------------------------------ |
| `data/`       | the texts and lists a partial renders, as plain exported values  | hold markup, classes or styles       |
| `components/` | a repeated element as a partial: one root, parameters            | know which page or section uses it   |
| `sections/`   | one page section as a partial; composes components with data     | hold another section's markup        |
| pages         | the page shell (`src/*.html`): `<head>` and the list of sections | contain section markup               |
| `styles/`     | tokens, `ui/` shared elements, one stylesheet per partial        | style another block's elements       |
| `scripts/`    | behavior: a class per widget and per section, `main.js` wires    | build markup that a partial can hold |

## Pages and partials

- A page lists `{{> section }}` calls and nothing else in `<body>`. The same section on two
  pages is one partial, not a copy.
- `vite.config.js` is the one place that wires partial folders and `context`: a `data/`
  constant reaches the templates only through it, and the current `page` only from
  `context(pagePath)`.
- A new page is an HTML file in `src/`, added to `build.rollupOptions.input`; it gets an entry in
  `data/pages.js` (`path`, `title`, `description`, `navKey`) and an item in `data/navigation.js` for the `header` links. A page that is not in the navigation needs a reason.
- Links between pages are clean URLs without `.html` (`/careers`). `dist/404.html` is a build copy of the home
  page, not a source page (`ai/decisions/2026-10-23-clean-urls-vercel-json.md`).

## Behavior

- Markup carries the roles, states and relations (`aria-*`, `data-*` hooks, `hidden`,
  `inert`); a script only changes states and reads hooks. It never builds a section's markup.
- A script that a page does not need does nothing there: a section missing from the page is
  skipped by `main.js`, never an error.
- A value that JS hands to CSS is a custom property (`--faq-expanded-height`), not an
  inline style. A breakpoint a script reads (`matchMedia`) is one constant that equals the
  stylesheet's.

## Boundaries

- No inline `style` attribute and no inline event handler in HTML.
- No state on `window`, no global event bus, no singletons.
- No client-side router: pages are plain links.
- Do not rename existing CSS classes only for cosmetic reasons; class names are part of the
  block's styling contract.
- Content that is not real (a form that sends nothing, a login link) is not added to look
  complete: `ai/rules/scope.md`.
