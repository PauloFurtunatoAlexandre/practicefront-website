import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'PracticeFront is completely free for dental practices. Partners pay $20–25/month per connected practice. No credit card required.',
  openGraph: {
    title: 'Pricing — Free for Dental Practices, Always',
    description:
      'PracticeFront is free for dental practices. Service providers pay $20–25/month per connected practice. That alignment is the whole point.',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
