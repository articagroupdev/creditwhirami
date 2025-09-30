import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://creditwithrami.com'),
  title: 'Credit with Rami - Business Funding & Credit Building Expert',
  description: 'Former US Business Banker specializing in business funding and credit building. 5+ years of expertise helping clients achieve exceptional credit scores and secure business financing.',
  keywords: 'business funding, credit building, credit repair, Credit with Rami, business loans, credit score improvement',
  authors: [{ name: 'Credit with Rami' }],
  creator: 'Credit with Rami',
  publisher: 'Credit with Rami',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://creditwithrami.com',
    title: 'Credit with Rami - Business Funding & Credit Building Expert',
    description: 'Former US Business Banker specializing in business funding and credit building. 5+ years of expertise helping clients achieve exceptional credit scores.',
    siteName: 'Credit with Rami',
    images: [
      {
        url: '/images/rami/rami-1.png',
        width: 1200,
        height: 630,
        alt: 'Rami - Business Funding & Credit Building Expert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit with Rami - Business Funding & Credit Building Expert',
    description: 'Former US Business Banker specializing in business funding and credit building.',
    images: ['/images/rami/rami-1.png'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="alternate icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
