import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for SEO optimizations:
 * 1. Fixes double-slash URLs (//) -> single slash
 * 2. Enforces www and https in production
 * 3. Adds canonical URL headers
 * 4. Handles trailing slashes consistently
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const { pathname, host } = url
  
  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  let shouldRedirect = false
  const redirectUrl = url.clone()

  // 1. Fix double slashes in URL path
  if (pathname.includes('//')) {
    const cleanPath = pathname.replace(/\/+/g, '/')
    redirectUrl.pathname = cleanPath
    shouldRedirect = true
  }

  // 2. Enforce www and https in production
  const isProduction = process.env.NODE_ENV === 'production'
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1')
  
  if (isProduction && !isLocalhost) {
    // Enforce https
    if (url.protocol === 'http:') {
      redirectUrl.protocol = 'https:'
      shouldRedirect = true
    }
    
    // Enforce www
    if (!host.startsWith('www.')) {
      redirectUrl.host = `www.${host}`
      shouldRedirect = true
    }
  }

  // 3. Handle trailing slashes (remove them for consistency, except for root)
  if (pathname !== '/' && pathname.endsWith('/')) {
    redirectUrl.pathname = pathname.slice(0, -1)
    shouldRedirect = true
  }

  // Perform redirect if needed
  if (shouldRedirect) {
    return NextResponse.redirect(redirectUrl, 301)
  }

  // Add canonical URL header for SEO
  const canonicalUrl = `${url.protocol}//${url.host}${pathname}`
  const response = NextResponse.next()
  response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`)
  
  // Add X-Content-Type-Options for security
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
