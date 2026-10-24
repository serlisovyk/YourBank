# Plan: About Press Releases (MY-200)

Goal: the Press Releases section of About, after Mission & Vision: four press cards from `data/` in
a 2 × 2 grid (one column below 768 px). No spec: nothing interactive, no new behavior. No open
questions. The design file is out of reach, so the sources are `ai/design-system.md` and the
captures of the layout at 1920 and 390 (no 1440 capture: its values are scaled).

## Changes

- `data/press-releases.js` → `pressReleases`, wired into `context` in `vite.config.js`. A record:
  `title`, `location`, `date` (ISO, `2024-11-06`), `text`, `image` (path under `/assets/images/press/`),
  `imageAlt`. The shown date `06/11/2024` is built in the data file next to the records, the way
  `jobs.js` builds `applyHref`: `date.split('-').reverse().join('/')`, a `displayDate` field.
  Rejected: a Handlebars helper beside `eq` in `vite.config.js` (a new shared line in a file the
  parallel branches also edit, for one use; `ai/rules/html.md` keeps computing in `data/`). Rejected
  too: `Date` / `Intl` formatting (locale and timezone drift for a value that is only a string).
- `partials/components/badge.html`: an optional `datetime` parameter. With it the value is rendered
  as `<time datetime="…">value</time>`; without it the output is the same as today, so Job Openings
  is unchanged (the minified `careers.html` is compared before and after). The label stays outside
  `<time>`: `Date: <time datetime="2024-11-06">06/11/2024</time>`.
- `partials/components/press-card.html`, block `.press-card` (`__image`, `__title`, `__badges`,
  `__text`). An `<article>`; the photo is `<img>` with `width` / `height`, `loading="lazy"` and a
  meaningful `alt`; the title is an `h3`. Parameters are the context of `{{#each pressReleases}}`.
- `partials/sections/about/press-releases.html`, block `.press-releases`: `section-heading` with the
  whole title accented (`titleAccent="Press Releases"`) and the intro text, then the grid.
- `about.html`: `{{> sections/about/press-releases }}` in `<main>`, last, right before the footer
  (the hero and Mission & Vision come from another branch and land before it).
- Styles: `styles/components/press-card.css` (card `--grey-11`, 1 px `--grey-15`,
  `--border-radius-medium` like the job card, photo radius `--border-radius-medium`, weight
  400 title) and `styles/sections/press-releases.css` (two columns with `--space-grid-gap`, one
  below 768 px, the cards stretch to the row's height), both imported in `style.css` beside their kind.
- The photo height is a token, not an aspect ratio: the drawn photo is 723 × 333 at 1920 (wide) and
  318 × 208 at 390 (taller), so it is `object-fit: cover` in a box of a fluid height.
- Fluid tokens in `variables.css` (`:root` for 1440 to 1920, the `< 1440` block for 390 to 1440),
  the values at 1920 / 1440 / 390: `--space-press-card` 30 / 24 / 20 (the design-system row),
  `--text-press-title` 24 / 20 / 18, `--press-photo-height` 333 / 268 / 208 (1440 scaled to keep the
  1920 proportions of a 582 px photo). Spacing inside the card reuses the existing scale:
  photo to title `--space-card` (50 / 40 / 30), title to badges `--space-card-gap-sm`, badges to text
  `--space-card-gap`; checked against the captures. The capture at 1920 shows the title, badges and text inset by one more card padding from the photo (a text column of 663 px against a 723 px photo; the lines break where the capture breaks them), none at 390: `padding-inline: var(--space-press-card)`, reset to 0 below 768 px.
- Texts come from the template, with two edits: card 2 says "Chennai" where the template left a
  literal "[City]"; card 3's template text is a copy of card 4's (sustainability), so it is a new
  paragraph about the financial education partnership, the same tone and length.

## Photos: temporary stand-ins

`assets/images/press/rewards.webp`, `branch.webp`, `education.webp`, `sustainability.webp` are
crops of the 1920 capture, upscaled with sharp (lanczos) to 723 × 333 (the 1920 size, 1x): blurry on
purpose. The author exports the full-resolution photos later; they replace the files under the
same names, with no code change (the `width` / `height` stay 723 × 333, so export at that ratio,
ideally twice the size). Each stand-in is under 40 kB.

## Size limit

`.size-limit.json` sums every `dist/assets/*.{avif,webp}` into one 120 kB entry (98 kB today).
The four photos push it over, and the parallel About branch adds three more. Not raised here: the
numbers and a proposal (a separate entry for photos) go into the report; a limit change is a new
dated record (`ai/rules/assets-performance.md`).

## Docs

- `ai/map.md`: the About page line, the partials lines (`press-card`, `about/press-releases`, the
  `badge` line gets `datetime`), the data line, the `images/` line.
- `ai/design-system.md`: the press card values decided here, one or two lines.
- Rules, skills, decisions: nothing; no pattern changed.

## Verification

`npm run lint`, `lint:css`, `format:check`, `build`, `size`, `cmp dist/404.html dist/index.html`;
`npx vite preview`: About at 1920 / 1440 / 390 against the captures; no horizontal scroll at 320,
390, 767, 768, 1024, 1440 and 1920; Careers Job Openings unchanged (the built HTML compared before
and after); headings in order (`h1`, `h2`, `h3`); a `<time>` with `datetime` on each card.

## Left out

- The real photos, a page per press release, filtering or paging of the list.
