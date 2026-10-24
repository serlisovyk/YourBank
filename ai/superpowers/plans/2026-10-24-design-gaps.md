# Plan: shared components against the design (MY-210)

Goal: close the gaps between four shared components and the design, found while building Careers,
About and Security. The references are the 1920 captures of the four pages and the 390 captures of
About and Security, measured in px at the drawn width. No open questions.

## Measurements

- **Section text width.** The longest line of the text under a title is 1228 to 1280 px at 1920
  (Careers, Home, About, Security) and every text wraps before the next word would make it 1313 px
  or more. Rendered here, one width reproduces every drawn line break (Values, Benefits, Jobs, Home
  Features, Mission, Protect): 1302 px. Home sections without a toggle give the same width (Features:
  1237). Beside a toggle the design wraps at 905 to 961 px (Products 905, Testimonials 893), not at the
  580 px in the code: 935 reproduces both breaks.
- **FAQ.** At 1920 the second row (items 3 and 4) is shown almost whole under the fade: 320 px of
  a 323 px row; the fade is linear from fully clear 60 px below the row's top to the page colour at its
  bottom (about 262 px), and the button starts where the row ends, with no overlap. At 390 the
  items stack: item 3 whole and item 4 faded, 689 px from the top of item 3 to the button; the fade
  covers about the last 235 px.
- **Page hero at 390.** The photo starts 152 px from the page top (ours 172): the panel is 30 px
  under the navbar, not 50. The gap from the title to the text under it is about 15 px (ours 24);
  at 1920 it is 24 and matches.
- **Job cards at 1920.** Row one 890 px (ours 892), the third card 915 (ours 919); the offsets of
  title, badges, subtitles, list and button agree to 2 px. No spacing gap. A card grows by one line
  when the viewport is 15 px narrower (a classic scrollbar), which is wrapping, not spacing.

## Changes

- `components/section-heading`: `.section-heading__text` gets `max-width: var(--section-text-width)`,
  and the one beside a toggle `--section-text-width-toggle`, instead of 580 px. Tokens in
  `variables.css`: 1157 / 1302 and 831 / 935 between 1440 and 1920 (flat below, the content is
  narrower than the box). The 1440 values keep the characters per line of the 1920 ones.
- `sections/faq`: the collapsed height is a token `--faq-preview` (320 / 295 / 689) and the fade a
  token `--faq-fade` (262 / 240 / 235), both in `variables.css`; the overlay sits at the bottom of the
  region and runs `transparent` to `--grey-10`; the button loses its negative margin. `FaqController`
  and `Disclosure` stay: the visible count is not set in JS (the second group is the item data).
- `sections/page-hero`: the top padding is a token `--space-page-hero-top` (50 / 50 / 30) and the
  title's bottom margin `--space-page-hero-title` (24 / 24 / 15).
- Job cards: left as they are.
- `ai/design-system.md`: the FAQ fade, the section text width, the page-hero offsets and the
  Known inconsistencies entry for the 390 hero photo (the card overlaps it on About by about 42 px,
  not on Security: the two frames disagree, so the photo stays 253 px and the card stays below it).

## Verification

`npm run lint`, `lint:css`, `format:check`, `build`, `size` (CSS is at 7.53 of 8 kB), `cmp dist/404.html
dist/index.html`. Headless Chrome on `npm run preview`: the four pages at 1920, 1440 and 390 before
and after, the text box, FAQ and hero measured against the numbers above; no horizontal overflow at
320, 390, 767, 768, 1024, 1440 and 1920; the FAQ opened and closed with the mouse and with
`Enter` / `Space`, `inert` and `aria-expanded` in step.

## Left out

- Everything of MY-204 (skip link, contrast, hit areas, overflow at odd widths, headings, motion).
- The card overlap of the 390 page hero, and per-page photo heights.
