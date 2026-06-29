import { MetadataRoute } from 'next'
import axios from 'axios'

const BASE_URL = 'https://www.registrationseva.com'

// Revalidate every hour — new blogs appear in sitemap within 1 hour
export const revalidate = 3600

// NOTE: Google ignores changeFrequency and priority entirely.
// lastModified is only acted on when verifiably accurate — use real dates, not new Date() for static pages.

// Approximate last-content-change dates for static pages
const staticPages: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, lastModified: new Date('2025-10-01') },
  { url: `${BASE_URL}/about-us`, lastModified: new Date('2025-10-01') },
  { url: `${BASE_URL}/our-services`, lastModified: new Date('2025-10-01') },
  { url: `${BASE_URL}/contact-us`, lastModified: new Date('2025-10-01') },
  { url: `${BASE_URL}/blog` },
  { url: `${BASE_URL}/privacy-policy`, lastModified: new Date('2025-10-01') },
  { url: `${BASE_URL}/refund-policy`, lastModified: new Date('2025-10-01') },
  { url: `${BASE_URL}/satisfaction-guarantee`, lastModified: new Date('2025-10-01') },
  { url: `${BASE_URL}/terms-and-conditions`, lastModified: new Date('2025-10-01') },
]

const serviceSlugs = [
  'private-limited-company',
  'section-8-company',
  'partnership-firm',
  'proprietorship-registration',
  'gst-registration-india',
  'response-to-income-tax-notices',
  'response-to-gst-notice',
  'msme-or-udyam-registration',
  'startup-india-registration',
  'functional-certificate-with-noida-authority',
  'fssai-registration',
  'iec-code-registration',
  'niti-aayog-registration',
  'trademark-registration',
  'trademark-objection',
  'trademark-renewal',
  'trademark-transfer',
  'trademark-opposition',
  'annual-compliance-private-limited-company',
  'change-in-share-capital',
  'change-in-registered-office-address',
]

type BlogEntry = {
  id: string
  slug?: string
  updatedAt?: string
  createdAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/our-services/${slug}`,
    lastModified: new Date('2025-10-01'),
  }))

  let blogPages: MetadataRoute.Sitemap = []
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (apiUrl) {
      const response = await axios.get(
        `${apiUrl}/api/v1/blogs?status=published&limit=500`,
        { timeout: 10000 }
      )
      const blogs: BlogEntry[] = response.data?.data?.blogs || []
      // Blog updatedAt is accurate — Google will use this to detect content freshness
      blogPages = blogs.map((blog) => ({
        url: `${BASE_URL}/blog/${blog.slug || blog.id}`,
        lastModified: blog.updatedAt ? new Date(blog.updatedAt) : undefined,
      }))
    }
  } catch (error) {
    console.error('Sitemap: failed to fetch blogs from API:', error)
  }

  return [...staticPages, ...servicePages, ...blogPages]
}
