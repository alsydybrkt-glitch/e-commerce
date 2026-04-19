import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aura.vercel.app'
  const lastModified = new Date()

  const locales = ['en', 'ar']
  const routes = [
    '',
    '/shop',
    '/favorites',
    '/contact',
    '/blog',
    '/order-tracking',
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified,
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
      })
    }
  }

  return sitemapEntries
}
