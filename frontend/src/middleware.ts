import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Define paths that require authentication and paths restricted for authenticated users
  const protectedPaths = ['/backoffice'];
  const restrictedForAuthenticated = ['/login/auth/signin', '/login/auth/signup'];

  // Check if the user is authenticated (replace with your own logic)
  const isAuthenticated = !!request.cookies.get('authToken'); // Example: checking a token in cookies

  // Redirect unauthenticated users trying to access protected paths
  if (protectedPaths.some(path => pathname.startsWith(path)) && !isAuthenticated) {
    url.pathname = '/auth/signin';
    return NextResponse.redirect(url);
  }

  // Prevent authenticated users from accessing signin/signup pages
  if (restrictedForAuthenticated.some(path => pathname.startsWith(path)) && isAuthenticated) {
    url.pathname = '/backoffice'; // Redirect to a default backoffice page for authenticated users
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users to custom 404 if accessing a non-existent page
  if (!protectedPaths.includes(pathname) && !request.headers.has('x-matched-path')) {
    url.pathname = '/404'; // Replace with the path to your custom 404 page
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Match the middleware to specific paths (adjust as necessary)
export const config = {
  matcher: ['/backoffice/:path*', '/login/auth/:path*', '/pages/:path*'],
};
