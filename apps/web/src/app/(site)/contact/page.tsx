import { Container } from '@/components/local/container'
import { Eyebrow, Heading, Subheading } from '@/components/local/text'
import { ContactForm } from './contact-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Questions about PracticeFront, partnerships, or press? We read every message.',
  openGraph: {
    title: 'Contact — PracticeFront',
    description: 'Questions about PracticeFront, partnerships, or press? We read every message.',
  },
}

export default function ContactPage() {
  return (
    <section className="py-24 bg-background min-h-screen">
      <Container>
        <div className="mx-auto max-w-xl">
          <Eyebrow>Contact</Eyebrow>
          <Heading as="h1" size="xl" className="mt-4">Get in touch.</Heading>
          <Subheading className="mt-4">
            Questions about PracticeFront, partnerships, or press? We read every message.
          </Subheading>
          <ContactForm />
        </div>
      </Container>
    </section>
  )
}
