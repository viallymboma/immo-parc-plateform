import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = !!request.cookies.get('jwt'); // Adjust the cookie name as needed

  const loginUrl = new URL('/auth/signin', request.url);
  const registerUrl = new URL ('/auth/signup', request.url)
  const forgotPasswordUrl = new URL('/forgot-password', request.url); 
  const changePasswordUrl = new URL('/change-password', request.url); 
  const successPageUrl = new URL('/success-page', request.url); 
  const homeUrl = new URL('/backoffice', request.url); // Redirect logged-in users away from login and forgot-password pages

  // If user is on the login or forgot-password page and has a token, redirect to home or dashboard
  if (
    (request.nextUrl.pathname.startsWith('/auth/signin') || 
    request.nextUrl.pathname.startsWith('/auth/signup') || 
    request.nextUrl.pathname.startsWith('/forgot-password') || 
    request.nextUrl.pathname.startsWith('/change-password') || 
    request.nextUrl.pathname.startsWith('/success-page')) && token

  ) {
    return NextResponse.redirect(homeUrl);
  }

  // Allow access to the login and forgot-password pages without a token
  if (
    request.nextUrl.pathname.startsWith('/auth/signin') || 
    request.nextUrl.pathname.startsWith('/auth/signup') || 
    request.nextUrl.pathname.startsWith('/forgot-password') || 
    request.nextUrl.pathname.startsWith('/change-password') || 
    request.nextUrl.pathname.startsWith('/success-page')
  ) {
    return NextResponse.next();
  }

  // No token, redirect to login for other pages
  if (!token) {
    console.log("No token")
    return NextResponse.redirect(loginUrl);
  }

  // Token exists, allow access to protected pages
  return NextResponse.next();
}
























// export function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone();
//   const pathname = url.pathname;
//   console.log(url, "uuuuuuuuiiiiiiii")

//   // Define paths that require authentication and paths restricted for authenticated users
//   const protectedPaths = [new URL ('/backoffice', request.url)];
//   const restrictedForAuthenticated = [new URL ('/auth/signin', request.url), new URL ('/auth/signup', request.url)];

//   // Check if the user is authenticated (replace with your own logic)
//   const isAuthenticated = !!request.cookies.get('jwt'); // Example: checking a token in cookies

//   console.log(isAuthenticated, "ggggggggg")
  

//   // Redirect unauthenticated users trying to access protected paths
//   if (protectedPaths.some(path => request.nextUrl.pathname.startsWith('/backoffice')) && !isAuthenticated) {
//     url.pathname = '/auth/signin';
//     return NextResponse.redirect(url);
//   }

//   // // Prevent authenticated users from accessing signin/signup pages
//   // if (restrictedForAuthenticated.some(path => pathname.startsWith(path)) && isAuthenticated) {
//   //   url.pathname = '/backoffice'; // Redirect to a default backoffice page for authenticated users
//   //   return NextResponse.redirect(url);
//   // }

//   // Prevent authenticated users from accessing signin/signup pages
//   if ((request.nextUrl.pathname.startsWith("/auth/signin") || (request.nextUrl.pathname.startsWith("/auth/signup")) && isAuthenticated)) {
//     url.pathname = '/backoffice'; // Redirect to a default backoffice page for authenticated users
//     return NextResponse.redirect(url);
//   }

//   // Redirect authenticated users to custom 404 if accessing a non-existent page
//   if (!protectedPaths.includes(pathname) && !request.headers.has('x-matched-path') && isAuthenticated) {
//     url.pathname = '/404'; // Replace with the path to your custom 404 page
//     return NextResponse.redirect("/backoffice");
//   } else if (!protectedPaths.includes(pathname) && !request.headers.has('x-matched-path') && !isAuthenticated) {
//     return NextResponse.redirect("/auth/signin");
//   }

//   return NextResponse.next();
// }

// Match the middleware to specific paths (adjust as necessary)
export const config = {
  // matcher: ['/backoffice/:path*', '/login/auth/:path*', '/pages/:path*'],
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
