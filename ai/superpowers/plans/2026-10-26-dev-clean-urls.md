# Plan: clean URLs in `npm run dev` and `npm run preview` (MY-292)

Goal: the site's own navigation (`/careers`, `/about`, `/security`) works locally as it does on Vercel.
Decisions in play: `vercel-json-without-old-redirect` (clean URLs, a real 404; its Consequences say
the local servers do not apply them), `vite-config-split` (a plugin is a file in `vite/plugins/` and a
line in `parts/plugins.js`).

## Finding: the plugin the issue asks for is not needed

Measured on Vite 8.3.3 (`npm run dev`, `npm run preview` of a fresh build), with `curl`, with and
without a browser `Accept: text/html` header:

| request                           | dev (`appType: spa`, the default) | preview (same)      | Vercel (`vercel.json`) |
| --------------------------------- | --------------------------------- | ------------------- | ---------------------- |
| `/careers`, `/about`, `/security` | 200, the right page               | 200, the right page | 200, the right page    |
| `/careers?x=1`, `/?x=1`           | 200, the right page               | 200, the right page | 200, the right page    |
| `/careers.html`                   | 200, the page                     | 200, the page       | redirect to `/careers` |
| `/careers/`                       | 200, **Home**                     | 200, **Home**       | redirect to `/careers` |
| `/nope`                           | 200, **Home**                     | 200, **Home**       | 404, the Home markup   |

Vite's `htmlFallbackMiddleware` (dev and preview alike) already rewrites `/careers` to
`/careers.html` when that file exists, for any `GET` that accepts `text/html` or `*/*`. So the
premise "locally `/careers` is not found" does not hold, the header and footer links work in both
servers, and a rewriting plugin would duplicate what Vite does. The page list never needs a second
copy either, because Vite looks at the files.

What really differs from Vercel is only the unknown path: the `spa` app type answers it, and
`/careers/`, with Home and status 200.

## Options (open question for the author)

1. **Nothing in code; fix the docs only.** The Consequences sentence "locally open `/careers.html`" is
   wrong: a new dated record (`2026-10-26-vercel-json-dev-clean-urls`) restates what stays in force,
   says the local servers resolve clean URLs through Vite's own fallback, and supersedes the old one
   (its `Status` line only); `ai/decisions/README.md` index line moves.
2. **Option 1 plus `appType: 'mpa'` in `vite/config.js`** (one line, no plugin): an unknown path and
   `/careers/` get a 404 instead of Home with 200, as on Vercel; `/careers`, `/about`, `/security`,
   query strings and assets behave as before (measured with the line set temporarily: `/careers` 200,
   `/careers?x=1` 200, `/nope` 404, `/careers/` 404, `/favicon.svg` 200). Local 404 is Vite's plain
   body, not the Home markup that Vercel serves. Redirecting `/careers.html` and `/careers/` to
   `/careers` (full `trailingSlash: false` parity) would need the plugin the issue describes; it is
   not worth it, since the site never links to those URLs.
3. The plugin as written in the issue (rewrite in `configureServer` / `configurePreviewServer`):
   not recommended, no behavior to add on top of Vite's.

Recommendation: option 2. Nothing is implemented until the author picks.

## Verification (for options 1 and 2)

- `npm run lint`, `lint:css`, `format:check`, `build`, `size`; `cmp dist/404.html dist/index.html`;
  `diff -r dist` against a build of `main`: identical (`appType` does not touch the build).
- `curl` table above on both servers; the header links clicked in headless Chrome in both.
