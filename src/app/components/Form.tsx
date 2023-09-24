'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { ImSpinner6 } from 'react-icons/im'
import app from '../firebase'
import { ImageUpload, InputField, UserTag } from '.'

const Form = () => {
	const [form, setForm] = useState<FormType>({
		title: '',
		description: '',
		destinationLink: '',
		image: null,
	})
	const [loading, setLoading] = useState(false)
	const { data: session } = useSession()
	const router = useRouter()

	// Function to handle input change
	const handleInputChange = (
		fieldName: 'title' | 'description' | 'destinationLink' | 'image',
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		if (fieldName === 'image') {
			const target = e.target as HTMLInputElement
			const files = Array.from(target.files as FileList)
			setForm((prevForm) => ({ ...prevForm, [fieldName]: files[0] }))
		} else setForm((prevForm) => ({ ...prevForm, [fieldName]: e.target.value }))
	}

	const handleSubmit = () => {
		setLoading(true)
		const db = getFirestore(app)
		const postId = Date.now().toString()
		const storage = getStorage(app)
		const storageRef = ref(storage, form.image?.name)

		uploadBytes(storageRef, form.image as File)
			.then((snapshot) => {
				console.log('Uploaded a blob or file!')
			})
			.then((res) => {
				console.log(res)

				getDownloadURL(storageRef).then(async (url) => {
					const post = {
						title: form.title,
						description: form.description,
						link: form.destinationLink,
						image: url,
						username: session?.user?.name,
						email: session?.user?.email,
						userImage: session?.user?.image,
						id: postId,
					}

					await setDoc(doc(db, 'posts', postId), post).then((res) => {
						setLoading(false)
						router.push('/user/' + session?.user?.email)
					})
				})
			})
	}

	return (
		<section className='p-6 md:p-16 bg-white md:rounded-2xl'>
			{/* Save button & Loading */}
			<div className='flex justify-end mb-6'>
				<button
					onClick={handleSubmit}
					className='bg-red-500 p-2 text-white font-semibold px-3 rounded-lg flex items-center justify-between gap-1'>
					{loading && (
						<div className='animate-spin duration-1000 ease-in-out'>
							<span>
								<ImSpinner6 />
							</span>
						</div>
					)}
					<span>Save</span>
				</button>
			</div>

			<form className='grid grid-cols-1 lg:grid-cols-3 lg:gap-10'>
				{/* Image Upload */}
				<ImageUpload handleImageChange={setForm} />

				{/* User Inputs */}
				<div className='col-span-2'>
					<InputField
						labelName='title'
						id='title'
						placeholder='Add you title'
						inputType='text'
						value={form.title}
						handleChange={(e) => handleInputChange('title', e)}
						styles='text-2xl md:text-3xl lg:text-5xl font-extrabold'
						qoutes='Your first 40 characters are what usually show up in feed'
						idealNumberOfCharacters={100}
					/>

					<UserTag />

					<InputField
						labelName='description'
						id='description'
						placeholder='Tell everyone what your pin is about'
						isTextArea
						value={form.description}
						row={2}
						handleChange={(e) => handleInputChange('description', e)}
						styles='text-base max-h-24 overflow-auto !font-normal placeholder:font-medium'
						qoutes='People usually see the first 50 characters when they click on your pin'
						idealNumberOfCharacters={500}
					/>

					<InputField
						labelName='Destination Link'
						id='destination-link'
						placeholder='Add a Destination Link'
						inputType='url'
						value={form.destinationLink}
						handleChange={(e) => handleInputChange('destinationLink', e)}
						styles='text-base !font-normal placeholder:font-light'
					/>
				</div>
			</form>
		</section>
	)
}

export default Form
