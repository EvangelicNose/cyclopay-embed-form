/* eslint-disable */
const mask = (input, mask) => {
	if (!mask) throw 'Mask needed'
	if (typeof mask !== 'string') throw 'Mask must be a string'

	input = input.split('')

	return mask
		.split('')
		.reduce(
			(result, template_char) => result.concat(template_char === '9' ? input.shift() || '' : template_char),
			''
		)
}

export default mask
