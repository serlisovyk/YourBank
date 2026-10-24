# Scope Rules

This is a small portfolio bank website. Improve it without turning it into a larger
application template.

## Do Not Add Without Explicit Request

- React, Vue, Angular or another UI framework
- TypeScript
- Test frameworks or automated tests
- A CSS framework, a component library, a CSS preprocessor, CSS-in-JS
- A backend, an HTTP API, a mock server (forms send nothing)
- Authentication, and Login or Sign Up pages
- An external currency-rates API (rates and numbers are static data in `data/`)
- A client-side router, analytics, third-party runtime scripts
- A service worker or PWA, i18n

More linter rules beyond the ones in `eslint.config.js` and `.stylelintrc.json` are a new decision
(`ai/decisions/`). A new page beyond the four needs the author's explicit request.

Third-party scripts, a font CDN and a web app manifest:
`ai/rules/assets-performance.md`. The decisions behind these limits are in `ai/decisions/`.

## Prefer

- Small, focused improvements to the existing pages
- Accessibility fixes tied to the existing interface
- Responsive and keyboard improvements
- Build and performance improvements that directly help the site

## Tradeoffs

- If a tool adds more maintenance than value, do not add it.
- If an optimization makes the source harder to understand, reconsider it.
- If a change is only useful for a much larger project, leave it out.
