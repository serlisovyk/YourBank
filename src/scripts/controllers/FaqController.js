import { Disclosure } from '../components/Disclosure.js'
import { FAQ } from '../constants.js'

export class FaqController {
  #disclosure

  constructor(root, options = {}) {
    const { heightProperty, labels } = { ...FAQ, ...options }

    this.#disclosure = new Disclosure(root, { heightProperty, labels })
  }

  start() {
    this.#disclosure.start()
  }
}
