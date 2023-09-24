import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header, Provider } from './components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'PinFusion - A Pinterest Clone',
	description: 'A Pinterest Clone build using Next.js',
}

type LayoutProps = {
	children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Provider>
					<Header />
					{children}
				</Provider>
			</body>
		</html>
	)
}
