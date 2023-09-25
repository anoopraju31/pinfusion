import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { GrFormUpload } from 'react-icons/gr'
import { FiArrowUpRight } from 'react-icons/fi'

type PinItemType = {
	pin: DocumentData
}

const PinItem = ({ pin }: PinItemType) => {
	return (
		<div className=''>
			<Link href={`/pins/${pin.id}`}>
				<div className='group relative cursor-pointer'>
					{/* Pin Image */}
					<Image
						src={pin.image}
						alt={pin.title}
						width={500}
						height={500}
						className='rounded-3xl cursor-pointer relative z-0'
					/>
					{/* Save Button */}
					<button className='absolute top-3 right-3 hidden group-hover:block px-2 py-1 font-medium text-sm rounded-full text-white bg-red-600 whitespace-nowrap'>
						Save
					</button>

					<div className='absolute bottom-3 right-3 hidden group-hover:flex items-center justify-end gap-2'>
						{/* Destination Link */}
						<a
							href={pin.link}
							className='py-1 px-2 bg-white rounded-3xl text-sm font-medium flex items-center gap-2'>
							<FiArrowUpRight />
							<span className='w-24 truncate'>{pin.link}</span>
						</a>
						{/* Share Button */}
						<button className='p-1 rounded-full bg-white text-2xl'>
							<GrFormUpload />
						</button>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default PinItem
