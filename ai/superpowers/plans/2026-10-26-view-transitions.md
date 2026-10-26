# Plan: view transitions between pages (MY-291)

Goal: a short cross-fade between the pages, in CSS only. Behavior is in
`ai/superpowers/specs/2026-10-26-view-transitions.md`. No open questions: the choices below are final.

## Decisions made in this plan

- **Cross-document view transitions, opted in with `@view-transition { navigation: auto }`.** The pages
  are plain links with no router (`ai/rules/architecture.md`), so the same-document
  `document.startViewTransition()` has nothing to wrap and would need a script that intercepts every
  link. The cross-document form needs no script and degrades by itself: a browser that does not know the
  rule navigates as before. Rejected: a router or a link-intercepting script, an animation library, an
  inline `<head>` script.
- **Under `prefers-reduced-motion: no-preference`, not an opt-out of the animations.** The reset's
  `*` rules do not match the `::view-transition-*` pseudo-elements, so `reset.css` cannot cover them.
  Not opting in means the browser takes no snapshot at all and the page appears at once, which is
  also what the reduced-motion rule in `ai/rules/css.md` asks; the reset and the opt-in cannot disagree.
  It sits beside the `scroll-behavior` rule in `general/main.css`, the same pattern.
- **The default root cross-fade, 0.2 s.** One rule sets `animation-duration: var(--transition-duration)`
  on `::view-transition-group(*)`; the old and new images inherit it (the UA default is 0.25 s). That
  is the duration of every other state change of the site and shorter than the reveal's 0.5 s, so the
  new page's first screen is settled before anything below it begins to reveal.
- **The header is named `header`; the footer is not named.** The names were tried one by one:
  - A named element gets its own group that moves and resizes from its old rectangle to the new one,
    measured in viewport coordinates. The header is at the top of every page and does not move when a
    header link is used. After a footer link the old page is scrolled down, so the group would fly in
    from above; `::view-transition-group(header) { animation: none }` keeps the group at the new
    position and only cross-fades the old and new images (the active pill). The old image is also kept
    unstretched when the mobile menu was open and the new header is shorter.
  - The same on the footer would be worse: its place in the viewport differs by page height and scroll,
    so held at the new position it vanishes from the old page at once, and left to move it slides
    away across the screen. Unnamed, it fades with the page, which is what is wanted.
  - The whole `.header` is named, not only `.header__inner`: the skip link inside is off-screen and
    unaffected, measured at rest. `view-transition-name` must be unique per page: there is one header
    and one footer per page, and a new element with a name gets a unique one.
- **Same-document anchors do not transition** by the platform's definition, so `#products`,
  `#products-businesses` and the skip link need nothing. Reveal needs nothing: the transition shows
  the first screen, which the reveal never hides.
- **Where:** `@view-transition` and the duration in `styles/general/main.css`; the name and the group
  rule in `styles/sections/header.css`, next to the block they belong to.

## Changes

- `styles/general/main.css`: the `@view-transition` rule under `no-preference` and the group duration.
- `styles/sections/header.css`: `view-transition-name: header` and the group rule.

## Docs

- A decision record `2026-10-26-cross-document-view-transitions.md` and its index line.
- `ai/rules/css.md` (Motion): the opt-in, the unique name, what is named; a new page gets it for free.

## Verification

`npm run lint`, `lint:css`, `format:check`, `build`, `size` (CSS limit 8.5 kB gzip: report the number,
never raise it); `dist/404.html` equals `dist/index.html`. `vite preview` (clean URLs are not served
there: the links are followed as `/careers.html`) and headless Chrome over CDP at 1920 and 390 px:

- every ordered pair of the four pages by a header link: `pageswap` and `pagereveal` carry a
  `viewTransition`, the pseudo-element animations last 0.2 s, no console error;
- frames taken with the animation slowed to 4 s: the header holds its place on header-link and
  footer-link navigation, at 1440 and with the mobile menu open at 390;
- `Emulation.setEmulatedMedia` reduced motion: no `viewTransition`, no pseudo-element animation;
- an anchor click on Home (`#products`) fires no transition and scrolls; a link to
  `/#products-businesses` from another page lands on the Businesses tab; every `[data-reveal]` still
  ends visible after scrolling; Tab from the top of a new page reaches the skip link first;
- axe-core with 0 violations on the four pages; the Back button transitions too.

## Left out

- Safari (not available here; Chromium only was checked) and Firefox (no support, the page works).
- Custom animations, shared-element transitions (a logo or a card morphing between pages), and
  directional slides: the plain cross-fade is the request.
