import api, { billService } from "./api"

export const mkFlagMask = mask =>
	mask.split("").map(c => (c == "9" ? /\d/ : c == " " ? "\u2000" : c))
export const mkFlagReValidator = arr =>
	new RegExp(arr.map(n => `^\\d{${n}}$`).join("|"))

const Authorization =
	"e30.eyJjb21wYW55X2lkIjoiNTQiLCJjb21wYW55X2NvZGUiOiIwN2IzZDJlYS1jM2ZmLTRhNjMtOTkzZi0yOGViN2JjNzBhNzEiLCJwcm92aWRlcl9pZCI6IjEiLCJ1c2VyX2lkIjoiMzgiLCJzaWduYXR1cmUiOiJkMWtNTXJuQ0lRIiwibmJmIjoxNTU4NDU3NTM5LCJleHAiOjE1NTg0NTgxMzksImlhdCI6MTU1ODQ1NzUzOX0."

export const flagReValidators = {
	default: {
		raw_mask: "9999 9999 9999 9999",
		mask: mkFlagMask("9999 9999 9999 9999"),
		re: mkFlagReValidator([16]),
		maskCVV: mkFlagMask("999"),
		raw_mask_cvv: "999"
	},
	visa: {
		raw_mask: "9999 9999 9999 9999",
		mask: mkFlagMask("9999 9999 9999 9999"),
		re: mkFlagReValidator([13, 16]),
		maskCVV: mkFlagMask("999"),
		raw_mask_cvv: "999"
	},
	mastercard: {
		raw_mask: "9999 9999 9999 9999",
		mask: mkFlagMask("9999 9999 9999 9999"),
		re: mkFlagReValidator([16]),
		maskCVV: mkFlagMask("999"),
		raw_mask_cvv: "999"
	},
	diners: {
		raw_mask: "9999 9999 9999 9999",
		mask: mkFlagMask("9999 9999 9999 9999"),
		re: mkFlagReValidator([14, 16]),
		maskCVV: mkFlagMask("999"),
		raw_mask_cvv: "999"
	},
	elo: {
		raw_mask: "9999 9999 9999 9999",
		mask: mkFlagMask("9999 9999 9999 9999"),
		re: mkFlagReValidator([16]),
		maskCVV: mkFlagMask("999"),
		raw_mask_cvv: "999"
	},
	amex: {
		raw_mask: "9999 999999 99999",
		mask: mkFlagMask("9999 999999 99999"),
		re: mkFlagReValidator([15]),
		maskCVV: mkFlagMask("9999"),
		raw_mask_cvv: "9999"
	},
	discover: {
		raw_mask: "9999 9999 9999 9999",
		mask: mkFlagMask("9999 9999 9999 9999"),
		re: mkFlagReValidator([16]),
		maskCVV: mkFlagMask("9999"),
		raw_mask_cvv: "9999"
	},
	aura: {
		raw_mask: "9999 9999 9999 9999",
		mask: mkFlagMask("9999 9999 9999 9999"),
		re: mkFlagReValidator([16]),
		maskCVV: mkFlagMask("999"),
		raw_mask_cvv: "999"
	},
	jcb: {
		raw_mask: "9999 9999 9999 9999",
		mask: mkFlagMask("9999 9999 9999 9999"),
		re: mkFlagReValidator([16]),
		maskCVV: mkFlagMask("999"),
		raw_mask_cvv: "999"
	},
	hipercard: {
		raw_mask: "9999 9999 9999 9999 999",
		mask: mkFlagMask("9999 9999 9999 9999 999"),
		re: mkFlagReValidator([13, 16, 19]),
		maskCVV: mkFlagMask("999"),
		raw_mask_cvv: "999"
	}
}

export const getBrand = async number => {
	const bin = ((number || "").toString().match(/^\d{0,6}/) || [])[0] || ""

	try {
		const { data: flagurl } = await billService.get(
			`/commons/brands?bin=${bin}`,
			{
				headers: { Authorization }
			}
		)
		const flag = (flagurl.match(/(\w+).png$/) || [])[1] || "default"
		return (flag in flagReValidators ? flag : "default").toLowerCase()
	} catch (e) {
		return "default"
	}
}

export async function addCard(form) {
	form.number = ((form.number || "").match(/\d/g) || []).join("")
	try {
		await api.post(`/me/payments/cards`, form)
	} catch (error) {
		return { success: false, error }
	}
	return { success: true }
}

export function validateCard({
	number = "",
	brand = "default",
	card_holder = "",
	cvv = "",
	expiry = ""
}) {
	const errors = {}

	const flagReValidator = flagReValidators[brand].re

	if (!flagReValidator.exec(number))
		errors.number = "Informe um número inválido."

	if (!card_holder.length > 0)
		errors.card_holder = "Informe o nome no cartão."

	const { maskCVV } = flagReValidators[brand]
	const CVVReValidator = mkFlagReValidator([maskCVV.length])

	if (!CVVReValidator.exec(cvv)) errors.cvv = "Informe um CVV válido."

	try {
		const [_, month, year] = expiry.match(/^(\d\d)\/(\d{4})$/).map(Number)

		if (month < 1 || month > 12) throw ""

		if (year < new Date().getFullYear()) throw ""
	} catch (e) {
		errors.expiry = "Informe uma data válida (MM/AAAA)."
	}

	return Object.keys(errors).length > 0 ? errors : null
}
