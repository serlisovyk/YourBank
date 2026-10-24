# CI on GitHub Actions and size-limit

Date: 2026-10-24 · Status: superseded by `ci-size-limit-photos`

## Context

The pre-commit hook (`linters`) is skipped by `--no-verify` and by a web edit on GitHub, and nothing
watched the bundle weight after the decor became rasters (`light-decor-raster`).

## Decision

- One workflow, `.github/workflows/ci.yml`, one job, on `push` to every branch, so a task branch is
  checked before the local merge. Steps: checkout, `setup-node` (Node 22, npm cache), `npm ci`, then
  `lint`, `lint:css`, `format:check`, `build`, `size`, a step each. Read-only token, one run per ref
  (a newer push cancels the older), `HUSKY=0` (no hook to install in CI). Action majors are pinned;
  no matrix, no deploy step (Vercel deploys itself).
- `size-limit` with `@size-limit/file` only: it measures the files Vite already built, so no bundler
  preset and no second build. `.size-limit.json`: JavaScript 5 kB and CSS 8 kB (gzip), the font
  (`*.woff2`) 45 kB, images (`*.{avif,webp}`) 120 kB, the last two as they are.
- The numbers: `main` built at 1.3 kB JS, 3.4 kB CSS, 39.7 kB font, 91.5 kB images. JS, CSS and images
  sit a third to a half above that, room for the CSS and JS refactors and a section or two; a
  full-size photo or a vector decor (about 600 kB each before `light-decor-raster`) fails at once.
  The token move (fluid tokens, section-heading) took the CSS to 4.8 kB, so its limit is 8 kB:
  four pages of sections still to come. The footer year and the currency converter took the JS to
  2.7 kB, so its limit is 5 kB: the testimonials carousel and the scroll reveal are still to come. The font has a small margin, so a second face or weight shows up (`assets-performance.md`). Images
  are one total, not a first-screen subset, so moving an image between sections changes nothing.
  SVG icons have no limit: a few hundred bytes each.
- Node 22, not `engines`: `engines` is a range that `setup-node` resolves to the newest Node, and
  `size-limit` needs 22.19 or newer, which the latest 22 is.

## Consequences

- A limit is raised only by a new dated record saying what grew and why.
- Dev dependencies `size-limit` and `@size-limit/file`; the runtime still has none. A Node below 22.19
  (still allowed by `engines`) warns on `npm ci` and cannot run `npm run size`; CI can.
- Rejected: a `pull_request` trigger (pull requests are not used, `local-merge-without-pr`, and the
  branch push already runs the checks); `@size-limit/preset-app` or the `esbuild`/`webpack` plugins
  (bundle again what Vite built); a Lighthouse or bundle-analyzer job (more config than four static
  pages need); limits at exactly today's size (every legitimate change would fail).
