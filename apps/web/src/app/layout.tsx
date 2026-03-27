import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const DESCRIPTION =
  'PracticeFront gives dental practice owners a 10-second health scan across Patients, Scheduling, and Collections — and tells you exactly which partner to call when something\'s off. Free for dental practices.'

export const metadata: Metadata = {
  metadataBase: new URL('https://practicefront.com'),
  title: {
    template: '%s — PracticeFront',
    default: 'PracticeFront — Your practice health, in a 10-second scan.',
  },
  description: DESCRIPTION,
  openGraph: {
    title: 'PracticeFront',
    description: DESCRIPTION,
    siteName: 'PracticeFront',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PracticeFront',
    description: DESCRIPTION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-background text-foreground font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
