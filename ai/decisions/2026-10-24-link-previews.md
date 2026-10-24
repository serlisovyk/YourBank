# Link previews: one image and the origin, fixed by hand in `public/` and `data/site.js`

Date: 2026-10-24 · Status: accepted

## Context

Every page needs a canonical URL, Open Graph and Twitter tags, and these take absolute URLs: a
crawler reads the page without its origin, and chat apps cache the `og:image` URL. Images in
`assets/` are hashed on each build (`sources-in-src`), so their URL is not stable.

## Decision

- One head partial (`sections/shared/head`) writes the tags for all four pages from the page's entry
  in `data/pages.js` and from `data/site.js`.
- `site.url` is the production origin and the only place it is written: canonical, `og:url` and the
  image URLs are `site.url` plus a path. A custom domain later is a one-line change.
- One preview image for the whole site, `public/og-image.png` (1200×630, a screenshot of the Home
  first screen, PNG under 300 kB because Telegram and LinkedIn handle it best). The favicon
  (`favicon.svg`, from the logo mark) and `apple-touch-icon.png` sit in `public/` for the same reason:
  a fixed URL. The files are made once, by hand; the repo keeps the result, not a generator. A new look of
  Home does not force a new image.
- `vercel.json` is unchanged: only `/assets/` gets the immutable cache, so the files in `public/`
  are revalidated and a replaced image is picked up without renaming it.
- `dist/404.html` is a copy of Home (`clean-urls-vercel-json`), so it carries Home's canonical and
  `og:url`. Accepted: an error page is not shared or indexed.

## Consequences

- A preview or a local build still points its tags at production, which is intended.
- A new page needs a `path`, a `title` and a `description` in `data/pages.js`; nothing else.
- Rejected: a hashed image in `assets/` (its URL changes with every rebuild of the image); an image
  per page or one generated at build time (a browser or an image service in the build for four pages);
  a web app manifest and `favicon.ico` (`assets-performance`: no manifest unless asked; the SVG and the touch icon
  cover the browsers in use, and one without them shows its default icon).
