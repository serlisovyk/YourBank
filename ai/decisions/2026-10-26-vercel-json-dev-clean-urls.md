# Vercel: clean URLs, a real 404 and cached assets; the local servers match them

Date: 2026-10-26 · Status: accepted

## Context

`vercel-json-without-old-redirect` said that Vite's dev and preview servers do not apply clean
URLs, so `/careers.html` had to be opened locally. That is wrong: Vite's own HTML fallback maps
`/careers` to `careers.html` when the file exists. What did differ was the unknown path: with the
default `appType: 'spa'` the local servers answered it, and `/careers/`, with Home and status 200,
where production answers 404 or redirects.

## Decision

- Hosting is unchanged: Vercel's Git integration, `main` is production, `npm run build` into
  `dist/`; agents never recreate, reconnect or reconfigure the project. What the project needs
  beyond the preset lives in `vercel.json`, nowhere else.
- `cleanUrls: true`, `trailingSlash: false`: the pages are `/`, `/careers`, `/about`, `/security`;
  `/careers.html` redirects there. The header links use these URLs.
- `Cache-Control: public, max-age=31536000, immutable` on `/assets/(.*)`: every file there is
  emitted with a content hash.
- No `redirects`: an old `/pages/...` URL gets the 404 like any unknown path.
- No rewrites, above all no "everything to `index.html`": an unknown path ends in `404.html`, which
  Vercel serves with status 404.
- The 404 is the home page: the build plugin `vite/plugins/copy-index-to-404.js` copies the built
  `dist/index.html` to `dist/404.html`. It is not a source page and not a fifth page of the site.
- `appType: 'mpa'` in `vite/config.js`: `npm run dev` and `npm run preview` open `/careers`,
  `/about` and `/security` through Vite's own `.html` fallback, and answer an unknown path and
  `/careers/` with a 404, as production does. No plugin rewrites URLs.

## Consequences

- The local 404 is Vite's plain body, not the Home markup of `404.html`.
- Only the redirects of `/careers.html` and `/careers/` to `/careers` stay Vercel-only: the site
  never links to those URLs, so they are checked on a Vercel preview or production.
- A new page needs no `vercel.json` change; a new top-level folder of hashed files would.
- Rejected: a dev and preview plugin that rewrites clean paths (it repeats what Vite already does)
  or redirects (the site never links to those URLs); keeping the `/pages/` redirect; an SPA-style
  catch-all (200 for any path); a hand-made 404 page (a second look to keep in step with the site).
