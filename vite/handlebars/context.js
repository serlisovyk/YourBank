import { benefits } from '../../src/data/benefits.js'
import { caseItems } from '../../src/data/case-items.js'
import { contacts } from '../../src/data/contacts.js'
import { converterDefaults } from '../../src/data/converter.js'
import { cta } from '../../src/data/cta.js'
import { currencies } from '../../src/data/currency-rates.js'
import { featureGroups } from '../../src/data/feature-groups.js'
import { footer } from '../../src/data/footer.js'
import { heroTransactions } from '../../src/data/hero-transactions.js'
import { jobs } from '../../src/data/jobs.js'
import { missionVision } from '../../src/data/mission-vision.js'
import { navigation } from '../../src/data/navigation.js'
import { pages } from '../../src/data/pages.js'
import { pressReleases } from '../../src/data/press-releases.js'
import { products } from '../../src/data/products.js'
import { protection } from '../../src/data/protection.js'
import { questionGroups } from '../../src/data/question-items.js'
import { site } from '../../src/data/site.js'
import { socials } from '../../src/data/socials.js'
import { organizationJsonLd } from '../../src/data/structured-data.js'
import { testimonials } from '../../src/data/testimonials.js'
import { values } from '../../src/data/values.js'
import { CurrencyConverter } from '../../src/scripts/components/CurrencyConverter.js'

function findCurrency(code) {
  return currencies.find((currency) => currency.code === code)
}

function createConverterSide(code) {
  return {
    code,
    currencies: currencies.map((currency) => ({
      ...currency,
      isSelected: currency.code === code,
    })),
  }
}

function createConverter() {
  const { from, to, amount } = converterDefaults
  const result = CurrencyConverter.convert(
    amount,
    findCurrency(from),
    findCurrency(to),
  )

  return {
    amount,
    result,
    from: createConverterSide(from),
    to: createConverterSide(to),
  }
}

export function createContext(pagePath) {
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
    missionVision,
    protection,
    pressReleases,
    testimonials,
    heroTransactions,
    currencies,
    converter: createConverter(),
    cta,
    organizationJsonLd,
  }
}
