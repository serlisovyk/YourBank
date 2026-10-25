# Plan: review of configs, font, preview and source link (MY-211)

Goal: the author's review items. No open questions.

## Changes

1. **Split `vite.config.js`.** The root file only re-exports `vite/config.js`. Layout:
   `vite/paths.js` (`ROOT`, `SRC`, `DIST`, `PUBLIC`, `PARTIALS`, `PAGES`), `vite/config.js`
   (`defineConfig` from the parts), `vite/parts/` one module per concern (`build.js`, `plugins.js`,
   `handlebars.js`, `image-optimizer.js`), `vite/handlebars/` (`helpers.js`, `context.js`: where a
   new helper or `data/` constant goes) and `vite/plugins/` (`minify-html.js`, `copy-index-to-404.js`).
   `dist/` must come out byte for byte the same (diffed before and after). ESLint sees `vite/` as Node
   code; docs that name `vite.config.js` (`map`, `architecture`, `html`, `section`) point at the new place.
2. **Drop `keywords` from `package.json`.**
3. **Lower-case font file:** `Lexend.woff2` to `lexend.woff2` (`git mv` through a temp name on Windows),
   in `fonts.css`, the preload in `shared/head`, the docs. `.size-limit.json` uses a glob.
4. **Remove both `Lexend Fallback` faces.** `--font-family` becomes `'Lexend', Arial, sans-serif`; the
   duplicate `system-ui, sans-serif` after it in `main.css` goes. The font-swap shift returns (CLS up to
   about 0.07 on Home mobile, Performance 98-99): the author accepted it. A new record supersedes
   `lighthouse-100` (only its Status line changes) and restates what stays: the preload and what is
   left alone. `assets-performance` loses the fallback sentence. The CSS limit stays 8.5 kB.
5. **New `public/og-image.png`** (1200x630, under 300 kB): the real Home header and hero, scaled to fit
   on the site background with the author's name at the bottom centre. Made from a headless Chrome
   screenshot of the built Home page and composed with `sharp`; only the PNG is committed
   (`link-previews`: the repo keeps the result, not a generator). `og:image:alt` in `data/site.js`
   follows; `link-previews` describes the old image and stays as it is, the new record says what the
   image is now. `map` and `assets-performance` describe the image.
6. **Source link.** A GitHub icon link to the repository in the footer next to the author line, so it
   is on all four pages and in `404.html` through the shared `footer` partial and can never cover
   content or the header menu button. Markup: `target="_blank"`, `rel="noopener"`, `aria-label` and
   `title` "Source code on GitHub (opens in a new tab)", the address and label in `data/footer.js`.
   An inline SVG in `currentColor`, `--green-60`, 44 px box (24 px glyph, 10 px padding), the common
   focus ring. Styles in `footer.css`.

## Verification

- `npm run lint`, `lint:css`, `format:check`, `build`, `size`; `cmp dist/404.html dist/index.html`.
- `dist/` of `main` against `dist/` after item 1: identical; after items 3-5 only the font name, the CSS,
  the HTML of the footer and the preview image differ.
- `npm run dev` starts and serves a page through the split config; `vite preview` of the build:
  four pages at 1920, 1440 and 390 px, the link visible, focusable by keyboard, not overlapping; axe-core
  reports 0 violations.
- Home mobile CLS with the font held back is measured after item 4 only to report the accepted cost.

## Result

- `dist/` after item 1 is identical to `main`'s. After items 3 and 4 only the font file name, the
  stylesheet and the preload differ; the CSS is 7.97 kB gzip (limit 8.5 kB), 8.02 kB with the link.
- Stylelint writes the stack as `'Lexend', arial, sans-serif` (keyword case).
- The preview is 68 kB; the name sits at the bottom centre, the header and hero are the real page at its
  1920 px layout, scaled by 0.54.
- axe-core: 0 violations on the four pages and the 404 page at 1440 px; the link is 44x44, reachable by
  Tab with the green focus ring, and overlaps nothing from 390 to 1920 px.
