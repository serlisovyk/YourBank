# Assets and Performance Rules

What holds for images, the font, the files in `assets/`, the page metadata and the weight of
the build. Where the files are: `ai/map.md`. Why the site is static and vanilla:
decision `vanilla-js-vite-handlebars`.

## Font

- Lexend is self-hosted: a `woff2` in `src/assets/fonts/`, declared in
  `src/styles/general/fonts.css` with `font-display: swap`. No font CDN.
- A new weight, style or face is a decision for the author, not a drive-by edit; a variable
  file already covers the weights in use.

## Images

- Every `<img>` has `width` and `height` (no layout shift), and `alt`: a decorative image has
  `alt=""` and `aria-hidden="true"`, an informative one says what it shows.
- An image below the first screen has `loading="lazy"`; the first screen's own image does not.
- Icons and illustrations are SVG. An export from a design tool is cleaned before it is
  committed (no editor metadata, no embedded raster, no needless paths); a file that stays
  heavy after that (over about 200 kB) is questioned first: a simpler shape, a CSS gradient,
  or a smaller export.
- A photo is `webp` or `avif` (the smaller one without visible loss), set in `<img src>` directly,
  with no `<picture>`, at the size it is shown (twice that for a sharp screen), never the original
  export.
- Dotted and other textured decor is a raster too, `avif` or `webp`, baked over the flat surface it
  sits on and drawn at twice its CSS size, with a `background-size` in CSS px. It is never an SVG
  with a path per dot (decision `light-decor-raster`).
- The build recompresses every emitted image (SVGO keeping `viewBox`, jpg and webp at quality
  80), but that does not replace the clean-up and the sizing above: it only trims what is left.
- Every image and the font sits in `src/assets/` and is referenced by one scheme, the root path
  `/assets/images/…` or `/assets/fonts/…`, in HTML, partial parameters, `data/*.js` and CSS.
  The bundler emits each file once, with a hash in its name, and never inlines it
  (`build.assetsInlineLimit: 0`). Do not import images in JS and do not put them in `public/`.
- `public/` is only for a file that needs a fixed URL (`favicon.ico`, `robots.txt`); it is
  copied as it is.
- Asset files are named in lowercase with hyphens, by what they show (`growth-arrows.svg`),
  not by their place in the design.
- An asset the code no longer uses is deleted in the same change.

## Page metadata

- Every page has a unique `<title>` and meta `description`, the viewport meta, and `lang`
  equal to the language of its content.
- Absolute URLs (canonical, `og:url`, `og:image`) are built from `site.url`, never written out. The
  link preview is one 1200×630 PNG under 300 kB in `public/` (a fixed name: crawlers cache the
  URL), with `og:image:alt`.
- The head holds only what the page needs: the stylesheet, the one script entry, the
  metadata.

## Bundle and third parties

- No third-party runtime scripts, no analytics, no font or icon CDN: the only script is
  `scripts/main.js`.
- No sitemap and no web app manifest unless the author asks.
- No source maps in the production build: `vite.config.js` sets no `build.sourcemap`.
- A dependency is added only with the author's yes; the runtime has none today.
- `npm run size` holds the built JS, CSS, font and images to the limits in `.size-limit.json`
  (decision `ci-size-limit`). A change that comes near them is questioned first: a lighter way,
  a smaller image; raising a limit is a new dated record.
