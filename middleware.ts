import { auth } from "@/auth";

// Export the auth middleware for protecting routes
export default auth;

// Configure which routes should be protected
export const config = {
  matcher: [
    // Protected routes
    "/protected/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    
    // Exclude Next.js internals and public assets
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
