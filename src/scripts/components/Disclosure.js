export class Disclosure {
  #options
  #trigger
  #regions
  #label
  #isOpen

  constructor(root, options = {}) {
    this.#options = {
      heightProperty: '--disclosure-expanded-height',
      labels: null,
      ...options,
    }
    this.#trigger = root.querySelector('[data-disclosure-trigger]')
    this.#regions = [...root.querySelectorAll('[data-disclosure-region]')]
    this.#label = root.querySelector('[data-disclosure-label]')
    this.#isOpen = this.#trigger.getAttribute('aria-expanded') === 'true'
  }

  start() {
    this.#renderExpanded()

    this.#trigger.addEventListener('click', () => this.toggle())
    window.addEventListener('resize', () => this.#renderHeight())
  }

  open() {
    this.#renderHeight()
    this.#isOpen = true
    this.#renderExpanded()
  }

  close() {
    this.#renderHeight()
    this.#isOpen = false
    this.#renderExpanded()
  }

  toggle() {
    if (this.#isOpen) {
      this.close()
      return
    }

    this.open()
  }

  #renderHeight() {
    const { heightProperty } = this.#options

    for (const region of this.#regions) {
      region.style.setProperty(heightProperty, `${region.scrollHeight}px`)
    }
  }

  #renderExpanded() {
    this.#trigger.setAttribute('aria-expanded', String(this.#isOpen))

    for (const region of this.#regions) {
      region.inert = !this.#isOpen
    }

    this.#renderLabel()
  }

  #renderLabel() {
    const { labels } = this.#options
    if (!labels || !this.#label) return

    this.#label.textContent = this.#isOpen ? labels.whenOpen : labels.whenClosed
  }
}
