# CI on GitHub Actions and size-limit: room for the page photos

Date: 2026-10-24 · Status: accepted

## Context

`ci-size-limit` held all images (`*.{avif,webp}`) to 120 kB, sized for the decor and one hero photo.
About and Security add nine photos (a hero per page, Mission and Vision, four press releases): the
build came to 190 kB, 57 kB of AVIF decor and 133 kB of WebP photos, and the photos in it are still
stand-ins cropped from screenshots; the full-size exports will weigh more.

## Decision

- The checks stay as `ci-size-limit` set them: one workflow, `.github/workflows/ci.yml`, one job on
  `push` to every branch (checkout, Node 22 with the npm cache, `npm ci`, `lint`, `lint:css`,
  `format:check`, `build`, `size`), a read-only token, one run per ref, `HUSKY=0`.
- `size-limit` with `@size-limit/file` measures what Vite built. Limits: JavaScript 5 kB and CSS
  8 kB (gzip), the font (`*.woff2`) 45 kB, images (`*.{avif,webp}`) **320 kB**, the last two as
  they are.
- Images stay one total, not a split into decor and photos: the author chose the simpler single
  limit. 320 kB leaves room for the real exports of the nine photos next to today's decor.
- Node 22, not `engines`: `size-limit` needs 22.19 or newer.

## Consequences

- A limit is raised only by a new dated record saying what grew and why.
- One total does not show which kind of image grew: a heavier decor raster hides behind the
  photos' room, so a review of a new AVIF checks its own weight.
- The real photo exports are checked against 320 kB when they replace the stand-ins; if they do
  not fit, they are compressed first, the limit second.
- Rejected: separate limits for the AVIF decor and the WebP photos (more precise, one more entry;
  the author chose the single total); dropping the image limit (a full-size photo or a vector
  decor would pass unnoticed).
