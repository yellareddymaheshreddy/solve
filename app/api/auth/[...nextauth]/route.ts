import NextAuth from "next-auth";
import { authConfig } from "@/auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

// Add the PrismaAdapter only in the API routes where Node.js runtime is available
const handler = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
});

// Export the handler functions for Next.js API routes
export const GET = handler;
export const POST = handler;

// Explicitly set the runtime to Node.js to ensure Prisma works correctly
export const runtime = "nodejs";
