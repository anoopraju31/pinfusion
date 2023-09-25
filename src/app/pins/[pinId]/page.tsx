'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DocumentData, doc, getDoc, getFirestore } from 'firebase/firestore'
import { HiArrowSmallLeft } from 'react-icons/hi2'
import app from '@/app/firebase'
import { PinImage, UserTag } from '@/app/components'
import Image from 'next/image'

type PinDetailsPageProps = {
	params: {
		pinId: string
	}
}

const PinDeatailsPage = ({ params }: PinDetailsPageProps) => {
	const [pinDetails, setPinDetails] = useState<DocumentData | null>(null)
	const router = useRouter()
	const db = getFirestore(app)

	useEffect(() => {
		const getPinDetails = async () => {
			const pinRef = doc(db, 'posts', params.pinId)
			const pinSnap = await getDoc(pinRef)

			setPinDetails(pinSnap.exists() ? pinSnap.data() : null)
		}

		getPinDetails()
	}, [params, db])

	if (pinDetails)
		return (
			<main className=' bg-white p-3 md:p-12 rounded-2xl md:px-24 lg:px-36'>
				<HiArrowSmallLeft
					className='text-[60px] font-bold ml-[-50px] cursor-pointer hover:bg-gray-200 rounded-full p-2 '
					onClick={() => router.back()}
				/>
				<div className='grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16 '>
					{/* Pin Image */}
					<div>
						<Image
							src={pinDetails.image}
							alt={pinDetails.title}
							width={500}
							height={600}
							className='rounded-2xl'
						/>
					</div>

					{/* Pin Details */}
					<div>
						<h2 className='text-[30px] font-bold mb-10'>{pinDetails.title}</h2>
						<UserTag />
						<h2 className='mt-10'>{pinDetails.desc}</h2>
						<button
							className='p-2 bg-[#e9e9e9] px-5 text-[23px] mt-10 rounded-full hover:scale-105 transition-all'
							onClick={() => window.open(pinDetails.link)}>
							Open Url
						</button>
					</div>
				</div>
			</main>
		)
}

export default PinDeatailsPage
