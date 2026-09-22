import { NextRequest, NextResponse } from 'next/server'

/**
 * Defense in depth for /admin pages.
 * The cookie value is fully verified (HMAC + expiry) inside API routes
 * via checkAuth(); here we only redirect cookieless / malformed visits
 * to the login page to avoid rendering admin UI unnecessarily.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }
  const session = request.cookies.get('admin_session')?.value
  if (!session || !session.startsWith('v1.')) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
