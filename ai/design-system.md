# Design system

The values of the design, written down so that code and new sections never need the design
opened "by eye". The design is a third-party template (`ai/decisions/2026-10-23-design-is-a-reference.md`):
it is described here in words and numbers, never linked.

- The design is drawn at three widths: **1920**, **1440** and **390** px. Every table gives
  the values in that order (`1920 / 1440 / 390`). Between and beyond them the values are
  fluid (`ai/decisions/2026-10-23-breakpoint-scheme.md`).
- All sizes are px at the drawn width. Text sizes and spacing were measured from the layout
  geometry; weights, radii and hover looks that the layout does not carry were read from the
  built code and the rendered pages. If a value looks wrong against the design on screen, the
  design wins: fix this document in the same change.
- **Tokens** below are in `styles/general/variables.css`; a value that has a token names it.

## How to use

- A colour, radius, font size or spacing from the scale is written as `var(--token)`. A hex,
  `rgb(` or an invented px value for type or section spacing does not appear in a stylesheet
  (`ai/rules/css.md`). A one-off layout size (a column's width, an icon box) stays a plain
  value.
- A new section takes its numbers from these tables: the section gap, the heading block, the
  card padding and the grid gap are the same everywhere; copy a neighbouring section, not
  a new rhythm (`ai/skills/section.md`).
- If the design is inconsistent, this document records the dominant value and the exception
  ("Known inconsistencies"). Do not average them, and do not "fix" the look without the author.

## Breakpoints

- Anchors, where the design is exact: **390** (mobile), **1440** (laptop), **1920** (desktop).
  Structure is the same at 1920 and 1440 (only sizes change); it changes at 390.
- Structural media queries: `width < 1024px` (side-by-side compositions stack: both heroes,
  the product columns, the use-case and mission rows, the feature tabs, the CTA) and
  `width < 768px` (the remaining multi-column grids become one column; the header becomes
  the menu button). No component has a query at 1440.

## Colours

The palette is the template's; every swatch is a token already.

| Token                            | Hex                                     | Use                                                                                       |
| -------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------- |
| `--white`                        | `#fff`                                  | headings, button labels on dark, nav links, card titles                                   |
| `--black`                        | `#000`                                  | not used by the pages                                                                     |
| `--green-60`                     | `#caff33`                               | the accent: primary button, accent words in titles, stat numbers, icons                   |
| `--green-65`                     | `#d1ff4d`                               | the label of the olive Exchange button in the hero card                                   |
| `--green-70`                     | `#d8ff66`                               | primary button hover                                                                      |
| `--green-80` … `-99`             | `#e5ff99` … `#fefffa`                   | palette only, no page uses them                                                           |
| `--white-90`                     | `#e4e4e7`                               | hero paragraph and small text inside the hero card                                        |
| `--white-95` … `-99`             | `#f1f1f3` … `#fcfcfd`                   | palette only                                                                              |
| `--grey-10`                      | `#1a1a1a`                               | page background; inset surfaces (small cards inside a panel, page-hero text card, badges) |
| `--grey-11`                      | `#1c1c1c`                               | surfaces: navbar, panels, cards, toggle container, secondary button                       |
| `--grey-15`                      | `#262626`                               | every 1 px border and divider; the active nav pill; hero badge; hover fill                |
| `--grey-20`                      | `#333`                                  | palette only (the template's swatch frames)                                               |
| `--grey-30`                      | `#4c4c4d`                               | palette only (the template's Values title, under 3:1)                                     |
| `--grey-35`, `-40`, `-60`, `-75` | `#59595a` `#656567` `#98989a` `#bfbfbf` | palette only                                                                              |
| `--grey-45`                      | `#737375`                               | the big titles of Our Values (3.7:1, lightened from `--grey-30`)                          |
| `--grey-70`                      | `#b3b3b3`                               | body text (weight 300), badge text, footer legal links                                    |
| `--green-10`                     | `#22251b`                               | dark olive: the two floating pills of the hero card and its Exchange button               |

- Opacity is part of the look: the three transaction rows of the hero card are 100 % / 50 % /
  20 %; the green tints of the icon circles are baked into their SVGs.
- Contrast: white and `--grey-70` on `--grey-10` are far above 4.5:1; `--grey-45` on `--grey-10` is
  3.7:1, enough for the large Values titles. The 20 % transaction row is the one text under the floor.

## Typography

Font **Lexend**, one family everywhere (the template's guide page set in another face is
documentation, not the site). Weights: **300** body, **400** buttons, nav, card titles,
**500** headings and numbers. Line height is `1.5` unless the table says otherwise.

| Role (token)                                                    | 1920 / 1440 / 390                  | Weight | Line                | Colour                                    |
| --------------------------------------------------------------- | ---------------------------------- | ------ | ------------------- | ----------------------------------------- |
| Title: home hero h1, every section h2 (`--text-title`)          | 48 / 38 / 28                       | 500    | 1.5                 | white, accent words `--green-60`          |
| Page-hero title: Careers, About, Security (`--text-title-hero`) | 58 / 48 / 28                       | 500    | 1.3                 | same                                      |
| Large title: Mission, Vision, CTA (`--text-title-lg`)           | 38 / 32 / 26                       | 500    | 1.5                 | white, CTA accent words green             |
| Block title: use-case title, job title (`--text-title-md`)      | 30 / 26 / 20 (job: 30 / 24 / 20)   | 500    | 1.5                 | white                                     |
| Stat number (`--text-stat`)                                     | 58 / 40 / 40                       | 500    | 1.5                 | `--green-60`                              |
| Value title (`--text-value`)                                    | 58 / 40 / 30                       | 500    | 1.5                 | `--grey-45`                               |
| Card title: product, press (`--text-card-title`)                | 24 / 20 / 20 (press: 24 / 20 / 18) | 400    | 1.5                 | white                                     |
| Sub-heading in a job card (About This Job…)                     | 24 / 20 / 18                       | 500    | 1.5                 | white                                     |
| Feature card title (`--text-card-title-sm`)                     | 22 / 18 / 18                       | 400    | 1.5                 | white                                     |
| FAQ question (`--text-question`)                                | 20 / 18 / 18                       | 500    | normal (about 1.25) | white                                     |
| Use-case plate card label (`--text-plate`)                      | 20 / 16 / 14                       | 400    | 1.5                 | white, centred                            |
| Body, badge, hero label (`--text-body`)                         | 18 / 16 / 14                       | 300    | 1.5                 | `--grey-70` (hero paragraph `--white-90`) |
| Button, nav link (`--text-button`)                              | 18 / 14 / 14                       | 400    | 1.5                 | see Buttons                               |
| Footer text                                                     | 18 / 16 / 14                       | 400    | 1.5                 | white                                     |
| Testimonial name                                                | 18 / 16 / 16                       | 500    | 1.5                 | `--green-60`                              |
| About hero label (`--text-page-hero-label`)                     | 20 / 18 / 14                       | 400    | 1.5                 | white                                     |

## Spacing and layout

| What                                                      | 1920 / 1440 / 390                                                                                 |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Content width (`.container`; gutter = 162 / 80 / 16)      | 1596 / 1280 / 358                                                                                 |
| Navbar: top margin, height                                | 50, 95 / 30, 73 / 40, 68                                                                          |
| Navbar to the hero content                                | 153 / 90 / 50                                                                                     |
| Gap between sections (`--space-section`)                  | 150 / 120 / 80                                                                                    |
| Hero to Products on Home (the hero card overhangs)        | 151 / 121 / 121                                                                                   |
| Title to text in a heading block                          | 14 / 10 / 10                                                                                      |
| Heading block to content                                  | 80 / 60 / 60; with a toggle 100 / 80 / 60                                                         |
| Card padding: feature, FAQ item, benefit                  | 50 / 40 / 30                                                                                      |
| Job card padding                                          | 50 / 40 / 24                                                                                      |
| Press card padding                                        | 30 / 24 / 20                                                                                      |
| Gap of a two-column card grid (FAQ, features, job, press) | 30 / 20 / 20                                                                                      |
| Gap of the Values grid, of the Benefits grid              | 80 / 60 / 50, 100 / 60 / 48                                                                       |
| Product columns (gap, vertical divider between)           | 100 / 80 / 60 (stacked)                                                                           |
| Product icon to title, title to text                      | 30 / 24 / 20, 20 / 16 / 12                                                                        |
| Use-case rows (gap), plate to text                        | 60 / 40 / 40, 100 / 60 / 30                                                                       |
| Use-case plate padding, gap between its cards             | 50 / 40 / 20, 20 / 10 / 10                                                                        |
| Use-case text: heading block to stats, stats to button    | about 60 / 50 / 50                                                                                |
| Stats: gap between columns (dashed divider)               | 100 / 100 / 60 (stacked)                                                                          |
| FAQ item: padding each side of the 1 px line              | 30 / 24 / 20                                                                                      |
| Feature tabs panel: padding, gap between tabs             | 50 / 40 / 20, 24 / 20 / 20                                                                        |
| Testimonials: card gap, arrow to the cards                | 80 / 60 / one card, 50 / 40 / arrows below the card (30 under it, 20 between; stacked below 1024) |
| Footer: top padding, bottom padding, gap of rows          | 100, 50, 50 / 60, 30, 40 / 50, 30, 30                                                             |
| CTA panel height                                          | 288 / 223 / 360                                                                                   |

- Grids are flexible (`fr`, `flex`), not the drawn pixel widths; the widths in the page
  sections below are for checking, not for copying.
- The text under a section title wraps at 1302 / 1157 px (`--section-text-width`; the 390 container is
  narrower), beside a toggle at 935 / 831 (`--section-text-width-toggle`).
- Spacing tokens are `--space-<what>` after the row they implement (`--space-heading-block`,
  `--space-card`, `--space-grid-gap`, `--space-plate`, …); sizes are `--icon-*`, `--hero-card-*`,
  `--page-hero-*`, `--navbar-*`, `--button-*`, `--toggle-*`; the page gutter is `--gutter`.

## Radii, borders, gradients

- **Radii:** pill (any radius at or above half the height; token `--border-radius-pill`
  `100px`): navbar, every button, toggle, badges, nav pill, footer bottom bar.
  `--border-radius-small` `12px`: cards, FAQ items, panels, hero card. `--border-radius` `40px`:
  the large use-case plate. `--border-radius-medium` `16px`: small cards inside a plate, press
  and job images. `--border-radius-large` `20px`: the page-hero panel (its text card is
  `20 0 80 20`).
  Round: icon circles, social and arrow buttons.
- **Borders:** always 1 px. `--grey-15` for cards, panels, FAQ items, dividers, footer lines
  and the bottom bar. `--green-60` for the left rule of a value item and for the hero card
  (see "Known inconsistencies"). The stat divider is 1 px dashed `--grey-15`.
- **Shadows:** none.
- **Gradients (always built from tokens):**
  - Hero card: `linear-gradient(215deg, transparent 0%, var(--grey-10) 40%)` over a dotted
    texture drawn at 50 % with a screen blend.
  - FAQ fade: the lower row (items 3 and 4) is shown almost whole, 320 / 295 / 689 px high
    (`--faq-preview`; at 390 the items stack), under an overlay at its bottom, 262 / 240 / 235 px
    (`--faq-fade`), `to bottom` from transparent to `--grey-10`; it disappears when the list is expanded.
  - Testimonial edge fades: an alpha mask on the track (transparent, opaque from 30 % to 70 %, transparent), off below 1024.
  - Security panel: a dark, grainy backdrop with a faint green tint behind the cards.

## Components

### Buttons

Pill, label weight 400, `--text-button`, transition `--transition-duration`.

| Variant           | Surface                       | Label        | Hover                                |
| ----------------- | ----------------------------- | ------------ | ------------------------------------ |
| primary           | `--green-60`                  | `--grey-11`  | `--green-70`                         |
| secondary         | `--grey-11`, 1 px `--grey-15` | `--white`    | fill `--grey-15`, border `--grey-11` |
| empty             | transparent                   | `--white`    | fill `--grey-15`                     |
| olive (hero card) | `--green-10`                  | `--green-65` | none drawn                           |

Pressed: moves down 2 px. Sizes (height, vertical × horizontal padding):

| Size                                                                     | 1920 / 1440 / 390        | Padding                     |
| ------------------------------------------------------------------------ | ------------------------ | --------------------------- |
| Hero action (`Open Account` in the hero and the CTA)                     | 63 / 49 / 49             | 18 × 30 / 14 × 24 / 14 × 24 |
| Default (Learn More, Load All FAQ's, feature tab)                        | 63 / 49 / 49             | 18 × 24 / 14 × 20 / 14 × 20 |
| Compact (Apply Now)                                                      | 59 / 45 / 45             | 16 × 30 / 12 × 20 / 12 × 20 |
| Nav link (active one has a `--grey-15` pill)                             | 51 / 41 / n/a            | 12 × 24 / 10 × 18           |
| Social circle, footer (primary, glyph `--grey-11`)                       | 52 / 44 / 44             | square                      |
| Testimonial arrow (round, 1 px `--grey-15`, no fill, glyph `--green-60`) | 62 / 52 / 52             | square, 34 / 28 glyph       |
| Menu button, 390 only (primary, three lines)                             | n/a / n/a / 40 (56 wide) | n/a                         |

- **Load All FAQ's** is a secondary button with a chevron on its right (22 px at 1920).
  It starts where the faded row ends.

### Individuals / Businesses toggle

A pill container (`--grey-11`, 1 px `--grey-15`) holding two default-size buttons: the
active one primary, the other empty. Container padding 14 / 12 / 12; button height 55 / 41 /
41 (padding 14 × 24 / 10 × 18 / 10 × 18); container height 83 / 65 / 65. It is used in
Our Products and Our Testimonials. At 1920 and 1440 it sits at the right of the heading block,
bottom-aligned; at 390 it sits centred under the text with a 20 px gap.

### Navbar

A pill (`--grey-11`, 1 px `--grey-15`, padding 20 × 34 at 1920): logo at the left, the four
links centred in the page (not between the logo and the right edge), an empty balancing space
at the right. Link gap 26 at 1920. The logo is 156 × 40 at 1920, 101 × 26 at 390 (the
template also shows a 117 × 30 size). At 390 only the logo and the green menu button stay;
the links open below.

### Cards

| Card                          | Surface and edge                                                                                                            | Content                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Feature, FAQ item, job, press | `--grey-11` (FAQ item: no fill), 1 px `--grey-15`, `--border-radius-small`                                                  | title, text; feature title has an arrow icon at the right (34 px)                              |
| Benefit (`icon-card`)         | `--grey-11`, 1 px `--grey-15`, `--border-radius` (20 at 390), dotted decor top left; Security: `--grey-10`, 16 px, no decor | icon circle left of the title, text under; 748 × 336 at 1920                                   |
| Use-case plate                | `--grey-11`, `--border-radius`, dotted decor at a corner                                                                    | 2 × 2 small cards                                                                              |
| Small card in a plate         | `--grey-10`, 1 px `--grey-15`, 16 px                                                                                        | icon circle, centred label; 314 × 222 (192) at 1920, 260 × 174 (150) at 1440, 154 × 160 at 390 |
| Product card                  | no surface                                                                                                                  | icon circle, title, text, all centred                                                          |
| Testimonial                   | no surface                                                                                                                  | quote mark (60 / 44 / 44), text (`--text-body`, white), name; all centred                      |
| Value item                    | no surface, 1 px `--green-60` rule at the left                                                                              | big grey title, text; padding-left 30 / 24 / 20                                                |
| Hero card                     | see Hero of Home                                                                                                            | transactions, money exchange                                                                   |

- Job card: title, then a badge row, **About This Job** + paragraph, **Requirements &
  Qualifications** + a list (a 24 px bag icon in `--grey-70`, centred on the row, 10 px gap, 20 / 14 / 14 px
  between rows), then the compact button at the card's bottom edge. Card: no decor, radius
  `--border-radius-medium` (about 15 measured), 783 wide at 1920. Gaps at 1920: badges to About 50, text to
  Requirements 40, list to button 50.
- Press card: radius `--border-radius-medium` like the job card; image 723 × 333 at 1920, 208 high at 390 (cover), radius 16; title,
  badge row, text inset by the card padding from 768 up (none below); gaps: image to title 50 / 40 / 30, title to badges 20 / 16 / 12, badges to text 30 / 24 / 20.

### Badges (Location, Department, Date)

A pill with a 1 px `--grey-15` border on a `--grey-10` fill, label `--grey-70` weight 300
(`--text-body`). Height 43 / 36 / 33 (padding 8 × 16 / 6 × 14 / 6 × 10). Gap between badges
10 / 8 / 6; on 390 they wrap. The text is the whole content: `Location: India`,
`Department: Retail Banking`, `Date: 06/11/2024`.

### Icon in a circle

Two concentric circles with the icon glyph (`--green-60`) centred: the outer one a faint
green tint (about 5 %), the inner one stronger (about 10 %) with a 1 px ring (about 20 %).
The circles are drawn inside the icon SVG, so the `<img>` is the whole thing. Outer / inner /
glyph: product 98 / 74 / 34 at 1920, 72 / 56 / 28 at 1440 and 390; use-case card
78 / 58 / 30, then 64 / 48 / 24. On Security and Careers Benefits the circle is the product
size (`--icon-card`) and sits left of the title, on one row. A solid variant (`--green-60` disc, dark glyph, 40 px at 1920) is used
inside the hero card.

### Dotted decor

Decorative backgrounds in `assets/images/decor/`, never content. The dotted ones are `avif`
rasters at twice the CSS size, baked over the surface they sit on (`--grey-10` or `--grey-11`); a
new photo or decor is `webp` or `avif`, never a vector with a path per dot:

| Decor                      | Where                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| `dots.avif`                | the top-left of every page, behind the navbar, 600 wide                                       |
| `growth-arrows.svg`        | top right of the Home hero, 418 × 383 at 1920, 300 × 275 at 1440                              |
| `dots-grid.avif`           | top right of the page-hero panel                                                              |
| `dots-fine.avif`           | top left of CTA, Security panel, benefit card: a fine grid fading out, 320 wide (240 at 390). |
| `dot-wave-left/right.avif` | a corner of the use-case plate, mirrored on the second row, 200 × 211                         |

## Pages

Every page: the navbar, its sections one after another with the section gap, the footer (also a section gap after the last section).
The footer is the same on all four: the logo centred, the four links in a row, a divider, a
row of three contacts (envelope, phone, pin icons in `--green-60`), a divider, then a pill bar
with three social circles at the left, the copyright centred (`--grey-70`) and
`Privacy Policy | Terms of Service` at the right (plain text) and, under the bar, the muted author
line (`--grey-60`, weight 300) with a 44 px GitHub icon link beside it (`--green-60`; not in the design). At 390 these stack into centred rows. The drawn footer is
578 / 440 / 503 px tall. Total page height: Home 7128 / 5674 / 9290, Careers
7478 / 6089 / 8819, About 5223 / 4197 / 5870, Security 4025 / 3258 / 4397.

### Home

1. **Hero.** Left: a `--grey-15` badge (check icon, "No LLC Required, No Credit Check."), the
   title (three lines, accent words `--green-60`), a paragraph, the hero action. Right: the
   hero card, 515 × 624 at 1920, 410 × 501 at 1440, 305 × 368 at 390, with two olive pills
   overhanging (`+ $5000,00 Monthly Income` at its top left; `Supported Currency` with four coin
   icons at its bottom right). The card holds **Your Transactions** (three rows, fading) and **Money
   Exchange** (two currency boxes INR and USD with flags, two amounts, the olive Exchange
   button). Growth arrows behind its top right. The columns are 826 and 515 wide with a 120
   gap at 1920; at 390 all of it is centred and stacked: text, button, card.
2. **Our Products.** Heading block with the toggle; three product cards in columns
   separated by 1 px `--grey-15` vertical rules (two panels, one per audience); at 390 stacked.
3. **Use Cases.** Heading block (no toggle); two rows. Row 1: the plate (2 × 2 cards) on
   the left, the text on the right (h3, paragraph, three stats with a dashed divider between,
   the secondary **Learn More**). Row 2 mirrors it. The plate is 748 / 610 / 358 wide, the
   text column the same. At 390: the plate first (still 2 × 2), then the text centred, the
   stats stacked.
4. **Our Features.** Heading block; a panel at the left with three vertical tab buttons
   (the active one `--grey-10` with a `--green-60` label), at the right a 2 × 2 grid of feature
   cards (614 / 498 wide). At 390 the tabs become a row above, the cards one column.
5. **Frequently Asked Questions.** Heading block ("Still you have any questions? Contact
   our Team via support@yourbank.com"); a 2 × 2 grid of FAQ items, the lower row under the
   fade; the secondary **Load All FAQ's** below. At 390 one column.
6. **Our Testimonials.** Heading block with the toggle; three cards in a row (404 / 325
   wide), a round arrow at each side, the outer cards fading into the background; at 390 one
   card, the arrows below it.
7. **CTA.** A bordered panel (`--grey-11`, 1 px `--grey-15`, `--border-radius-small`, dotted decor
   at its left, padding `--space-cta` 80 / 60 / 30): a title (`--text-title-lg`, accent words green),
   a paragraph (at most 1060 wide) and the hero action at the right; below 1024 stacked and centred.
   The panel is as tall as its content (285 / 228 / 342 built, 288 / 223 / 360 drawn).

### Careers

1. **Hero** (page hero): see below.
2. **Our Values.** Heading block; a 2 × 2 grid of value items (758 / 610 wide at 1920 / 1440);
   one column at 390.
3. **Our Benefits.** Heading block; a 2 × 2 grid of benefit cards (748 / 610 wide); one column at 390.
4. **Job Openings.** Heading block; three job cards, two in the first row and one in the second
   (783 / 630 wide); one column at 390.
5. **FAQ**, **CTA** ("Start your Career with YourBank today!", a paragraph, the hero action),
   **footer**: as on Home.

### About

1. **Hero** (page hero) with the small label "Welcome to YourBank" above the title.
2. **Mission & Vision.** Heading block; two staggered rows, the second pulled up by 100 / 84 px (`--space-mission-overlap`).
   Row 1: the plate (664 × 621 at 1920, 41.6 % of the row) at the left, Mission right of it; row 2 mirrored. Plate:
   `--grey-11`, 1 px `--grey-15`, radius 40, the photo inset 60 / 48 / 20 (`--space-mission-inset`) on three sides, flush with
   the bottom edge (542 × 559). Text: a 1 px `--green-60` line on the plate side, 50 / 40 / 30 from it, title `--text-title-lg`.
   At 390 the photo is first and the line is horizontal over the title.
3. **Press Releases.** Heading block; a 2 × 2 grid of press cards (783 / 630 wide); one column
   at 390.
4. **Footer** (no FAQ or CTA).

### Security

1. **Hero** (page hero).
2. **How We Protect You.** Heading block; a panel with the grainy backdrop (built as `--grey-11`
   with `dots-fine.avif` at its top left) behind a 2 × 2 grid of cards (688 / 550 wide; the grid is
   inset 95 / 80 from the panel's sides, cards have a 16 px radius and a `--grey-10` fill). The panel
   ends about a fifth of the grid above its bottom: the lower cards overhang it. Each card has an icon
   circle left of its title, the text under it. At 390 the panel goes and the four cards stack.
3. **FAQ**, **footer** (no CTA).

### Page hero (Careers, About, Security)

A panel (`--grey-11`, radius 20, padding 50 / 40 / 14, 50 / 50 / 30 under the navbar, dotted decor at its top right) with a
photo (968 × 716 at 1920, 715 × 568 at 1440, 329 × 253 at 390, radius 16) at the right and
a text card (`--grey-10`, radius `20 0 80 20`, padding 80 / 60 / 24, 791 / 658 wide) on top of the
photo's left edge: the title (24 / 24 / 15 above the paragraph), a paragraph, nothing else (About adds
the label above the title). Card and photo share one grid cell, so the panel is as tall as the taller
of the two. At 390 the photo is first and the text card, centred, follows it, with a plain radius 20.

## Known inconsistencies

- **Hero card border:** the design draws it in `--green-60`, unlike every other card
  (`--grey-15`).
- **Title sizes:** the home h1 is a section title (`--text-title`); the page-hero title is
  larger (58 / 48 / 28, line 1.3). Both are intended.
- **Heading block gap** to the content is 80 / 60 / 60, or 100 / 80 / 60 with a toggle;
  the FAQ and Values blocks at 390 are 10 px tighter and take 60 like the rest.
- **Value titles** are drawn in `--grey-30` (about 2:1); the page uses `--grey-45` for 3:1.
- **Approximate values**, read from the rendered pages because the layout data does not carry
  them: the corner radii of the use-case plate, the job, press and security cards; the CTA title
  size (about 38 / 32 / 26) and its inner spacing; the weights of card and badge text; the
  icon-circle tints. Check them against the design when building that element.
- **Guessed in the code**, where the layout data has no number: the navbar paddings, link gap
  and the logo width at 1440 (156); the hero column gap (120 / 80 / 80), the hero card padding
  and the type inside it (`--text-body`); the Careers photo height at 1440 and 390; in the footer the author line, the 12 × 8 padding of
  links (44 px targets, so the footer runs about 45 px taller than drawn), the bar padding
  (`--toggle-padding`) and the green current link; the testimonial text, its gaps
  (`--space-card-gap`, `--space-card-gap-sm`) and its width (600 at most), and five cards per audience.
- **Page hero at 390:** the card overlaps the photo by about 42 px on About, not on Security (the
  photo is drawn about 276 high there), so the photo stays 253 and the card follows it.
- **Hover and focus looks** come from the built code; the layout data carries none.
