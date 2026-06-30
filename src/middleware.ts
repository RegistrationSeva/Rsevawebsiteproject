import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Query params that are spam/tracking and should not be indexed as separate pages
const STRIP_PARAMS = ['s', 'trk', 'ref', 'mode']

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const { nextUrl } = request

  // 1. Redirect non-www to canonical www domain (301 permanent)
  //    Match on hostname only so local :3000 and prod :443 are both caught
  const hostname = host.split(':')[0]
  if (hostname === 'registrationseva.com') {
    const canonical = new URL(request.url)
    canonical.protocol = 'https:'
    canonical.hostname = 'www.registrationseva.com' // hostname strips port; host would carry :3000
    canonical.port = ''                              // ensure no port leaks into the redirect URL
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
    // Match all paths except Next.js internals and static assets
    // sitemap.xml and robots.txt are intentionally NOT excluded — they must also redirect non-www → www
    '/((?!_next/static|_next/image|favicon.ico|logo.jpg).*)',
  ],
}
