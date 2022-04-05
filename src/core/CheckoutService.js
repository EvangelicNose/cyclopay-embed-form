import axios from "axios"

/** @type {import("../../node_modules/axios/index").AxiosInstance} */
export const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_NEW_URL}/v1`,
})

window.api = api

function getMode() {
    return Boolean(+localStorage.getItem("test")) ? "SANDBOX" : "LIVE"
}

api.interceptors.request.use((config) => {
    config.headers.mode = getMode()
    config.headers['Authorization'] = localStorage.getItem("token") || null
    return config
})

api.interceptors.response.use(
    (res) => res,
    (error) => {
        Object.defineProperty(error, "message", {
            get() {
                return (
                    this.response?.data?.errors?.[0]?.message ??
                    "@@ Tente novamente mais tarde"
                )
            },
        })
        if (error.response?.status === 401) {
            // window.location = "/login"
        } else return Promise.reject(error)
    }
)

export class CheckoutService {
    static async Subscribe({ customer, hash, coupon_id }) {
        const { data } = await api.post(`/checkout/subscribe/${hash}`, { customer, coupon_id })
        return data
    }

    static async Pay({ payment, hash }) {
        const { data } = await api.post(`/checkout/pay/${hash}`, payment)
        return data
    }

    static async Get({ hash }) {
        const { data } = await api.get(`/checkout/${hash}`)
        localStorage.setItem("token", data.session_token)
        delete data.session_token
        return data
    }

    static async GetPaymentUpdateInfo({ subscription_id, token, company_id }) {
        const { data } = await api.get(`/checkout/payment-mean?subscriptionId=${subscription_id}`, {
            headers: {
                "Token": token,
                "CompanyId": company_id,
            }
        })
        return data
    }
    
    static async PayBoleto({ payment, hash }) {
        const { data } = await api.post(`/checkout/pay/${hash}`, payment)
        return data
    }

    static async ValidateCoupon({ code, hash }) {
        const { data } = await api.get(`/checkout/coupon?code=${code}&hash=${hash}`)
        return data
    }
}