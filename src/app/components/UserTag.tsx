'use client'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

function UserTag() {
	const { data: session } = useSession()
	if (session)
		return (
			<div className=''>
				{session ? (
					<div className='flex gap-3 items-center'>
						<Image
							src={session?.user?.image as string}
							alt='userImage'
							width={45}
							height={45}
							className='rounded-full'
						/>
						<div>
							<h2 className='font-bold'>{session?.user?.name}</h2>
							{/* <h2 className='text-[12px]'>{session?.user?.email}</h2> */}
						</div>
					</div>
				) : null}
			</div>
		)
}

export default UserTag
