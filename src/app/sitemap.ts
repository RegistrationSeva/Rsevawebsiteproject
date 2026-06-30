import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.registrationseva.com'

// Hardcoded as fallback — NEXT_PUBLIC_API_URL may not be available at runtime on self-hosted servers
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.registrationseva.com'

// NOTE: Google ignores changeFrequency and priority entirely.
// lastModified is only acted on when verifiably accurate — use real dates, not new Date() on static pages.

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

async function fetchBlogs(): Promise<BlogEntry[]> {
  // Manual timeout with AbortController — compatible with Node.js 14+
  // (AbortSignal.timeout() requires Node.js 17.3+ and crashes silently on older versions)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(`${API_URL}/api/v1/blogs?status=published&limit=500`, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      console.error(`Sitemap: API returned ${res.status} ${res.statusText}`)
      return []
    }

    const data = await res.json()
    const blogs: BlogEntry[] = data?.data?.blogs || []
    console.log(`Sitemap: fetched ${blogs.length} blog(s) from API`)
    return blogs
  } catch (error) {
    if ((error as Error)?.name === 'AbortError') {
      console.error('Sitemap: API request timed out after 10s')
    } else {
      console.error('Sitemap: failed to fetch blogs:', error)
    }
    return []
  } finally {
    clearTimeout(timer)
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/our-services/${slug}`,
    lastModified: new Date('2025-10-01'),
  }))

  const blogs = await fetchBlogs()
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug || blog.id}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : undefined,
  }))

  return [...staticPages, ...servicePages, ...blogPages]
}
