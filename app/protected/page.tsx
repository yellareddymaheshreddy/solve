import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await auth();
  
  // Redirect to login if not authenticated (this is a backup to middleware)
  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/protected");
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">Protected Page</h1>
        <div className="p-4 bg-green-100 border border-green-300 rounded-md">
          <p className="text-green-800 text-center">
            👋 Welcome to the protected area, <strong>{session.user.name || session.user.email}</strong>!
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Your Profile Information</h2>
            <div className="space-y-2">
              {session.user.image && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="rounded-full w-20 h-20"
                  />
                </div>
              )}
              <p><strong>Name:</strong> {session.user.name || 'Not provided'}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
              <p><strong>Session expires:</strong> {session.expires ? new Date(session.expires).toLocaleString() : 'Unknown'}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Protected Data</h2>
            <p>This is sensitive data that only authenticated users can see.</p>
            <div className="mt-4 p-3 bg-white rounded border border-blue-200">
              <pre className="text-sm overflow-auto">
                {JSON.stringify(
                  {
                    secretData: "This is confidential information",
                    apiKeys: {
                      demo: "k_1234567890abcdef",
                      test: "k_test_abcdefghijklmn"
                    },
                    lastLogin: new Date().toISOString()
                  }, 
                  null, 2
                )}
              </pre>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <Link 
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
