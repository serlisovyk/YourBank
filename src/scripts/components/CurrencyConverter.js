import { CURRENCY_CONVERTER } from '../constants.js'

export class CurrencyConverter {
  #root
  #options
  #fromSide
  #toSide
  #amountInput
  #resultValue
  #resultNote
  #swapButton
  #currencies
  #invalidMessage

  constructor(root, options = {}) {
    this.#root = root
    this.#options = { ...CURRENCY_CONVERTER, ...options }

    const [fromSide, toSide] = root.querySelectorAll('[data-converter-side]')

    this.#fromSide = CurrencyConverter.#findSide(fromSide)
    this.#toSide = CurrencyConverter.#findSide(toSide)
    this.#amountInput = root.querySelector('[data-converter-amount]')
    this.#resultValue = root.querySelector('[data-converter-result-value]')
    this.#resultNote = root.querySelector('[data-converter-result-note]')
    this.#swapButton = root.querySelector('[data-converter-swap]')
    this.#currencies = this.#readCurrencies()
    this.#invalidMessage = this.#buildInvalidMessage()
  }

  start() {
    const { converterFrom, converterTo } = this.#root.dataset

    this.#fromSide.select.value = converterFrom
    this.#toSide.select.value = converterTo
    this.#render()

    this.#root.addEventListener('input', () => this.#render())
    this.#swapButton.addEventListener('click', () => this.swap())
  }

  swap() {
    const fromCode = this.#fromSide.select.value

    this.#fromSide.select.value = this.#toSide.select.value
    this.#toSide.select.value = fromCode
    this.#render()
  }

  static convert(
    amount,
    from,
    to,
    { locale, minFractionDigits } = CURRENCY_CONVERTER,
  ) {
    const converted = (amount / from.rate) * to.rate
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: to.fractionDigits,
    })

    return formatter.format(converted)
  }

  static #findSide(side) {
    return {
      select: side.querySelector('[data-converter-select]'),
      markers: [...side.querySelectorAll('[data-converter-currency]')],
    }
  }

  static #parseAmount(text, { amountPattern, maxAmount }) {
    if (!amountPattern.test(text)) return null

    const amount = Number(text.replace(',', '.'))
    if (amount > maxAmount) return null

    return amount
  }

  #readCurrencies() {
    const currencies = new Map()

    for (const option of this.#fromSide.select.options) {
      currencies.set(option.value, {
        rate: Number(option.dataset.converterRate),
        fractionDigits: Number(option.dataset.converterDigits),
      })
    }

    return currencies
  }

  #buildInvalidMessage() {
    const { locale, maxAmount, invalidMessage } = this.#options
    const formattedMax = new Intl.NumberFormat(locale).format(maxAmount)

    return `${invalidMessage} ${formattedMax}`
  }

  #render() {
    this.#renderSide(this.#fromSide)
    this.#renderSide(this.#toSide)
    this.#renderResult()
  }

  #renderSide({ select, markers }) {
    for (const marker of markers) {
      marker.hidden = marker.dataset.converterCurrency !== select.value
    }
  }

  #renderResult() {
    const text = this.#amountInput.value.trim()
    const amount = CurrencyConverter.#parseAmount(text, this.#options)
    const isInvalid = amount === null && text !== ''

    this.#amountInput.setAttribute('aria-invalid', String(isInvalid))

    if (amount === null) {
      const note = isInvalid ? this.#invalidMessage : ''

      this.#renderResultText(this.#options.emptyResult, note)
      return
    }

    const fromCurrency = this.#currencies.get(this.#fromSide.select.value)
    const toCode = this.#toSide.select.value
    const toCurrency = this.#currencies.get(toCode)
    const result = CurrencyConverter.convert(
      amount,
      fromCurrency,
      toCurrency,
      this.#options,
    )

    this.#renderResultText(result, ` ${toCode}`)
  }

  #renderResultText(value, note) {
    this.#resultValue.textContent = value
    this.#resultNote.textContent = note
  }
}
