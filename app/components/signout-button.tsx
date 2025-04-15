"use client"

import { signOut } from "next-auth/react"

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <button 
      onClick={handleSignOut}
      className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Sign Out
    </button>
  );
}

