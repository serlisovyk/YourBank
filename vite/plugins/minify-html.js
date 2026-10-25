import { minify } from 'html-minifier-terser'

const MINIFY_OPTIONS = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeComments: true,
}

export function minifyHtml() {
  return {
    name: 'minify-html',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: (html) => minify(html, MINIFY_OPTIONS),
    },
  }
}
