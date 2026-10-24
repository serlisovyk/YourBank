# Search files are hand-written in `public/`; the JSON-LD comes from `data/`

Date: 2026-10-24 · Status: accepted

## Context

The site needs `robots.txt`, a sitemap, `llms.txt` and structured data for a search engine and for
AI crawlers. `assets-performance` said "no sitemap unless the author asks"; the author asked.
`cleanUrls` (`clean-urls-vercel-json`) only strips `.html`, so `.txt` and `.xml` files are served by
their extension.

## Decision

- `public/robots.txt`, `public/sitemap.xml` and `public/llms.txt` are plain files with absolute URLs
  of the four pages (clean, no `.html`). A new page is added to the sitemap and `llms.txt` by hand
  (`ai/rules/html.md`).
- Structured data is one JSON-LD `Organization` on Home, rendered raw from `organizationJsonLd`
  (`data/structured-data.js`, built from `site`, `contacts`, `socials` and the Home description), so
  no value of the footer is typed twice. `Organization`, not `BankOrCreditUnion`: that type inherits
  `LocalBusiness`, for which Google expects a postal address the footer does not have.
- The logo for it is `public/logo.svg`, the header logo on a `#1a1a1a` square: the source has white
  lettering, and its hashed `/assets/` URL changes with every edit and 404s after a deploy.

## Consequences

- The origin is written in `data/site.js` and in the three static files. A custom domain means
  changing all four.
- Rejected: generating the sitemap from `data/pages.js` in a build plugin (four rarely changing pages;
  the plugin, a path and a date per page and a writer in `vite.config.js` outweigh one hand-added
  line, and the build time or git time is no honest `lastmod`); a web app manifest (still not asked).
