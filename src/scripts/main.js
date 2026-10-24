import { CurrencyConverter } from './components/CurrencyConverter.js'
import { Reveal } from './components/Reveal.js'
import { FaqController } from './controllers/FaqController.js'
import { FeaturesController } from './controllers/FeaturesController.js'
import { FooterController } from './controllers/FooterController.js'
import { HeaderMenuController } from './controllers/HeaderMenuController.js'
import { ProductsController } from './controllers/ProductsController.js'
import { TestimonialsController } from './controllers/TestimonialsController.js'

const SECTIONS = [
  { selector: '[data-header]', Controller: HeaderMenuController },
  { selector: '[data-products]', Controller: ProductsController },
  { selector: '[data-features]', Controller: FeaturesController },
  { selector: '[data-faq]', Controller: FaqController },
  { selector: '[data-testimonials]', Controller: TestimonialsController },
  { selector: '[data-currency-converter]', Controller: CurrencyConverter },
  { selector: '[data-reveal-root]', Controller: Reveal },
  { selector: '[data-footer]', Controller: FooterController },
]

for (const { selector, Controller } of SECTIONS) {
  for (const root of document.querySelectorAll(selector)) {
    new Controller(root).start()
  }
}
