# The Vite config is split into `vite/`, one module per concern

Date: 2026-10-25 · Status: accepted

## Context

`vite.config.js` held the path constants, twenty-odd `data/` imports, the Handlebars helpers and
context, two small plugins and the image optimizer options in one file. A new helper, a new
`data/` constant or a new page each meant editing that same file, and a reader had to scan all of it to
find the one thing that changed.

## Decision

- The root `vite.config.js` only re-exports `vite/config.js`, which builds the config from the parts.
- `vite/paths.js` holds the path constants and `PAGES`, the Rollup inputs; `vite/parts/` one module per
  concern (`build`, `plugins`, `handlebars`, `image-optimizer`), each exporting one `get…` function;
  `vite/handlebars/` the helpers and `context(pagePath)`; `vite/plugins/` the two build plugins.
- The output of the build is unchanged: the split moves code, it does not change a setting. What
  `build-pipeline` decided (Vite's CSS defaults, the HTML minifier, the optimizer options) and what
  `clean-urls-vercel-json` decided (the 404 is a copy of Home) stays, and where those records say
  `vite.config.js` they now mean the matching module in `vite/`.

## Consequences

- A `data/` constant is wired in `vite/handlebars/context.js` only; a new page is one line in
  `PAGES`; a new plugin is a file in `vite/plugins/` and a line in `parts/plugins.js`.
- ESLint reads `vite/**` as Node code.
- Rejected: one file per plugin with the config still inline (the config stays the long file); a
  config helper library or a `merge` layer (more machinery than six small modules need).
