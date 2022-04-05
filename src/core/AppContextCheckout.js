import React from 'react'

/**
 * @typedef {Object} AppState
 * @prop {Object} user
 * @prop {Object} locale
 * @prop {string[]} openMenus
 * @prop {string} version
 * @prop {string} loadingUrl
 * @prop {string} url
 * @prop {string} language
 * @prop {string} modalWidth
 * @prop {Company} company
 */

/**
 * @typedef {Object} Company
 * @prop {string} name
 * @prop {string} country
 * @prop {boolean} use_form_token
 * @prop {CompanyStyle} style
 */

/**
 * @typedef {Object} CompanyStyle
 * @prop {string} url_logo_white
 * @prop {string} url_logo_default
 * @prop {string} primary_color
 * @prop {string} secundary_color
 * @prop {string} background_color
 * @prop {Object} checkout_style
 * @prop {Object} favicon
 */

/** @type {AppState} */
const initialState = {
	user: null,
	locale: {},
	openMenus: [],
	version: null,
	loadingUrl: null,
	url: null,
	language: 'pt-BR',
	modalWidth: '80vw',
	company: null,
	loading: true,
	loadingAppState: false,
	checkout_config: {},
	payzenForm: false,
	coupon: { enabled: true },
	setAppState: () => void 0
}

const AppContext = React.createContext({ ...initialState })

AppContext.init = (defaultState = {}) => ({
	...initialState,
	...defaultState
})

export function useAppContext() {
	return React.useContext(AppContext)
}

export default AppContext
