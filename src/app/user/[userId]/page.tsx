'use client'
import { UserInfo } from '@/app/components'
import app from '@/app/firebase'
import { DocumentData, doc, getDoc, getFirestore } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

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
		<main>
			<UserInfo />
		</main>
	)
}

export default ProfilePage
