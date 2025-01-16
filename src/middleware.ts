import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define the routes and their allowed roles
const roleRoutes = {
  '/admin': ['admin'],
  '/dokter': ['dokter'],
  '/apoteker': ['apoteker'],
  '/administrasi': ['administrasi'],
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname

  // Allow access to login page and API routes
  if (path === '/login' || path.startsWith('/api')) {
    return NextResponse.next()
  }

  // If no token, redirect to login
  if (!token) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    // Add cache control headers to prevent back/forward cache issues
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    )
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    return response
  }

  // Extract role from token (assuming token format: "role-timestamp")
  const userRole = token.split('-')[0]

  // Check if the current path requires role checking
  for (const [routePath, allowedRoles] of Object.entries(roleRoutes)) {
    if (path.startsWith(routePath)) {
      // If user's role is not in allowed roles, redirect to unauthorized page
      if (!allowedRoles.includes(userRole)) {
        const response = NextResponse.redirect(new URL('/unauthorized', request.url))
        // Add cache control headers to prevent back/forward cache issues
        response.headers.set(
          'Cache-Control',
          'no-store, no-cache, must-revalidate, proxy-revalidate'
        )
        response.headers.set('Pragma', 'no-cache')
        response.headers.set('Expires', '0')
        return response
      }
      break
    }
  }

  // Add cache control headers to successful responses too
  const response = NextResponse.next()
  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  return response
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 