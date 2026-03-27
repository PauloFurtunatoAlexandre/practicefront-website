import Link from 'next/link'
import { LogoLockup } from './blocks-logo'
import { Container } from './container'

const footerLinks = {
  Product: [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/console/register', label: 'Get Started Free' },
  ],
  Partners: [
    { href: '/partners', label: 'For Partners' },
    { href: '/partners#apply', label: 'Apply to Partner' },
    { href: '/partners#pricing', label: 'Partner Pricing' },
  ],
  Company: [
    { href: '/company', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/hipaa', label: 'HIPAA Compliance' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <LogoLockup />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Practice health monitoring for dental practices. Connects to any PMS. Free for practices, always.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-1 text-xs font-mono font-medium text-success">
                ● Any PMS
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-foreground mb-4">
                {group}
              </h3>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} PracticeFront. Built for the practice owner.
          </p>
          <p className="text-xs text-muted-foreground">
            Free for dental practices · Partners pay $20–25/month
          </p>
        </div>
      </Container>
    </footer>
  )
}
