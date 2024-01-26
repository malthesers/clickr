import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import UpgradesProvider from '@/context/ContextProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'clickr',
  description: 'clickr description',
  keywords: ['idle', 'clicker', 'game'],
  authors: { name: 'Malthesers (Malthe Kusk Lauritsen)', url: 'https://malthesers.github.io/' },
  creator: 'Malthesers',
  openGraph: {
    title: 'clickr',
    description: 'clickr description'
    // url: 'https://diable-3.vercel.app/',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
  colorScheme: 'dark'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <UpgradesProvider>{children}</UpgradesProvider>
      </body>
    </html>
  )
}
