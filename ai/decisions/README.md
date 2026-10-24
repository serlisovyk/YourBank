# Decisions

Durable project decisions: why a choice was made, with a date. One decision per file, named
`YYYY-MM-DD-<slug>.md`. Format: a title, a `Date: … · Status: …` line, then `Context` →
`Decision` → `Consequences`; short and specific (about 30 lines, `ai/rules/docs.md`),
rejected alternatives with their reason, no check logs.

How this differs from `ai/rules/`: **rules** state what to do now (current law, rewritten as it
changes). **Decisions** state _why_, with a date. A record's text is not rewritten or deleted;
only its `Status` line changes.

The point: an agent (or a human) does not relitigate settled questions or "helpfully" restore
something that was deliberately rejected.

## Status

- `accepted` — in force and built.
- `accepted (not implemented)` — agreed now, built by a later task; that task sets it to
  `accepted`.
- `superseded by <file>` — replaced by a newer record; its line in the index moves to the
  Superseded group.

## Changing a decision

A refinement or a reversal is a **new record** that restates what stays in force, so the reader
needs only the newest one. The old record only changes its `Status` line to
`superseded by <file>`.

## When to add a record

Propose one as soon as the decision surfaces, without being asked, and only for:

- a standing constraint ("we will not do X", "always / never Y");
- a feature the author deliberately rejected;
- a tradeoff accepted over a named alternative, one a future agent would likely undo;
- a goal agreed now and built later (`accepted (not implemented)`);
- a convention chosen where an obvious alternative existed.

Not decisions: one-off task details, plain current-state facts, a choice nobody would reverse,
anything `ai/rules/` and `ai/map.md` already cover. Do not create noise records.

## Records

The first groups are the records in force, by topic; the last one lists the superseded records,
each with the record that replaced it.

### Project and process

- [Vanilla JavaScript, Vite and Handlebars; no framework, no TypeScript](2026-10-23-vanilla-js-vite-handlebars.md)
- [Four pages, no Login or Sign Up](2026-10-23-four-pages-no-auth.md)
- [No automated tests](2026-10-23-no-automated-tests.md)
- [Vercel: clean URLs, a real 404 and cached assets, set in `vercel.json`](2026-10-23-clean-urls-vercel-json.md)
- [Merge locally into `main`, no pull requests](2026-10-23-local-merge-without-pr.md)
- [npm is the package manager; one `package-lock.json`](2026-10-23-npm-package-manager.md)
- [License declared in `package.json` only, no `LICENSE` file](2026-10-23-license-in-package-json.md)
- [Linters: ESLint, Stylelint, Husky and lint-staged](2026-10-23-linters.md)
- [Line endings: Prettier `endOfLine: auto`, no `.gitattributes`](2026-10-23-line-endings-auto.md)
- [CI on GitHub Actions and size-limit: the checks and the size limits](2026-10-24-ci-size-limit.md)
- [The design is a third-party template: a reference only, never published](2026-10-23-design-is-a-reference.md)

### Code

- [Sources in `src/`: partials by page, every asset bundled and hashed](2026-10-23-sources-in-src.md)
- [Production build: Vite's CSS defaults, minified HTML, optimized images](2026-10-23-build-pipeline.md)
- [Dotted decor and photos are WebP or AVIF rasters, never a vector per dot](2026-10-23-light-decor-raster.md)
- [JavaScript in OOP style: a class per component and per section](2026-10-23-oop-javascript.md)
- [Breakpoints: two structural queries, fluid tokens between 390, 1440 and 1920](2026-10-23-breakpoint-scheme.md)
- [The footer's year is written in the browser](2026-10-24-footer-year-in-browser.md)
- [Privacy Policy and Terms of Service are text, not links](2026-10-24-footer-legal-text.md)
- [Currency converter: fixed rates in `data/`, no API, a native select](2026-10-24-fixed-rates-native-select.md)
- [Carousel: CSS scroll-snap, no library](2026-10-24-carousel-scroll-snap.md)
- [Open Account leads to Our Products, the tab in the address](2026-10-24-open-account-to-products.md)
- [Link previews: one image and the origin, fixed by hand in `public/` and `data/site.js`](2026-10-24-link-previews.md)

### Superseded

- [Deployed on Vercel through its Git integration](2026-10-23-vercel-deploy.md) — superseded by `clean-urls-vercel-json`
