import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integrations',
  description:
    'PracticeFront connects to OpenDental today. Dentrix and Eaglesoft integrations are coming in 2026. See the full integration status and request support for your practice management system.',
  openGraph: {
    title: 'PracticeFront Integrations — OpenDental Live, Dentrix & Eaglesoft Coming 2026',
    description:
      'Connect your practice management system to PracticeFront. Read-only access. No patient PII leaves your network.',
  },
}

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
