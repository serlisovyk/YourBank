# Clean URLs, a real 404 and cached assets, set in `vercel.json`

Date: 2026-10-23 · Status: superseded by `vercel-json-without-old-redirect`

## Context

Pages opened at `/careers.html`, and the earlier site answered every path with `index.html` and
status 200, so a missing `robots.txt` looked like a page. The hashed files in `/assets/` can be
cached for good. Production already returns 404 for an unknown path: there is no catch-all rewrite.

## Decision

- Hosting is unchanged from `2026-10-23-vercel-deploy.md`: Vercel's Git integration, `main` is
  production, `npm run build` into `dist/`, and agents never recreate, reconnect or reconfigure
  the project. What the project needs beyond the preset lives in `vercel.json`, nowhere else.
- `cleanUrls: true`, `trailingSlash: false`: the pages are `/`, `/careers`, `/about`,
  `/security`; `/careers.html` redirects there. The header links use these URLs.
- A permanent redirect `/pages/<about|careers|security>.html` to `/<page>`: those were the live
  URLs before the move into `src/`, so old links keep working. It lists the slugs, so a path that
  never existed still gets the 404. `cleanUrls` strips `.html` before any custom redirect runs,
  so the source is `/pages/:slug(about|careers|security)` without the extension: the old URL
  takes two hops (`/pages/about.html` → `/pages/about` → `/about`).
- `Cache-Control: public, max-age=31536000, immutable` on `/assets/(.*)`: every file there is
  emitted with a content hash (`2026-10-23-sources-in-src.md`).
- No rewrites, above all no "everything to `index.html`": an unknown path must end in
  `404.html`, which Vercel serves with status 404.
- The 404 is the home page: a build plugin in `vite.config.js` copies the built `dist/index.html`
  to `dist/404.html`. It is not a source page and not a fifth page of the site
  (`2026-10-23-four-pages-no-auth.md`). Asset and link URLs are root paths, so the copy works at any
  depth of an unknown path.

## Consequences

- Vite's dev and preview servers do not apply `cleanUrls`: locally `/careers` is not found; open
  `/careers.html`. Clean URLs are checked on a Vercel preview or production.
- A new page needs no `vercel.json` change; a new top-level folder of hashed files would.
- Rejected: leaving `.html` in the URLs (portfolio polish, and `.html` in a link is an
  implementation detail); a `/pages/(.*).html` redirect (bounces unknown paths to a second 404);
  an SPA-style catch-all (200 for any path, the Lighthouse errors on `robots.txt`); a hand-made 404
  page (a second look to keep in step with the site).
