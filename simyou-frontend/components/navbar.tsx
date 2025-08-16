"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="shadow-sm top-0 w-full z-50 bg-white/80 backdrop-blur mb-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        <Link
          href="/"
          className="text-xl font-medium text-indigo-600"
        >
          SimYou
        </Link>

        <div className="space-x-4">
          <Link href="/chat">Chat</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/about">About</Link>

          {session ? (
            <>
              <button
                onClick={() => signOut()}
                className="px-4 py-1.5 border rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-4 py-1.5 border rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
