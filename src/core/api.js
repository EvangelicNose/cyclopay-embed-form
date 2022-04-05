import axios from "axios"

/** @type {Veripag.API} */
const api = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}/v1`,
})

api.init = (history) => {
	api.history = history
}

api.interceptors.request.use((request) => {
	const token = localStorage.getItem("token")

	request.headers = {
		...request.headers,
		// ...api.req.headers,
		Authorization: `Bearer ${token}`,
	}
	// }
	return request
})

api.interceptors.response.use(
	(response) => {
		const token = response.data.token
		if (token) localStorage.setItem("token", response.data.token)
		return response
	},
	(error) => {
		console.log("ERR", error)
		// alert(`!! API Error.
		// Requested URL: ${error.config && error.config.url}
		// Status Code: ${error.response && error.response.status}`)

		console.log(`!! API Error.
		Requested URL: ${error.config && error.config.url}
		Status Code: ${error.response && error.response.status}`)
		if (error.response) {
			if (error.response.status === 401) {
				if (
					api.history &&
					api.history.location.pathname.startsWith("/login")
				) {
					api.history.push("/login")
				}
				return error
			}
			if (
				api.history &&
				api.history.location.pathname.startsWith("/login")
			) {
				api.history.push("/login")
			}
		}
		throw error
	}
)

// API DO CHECKOUT
export const billService = axios.create({
	baseURL: process.env.REACT_APP_BILL_SERVICE_URL,
})
export const sddApiService = axios.create({
	baseURL: "https://secure.payzen.eu",
})
//
export const updateFunctionApi = axios.create({
	baseURL: process.env.REACT_APP_UPDATE_PAYMENT,
})

export default api
