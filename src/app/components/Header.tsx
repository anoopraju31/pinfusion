'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'
import { HiSearch, HiBell, HiChat } from 'react-icons/hi'
import { Logo } from './'

type NavLinkProps = {
	title: string
	link: string
	isFilled?: boolean
}

const NavLink = ({ title, link, isFilled }: NavLinkProps) => (
	<li
		className={`${
			isFilled && 'bg-black'
		} p-3 px-6 rounded-full h-fit hidden md:flex justify-center items-center`}>
		<Link
			className={`${
				isFilled ? 'text-white' : 'text-black'
			} text-xl leading-none font-medium`}
			href={link}>
			{' '}
			{title}{' '}
		</Link>
	</li>
)

const SearchBox = () => (
	<>
		<HiSearch className='text-xl text-gray-500 sm:hidden' />
		<div className='bg-[#e9e9e9] py-2 px-6 gap-3 items-center rounded-full w-full hidden sm:flex h-fit'>
			<HiSearch className='text-3xl  text-gray-500' />
			<input
				type='text'
				placeholder='Search'
				className='bg-transparent outline-none w-full text-xl'
			/>
		</div>
	</>
)

const Header = () => {
	const { data: session } = useSession()
	return (
		<header className='py-2 px-4 flex gap-3 md:gap-2 justify-between items-center'>
			<Logo />

			<nav className='flex-1 flex gap-3 items-center justify-end'>
				<ul className='flex gap-2'>
					<NavLink title='Home' link='/' isFilled />
					<NavLink title='Explore' link='/explore' />
					<NavLink title='Create' link='/create' />
				</ul>

				<SearchBox />
				<HiBell className='text-2xl md:text-5xl text-gray-500 cursor-pointer' />
				<HiChat className='text-2xl md:text-5xl text-gray-500 cursor-pointer' />
				<Link
					href={`/${session?.user?.name}`}
					className='w-10 md:w-14 lg:w-16 h-10 md:h-14 lg:h-16 flex justify-center items-center'>
					{session ? (
						<Image
							src={session?.user?.image as string}
							alt='user-profile'
							width={60}
							height={60}
							className='hover:bg-gray-300 rounded-full cursor-pointer object-cover'
						/>
					) : (
						<button
							className='p-2 px-4 font-semibold rounded-full'
							onClick={() => signIn()}>
							Login
						</button>
					)}
				</Link>
			</nav>
		</header>
	)
}

export default Header
