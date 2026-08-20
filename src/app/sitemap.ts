import { MetadataRoute } from 'next'
import https from 'https'
import http from 'http'

const BASE_URL = 'https://www.registrationseva.com'

// Regenerate the sitemap on the server at most hourly so newly published
// blogs appear without a rebuild, and a failed API fetch at build time
// self-heals at runtime instead of freezing an empty blog list.
export const revalidate = 3600

// Hardcoded fallback — NEXT_PUBLIC_API_URL may not be available at runtime on self-hosted servers
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

const toolSlugs = [
  'salary-slip-generator',
  'new-joiner-salary-calculator',
  'invoice-generator',
  'gst-calculator',
  'pf-esic-calculator',
  'offer-letter-generator',
  'appointment-letter-generator',
  'experience-letter-generator',
  'relieving-letter-generator',
  'quotation-generator',
  'tds-calculator',
  'full-and-final-settlement-calculator',
  'receipt-generator',
  'purchase-order-generator',
  'delivery-challan-generator',
  'credit-note-debit-note-generator',
  'rent-agreement-draft-generator',
  'board-resolution-generator',
  'nda-generator',
  'client-proposal-generator',
  'hra-calculator',
  'pdf-compressor',
  'income-tax-calculator',
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
  'alteration-in-objects-of-company',
  'change-in-director',
  'change-in-name-of-company',
  'gst-cancellation',
  'income-tax-return',
  'trademark-hearing',
]

type BlogEntry = {
  id: string
  slug?: string
  updatedAt?: string
  createdAt?: string
}

function fetchBlogsFromApi(url: string): Promise<BlogEntry[]> {
  return new Promise((resolve) => {
    const parsed = new URL(url)
    const isHttps = parsed.protocol === 'https:'
    const transport = isHttps ? https : http

    const req = transport.request(
      {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: 'GET',
        timeout: 10000,
        // api.registrationseva.com has an incomplete SSL chain (missing intermediate cert).
        // rejectUnauthorized: false is safe here — this is our own internal API over HTTPS,
        // data is still encrypted. The proper fix is to serve the full chain on the API server.
        rejectUnauthorized: false,
      },
      (res) => {
        let raw = ''
        res.on('data', (chunk: Buffer) => { raw += chunk.toString() })
        res.on('end', () => {
          try {
            const json = JSON.parse(raw)
            const blogs: BlogEntry[] = json?.data?.blogs || []
            console.log(`Sitemap: fetched ${blogs.length} blog(s) from API`)
            resolve(blogs)
          } catch {
            console.error('Sitemap: failed to parse API response')
            resolve([])
          }
        })
      }
    )

    req.on('timeout', () => {
      req.destroy()
      console.error('Sitemap: API request timed out after 10s')
      resolve([])
    })

    req.on('error', (err: Error) => {
      console.error('Sitemap: API request failed:', err.message)
      resolve([])
    })

    req.end()
  })
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/our-services/${slug}`,
    lastModified: new Date('2025-10-01'),
  }))

  const toolPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/tools`, lastModified: new Date('2026-08-12') },
    ...toolSlugs.map((slug) => ({
      url: `${BASE_URL}/tools/${slug}`,
      lastModified: new Date('2026-08-12'),
    })),
  ]

  const blogs = await fetchBlogsFromApi(
    `${API_URL}/api/v1/blogs?status=published&limit=500`
  )

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug || blog.id}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : undefined,
  }))

  return [...staticPages, ...servicePages, ...toolPages, ...blogPages]
}
