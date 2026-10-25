# Link previews: the preview image is the Home header and hero

Date: 2026-10-25 · Status: accepted

## Context

`link-previews` described the preview as the logo, the hero card and the author's name on a flat
background. The image the author wants shows what a visitor sees first: the header and the whole hero
of Home, so a shared link looks like the site.

## Decision

- **The image:** `public/og-image.png`, 1200×630, PNG under 300 kB: the real Home header and hero
  (logo, navigation, the headline, the Open Account button, the transactions and exchange card) on the site
  background with its dotted decor, scaled to fit, and the author's name centred at the bottom. Its `og:image:alt`
  is `site.image.alt` in `data/site.js`.
- **Made once, by hand:** a headless-browser screenshot of the built Home at its 1920 px layout, the other
  sections hidden, the name added to the page for the shot, then resized and compressed with `sharp`. The repo
  keeps the PNG, not a generator.
- **Stays from `link-previews`:** one head partial writes the tags for all four pages; `site.url` is the one
  place the production origin is written; one image for the whole site, at a fixed name in `public/` so a crawler's cached URL
  stays valid, and `vercel.json` unchanged; `dist/404.html` carries Home's tags; the SVG favicon sits in
  `public/` for the same reason.

## Consequences

- The image shows the hero as of the day it was made; a new look of the hero does not force a new image, the
  author decides when to remake it.
- A preview or a local build still points its tags at production, which is intended; a new page needs a
  `path`, a `title` and a `description` in `data/pages.js` and nothing else.
- Rejected: a hashed image in `assets/` (its URL changes with every rebuild); an image per page or one generated at
  build time (a browser in the build for four pages); a composition drawn by hand in a design tool (it would
  drift from the real page).
