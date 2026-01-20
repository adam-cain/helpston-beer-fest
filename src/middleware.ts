/**
 * ============================================================================
 * NEXT.JS MIDDLEWARE
 * ============================================================================
 * 
 * Handles route protection for the Keystatic CMS.
 * 
 * Protected Routes:
 * - /keystatic/* : CMS admin interface (requires ADMIN_PASSWORD)
 * 
 * Authentication is handled via secure HTTP-only cookies.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware function to protect Keystatic routes
 * 
 * @param request - The incoming request
 * @returns NextResponse - Either continues the request or redirects to login
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSession = request.cookies.get('admin_session');

  // ---------------------------------------------------------------------
  // LOGIN PAGE
  // ---------------------------------------------------------------------
  if (pathname === '/login') {
    // If already logged in, redirect to Keystatic
    if (adminPassword && adminSession?.value === adminPassword) {
      return NextResponse.redirect(new URL('/keystatic', request.url));
    }
    return NextResponse.next();
  }

  // ---------------------------------------------------------------------
  // KEYSTATIC ROUTE PROTECTION
  // ---------------------------------------------------------------------
  if (pathname.startsWith('/keystatic')) {
    console.log('keystatic route protected');
    // In development without ADMIN_PASSWORD, allow access
    if (!adminPassword) {
      return NextResponse.next();
    }

    // Check if user is authenticated
    if (!adminSession || adminSession.value !== adminPassword) {
      // Redirect to login page
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

/**
 * Configuration for which routes the middleware should run on
 */
export const config = {
  matcher: [
    '/login',
    '/keystatic/:path*',
  ],
};
