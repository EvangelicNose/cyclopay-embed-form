import canUseDOM from "can-use-dom"
import api from "./api"

function parseCookies(req) {
	let list = {},
		rc = req.headers.cookie

	rc &&
		rc.split(";").forEach(cookie => {
			var parts = cookie.split("=")
			list[parts.shift().trim()] = decodeURI(parts.join("="))
		})

	return list
}

function getToken(req) {
	return canUseDOM
		? localStorage.getItem("token")
		: req
		? parseCookies(req).token
		: null
}

async function authenticate() {
	let user = null,
		company = null

	try {
		api.init = true
		;({ data: company } = await api.get("/company-config"))
		;({ data: user } = await api.get(`/me`))
	} catch (e) {
		console.error("ERROR GET USER. ", e)
	} finally {
		api.init = false
	}

	return { user, company }
}

export default authenticate
