'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MenuIcon, XIcon } from 'lucide-react'
import { LogoLockup } from './blocks-logo'
import { ThemeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/partners', label: 'For Partners' },
  { href: '/company', label: 'About' },
  { href: '/blog', label: 'Blog' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" aria-label="PracticeFront home">
            <LogoLockup />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-md px-4 py-2 font-heading text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link
              href="/console"
              className="font-heading text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <Link
              href="/console/register"
              className="rounded-lg bg-primary px-5 py-2 font-heading text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-lg text-foreground hover:bg-accent lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-6 py-6">
              <nav className="flex flex-col gap-1">
                {navLinks.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-4 py-3 font-heading font-medium text-foreground hover:bg-accent transition-colors"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/console"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-border px-4 py-3 text-center font-heading font-medium text-foreground hover:bg-accent transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/console/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-primary px-4 py-3 text-center font-heading font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
