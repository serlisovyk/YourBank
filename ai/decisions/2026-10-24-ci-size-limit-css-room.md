# CI on GitHub Actions and size-limit: room for the font fallback in the CSS

Date: 2026-10-24 · Status: superseded by `ci-size-limits-by-fact`

## Context

`ci-size-limit-photos` held the built CSS to 8 kB gzip, and it stood at 7.98 kB. The fallback font
faces that remove the font-swap layout shift (`lighthouse-100`) add about 50 bytes, so the build came to
8.03 kB and `npm run size` failed. Nothing else grew.

## Decision

- The checks stay as `ci-size-limit-photos` set them: one workflow, `.github/workflows/ci.yml`, one job
  on `push` to every branch (checkout, Node 22 with the npm cache, `npm ci`, `lint`, `lint:css`,
  `format:check`, `build`, `size`), a read-only token, one run per ref, `HUSKY=0`.
- `size-limit` with `@size-limit/file` measures what Vite built. Limits: JavaScript 5 kB (gzip), the
  font (`*.woff2`) 45 kB and images (`*.{avif,webp}`) 320 kB, all three as they were; CSS **8.5 kB**
  (gzip), up from 8 kB: the 0.05 kB the change needed and about 0.4 kB of room.
- Images stay one total, not split into decor and photos. Node 22, not `engines`: `size-limit` needs
  22.19 or newer.

## Consequences

- A limit is raised only by a new dated record saying what grew and why.
- 0.4 kB is room for a small section, not for a new one; a change that comes near the limit is
  questioned first (`ai/rules/assets-performance.md`).
- Rejected: trimming 40 bytes of unrelated CSS to fit under 8 kB (churn for no gain, and the next
  change meets the same wall); a looser limit such as 10 kB (a limit that never fires).
