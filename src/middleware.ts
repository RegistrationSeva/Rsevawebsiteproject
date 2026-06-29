import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Query params that are spam/tracking and should not be indexed as separate pages
const STRIP_PARAMS = ['s', 'trk', 'ref', 'mode']

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const { nextUrl } = request

  // 1. Redirect non-www to canonical www domain (301 permanent)
  if (host === 'registrationseva.com') {
    const canonical = new URL(request.url)
    canonical.protocol = 'https:'
    canonical.host = 'www.registrationseva.com'
    return NextResponse.redirect(canonical, { status: 301 })
  }

  // 2. Strip spam/tracking query params and redirect to clean URL
  const hasSpamParam = STRIP_PARAMS.some((p) => nextUrl.searchParams.has(p))
  if (hasSpamParam) {
    const clean = new URL(nextUrl.pathname, 'https://www.registrationseva.com')
    return NextResponse.redirect(clean, { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|logo.jpg|sitemap.xml|robots.txt).*)',
  ],
}
