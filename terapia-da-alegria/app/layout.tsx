import type { Metadata, Viewport } from 'next'
import { Poppins, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins"
})

const caveat = Caveat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat"
})

export const metadata: Metadata = {
  title: 'Terapia da Alegria',
  description: 'A Terapia da Alegria é uma associação sem fins lucrativos que leva alegria e bem-estar aos pacientes internados em hospitais através da linguagem do palhaço.',
  keywords: ['terapia da alegria', 'doutores palhaços', 'hospital', 'voluntariado', 'maringá', 'palhaçaria'],
  authors: [{ name: 'Terapia da Alegria' }],
  openGraph: {
    title: 'Terapia da Alegria',
    type: 'website',
    locale: 'pt_BR',
  },
  icons: {
    icon: '/images/s_logo.png',
    apple: '/images/s_logo.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#E63946',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
