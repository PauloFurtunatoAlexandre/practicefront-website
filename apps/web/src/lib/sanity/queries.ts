import { sanityClient } from './client'

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  categories: string[]
  mainImage?: {
    asset: { _ref: string }
    alt?: string
  }
  author?: {
    name: string
    image?: { asset: { _ref: string } }
  }
  body: unknown[]
  readTime?: number
}

const POST_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  categories,
  mainImage { asset, alt },
  author->{ name, image { asset } },
  readTime
`

export async function getAllPosts(): Promise<BlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ${POST_FIELDS} }`,
  )
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS}, body }`,
    { slug },
  )
}

export async function getRecentPosts(limit = 3): Promise<BlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0...$limit] { ${POST_FIELDS} }`,
    { limit },
  )
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "post" && $category in categories] | order(publishedAt desc) { ${POST_FIELDS} }`,
    { category },
  )
}
