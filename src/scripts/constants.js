export const MOBILE_MEDIA_QUERY = '(width < 768px)'
export const TABLET_MEDIA_QUERY = '(width < 1024px)'
export const REDUCED_MOTION_MEDIA_QUERY = '(prefers-reduced-motion: reduce)'

export const KEYS = Object.freeze({
  escape: 'Escape',
  home: 'Home',
  end: 'End',
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  arrowLeft: 'ArrowLeft',
  arrowRight: 'ArrowRight',
})

export const MENU = Object.freeze({
  openClass: 'is-open',
  labels: Object.freeze({ whenOpen: 'Close menu', whenClosed: 'Open menu' }),
})

export const FOOTER = Object.freeze({
  yearSeparator: ' · ',
})

export const PRODUCTS = Object.freeze({
  inactiveButtonClass: 'button--empty',
  hashPrefix: '#products-',
})

export const FEATURES = Object.freeze({
  activeTabClass: 'features__button--active',
  activePanelClass: 'features__items--active',
})

export const FAQ = Object.freeze({
  expandedClass: 'faq__more--expanded',
  heightProperty: '--faq-expanded-height',
  labels: Object.freeze({ whenOpen: 'Show Less', whenClosed: 'Load All FAQ’s' }),
})

export const TESTIMONIALS = Object.freeze({
  inactiveButtonClass: 'button--empty',
})

export const CAROUSEL = Object.freeze({
  edgeTolerance: 1,
})

export const REVEAL = Object.freeze({
  pendingClass: 'js-reveal',
  revealedClass: 'is-revealed',
  indexProperty: '--reveal-index',
  maxIndex: 4,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0,
})

export const CURRENCY_CONVERTER = Object.freeze({
  locale: 'en-US',
  amountPattern: /^(\d+([.,]\d*)?|[.,]\d+)$/,
  maxAmount: 1_000_000_000,
  minFractionDigits: 2,
  emptyResult: '—',
  invalidMessage: 'Enter an amount from 0 to',
})
