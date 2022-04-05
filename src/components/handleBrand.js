import { getBrand } from '../core/cards-utils'

export const handleBrand = async (number, formikProps) => {
	const newbrand = await getBrand(number)
	formikProps.setFieldValue(`cc_brand`, newbrand)
}
