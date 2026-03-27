import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import { getPostBySlug, getAllPosts } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'
import { Container } from '@/components/local/container'
import type { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="bg-background">
      {/* Back link */}
      <div className="border-b border-border">
        <Container className="py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-heading text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Blog
          </Link>
        </Container>
      </div>

      {/* Hero */}
      <div className="pt-12 pb-8">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {post.categories?.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-primary/10 px-3 py-1 font-heading text-xs font-semibold text-primary"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>

            <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground font-mono">
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="size-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="size-4" />
                  {post.readTime} min read
                </span>
              )}
            </div>

            {/* Author */}
            {post.author && (
              <div className="mt-6 flex items-center gap-3">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span className="font-heading text-sm font-semibold text-foreground">
                  {post.author.name}
                </span>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Cover image */}
      {post.mainImage && (
        <Container>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl">
            <Image
              src={urlFor(post.mainImage).width(1200).height(630).url()}
              alt={post.mainImage.alt ?? post.title}
              width={1200}
              height={630}
              className="w-full object-cover"
              priority
            />
          </div>
        </Container>
      )}

      {/* Body */}
      <Container className="py-16">
        <div className="prose prose-lg mx-auto max-w-3xl prose-headings:font-heading prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          <BlogBody body={post.body} />
        </div>
      </Container>

      {/* Back CTA */}
      <div className="border-t border-border py-12 bg-secondary/30">
        <Container>
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-heading text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeftIcon className="size-4" />
              All Posts
            </Link>
            <Link
              href="/console/register"
              className="rounded-xl bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </Container>
      </div>
    </article>
  )
}

// Simple portable text renderer (no dependency needed for basic blocks)
function BlogBody({ body }: { body: unknown[] }) {
  if (!Array.isArray(body)) return null
  return (
    <>
      {body.map((block: unknown, i) => {
        const b = block as Record<string, unknown>
        if (b._type === 'block') {
          const children = b.children as Array<{ text: string; marks?: string[] }>
          const text = children?.map((c) => c.text).join('')
          const style = b.style as string
          if (style === 'h2') return <h2 key={i}>{text}</h2>
          if (style === 'h3') return <h3 key={i}>{text}</h3>
          if (style === 'h4') return <h4 key={i}>{text}</h4>
          if (style === 'blockquote') return <blockquote key={i}>{text}</blockquote>
          return <p key={i}>{text}</p>
        }
        if (b._type === 'image' && b.asset) {
          return (
            <div key={i} className="my-8 overflow-hidden rounded-xl">
              <Image
                src={urlFor(b as Parameters<typeof urlFor>[0]).width(800).url()}
                alt={(b.alt as string) ?? ''}
                width={800}
                height={450}
                className="w-full object-cover"
              />
            </div>
          )
        }
        return null
      })}
    </>
  )
}
