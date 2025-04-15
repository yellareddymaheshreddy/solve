import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Create auth options without adapter for client components and middleware
export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith("/protected");
      if (isProtected) {
        if (isLoggedIn) return true;
        return false; // Redirect to login page
      }
      return true;
    },
  },
};

// Create a basic auth handler that works in all environments
export const { auth } = NextAuth(authConfig);
