'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/local/container'

const systems = [
  { name: 'OpenDental',    status: 'live' },
  { name: 'Dentrix',       status: 'soon' },
  { name: 'Eaglesoft',     status: 'soon' },
  { name: 'Curve Dental',  status: 'soon' },
  { name: 'Carestream',    status: 'soon' },
  { name: 'Denticon',      status: 'soon' },
]

export function PMSLogosSection() {
  return (
    <section
      className="relative border-y border-border/40 bg-secondary/30 py-7"
      aria-label="Supported practice management systems"
    >
      <Container>
        <div className="flex flex-col items-center gap-5">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60">
            Connects to your practice management system
          </p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {systems.map(({ name, status }) => (
              <motion.div
                key={name}
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
                }}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm"
              >
                <span className="font-heading text-sm font-semibold text-foreground">{name}</span>
                {status === 'live' ? (
                  <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-success">
                    <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                    Live
                  </span>
                ) : (
                  <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                    Soon
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>

          <p className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
            Don&apos;t see yours?{' '}
            <a href="/contact" className="underline underline-offset-2 hover:text-muted-foreground transition-colors">
              Request it
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}
