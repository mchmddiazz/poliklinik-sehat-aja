import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  
  // Daftar path yang memerlukan autentikasi
  const protectedPaths = [
    '/administrasi/dashboard',
    '/dokter/dashboard',
    '/apoteker/dashboard',
    '/admin/dashboard'
  ]

  // Cek apakah path saat ini termasuk yang dilindungi
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Jika mengakses halaman yang dilindungi tanpa token, redirect ke login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Jika ada token, cek role dari token
  if (token) {
    const tokenValue = token.value
    const role = tokenValue.split('-')[0] // Format token: "role-timestamp"
    
    // Cek apakah user mencoba mengakses halaman sesuai rolenya
    if (request.nextUrl.pathname.startsWith(`/${role}/dashboard`)) {
      return NextResponse.next()
    }
    
    // Jika mencoba mengakses halaman role lain, redirect ke dashboard sesuai rolenya
    if (isProtectedPath) {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
    }
  }

  return NextResponse.next()
}

// Konfigurasi path yang akan diproses middleware
export const config = {
  matcher: [
    '/administrasi/:path*',
    '/dokter/:path*',
    '/apoteker/:path*',
    '/admin/:path*',
    '/login'
  ]
} 