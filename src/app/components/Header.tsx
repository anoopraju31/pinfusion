'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { HiSearch, HiBell, HiChat } from 'react-icons/hi'
import { Logo } from './'
import app from '../firebase'

type NavLinkProps = {
	title: string
	link: string
	isFilled?: boolean
	isAuthLink?: boolean
}

const NavLink = ({ title, link, isFilled, isAuthLink }: NavLinkProps) => {
	const router = useRouter()
	const { data: session } = useSession()
	const handleClick = () => {
		if (session?.user) router.push('/create')
		else signIn('google', { callbackUrl: 'http://localhost:3000/create' })
	}
	return (
		<li
			className={`${
				isFilled && 'bg-black'
			} md:py-2 lg:p-3 md:px-4 lg:px-6 rounded-full h-fit flex justify-center items-center`}>
			{isAuthLink ? (
				<button
					className={`${
						isFilled ? 'text-white' : 'text-black'
					} md:text-lg lg:text-xl leading-none font-medium`}
					onClick={handleClick}>
					{' '}
					{title}{' '}
				</button>
			) : (
				<Link
					className={`${
						isFilled ? 'text-white' : 'text-black'
					} md:text-lg lg:text-xl leading-none font-medium`}
					href={link}>
					{' '}
					{title}{' '}
				</Link>
			)}
		</li>
	)
}

const SearchBox = () => (
	<>
		<HiSearch className='text-3xl text-gray-500 sm:hidden' />
		<div className='bg-[#e9e9e9] sm:py-1 lg:p-2 sm:px-4 lg:px-6 sm:gap-1 md:gap-2 lg:gap-3 items-center rounded-full w-full hidden sm:flex h-fit'>
			<HiSearch className='sm: text-xl md:text2xl lg:text-3xl  text-gray-500' />
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
	const db = getFirestore(app)

	useEffect(() => {
		const saveUserInfo = async () => {
			if (session?.user) {
				await setDoc(doc(db, 'user', session.user.email as string), {
					username: session.user.name,
					email: session.user.email,
					profile: session.user.image,
				})
			}
		}

		saveUserInfo()
	}, [session, db])

	return (
		<header className='py-2 px-4 flex gap-3 md:gap-6 justify-between items-center'>
			<Logo />

			<nav className='flex-1 flex gap-4 items-center justify-end'>
				<ul className='hidden md:flex lg:gap-2'>
					<NavLink title='Home' link='/' isFilled />
					<NavLink title='Explore' link='/explore' />
					<NavLink title='Create' link='/create' isAuthLink />
				</ul>

				<SearchBox />
				<HiBell className='text-3xl md:text-6xl text-gray-500 cursor-pointer' />
				<HiChat className='text-3xl md:text-6xl text-gray-500 cursor-pointer' />
				<Link
					href={`/user/${session?.user?.email}`}
					className='w-9 md:w-14 lg:w-16 h-9 md:h-14 lg:h-16 flex justify-center items-center'>
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
							className='px-2 py-1 font-medium text-sm rounded-full text-white bg-red-600 whitespace-nowrap'
							onClick={() => signIn()}>
							Sign In
						</button>
					)}
				</Link>
			</nav>
		</header>
	)
}

export default Header
