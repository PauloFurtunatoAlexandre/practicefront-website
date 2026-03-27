import { getAllPosts } from '@/lib/sanity/queries'
import { BlogGrid } from './blog-grid'
import { Container } from '@/components/local/container'
import { Eyebrow, Heading, Subheading } from '@/components/local/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practice health insights, dental business strategy, and practice management tips from the PracticeFront team.',
  openGraph: {
    title: 'Blog — PracticeFront',
    description: 'Practice health insights, dental business strategy, and practice management tips from the PracticeFront team.',
  },
}

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      {/* Header */}
      <section className="border-b border-border bg-background py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Eyebrow>The PracticeFront Blog</Eyebrow>
            <Heading as="h1" size="2xl" className="mt-4">
              Practice health, in plain language.
            </Heading>
            <Subheading size="lg" className="mt-4">
              Insights on patients, scheduling, collections, and making the vendors you pay
              actually accountable. Written for practice owners, not analysts.
            </Subheading>
          </div>
        </Container>
      </section>

      {/* Blog grid */}
      <section className="py-16 bg-background">
        <Container>
          {posts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display italic text-xl text-muted-foreground">
                First posts coming soon.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Subscribe to the newsletter to be notified when we publish.
              </p>
            </div>
          ) : (
            <BlogGrid posts={posts} />
          )}
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-border py-16 bg-secondary/30">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <Heading as="h2" size="md">
              Get posts in your inbox.
            </Heading>
            <p className="mt-2 text-muted-foreground">
              No spam. Just practice health insights when we publish.
            </p>
            <NewsletterForm />
          </div>
        </Container>
      </section>
    </>
  )
}

function NewsletterForm() {
  return (
    <form action="/api/newsletter" method="POST" className="mt-6 flex gap-3">
      <input
        type="email"
        name="email"
        required
        placeholder="you@yourpractice.com"
        className="flex-1 rounded-lg border border-border bg-card px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <button
        type="submit"
        className="rounded-lg bg-primary px-5 py-3 font-heading text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Subscribe
      </button>
    </form>
  )
}
