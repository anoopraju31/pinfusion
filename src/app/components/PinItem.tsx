import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { UserTag } from '.'

type PinItemType = {
	pin: DocumentData
}

const PinItem = ({ pin }: PinItemType) => {
	return (
		<div className=''>
			<Link href='/'>
				<div className='relative before:absolute before:h-full before:w-full before:rounded-3xl before:z-10 hover:before:bg-gray-600 before:opacity-50 cursor-pointer'>
					<Image
						src={pin.image}
						alt={pin.title}
						width={500}
						height={500}
						className='rounded-3xl cursor-pointer relative z-0'
					/>
				</div>
			</Link>

			<h3 className='font-bold text-[18px] mb-1 mt-2 line-clamp-2'>
				{pin.title}
			</h3>

			<UserTag />
		</div>
	)
}

export default PinItem
