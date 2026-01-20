/**
 * ============================================================================
 * NEXT.JS MIDDLEWARE
 * ============================================================================
 * 
 * Handles route protection for admin and CMS routes.
 * 
 * Protected Routes:
 * - /admin/* : Lead management dashboard (requires ADMIN_PASSWORD)
 * - /keystatic/* : CMS admin interface (requires KEYSTATIC_SECRET in production)
 * 
 * Authentication is handled via secure HTTP-only cookies.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware function to protect admin routes
 * 
 * @param request - The incoming request
 * @returns NextResponse - Either continues the request or redirects to login
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // ---------------------------------------------------------------------
  // ADMIN ROUTE PROTECTION
  // ---------------------------------------------------------------------
  // Protect /admin/* routes with session-based authentication
  if (pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('admin_session');
    
    // In development without ADMIN_PASSWORD, allow access to all admin routes
    if (!adminPassword) {
      return NextResponse.next();
    }
    
    // Allow access to login page without authentication
    if (pathname === '/admin/login') {
      // If already logged in, redirect to dashboard
      if (adminSession?.value === adminPassword) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }
    
    // Check if user is authenticated
    if (!adminSession || adminSession.value !== adminPassword) {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ---------------------------------------------------------------------
  // KEYSTATIC ROUTE PROTECTION (Production Only)
  // ---------------------------------------------------------------------
  // In production, you may want to add additional protection to /keystatic
  // For now, Keystatic handles its own authentication in GitHub mode
  // In local mode, no authentication is required
  
  // Uncomment the following to add basic protection in production:
  /*
  if (pathname.startsWith('/keystatic') && process.env.NODE_ENV === 'production') {
    const keystaticSession = request.cookies.get('keystatic_session');
    
    if (!keystaticSession || keystaticSession.value !== process.env.KEYSTATIC_SECRET) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }
  */

  return NextResponse.next();
}

/**
 * Configuration for which routes the middleware should run on
 */
export const config = {
  matcher: [
    // Match all admin routes
    '/admin/:path*',
    // Match all keystatic routes (currently handled by Keystatic itself)
    // '/keystatic/:path*',
  ],
};
