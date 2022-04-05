import React from 'react'

const CardBrand = ({ cardBrand, brand }) => (
	<img
		key={brand}
		src={`https://veripagassets.blob.core.windows.net/brands/${brand}.png`}
		width="40px"
		height="23px"
		alt=""
		style={{
			marginRight: '10px',
			opacity: cardBrand === brand ? '1' : '0.3',
		}}
	/>
)

export default CardBrand
