import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { minify } from 'html-minifier-terser'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { caseItems } from './src/data/case-items.js'
import { cta } from './src/data/cta.js'
import { currencies } from './src/data/currency-rates.js'
import { featureGroups } from './src/data/feature-groups.js'
import { contacts } from './src/data/contacts.js'
import { footer } from './src/data/footer.js'
import { heroTransactions } from './src/data/hero-transactions.js'
import { navigation } from './src/data/navigation.js'
import { pages } from './src/data/pages.js'
import { products } from './src/data/products.js'
import { questionGroups } from './src/data/question-items.js'
import { site } from './src/data/site.js'
import { socials } from './src/data/socials.js'
import { testimonials } from './src/data/testimonials.js'
import { values } from './src/data/values.js'
import { benefits } from './src/data/benefits.js'
import { jobs } from './src/data/jobs.js'

const root = resolve(import.meta.dirname, 'src')

const minifyHtml = () => ({
  name: 'minify-html',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler: (html) =>
      minify(html, {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
      }),
  },
})

const copyIndexTo404 = () => {
  let outDir = ''

  return {
    name: 'copy-index-to-404',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      await copyFile(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

export default defineConfig({
  root,
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        about: resolve(root, 'about.html'),
        careers: resolve(root, 'careers.html'),
        security: resolve(root, 'security.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(root, 'partials'),
      helpers: {
        eq: (first, second) => first === second,
      },
      context(pagePath) {
        const pageName = pagePath.split('/').at(-1).replace('.html', '') || 'index'

        return {
          site,
          page: pages[pageName],
          navigation,
          contacts,
          socials,
          footer,
          caseItems,
          featureGroups,
          questionGroups,
          products,
          values,
          benefits,
          jobs,
          testimonials,
          heroTransactions,
          currencies,
          cta,
        }
      },
    }),
    ViteImageOptimizer({
      jpg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 75 },
      svg: {
        multipass: true,
        plugins: ['preset-default'],
      },
    }),
    minifyHtml(),
    copyIndexTo404(),
  ],
})
