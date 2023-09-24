'use client'

import React, { useState } from 'react'
import { ImageUpload, InputField } from '.'

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
		<section className='p-16 bg-white rounded-2xl'>
			{/* Loading */}

			<form className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
				{/* Image Upload */}
				<ImageUpload />

				{/* User Inputs */}
				<div className='col-span-2'>
					<InputField
						labelName='Pin Title'
						id='title'
						placeholder='Add you title'
						inputType='text'
						value={form.title}
						handleChange={(e) => handleInputChange('title', e)}
						styles='text-5xl font-extrabold'
					/>

					<InputField
						labelName='Description'
						id='description'
						placeholder='Tell everyone what your pin is about'
						isTextArea
						value={form.description}
						row={5}
						handleChange={(e) => handleInputChange('description', e)}
						styles='text-base max-h-24 overflow-auto !font-normal placeholder:font-medium'
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
