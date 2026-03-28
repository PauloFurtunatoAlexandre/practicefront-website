import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For Partners',
  description:
    'Good vendors welcome accountability. PracticeFront lets dental service providers be visible in the practices they serve. Apply to join the partner network.',
  openGraph: {
    title: 'For Partners — Good Vendors Welcome Accountability',
    description:
      'Join PracticeFront\'s partner network. Be visible in the practices you serve. Pay $20–25/month per connected practice. No revenue share.',
  },
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
