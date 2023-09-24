'use client'

import { useEffect, useState } from 'react'
import { DocumentData, doc, getDoc, getFirestore } from 'firebase/firestore'
import app from '@/app/firebase'
import { UserInfo } from '@/app/components'

type ProfilePageProps = {
	params: {
		userId: string
	}
}

const ProfilePage = ({ params }: ProfilePageProps) => {
	const [userInfo, setUserInfo] = useState<DocumentData | null>(null)
	const db = getFirestore(app)

	useEffect(() => {
		const getUserInfo = async (email: string) => {
			const userRef = doc(db, 'user', email)
			const userSnap = await getDoc(userRef)

			setUserInfo(userSnap.exists() ? userSnap.data() : null)
		}

		if (params) getUserInfo(params.userId.replace('%40', '@'))
	}, [params, db])

	return (
		<main className='py-10'>
			<UserInfo userInfo={userInfo} />
		</main>
	)
}

export default ProfilePage
