export const currencyLocaleTable = {
	BRL: 'pt-BR',
	USD: 'en-US',
	EUR: 'fr'
}
const toCurrency = (value = 0, currency = 'BRL') => {
	value /= 100
	const locale = currencyLocaleTable[currency] || currencyLocaleTable.BRL
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency
	}).format((value || 0).toString().replace(/,/g, ''))
}

export default toCurrency
