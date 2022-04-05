import api from './api'
import getLocale from '../locale'

/**
 *
 * @param {*} payload
 * @param {string[]} noAuthRoutes
 */
const getInitialState = async ({ url }, noAuthRe) => {
	let user = null
	let locale = {}
	let version = null
	let company = { style: { primary_color: '#182447' } }
	// let language = { BRA: 'pt-BR', FRA: 'fr' }
	const lang = 'fr'
	;({ locale } = await getLocale(lang))
	// }

	// if (url !== '/landing-page' && url !== '/dev') {
	// 	await api.get('/company-config').then((res) => {
	// 		company = res.data
	// 	})
	// }

	try {
		// if (window.location.pathname.includes('dev')) {
		// 	return ({ data: { customer: user } } = await api.get('/me'))
		// }
		if (!noAuthRe.exec(url)) {
			const res = await api.get('/me')
			user = res.data.customer
			company = res.data.company
		}
	} catch (e) {
		user = null
	}

	return {
		lang,
		user,
		locale,
		version,
		url,
		company,
		loadingAppState: false
	}
}

export default getInitialState
