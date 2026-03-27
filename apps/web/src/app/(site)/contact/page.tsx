'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from 'lucide-react'
import { Container } from '@/components/local/container'
import { Eyebrow, Heading, Subheading } from '@/components/local/text'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSending(false)
    setSent(true)
  }

  return (
    <section className="py-24 bg-background min-h-screen">
      <Container>
        <div className="mx-auto max-w-xl">
          <Eyebrow>Contact</Eyebrow>
          <Heading as="h1" size="xl" className="mt-4">Get in touch.</Heading>
          <Subheading className="mt-4">
            Questions about PracticeFront, partnerships, or press? We read every message.
          </Subheading>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 rounded-2xl border border-success/20 bg-success/5 p-8 text-center"
            >
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/10">
                <CheckIcon className="size-6 text-success" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-foreground">Message sent</h3>
              <p className="mt-2 text-muted-foreground">We&apos;ll get back to you within 1–2 business days.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block font-heading text-sm font-medium text-foreground mb-1.5">Name</label>
                  <input required type="text" name="name" placeholder="Your name" className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block font-heading text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input required type="email" name="email" placeholder="you@practice.com" className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
              <div>
                <label className="block font-heading text-sm font-medium text-foreground mb-1.5">Subject</label>
                <input type="text" name="subject" placeholder="What's this about?" className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block font-heading text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea required name="message" rows={5} placeholder="Tell us what's on your mind..." className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-xl bg-primary px-6 py-4 font-heading font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-all"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
