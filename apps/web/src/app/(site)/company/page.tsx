import { Container } from '@/components/local/container'
import { Eyebrow, Heading, Subheading } from '@/components/local/text'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'PracticeFront gives dental practice owners a 10-second health scan. Here\'s why we built it.',
}

const beliefs = [
  {
    title: 'Owners deserve clarity.',
    description: 'You shouldn\'t need an MBA or a 30-minute analytics session to know whether your practice is healthy.',
  },
  {
    title: 'Vendors should earn their fees.',
    description: 'Every service provider connected to your practice should be willing to have their performance measured.',
  },
  {
    title: 'Free for practices is the only right model.',
    description: 'We make money when partners pay to participate. That means our incentives are aligned with yours.',
  },
  {
    title: 'Simple is harder than complex.',
    description: 'We could show you 200 metrics. We chose three pillars. That discipline is intentional.',
  },
]

export default function CompanyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background pb-20 pt-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Eyebrow>About PracticeFront</Eyebrow>
            <Heading as="h1" size="2xl" className="mt-4">
              Built for the owner who&apos;s too busy to babysit a dashboard.
            </Heading>
            <Subheading size="lg" className="mt-6">
              Most practice health tools are built for analysts. PracticeFront is built for the
              person seeing 18 patients before lunch.
            </Subheading>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-background">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg prose-headings:font-heading prose-headings:tracking-tight max-w-none">
              <h2>The origin</h2>
              <p>
                PracticeFront started with a simple observation: dental practice owners are some
                of the most diligent business owners in healthcare, but they have almost no
                real-time visibility into whether their practice is healthy.
              </p>
              <p>
                They pay a billing company, a marketing agency, a recall software, and a dozen
                other vendors — and each one sends reports on their own schedule, in their own
                format, showing their own metrics. The owner has no single place to see whether
                everything is working together.
              </p>
              <p>
                PracticeFront is the layer that connects those dots. Three pillars — Patients,
                Scheduling, Collections — monitored daily, with the accountability layer that
                shows which partner is responsible for each one.
              </p>

              <h2>Why OpenDental first</h2>
              <p>
                OpenDental is the practice management system of choice for independent practices
                that want control over their own data. That ethos aligns perfectly with ours.
                We built PracticeFront for OpenDental practices first because they&apos;re the
                ones who most value transparency and data access.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-secondary/30">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Core beliefs</Eyebrow>
            <Heading as="h2" size="xl" className="mt-4">
              What we believe.
            </Heading>
          </div>
          <div className="mx-auto mt-12 max-w-3xl grid gap-6 sm:grid-cols-2">
            {beliefs.map(({ title, description }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-heading text-base font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-background">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <Heading as="h2" size="lg">
              Want to work with us?
            </Heading>
            <p className="mt-4 text-muted-foreground">
              We&apos;re building PracticeFront in the open, with early-access practices and
              partners shaping the product. Join us.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/console/register"
                className="rounded-xl bg-primary px-6 py-3 font-heading font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-border px-6 py-3 font-heading font-semibold text-foreground hover:bg-accent transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
