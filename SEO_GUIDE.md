# Next.js App Router — SEO Implementation Guide

> Based on what we implemented on **registrationseva.com**. Everything here is production-verified and backed by Google's own documentation.

---

## Table of Contents

1. [Project Structure Overview](#1-project-structure-overview)
2. [Metadata — The Foundation](#2-metadata--the-foundation)
3. [Open Graph & Twitter Cards](#3-open-graph--twitter-cards)
4. [Canonical URLs](#4-canonical-urls)
5. [JSON-LD Structured Data (Schemas)](#5-json-ld-structured-data-schemas)
6. [Dynamic Sitemap](#6-dynamic-sitemap)
7. [Robots.txt](#7-robotstxt)
8. [Middleware — Domain & URL Cleanup](#8-middleware--domain--url-cleanup)
9. [Page-by-Page Checklist](#9-page-by-page-checklist)
10. [Common Mistakes to Avoid](#10-common-mistakes-to-avoid)
11. [Google Search Console Setup](#11-google-search-console-setup)

---

## 1. Project Structure Overview

```
src/
├── app/
│   ├── layout.tsx          ← Root metadata + site-wide defaults
│   ├── page.tsx            ← Homepage + Organization/FAQPage JSON-LD
│   ├── sitemap.ts          ← Dynamic sitemap (auto-served at /sitemap.xml)
│   ├── robots.ts           ← Robots.txt (auto-served at /robots.txt)
│   ├── blog/
│   │   └── [id]/
│   │       └── page.tsx    ← BlogPosting JSON-LD + canonical per post
│   └── our-services/
│       └── [slug]/
│           └── page.tsx    ← Service + BreadcrumbList + FAQPage JSON-LD
src/
└── middleware.ts            ← Domain redirect + spam URL cleanup
```

**Key rule:** All metadata and JSON-LD must be in **Server Components** (`page.tsx`, `layout.tsx`). Never in `"use client"` components — Google's AI crawlers don't execute JavaScript.

---

## 2. Metadata — The Foundation

### Root Layout (site-wide defaults)

Every page that doesn't set its own metadata will inherit from here.

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  // Always set metadataBase — it makes all relative image/URL paths absolute automatically
  metadataBase: new URL("https://www.yourdomain.com"),

  // Fallback title and description for pages that don't set their own
  title: "Your Brand Name",
  description: "A clear one-sentence description of what your site does.",
};
```

**Why `metadataBase` matters:** Without it, relative paths like `/logo.jpg` in og:image won't resolve to a full URL, breaking social previews.

---

### Individual Page Metadata

```typescript
// src/app/about-us/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  // Keep titles under 60 characters — Google truncates beyond that
  title: "About Us | Your Brand Name",

  // Keep descriptions 120–160 characters
  description: "Learn about Your Brand, helping entrepreneurs with business registration since 2016.",

  // Point to yourself — prevents duplicate content issues
  alternates: {
    canonical: "https://www.yourdomain.com/about-us",
  },

  // Always include an og:image on every page
  openGraph: {
    title: "About Us | Your Brand Name",
    description: "Learn about Your Brand...",
    type: "website",
    url: "https://www.yourdomain.com/about-us",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Your Brand" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Us | Your Brand Name",
    description: "Learn about Your Brand...",
    images: ["/og-image.jpg"],
  },
};
```

### Dynamic Pages (e.g. blog posts)

```typescript
// src/app/blog/[id]/page.tsx
import type { Metadata } from "next";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPost(params.id); // your API call

  if (!post) {
    return {
      title: "Blog - Your Brand",
      alternates: { canonical: "https://www.yourdomain.com/blog" },
    };
  }

  return {
    title: `${post.title} - Your Brand`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.yourdomain.com/blog/${params.id}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `https://www.yourdomain.com/blog/${params.id}`,
      publishedTime: post.createdAt,   // ISO date string
      modifiedTime: post.updatedAt,    // ISO date string
      authors: [post.author.name],
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}
```

---

## 3. Open Graph & Twitter Cards

These control how your pages look when shared on WhatsApp, LinkedIn, Twitter, Facebook.

### Required fields for every page

| Field | Required | Value |
|-------|----------|-------|
| `og:title` | Yes | Page title |
| `og:description` | Yes | Page description |
| `og:image` | Yes | Absolute URL, 1200×630px recommended |
| `og:type` | Yes | `website` for pages, `article` for blog posts |
| `og:url` | Yes | Canonical URL of the page |
| `twitter:card` | Yes | `summary_large_image` |

### Image requirements
- **Minimum size:** 600×315px
- **Recommended:** 1200×630px
- **Format:** JPG or PNG
- **Max file size:** Under 1MB
- Must be an **absolute URL** (e.g., `https://www.yourdomain.com/og.jpg`)

### For blog posts — use `article` type

```typescript
openGraph: {
  type: "article",           // not "website" for blog posts
  publishedTime: post.createdAt,
  modifiedTime: post.updatedAt,
  authors: [post.author.name],
}
```

---

## 4. Canonical URLs

Canonical tags tell Google "this is the one true URL for this content." Critical for preventing duplicate content penalties.

### Rules

1. **Always use `www`** (or always non-www) — pick one and be consistent
2. **Always use `https`**
3. Every page must have its own canonical pointing to itself
4. Use `alternates.canonical` in Next.js metadata — it auto-generates the `<link rel="canonical">` tag

```typescript
// In every page's metadata
alternates: {
  canonical: "https://www.yourdomain.com/your-page-path",
},
```

### For dynamic pages

```typescript
// Service detail page
const canonicalUrl = `https://www.yourdomain.com/our-services/${params.slug}`;
alternates: { canonical: canonicalUrl },
openGraph: { url: canonicalUrl },
```

---

## 5. JSON-LD Structured Data (Schemas)

Structured data helps Google show rich results (FAQ dropdowns, breadcrumbs, article info, knowledge panels). This is the **biggest SEO lever** most sites miss.

### ⚠️ Critical Rule

**Always render JSON-LD in Server Components using native `<script>` tags — never use `next/script`.**

Reason: AI crawlers (GPTBot, Googlebot, CCBot) don't execute JavaScript. If your JSON-LD is only rendered client-side, crawlers can't see it.

```typescript
// ✅ CORRECT — in page.tsx (Server Component)
export default function Page() {
  const schema = { "@context": "https://schema.org", ... };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <YourPageContent />
    </>
  );
}
```

```typescript
// ❌ WRONG — in a "use client" component
"use client"
// JSON-LD here is invisible to crawlers
```

---

### Schema 1: Organization (Homepage)

Put this on your homepage. It powers your **Google Knowledge Panel** and the **logo in search results**.

```typescript
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": "https://www.yourdomain.com/#organization",
  name: "Your Company Name",
  legalName: "Your Legal Company Name",
  url: "https://www.yourdomain.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.yourdomain.com/logo.jpg",
    width: 1024,
    height: 512,
  },
  description: "What your company does in one sentence.",
  foundingDate: "2016-10-06",         // when your company was founded
  address: {
    "@type": "PostalAddress",
    addressLocality: "Your City",
    addressRegion: "Your State",
    addressCountry: "IN",             // ISO 2-letter country code
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/your-company",
    "https://twitter.com/yourhandle",
  ],
};
```

---

### Schema 2: WebSite (Homepage)

Tells Google your site name and enables sitelinks search in search results.

```typescript
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.yourdomain.com/#website",
  url: "https://www.yourdomain.com",
  name: "Your Brand Name",
  description: "Short description of your site.",
  publisher: {
    "@id": "https://www.yourdomain.com/#organization",
  },
  inLanguage: "en-IN",  // use your language code: en-US, en-IN, hi-IN, etc.
};
```

---

### Schema 3: Service (Service Pages)

Use on each service/product page.

```typescript
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Limited Company Registration",
  description: "Your service description...",
  url: "https://www.yourdomain.com/our-services/private-limited-company",
  provider: {
    "@type": "Organization",
    "@id": "https://www.yourdomain.com/#organization",
    name: "Your Company Name",
    url: "https://www.yourdomain.com",
  },
  areaServed: { "@type": "Country", name: "India" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://www.yourdomain.com/our-services/private-limited-company",
  },
};
```

---

### Schema 4: BreadcrumbList (Service & Blog Pages)

Powers the breadcrumb trail shown under your page title in Google results.

```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yourdomain.com" },
    { "@type": "ListItem", position: 2, name: "Our Services", item: "https://www.yourdomain.com/our-services" },
    { "@type": "ListItem", position: 3, name: "Private Limited Company", item: "https://www.yourdomain.com/our-services/private-limited-company" },
  ],
};
```

---

### Schema 5: FAQPage (Homepage & Service Pages)

If your page has a FAQ section, this puts the Q&A directly in Google results (massive CTR boost).

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does company registration take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Private Limited Companies typically take 7-15 days...",
      },
    },
    {
      "@type": "Question",
      name: "What documents are required?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Required documents include identity proof, address proof...",
      },
    },
  ],
};
```

---

### Schema 6: BlogPosting (Blog Detail Pages)

For blog/article pages. Enables article rich results in Google.

```typescript
// In the Server Component (page.tsx), after fetching blog data
const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: blog.title,
  description: blog.excerpt,
  image: blog.coverImage || "https://www.yourdomain.com/og-default.jpg",
  url: `https://www.yourdomain.com/blog/${blog.slug}`,
  datePublished: blog.createdAt,    // ISO date: "2025-06-15T10:00:00Z"
  dateModified: blog.updatedAt,     // ISO date
  author: {
    "@type": "Person",
    name: blog.author.name,
  },
  publisher: {
    "@type": "Organization",
    "@id": "https://www.yourdomain.com/#organization",
    name: "Your Brand Name",
    logo: { "@type": "ImageObject", url: "https://www.yourdomain.com/logo.jpg" },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://www.yourdomain.com/blog/${blog.slug}`,
  },
  articleSection: blog.category?.name || "Business",
  inLanguage: "en-IN",
};
```

### How to inject multiple schemas on one page

```typescript
export default async function ServicePage({ params }) {
  const service = getService(params.slug);

  return (
    <>
      {/* Inject multiple schema scripts — each as a separate script tag */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {hasFaq && (
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <ServiceDetailClient serviceData={service} />
    </>
  );
}
```

---

## 6. Dynamic Sitemap

Next.js App Router auto-serves `src/app/sitemap.ts` at `/sitemap.xml`.

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from "next";
import https from "https";
import http from "http";

const BASE_URL = "https://www.yourdomain.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.yourdomain.com";

// Static pages — use REAL dates (when content was last genuinely changed)
// ⚠️ Do NOT use new Date() for static pages — Google detects fake dates and ignores lastmod
const staticPages: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, lastModified: new Date("2025-10-01") },
  { url: `${BASE_URL}/about-us`, lastModified: new Date("2025-10-01") },
  { url: `${BASE_URL}/our-services`, lastModified: new Date("2025-10-01") },
  { url: `${BASE_URL}/contact-us`, lastModified: new Date("2025-10-01") },
  { url: `${BASE_URL}/blog` }, // no lastModified — changes every time a post is added
];

type BlogEntry = { id: string; slug?: string; updatedAt?: string };

// Fetch blogs using Node.js https module (not fetch) — gives full SSL control
function fetchBlogsFromApi(url: string): Promise<BlogEntry[]> {
  return new Promise((resolve) => {
    const parsed = new URL(url);
    const transport = parsed.protocol === "https:" ? https : http;

    const req = transport.request(
      {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: "GET",
        timeout: 10000,
        // Set false if your API has SSL chain issues
        // Set true in production for proper SSL enforcement
        rejectUnauthorized: process.env.NODE_ENV !== "development",
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => { raw += chunk.toString(); });
        res.on("end", () => {
          try {
            const json = JSON.parse(raw);
            resolve(json?.data?.blogs || []);
          } catch {
            resolve([]);
          }
        });
      }
    );

    req.on("timeout", () => { req.destroy(); resolve([]); });
    req.on("error", () => resolve([]));
    req.end();
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await fetchBlogsFromApi(
    `${API_URL}/api/v1/blogs?status=published&limit=500`
  );

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug || blog.id}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : undefined,
    // updatedAt from your API is accurate — Google uses this to detect freshness
  }));

  return [...staticPages, ...blogPages];
}
```

### Key rules for sitemaps

| Rule | Why |
|------|-----|
| Do NOT use `new Date()` for static pages | Google detects fake dates and ignores `lastmod` entirely |
| Use real `updatedAt` from your API for blogs | Google uses accurate `lastmod` to decide when to re-crawl |
| Skip `changeFrequency` and `priority` | Google officially ignores both — they're noise |
| Keep under 50,000 URLs per sitemap | Google's limit — use sitemap index for larger sites |
| Always use absolute URLs with `https://www.` | Matches your canonical domain |

---

## 7. Robots.txt

Next.js serves `src/app/robots.ts` at `/robots.txt` automatically.

```typescript
// src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",   // Next.js internal files
          "/api/",     // API routes — no need to crawl
        ],
      },
    ],
    // Always point to your canonical sitemap URL
    sitemap: "https://www.yourdomain.com/sitemap.xml",
  };
}
```

---

## 8. Middleware — Domain & URL Cleanup

Creates a single canonical version of your site. Goes in `src/middleware.ts`.

```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// These query params create duplicate "pages" that get indexed separately
// e.g. /?ref=twitter, /?mode=list, /?trk=linkedin — strip them
const STRIP_PARAMS = ["s", "trk", "ref", "mode", "utm_source", "utm_medium", "utm_campaign"];

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { nextUrl } = request;

  // 1. Redirect non-www → www (canonical domain enforcement)
  if (host === "yourdomain.com") {
    const canonical = new URL(request.url);
    canonical.protocol = "https:";
    canonical.host = "www.yourdomain.com";
    return NextResponse.redirect(canonical, { status: 301 });
  }

  // 2. Strip tracking/spam query params → clean URL
  //    Prevents /?ref=pitchwall and /?ref=linkedin from being indexed as separate pages
  const hasSpamParam = STRIP_PARAMS.some((p) => nextUrl.searchParams.has(p));
  if (hasSpamParam) {
    const clean = new URL(nextUrl.pathname, "https://www.yourdomain.com");
    return NextResponse.redirect(clean, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.jpg|sitemap.xml|robots.txt).*)"],
};
```

---

## 9. Page-by-Page Checklist

Use this when building any new page.

### Every page must have:
- [ ] `title` — under 60 characters
- [ ] `description` — 120–160 characters
- [ ] `alternates.canonical` — full `https://www.` URL
- [ ] `openGraph.title` + `openGraph.description` + `openGraph.image` + `openGraph.url`
- [ ] `twitter.card: "summary_large_image"` + `twitter.title` + `twitter.images`

### Homepage additionally needs:
- [ ] `Organization` JSON-LD
- [ ] `WebSite` JSON-LD
- [ ] `FAQPage` JSON-LD (if you have a FAQ section)
- [ ] `LocalBusiness` JSON-LD (if you have a physical location/service area)

### Service/product pages additionally need:
- [ ] `Service` JSON-LD
- [ ] `BreadcrumbList` JSON-LD
- [ ] `FAQPage` JSON-LD (if the page has an FAQ section)

### Blog list page:
- [ ] Standard metadata + canonical
- [ ] No special schema needed

### Blog detail pages additionally need:
- [ ] `BlogPosting` JSON-LD with `datePublished`, `dateModified`, `author`, `publisher`
- [ ] `openGraph.type: "article"` with `publishedTime` and `modifiedTime`
- [ ] `BreadcrumbList` JSON-LD

---

## 10. Common Mistakes to Avoid

### Mistake 1: JSON-LD in Client Components

```typescript
// ❌ WRONG — crawlers can't see this
"use client";
export default function ServiceClient({ data }) {
  return (
    <>
      <script type="application/ld+json" ... />  {/* invisible to crawlers */}
    </>
  );
}

// ✅ CORRECT — put it in the Server Component wrapper
// page.tsx (no "use client")
export default function ServicePage({ params }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ServiceClient data={...} />  {/* client component is fine for UI */}
    </>
  );
}
```

---

### Mistake 2: Non-www and www mixing

```typescript
// ❌ WRONG — mixing causes duplicate content
canonical: "https://registrationseva.com"   // page 1
canonical: "https://www.registrationseva.com" // page 2
// Google sees these as 2 separate sites competing with each other

// ✅ CORRECT — pick one, use it everywhere
canonical: "https://www.yourdomain.com/page"  // always www
```

---

### Mistake 3: Empty or missing description in root layout

```typescript
// ❌ WRONG — pages without their own description get an empty one
export const metadata: Metadata = {
  description: "",  // empty fallback = Google picks random text
};

// ✅ CORRECT
export const metadata: Metadata = {
  description: "A real description that works as a fallback for all pages.",
};
```

---

### Mistake 4: Fake lastModified dates in sitemap

```typescript
// ❌ WRONG — claims every page was updated right now, every crawl
{ url: `${BASE_URL}/about-us`, lastModified: new Date() }

// ✅ CORRECT — use the real date the page content last changed
{ url: `${BASE_URL}/about-us`, lastModified: new Date("2025-10-01") }

// ✅ CORRECT for dynamic content — use actual updatedAt from your database
{ url: `${BASE_URL}/blog/${post.slug}`, lastModified: new Date(post.updatedAt) }
```

---

### Mistake 5: Relative image URLs in OG tags

```typescript
// ❌ WRONG — breaks social previews, WhatsApp won't show image
images: [{ url: "/logo.jpg" }]  // relative path fails

// ✅ CORRECT — if metadataBase is set, Next.js auto-resolves this
// Make sure metadataBase is set in layout.tsx:
metadataBase: new URL("https://www.yourdomain.com")
// Then relative paths work:
images: [{ url: "/logo.jpg" }]  // resolved to https://www.yourdomain.com/logo.jpg
```

---

### Mistake 6: Title too long

```
❌ "About Us | Registration SEVA – Business, Trademark & Compliance"  (67 chars)
✅ "About Registration SEVA | Business & Compliance Experts"          (55 chars)
```

Google truncates titles beyond ~60 characters in search results. Keep it tight.

---

## 11. Google Search Console Setup

After deploying, do these in order:

### Step 1: Verify your site

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → URL prefix → `https://www.yourdomain.com`
3. Verify via HTML meta tag (add to `layout.tsx`):

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  verification: {
    google: "your-verification-code-here",
  },
};
```

### Step 2: Submit your sitemap

1. In Search Console → Sitemaps
2. Add `https://www.yourdomain.com/sitemap.xml`
3. Click Submit
4. Wait 24–48 hours for Google to crawl it

### Step 3: Test your schemas

1. Go to [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
2. Enter any page URL
3. Confirm it detects: FAQPage, Service, Organization, BlogPosting etc.

### Step 4: Check Core Web Vitals

1. Search Console → Core Web Vitals report
2. Target: LCP < 2.5s, CLS < 0.1, INP < 200ms
3. Use [PageSpeed Insights](https://pagespeed.web.dev) for detailed recommendations

---

## Quick Reference

| What | File | Serves at |
|------|------|-----------|
| Site-wide metadata defaults | `src/app/layout.tsx` | Every page |
| Dynamic sitemap | `src/app/sitemap.ts` | `/sitemap.xml` |
| Robots.txt | `src/app/robots.ts` | `/robots.txt` |
| Domain redirect + URL cleanup | `src/middleware.ts` | Every request |
| Page metadata | `src/app/[page]/page.tsx` | That page |
| JSON-LD schemas | `src/app/[page]/page.tsx` | That page |

| Schema | Where to add | What it does |
|--------|-------------|--------------|
| `Organization` + `LocalBusiness` | Homepage | Knowledge panel, logo in Google |
| `WebSite` | Homepage | Site name in Google, sitelinks |
| `FAQPage` | Homepage + Service pages | FAQ dropdowns in search results |
| `Service` | Each service page | Service rich result |
| `BreadcrumbList` | Service + Blog pages | Breadcrumb trail in search results |
| `BlogPosting` | Each blog post | Article info in search results |
