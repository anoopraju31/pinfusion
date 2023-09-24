'use client'

import { useState } from 'react'

type InputFieldPrps = {
	labelName: string
	id: string
	placeholder: string
	inputType?: string
	isTextArea?: boolean
	row?: number
	value: string
	handleChange: (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => void
	styles?: string
}

const InputField = ({
	labelName,
	id,
	placeholder,
	inputType,
	isTextArea,
	row,
	value,
	handleChange,
	styles,
}: InputFieldPrps) => {
	return (
		<div className='group'>
			{isTextArea ? (
				<textarea
					id={id}
					required
					value={value}
					rows={row}
					placeholder={placeholder}
					onChange={handleChange}
					className={`w-full outline-none my-8 py-2 border-b-2 border-b-gray-300 font-roboto text-zinc-700 placeholder:text-zinc-500 !focus:shadow-[var(--focus-shadow)] focus:border-blue-500 ${styles}`}
				/>
			) : (
				<input
					id={id}
					type={inputType}
					required
					value={value}
					placeholder={placeholder}
					onChange={handleChange}
					className={`w-full my-8 py-2 border-b-2 border-b-gray-300 font-roboto text-zinc-700 placeholder:text-zinc-500 !focus:shadow-[var(--focus-shadow)] focus:border-blue-500 outline-none ${styles}`}
				/>
			)}
			<label htmlFor={id} className='hidden'>
				{labelName}
			</label>
		</div>
	)
}

export default InputField
