import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type UserInfoType = {
	userInfo: DocumentData | null
}

const UserInfo = ({ userInfo }: UserInfoType) => {
	if (userInfo)
		return (
			<section className='w-full flex flex-col items-center'>
				<Image
					src={userInfo?.profile}
					alt='user profile'
					width={100}
					height={100}
					className='rounded-full '
				/>
				<h1 className='mt-2 text-3xl font-semibold'> {userInfo?.username} </h1>
				<h2 className='mt-1 text-gray-400'> {userInfo?.email} </h2>

				<div className='flex gap-2'>
					<Link
						href='/'
						className='mt-5 py-2 px-4 bg-gray-300 font-semibold rounded-full'>
						Share
					</Link>
					<Link
						href='/'
						className='mt-5 py-2 px-4 bg-gray-300 font-semibold rounded-full'>
						Edit Profile
					</Link>
				</div>
			</section>
		)
}

export default UserInfo
