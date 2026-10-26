# CI on GitHub Actions and size-limit: limits by fact

Date: 2026-10-26 · Status: accepted

## Context

After the CSS clean-up (fluid ramps, single-use values moved into blocks, unused tokens removed) and
the font stack without a fallback face, the build is JavaScript 3.64 kB and CSS 7.16 kB (gzip), the
font 39.68 kB and images 310.2 kB. Against 5 kB, 8.5 kB and 45 kB the first three had so much room
that a real growth would no longer fail `npm run size`.

## Decision

- The checks stay as `ci-size-limit-css-room` set them: one workflow, `.github/workflows/ci.yml`, one
  job on `push` to every branch (checkout, Node 22 with the npm cache, `npm ci`, `lint`, `lint:css`,
  `format:check`, `build`, `size`), a read-only token, one run per ref, `HUSKY=0`.
- `size-limit` with `@size-limit/file` measures what Vite built. Limits are today's size plus about
  10 %: JavaScript **4 kB** and CSS **8 kB** (gzip), the font (`*.woff2`) **42 kB**; images
  (`*.{avif,webp}`) stay **320 kB**, already about 3 % above the nine photos and the decor.
- Images stay one total, not split into decor and photos. Node 22, not `engines`: `size-limit` needs
  22.19 or newer.

## Consequences

- A limit is raised only by a new dated record saying what grew and why.
- About 0.4 kB of JavaScript and 0.8 kB of CSS is room for a small change, not for a new feature; a
  second font weight or face fails the font limit at once.
- Rejected: limits at exactly today's size (every legitimate change would fail); keeping the old limits
  (a 20–30 % margin hides growth).
