import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AuthProviders from "./providers";
import Link from "next/link";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  // Check if user is already authenticated
  const session = await auth();
  
  // Redirect to home or callbackUrl if already signed in
  if (session?.user) {
    redirect(searchParams.callbackUrl || "/");
  }

  // Get the callback URL from searchParams
  const callbackUrl = searchParams.callbackUrl || "/";
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
        </div>
        
        <div className="mt-8">
          <AuthProviders callbackUrl={callbackUrl} />
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
