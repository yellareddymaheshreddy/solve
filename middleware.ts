import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  // Get auth session but don't use any server-only features
  const session = await auth();
  
  // Protect routes based on authentication status
  if (!session && isProtectedPath(request.nextUrl.pathname)) {
    // Redirect to login page with the return URL
    const returnUrl = encodeURIComponent(request.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${returnUrl}`, request.url)
    );
  }
  
  return NextResponse.next();
}

// Helper function to determine if a path should be protected
function isProtectedPath(path: string): boolean {
  // Add all paths that require authentication
  const protectedPaths = [
    '/protected',
    '/dashboard',
    '/account',
    '/profile',
  ];
  
  return protectedPaths.some(prefix => 
    path === prefix || path.startsWith(`${prefix}/`)
  );
}

// Configure the paths that this middleware should run on
export const config = {
  matcher: [
    // Apply to specific routes that need protection
    '/protected/:path*',
    '/dashboard/:path*',
    '/account/:path*',
    '/profile/:path*',
    // Exclude all API routes, static files, etc.
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
