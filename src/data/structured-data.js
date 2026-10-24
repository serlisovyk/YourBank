import { contacts } from './contacts.js'
import { pages } from './pages.js'
import { site } from './site.js'
import { socials } from './socials.js'

const contactValue = (scheme) =>
  contacts.find(({ href }) => href?.startsWith(scheme))?.href.slice(scheme.length)

export const organizationJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.svg`,
  description: pages.index.description,
  email: contactValue('mailto:'),
  telephone: contactValue('tel:'),
  sameAs: socials.map(({ href }) => href),
})
