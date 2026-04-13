import { MetadataRoute } from 'next'
import { fetchAllProductCategories } from '@/features/products/services/productsApi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aura-market.example.com'
  
  // Static routes
  const routes = ['', '/shop', '/blog', '/contact', '/order-tracking'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  try {
    // Dynamic categories
    const categories = await fetchAllProductCategories()
    const categoryRoutes = categories.map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...routes, ...categoryRoutes]
  } catch (error) {
    console.error('Sitemap generation failed for dynamic routes:', error)
    return routes
  }
}
