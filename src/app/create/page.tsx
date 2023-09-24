'use client'

import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { Form } from '../components'

const CreatePinPage = () => {
	const { data: session } = useSession()

	useEffect(() => {
		if (session === null)
			signIn('google', { callbackUrl: 'http://localhost:3000/create' })
	})

	if (session)
		return (
			<main className='min-h-screen md:p-8 px-0 md:px-[60px] lg:px-[160px] bg-[#e9e9e9]'>
				<Form />
			</main>
		)
}

export default CreatePinPage
