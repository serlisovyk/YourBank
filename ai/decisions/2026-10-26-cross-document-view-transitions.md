# Page transitions: cross-document view transitions in CSS, the header named

Date: 2026-10-26 · Status: accepted

## Context

The four pages are plain links, so every move between them is an instant cut with a flash of the
empty page. The site has no router and no client-side navigation (`vanilla-js-vite-handlebars`).

## Decision

- Pages cross-fade by the browser's cross-document view transitions, opted in with
  `@view-transition { navigation: auto }` and nothing else: no script, no library, no router. A
  browser without the feature navigates as before; a same-page anchor is not a page change, so it
  does not transition.
- The rule sits under `prefers-reduced-motion: no-preference`: with reduced motion the browser takes no
  snapshot and the page appears at once. The reset's `*` rules do not reach `::view-transition-*`, so
  the opt-in, not a counter-rule, is how reduced motion is honoured.
- The default root cross-fade, its duration set to `--transition-duration` on
  `::view-transition-group(*)`. Nothing else is animated: no slide, no shared-element morph.
- **Only the header is named** (`view-transition-name: header`, one per page, so unique), with its group
  `animation: none`: it holds its place, and only the active pill cross-fades. Without the group rule
  the header flies in from above after a footer link, since a group moves from the old viewport
  position to the new one. The footer is not named: its place in the viewport differs by page height
  and scroll, so a named footer vanishes or slides away; unnamed, it fades with the page.

## Consequences

- A new page needs nothing; any new element given a `view-transition-name` must be unique on its page
  and must have the same place on every page, or its group rule must be `animation: none`
  (`ai/rules/css.md`).
- Rejected: `document.startViewTransition()` with a link-intercepting script (a router in disguise);
  an animation or router library; naming the footer or the logo; per-page directional slides; opting
  out of the animations under reduced motion instead of not opting in (the snapshot would still be taken).
