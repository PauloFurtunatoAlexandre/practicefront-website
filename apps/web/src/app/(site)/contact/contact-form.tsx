'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from 'lucide-react'

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSending(false)
    setSent(true)
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 rounded-2xl border border-success/20 bg-success/5 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/10">
          <CheckIcon className="size-6 text-success" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-display text-xl text-foreground">Message sent</h3>
        <p className="mt-2 text-muted-foreground">We&apos;ll get back to you within 1–2 business days.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block font-heading text-sm font-medium text-foreground mb-1.5">
            Name
          </label>
          <input
            id="name"
            required
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-heading text-sm font-medium text-foreground mb-1.5">
            Email
          </label>
          <input
            id="email"
            required
            type="email"
            name="email"
            placeholder="you@practice.com"
            autoComplete="email"
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block font-heading text-sm font-medium text-foreground mb-1.5">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          name="subject"
          placeholder="What&apos;s this about?"
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <div>
        <label htmlFor="message" className="block font-heading text-sm font-medium text-foreground mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          required
          name="message"
          rows={5}
          placeholder="Tell us what&apos;s on your mind..."
          className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-primary px-6 py-4 font-heading font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {sending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
