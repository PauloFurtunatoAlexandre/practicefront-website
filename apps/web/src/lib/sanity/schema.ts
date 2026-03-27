// Sanity schema definitions for blog posts and newsletter

export const postSchema = {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] },
    { name: 'mainImage', title: 'Main image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt text', type: 'string' }] },
    { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }], options: { list: [{ title: 'Practice Health', value: 'practice-health' }, { title: 'Collections', value: 'collections' }, { title: 'Scheduling', value: 'scheduling' }, { title: 'Patients', value: 'patients' }, { title: 'Partners', value: 'partners' }, { title: 'Industry News', value: 'industry-news' }] } },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
    { name: 'readTime', title: 'Read time (minutes)', type: 'number' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] },
    { name: 'newsletter', title: 'Also send as newsletter', type: 'boolean', initialValue: false },
    { name: 'newsletterSentAt', title: 'Newsletter sent at', type: 'datetime', readOnly: true },
  ],
}

export const authorSchema = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Bio', type: 'text' },
  ],
}
