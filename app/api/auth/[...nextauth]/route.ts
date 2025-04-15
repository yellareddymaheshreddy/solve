import { handlers } from "@/auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

// Simply use the handlers directly from auth.ts
export const { GET, POST } = handlers;

// Set Node.js runtime for database operations
export const runtime = "nodejs";

// Add adapter to auth configuration
// (This is done automatically by Next-Auth when using Prisma)
