import { createContext } from '../handlebars/context.js'
import { helpers } from '../handlebars/helpers.js'
import { PARTIALS } from '../paths.js'

export function getHandlebarsOptions() {
  return {
    partialDirectory: PARTIALS,
    helpers,
    context: createContext,
  }
}
