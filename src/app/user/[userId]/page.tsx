'use client'

import { useEffect, useState } from 'react'
import {
	DocumentData,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	where,
} from 'firebase/firestore'
import app from '@/app/firebase'
import { PinsList, UserInfo } from '@/app/components'

type ProfilePageProps = {
	params: {
		userId: string
	}
}

const ProfilePage = ({ params }: ProfilePageProps) => {
	const [userInfo, setUserInfo] = useState<DocumentData | null>(null)
	const [userPins, setUserPins] = useState<DocumentData[]>([])
	const db = getFirestore(app)

	useEffect(() => {
		const getUserInfo = async (email: string) => {
			const userRef = doc(db, 'user', email)
			const userSnap = await getDoc(userRef)

			if (userSnap.exists()) {
				const user = userSnap.data()
				setUserInfo(user)
				const postsQuery = query(
					collection(db, 'posts'),
					where('email', '==', user?.email),
				)
				const querySnapshot = await getDocs(postsQuery)

				querySnapshot.forEach((doc) => {
					setUserPins((prev) => [...prev, doc.data()])
				})
			} else setUserInfo(null)
		}

		if (params) getUserInfo(params.userId.replace('%40', '@'))
	}, [params, db])

	return (
		<main className='py-10'>
			{userInfo && <UserInfo userInfo={userInfo} />}

			<PinsList />
		</main>
	)
}

export default ProfilePage
