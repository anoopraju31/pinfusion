'use client'

import { useEffect, useState } from 'react'
import {
	DocumentData,
	collection,
	getDocs,
	getFirestore,
	query,
} from 'firebase/firestore'
import { PinsList } from './components'
import app from './firebase'

export default function Home() {
	const [pins, setPins] = useState<DocumentData>([])
	const db = getFirestore(app)

	useEffect(() => {
		const getAllPins = async () => {
			const pinsQuery = query(collection(db, 'posts'))
			const querySnapshot = await getDocs(pinsQuery)
			let pins: DocumentData[] = []

			querySnapshot.forEach((doc) => {
				pins.push(doc.data())
			})

			setPins(pins)
		}

		getAllPins()
	}, [db])
	return (
		<main>
			<PinsList pins={pins as DocumentData[]} />
		</main>
	)
}
