'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarIcon, ClockIcon, ArrowRightIcon } from 'lucide-react'
import type { BlogPost } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [featured, ...rest] = posts

  return (
    <div className="space-y-8">
      {/* Featured post */}
      {featured && (
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="group"
        >
          <Link href={`/blog/${featured.slug.current}`}>
            <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md lg:grid-cols-2">
              {featured.mainImage && (
                <div className="relative aspect-video lg:aspect-auto">
                  <Image
                    src={urlFor(featured.mainImage).width(800).height(500).url()}
                    alt={featured.mainImage.alt ?? featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2">
                  {featured.categories?.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full bg-primary/10 px-3 py-1 font-heading text-xs font-semibold text-primary"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors lg:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground font-mono">
                  {featured.publishedAt && (
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="size-3.5" />
                      {new Date(featured.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                  {featured.readTime && (
                    <span className="flex items-center gap-1">
                      <ClockIcon className="size-3.5" />
                      {featured.readTime} min read
                    </span>
                  )}
                </div>
                <div className="mt-6 flex items-center gap-2 font-heading text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  Read article <ArrowRightIcon className="size-4" />
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      )}

      {/* Rest of posts */}
      {rest.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="group"
            >
              <Link href={`/blog/${post.slug.current}`}>
                <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md h-full">
                  {post.mainImage && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={urlFor(post.mainImage).width(600).height(340).url()}
                        alt={post.mainImage.alt ?? post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap gap-1.5">
                      {post.categories?.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full bg-muted px-2.5 py-0.5 font-heading text-xs font-medium text-muted-foreground"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-3 font-heading text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground font-mono">
                      {post.publishedAt && (
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                      {post.readTime && <span>{post.readTime} min</span>}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  )
}
