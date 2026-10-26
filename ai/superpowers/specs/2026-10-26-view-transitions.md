# Spec: view transitions between pages (MY-291)

## Behavior

- Moving from one of the four pages to another (a header or footer link, the logo, a link in a page,
  Back and Forward) cross-fades the old page into the new one in 0.2 s (`--transition-duration`),
  instead of the instant cut.
- The header stays where it is: it is not part of the page's fade. The active pill of the navigation
  changes by a cross-fade of the header itself. When the old page was scrolled down (a footer link),
  the new header is already in place at the top; it does not slide or fade in from nothing.
- The footer fades with the rest of the page: the pages differ in height, so a footer held in place
  would have to fly across the screen or vanish before the fade.
- The mobile menu open at the moment of the click: the old header (the tall one) fades out and the new,
  closed one takes its place; it is never stretched.
- A link to `/#products-businesses` from another page transitions like any other, then the Products
  tab and the scroll behave as before.

## What does not transition

- A jump to an anchor on the same page (`#products`, `#products-businesses`, the skip link): it is not
  a page change, the page just scrolls as it does now.
- `prefers-reduced-motion: reduce`: no transition at all, the new page appears at once.
- A browser without cross-document view transitions (Firefox): plain navigation, no error, no change.

## Keyboard and assistive technology

- The new page is a new document: the focus starts at its top, the skip link is the first Tab stop and
  leads to `main#main` as before. The transition changes no markup, role or reading order.
- The reveal-on-scroll (`html.js-reveal`, `[data-reveal]`) behaves as before: the first screen is
  drawn by the transition, what is below it is revealed on scroll.
- The 404 page (a copy of Home) transitions like Home.

## Not changed

- Links, the pages, the scripts, the build output other than a few lines of CSS.
