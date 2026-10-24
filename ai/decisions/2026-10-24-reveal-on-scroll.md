# Reveal on scroll: opt-in, hidden only behind a script class, never the first screen

Date: 2026-10-24 · Status: accepted

## Context

Sections and cards fade in as they scroll into view. The usual way hides them in CSS and shows
them from a script, which leaves a page empty when the script is missing, flashes what was
already drawn, can hold back the largest paint, and can park keyboard focus on an invisible
element.

## Decision

- One `Reveal` component per page, one `IntersectionObserver`; an element opts in with
  `data-reveal` and is unobserved once revealed. Only `opacity` and `transform` change, from tokens.
- **The hidden state exists only under a class on `<html>` that `start()` adds** (`js-reveal`).
  Without script, or if it fails, the page is complete. The script is a deferred module and cannot
  run before the first paint, so before adding the class `start()` marks every element already in
  view or above it as revealed: nothing that was drawn hides and shows again. No inline script.
- **The first screen never carries `data-reveal`:** the Home hero, the page hero, the header and the
  footer. The largest paint never waits for the script or an animation.
- **Reduced motion:** `start()` returns before hiding anything; the reset's short transitions keep
  the two agreeing if the setting changes mid-visit.
- **Focus never lands on an invisible element:** `:focus-within` lifts the hidden state without a
  transition, and `focusin` marks the element revealed for good.
- The observer uses `threshold: 0` and a bottom `rootMargin` of -10%, so even a very tall element
  fires; a hidden panel fires when it is shown.

## Consequences

- A new section's cards, rows and heading carry `data-reveal`; one on a first-screen element breaks
  the rule above.
- An element jumped over (an anchor, `End`) stays hidden until scrolled back into view; one printed
  before it was reached is blank. Accepted: no print styles exist.
- Rejected: a scroll listener or a per-element observer (more code, jank); hiding in plain CSS with
  a `<noscript>` override (a failed script still leaves the page empty); an inline script in
  `<head>` to set the class before paint (a second script, `ai/rules/assets-performance.md`); an
  animation library.
