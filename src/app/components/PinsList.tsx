import { DocumentData } from 'firebase/firestore'
import React from 'react'
import { PinItem } from '.'

type PinsListProps = {
	pins: DocumentData[]
}

const PinsList = ({ pins }: PinsListProps) => {
	return (
		<section className='mt-7 px-2 md:px-5 columns-2 md:columns-3 lg:columns-4 mb-4 xl:columns-5 space-y-6 mx-auto'>
			{pins.map((item, idx) => (
				<PinItem key={idx} pin={item} />
			))}
		</section>
	)
}

export default PinsList
