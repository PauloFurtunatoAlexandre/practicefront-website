import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero'

export const metadata: Metadata = {
  title: 'PracticeFront — Your practice health, in a 10-second scan.',
  description:
    'PracticeFront gives dental practice owners a 10-second health scan across Patients, Scheduling, and Collections — and shows you exactly which partner to call when something\'s off. Free for practices.',
  openGraph: {
    title: 'PracticeFront — Your practice health, in a 10-second scan.',
    description:
      'Free practice health monitoring for dental practices. Monitor Patients, Scheduling, and Collections. Hold your vendors accountable.',
  },
}
import { PMSLogosSection } from '@/components/sections/pms-logos'
import { ProblemSection } from '@/components/sections/problem'
import { PillarsSection } from '@/components/sections/pillars'
import { PartnerAccountabilitySection } from '@/components/sections/partner-accountability'
import { HowItWorksSection } from '@/components/sections/how-it-works'
import { SocialProofSection } from '@/components/sections/social-proof'
import { PricingCalloutSection } from '@/components/sections/pricing-callout'
import { FinalCTASection } from '@/components/sections/final-cta'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PMSLogosSection />
      <ProblemSection />
      <PillarsSection />
      <PartnerAccountabilitySection />
      <HowItWorksSection />
      <SocialProofSection />
      <PricingCalloutSection />
      <FinalCTASection />
    </>
  )
}
