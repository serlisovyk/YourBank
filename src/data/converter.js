import { CURRENCY_CONVERTER } from '../scripts/constants.js'
import { currencies } from './currency-rates.js'

const from = 'INR'
const to = 'USD'
const amount = 5000

const rateOf = (code) => currencies.find((currency) => currency.code === code)
const target = rateOf(to)

const converted = (amount / rateOf(from).rate) * target.rate

const formatter = new Intl.NumberFormat(CURRENCY_CONVERTER.locale, {
  minimumFractionDigits: CURRENCY_CONVERTER.minFractionDigits,
  maximumFractionDigits: target.fractionDigits,
})

export const converter = {
  from,
  to,
  amount,
  result: formatter.format(converted),
}
