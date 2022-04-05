// prettier-ignore

import React from "react"
import { TranslationContextDecorator } from './TranslationContextDecorator'
import { ltif } from './ltif'
import { useAppContext } from '../AppContextCheckout'

export const IntlContextObject = React.createContext({})
const { Provider, Consumer } = IntlContextObject

const defaultLang = require('../locale/pt-BR.json')

// Literal Identifier
const L = [ 0x40, 0x40 ].map((c) => String.fromCharCode(c)).join('')

/**
 * 
 * @returns {import("../../locale/locale").TranslationFunction} 
 */
export const withLocale = (locale) => {
	function t(token, ...args) {
		if (!token) {
			return ''
		}

		let transl

		if ((token || '').startsWith(L)) {
			transl = token.replace(new RegExp(`^${L}`), '').replace(/%:(.*)?$/, '').trim()
		} else {
			let first,
				rest
				// try {
			;[ first, ...rest ] = token.split('.')
			// }
			// catch { debugger }
			rest = rest.join('.')
			if (this[first]) {
				transl = t.call(this[first], rest, ...args)
			}
			if (!transl) {
				if (!this[token]) {
					transl = defaultLang[token]
				} else {
					transl = this[token]
				}
			}
		}

		return ltif(transl || '', ...args)
	}

	const translFn = t.bind(locale)
	
	new TranslationContextDecorator().withTranslationFunction(translFn).applyLocale(locale, defaultLang)

	return (translFn)
}

const Translate = ({ children }) => (
	<Consumer>{(locale) => children((token, ...args) => withLocale(locale)(token || '', ...args))}</Consumer>
)

export const useTranslation = () => {
	const { locale } = useAppContext()
	return withLocale(locale)
}

Translate.displayName = 'IntlContext.Translate'

export default {
	Provider,
	Consumer,
	withLocale,
	Translate
}
