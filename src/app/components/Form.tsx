import React from 'react'
import { ImageUpload } from '.'

const Form = () => {
	return (
		<section className='p-16 bg-white rounded-2xl'>
			{/* Loading */}

			<form className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
				{/* Image Upload */}
				<ImageUpload />

				{/* User Inputs */}
			</form>
		</section>
	)
}

export default Form
