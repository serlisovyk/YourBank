# Vercel: clean URLs, a real 404 and cached assets, without the old `/pages/` redirect

Date: 2026-10-25 · Status: accepted

## Context

`clean-urls-vercel-json` kept a permanent redirect from `/pages/<about|careers|security>` to the
clean URLs, because the pages lived under `pages/` before the move into `src/`. Those URLs were live
for a short time only; the author sees no links worth keeping and wants the config minimal.

## Decision

- Hosting is unchanged: Vercel's Git integration, `main` is production, `npm run build` into
  `dist/`; agents never recreate, reconnect or reconfigure the project. What the project needs
  beyond the preset lives in `vercel.json`, nowhere else.
- `cleanUrls: true`, `trailingSlash: false`: the pages are `/`, `/careers`, `/about`, `/security`;
  `/careers.html` redirects there. The header links use these URLs.
- `Cache-Control: public, max-age=31536000, immutable` on `/assets/(.*)`: every file there is
  emitted with a content hash.
- No `redirects`: an old `/pages/...` URL now gets the 404 like any unknown path.
- No rewrites, above all no "everything to `index.html`": an unknown path ends in `404.html`, which
  Vercel serves with status 404.
- The 404 is the home page: the build plugin `vite/plugins/copy-index-to-404.js` copies the built
  `dist/index.html` to `dist/404.html`. It is not a source page and not a fifth page of the site.

## Consequences

- Vite's dev and preview servers do not apply `cleanUrls`: locally open `/careers.html`; clean URLs
  are checked on a Vercel preview or production.
- A new page needs no `vercel.json` change; a new top-level folder of hashed files would.
- Rejected: keeping the `/pages/` redirect (old URLs barely lived); an SPA-style catch-all (200 for
  any path); a hand-made 404 page (a second look to keep in step with the site).
