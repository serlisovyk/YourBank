# Plan: About hero and Mission & Vision (MY-199)

Goal: the first two blocks of About, `page-hero` with the small label and the new `mission-vision` section.
No spec: no new interaction. The design file is out of reach, so the sources are `ai/design-system.md`
and three screenshots of the layout (About at 1920 and at 390); there is none at 1440, so its values
come from the fluid tokens, like Careers.

## Changes

- Hero: `data/pages.js` gets `about.hero` (`eyebrow`, `titleStart`, `titleAccent`, text, image) and
  `about.html` calls `{{> sections/shared/page-hero page.hero }}`. The partial and its stylesheet already
  support `eyebrow`. The design centres the hero text below 1024 px (About and Security show it), so
  `page-hero.css` gets one `text-align: center` there; at 1024 and wider Careers is unchanged, below
  it its text is now centred too.
- `partials/sections/about/mission-vision.html`, block `.mission-vision`: `section-heading` ("Mission &
  Vision" all accent) and `{{#each missionVision}}` rows. A row is a plate (the photo in a frame) and a text
  block (`h3`, paragraph). The Vision row is the same markup with a `--reverse` modifier, set from an
  `imageEnd` flag in the data.
- `data/mission-vision.js` → `missionVision` (title, text, image with size and `alt`, `imageEnd`), wired into
  `context` in `vite.config.js`.
- `styles/sections/mission-vision.css`, imported in `style.css` after `jobs`:
  - Row: a grid of 664fr / 932fr (the drawn plate and text widths at 1920), centred vertically. The plate is
    `--grey-11` with a 1 px `--grey-15` border, `--border-radius`, the photo inset on three sides and flush with
    the bottom edge, its top corners rounded like the plate; the dotted decor is the existing `dots-fine.avif`
    at its top left (the drawn dots are coarser; no new raster, the image budget is tight).
  - Text block: a 1 px `--green-60` line on the side facing the plate (left in Mission, right in Vision),
    `--space-card` between the line and the text; title `--text-title-lg`, `--space-heading-gap` to the text.
  - The second row is pulled up by `--space-mission-overlap` (100 / 84 at 1920 / 1440), as drawn.
  - Below 1024: one column, photo first in both rows, text centred, the line becomes horizontal over the
    title (full width of the plate), rows 60 px apart, the plate at most 664 wide and centred. Below 768 the
    radii are `--border-radius-large`, like `icon-card`.
- Tokens in `variables.css`: `--space-mission-overlap`, `--space-mission-inset` (plate padding: 60 / 48 / 20).
- Photos: three WebP files in `assets/images/about/` (`business-team`, `plant-coins`, `eye-scan`), drawn at
  968 × 716 and 542 × 559. **They are stand-ins**: cropped from the screenshots and upscaled (lanczos) to the
  1920 size, so they are blurry. The author's full-resolution exports replace them under the same names, no
  code change. The hero photo's part under the text card was never visible in the screenshot, so it is filled
  with a mirrored strip of the facade.
- Image budget: `npm run size` limits `dist/assets/*.{avif,webp}` to 120 kB in total and the build is at 98 kB
  before this task. The three stand-ins add about 32 kB, so the limit is exceeded. The limit is not raised
  here; the report proposes a new dated record once the real exports (and Press Releases photos) are known.

## Docs

- `ai/map.md`: the About page line, the `about/mission-vision` partial, the data file, the `about/` image folder.
- `ai/design-system.md`: the Mission & Vision values decided here (inset, overlap, text column), in the About
  entry; its dots note.
- Rules, skills, decisions: nothing; no pattern changed.

## Verification

`npm run lint`, `lint:css`, `format:check`, `build`, `size`, `cmp dist/404.html dist/index.html`;
`npx vite preview --port 4199 --strictPort`: About at 1920 / 1440 / 390 against the screenshots, no horizontal
scroll at 320, 390, 767, 768, 1024, 1440, 1920, Careers hero unchanged, headings without a skipped level.

## Left out

- Real photos (stand-ins above) and the exact dotted decor of the plates.
- Press Releases (MY-200) comes after this section on the same page.
