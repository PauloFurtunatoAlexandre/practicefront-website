import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'PracticeFront monitors Patients, Scheduling, and Collections daily — and shows you which vendor to call when something\'s red. Free dashboard. Setup in 10 minutes on OpenDental.',
  openGraph: {
    title: 'How PracticeFront Works — 10-Second Practice Health Scan',
    description:
      'Three Pillars. Daily scores. Weekly email every Monday. See exactly what\'s working and what\'s not — without reading another 40-page billing report.',
  },
}

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
