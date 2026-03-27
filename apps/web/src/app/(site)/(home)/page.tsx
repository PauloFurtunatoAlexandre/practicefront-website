import { HeroSection } from '@/components/sections/hero'
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
