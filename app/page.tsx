import { auth } from "@/auth";
import SignIn from "./components/signin";
import SignOutButton from "./components/signout-button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Authentication Demo</h1>
      
      {session?.user ? (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {session.user.name || 'User'}!</h2>
          
          {session.user.image && (
            <div className="flex justify-center mb-4">
              <img 
                src={session.user.image} 
                alt="Profile" 
                className="rounded-full w-24 h-24"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <p><strong>Email:</strong> {session.user.email}</p>
          </div>
          
          <div className="mt-6 space-y-4">
            <Link 
              href="/protected" 
              className="block text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Protected Page
            </Link>
            
            <SignOutButton />
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <p className="mb-6 text-center">Please sign in to continue:</p>
          <SignIn />
        </div>
      )}
    </div>
  );
}
