'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { ImageUpload, InputField, UserTag } from '.'

type FormType = {
	title: string
	description: string
	destinationLink: string
	image: File | null
}

const Form = () => {
	const [form, setForm] = useState<FormType>({
		title: '',
		description: '',
		destinationLink: '',
		image: null,
	})
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

	return (
		<section className='p-6 md:p-16 bg-white md:rounded-2xl'>
			{/* Loading */}
			<div className='mb-6 flex justify-end'>
				<button className='py-2.5 px-4 bg-red-600 rounded-xl text-white'>
					save
				</button>
			</div>

			<form className='grid grid-cols-1 lg:grid-cols-3 lg:gap-10'>
				{/* Image Upload */}
				<ImageUpload />

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
