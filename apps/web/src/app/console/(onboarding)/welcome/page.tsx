import type { Metadata } from 'next'
import { OnboardingWizard } from './onboarding-wizard'

export const metadata: Metadata = {
  title: 'Set Up Your Practice',
}

export default function WelcomePage() {
  return <OnboardingWizard />
}
