import request from 'superagent'

export const getviaCepUrl = (postal_code = '', handleFormikValues, inputType) => {
	if (postal_code.length === 8) {
		let next_address = request.get(`https://viacep.com.br/ws/${postal_code}/json`)
		next_address.end((err, response) => {
			if (err) {
				console.log(err)
			} else {
				const { logradouro, cep, localidade, bairro, uf } = response.body
				const address = {
					...handleFormikValues.values[`${inputType}`],
					[`${inputType}_postal_code`]: cep,
					[`${inputType}_street1`]: logradouro,
					[`${inputType}_district`]: bairro,
					[`${inputType}_state`]: uf,
					[`${inputType}_city`]: localidade
				}

				Object.keys(address).forEach(v => {
					handleFormikValues.setFieldTouched(v, true)
					handleFormikValues.setFieldValue(v, address[v])
				})
				// handleFormikValues.setFieldValue(`${inputType}`, { ...address })
			}
		})
	}
}
