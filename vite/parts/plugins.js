import handlebars from 'vite-plugin-handlebars'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { copyIndexTo404 } from '../plugins/copy-index-to-404.js'
import { minifyHtml } from '../plugins/minify-html.js'
import { getHandlebarsOptions } from './handlebars.js'
import { getImageOptimizerOptions } from './image-optimizer.js'

export function getPlugins() {
  return [
    handlebars(getHandlebarsOptions()),
    ViteImageOptimizer(getImageOptimizerOptions()),
    minifyHtml(),
    copyIndexTo404(),
  ]
}
