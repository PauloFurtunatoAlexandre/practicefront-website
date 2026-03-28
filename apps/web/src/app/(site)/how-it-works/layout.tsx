import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'PracticeFront connects to your practice management system in under 10 minutes — read-only, no data migration. See how Three Pillars monitoring works.',
  openGraph: {
    title: 'How PracticeFront Works — Under 10 Minutes to Your First Health Scan',
    description:
      'Connect your PMS, get daily pillar scores, and know exactly which partner to call when something\'s off. Free for dental practices.',
  },
}

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
