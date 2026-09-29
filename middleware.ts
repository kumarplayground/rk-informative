import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const adminPath = process.env.ADMIN_PATH || 'secure-panel-x7k29m'
  const { pathname } = request.nextUrl

  if (pathname.startsWith(`/${adminPath}`)) {
    // Exclude login page from auth check
    if (pathname === `/${adminPath}/login`) {
      return NextResponse.next()
    }

    const sessionCookie = request.cookies.get('session')
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL(`/${adminPath}/login`, request.url))
    }

    try {
      const secretKey = process.env.AUTH_SECRET || 'change-this'
      const key = new TextEncoder().encode(secretKey)
      await jwtVerify(sessionCookie.value, key, { algorithms: ['HS256'] })
      return NextResponse.next()
    } catch (err) {
      // Invalid session
      return NextResponse.redirect(new URL(`/${adminPath}/login`, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
