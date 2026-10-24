import { REDUCED_MOTION_MEDIA_QUERY, REVEAL } from '../constants.js'

export class Reveal {
  #root
  #options
  #items
  #observer

  constructor(root, options = {}) {
    this.#root = root
    this.#options = { ...REVEAL, ...options }
    this.#items = [...root.querySelectorAll('[data-reveal]')]
  }

  start() {
    const hasReducedMotion = window.matchMedia(REDUCED_MOTION_MEDIA_QUERY).matches
    if (hasReducedMotion) return

    const { rootMargin, threshold, pendingClass } = this.#options

    this.#observer = new IntersectionObserver(
      (entries) => this.#handleIntersect(entries),
      { rootMargin, threshold },
    )

    for (const item of this.#items) {
      if (Reveal.#hasReachedViewport(item)) {
        this.#reveal(item, 0)
        continue
      }

      this.#observer.observe(item)
    }

    this.#root.addEventListener('focusin', (event) => this.#handleFocusIn(event))
    this.#root.ownerDocument.documentElement.classList.add(pendingClass)
  }

  static #hasReachedViewport(item) {
    const { top, height } = item.getBoundingClientRect()
    const hasBox = height > 0

    return hasBox && top < window.innerHeight
  }

  #handleIntersect(entries) {
    const intersectingEntries = entries.filter((entry) => entry.isIntersecting)

    intersectingEntries.forEach((entry, index) => this.#reveal(entry.target, index))
  }

  #handleFocusIn(event) {
    const item = event.target.closest('[data-reveal]')
    if (!item) return

    this.#reveal(item, 0)
  }

  #reveal(item, index) {
    const { revealedClass, indexProperty, maxIndex } = this.#options

    item.style.setProperty(indexProperty, Math.min(index, maxIndex))
    item.classList.add(revealedClass)
    this.#observer.unobserve(item)
  }
}
