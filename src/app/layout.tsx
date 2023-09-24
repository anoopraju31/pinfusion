import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from './components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'PinFusion - A Pinterest Clone',
	description: 'A Pinterest Clone build using Next.js',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Header />
				{children}
			</body>
		</html>
	)
}
