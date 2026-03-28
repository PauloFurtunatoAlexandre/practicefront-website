import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For Partners',
  description:
    'If your dental service actually works, PracticeFront will prove it. Join the partner marketplace free — get a verified performance scorecard and qualified leads from practices that need what you do.',
  openGraph: {
    title: 'For Partners — Good Vendors Welcome Accountability',
    description:
      'PracticeFront connects dental service providers to practices through verified, data-backed performance scores. Free to join. Apply today.',
  },
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
