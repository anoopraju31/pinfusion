'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { DocumentData } from 'firebase/firestore'

type UserInfoType = {
	userInfo: DocumentData | null
}

const UserInfo = ({ userInfo }: UserInfoType) => {
	const { data: session } = useSession()
	const handleLogout = () => {
		signOut({ callbackUrl: 'http://localhost:3000/' })
	}

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
					{session && session?.user?.email === userInfo?.email && (
						<Link
							href='/'
							className='mt-5 py-2 px-4 bg-gray-300 font-semibold rounded-full'>
							Edit Profile
						</Link>
					)}
					{session && session?.user?.email === userInfo?.email && (
						<button
							type='button'
							onClick={handleLogout}
							className='mt-5 py-2 px-4 bg-gray-300 font-semibold rounded-full'>
							{' '}
							Logout{' '}
						</button>
					)}
				</div>
			</section>
		)
}

export default UserInfo
