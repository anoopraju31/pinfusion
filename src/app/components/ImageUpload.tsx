'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { HiArrowUpCircle } from 'react-icons/hi2'
import { FaTrash } from 'react-icons/fa'

const ImageUpload = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement
		const files = Array.from(target.files as FileList)
		setSelectedFile(files[0])
	}
	return (
		<div
			className={`w-full ${selectedFile ? ' h-auto' : 'h-[450px]'} rounded-lg`}>
			{selectedFile ? (
				<div className='w-full relative bg-slate-500 transition-all duration-300'>
					<div
						className='group absolute bottom-1/3 left-1 w-10 h-10 rounded-full bg-white flex justify-center items-center cursor-pointer'
						onClick={() => setSelectedFile(null)}>
						<FaTrash className=' text-[22px]' />
						<div className='p-2 w-fit bg-black text-white whitespace-nowrap text-xs rounded-md absolute -bottom-9 -right-1/2 -left-1/2 hidden group-hover:block'>
							Delete Image
						</div>
					</div>
					<Image
						src={window.URL.createObjectURL(selectedFile)}
						alt='selected-image'
						width={500}
						height={800}
						className='object-contain w-full h-full'
					/>
				</div>
			) : (
				<label
					htmlFor='image-file-input'
					className={`md:m-5 flex flex-col justify-center items-center cursor-pointer h-[90%] ${
						selectedFile
							? ''
							: 'border-[2px] border-gray-300 border-dashed rounded-lg text-gray-600 transition-all duration-300'
					}`}>
					<div className='w-full flex items-center flex-col'>
						<HiArrowUpCircle className='text-3xl' />
						<h2 className='mt-2 text-sm text-black font-semibold'>
							Click to Upload
						</h2>
					</div>
					<input
						id='image-file-input'
						type='file'
						name='Pin Image'
						className='hidden'
						onChange={handleChange}
					/>
				</label>
			)}
		</div>
	)
}

export default ImageUpload
