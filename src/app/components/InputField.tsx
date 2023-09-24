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
	qoutes?: string
	idealNumberOfCharacters?: number
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
	qoutes,
	idealNumberOfCharacters,
}: InputFieldPrps) => {
	const [numberOfCharacters, setNumberOfCharacters] = useState<number>(
		idealNumberOfCharacters ? idealNumberOfCharacters : 0,
	)

	const inputChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		if (idealNumberOfCharacters)
			setNumberOfCharacters(idealNumberOfCharacters - e.target.value.length)
		handleChange(e)
	}

	return (
		<div className='my-8 group'>
			<label htmlFor={id} className=' group'>
				{isTextArea ? (
					<textarea
						id={id}
						required
						value={value}
						rows={row}
						placeholder={placeholder}
						onChange={inputChange}
						className={`w-full outline-none py-2 border-b-2 border-b-gray-300 font-roboto text-zinc-700 placeholder:text-zinc-500 !focus:shadow-[var(--focus-shadow)] focus:border-blue-500 ${styles}`}
					/>
				) : (
					<input
						id={id}
						type={inputType}
						required
						value={value}
						placeholder={placeholder}
						onChange={inputChange}
						className={`w-full py-2 border-b-2 border-b-gray-300 font-roboto text-zinc-700 placeholder:text-zinc-500 !focus:shadow-[var(--focus-shadow)] focus:border-blue-500 outline-none ${styles}`}
					/>
				)}
				<span className='hidden'>{labelName}</span>
				{qoutes && (
					<p
						className={`mt-1.5 text-xs invisible  group-focus-within:visible ${
							numberOfCharacters >= 0 ? 'text-zinc-700' : 'text-red-600'
						} flex justify-between items-center`}>
						<span className=''>
							{' '}
							{numberOfCharacters >= 0
								? qoutes
								: `Ooops! This ${labelName} is getting long. Try trimming it down`}{' '}
						</span>
						<span> {numberOfCharacters} </span>
					</p>
				)}
			</label>
		</div>
	)
}

export default InputField
