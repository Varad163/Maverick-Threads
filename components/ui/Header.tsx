"use client"

import React from 'react'
import { ClerkLoaded, useUser, SignedIn, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import { TrolleyIcon } from '@sanity/icons';
import { PackageIcon } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

function Header() {
  const { user } = useUser();

  const createClerkPasskey = async () => {
    try{
      const response= await user?.createPasskey();
      console.log(response);
    }
    catch(err){
      console.log("Error:",JSON.stringify(err,null,2));
    }
   };

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-blue-500 hover:opacity-75 cursor-pointer mx-auto sm:mx-0"
      >
        Maverick Threads
      </Link>

      {/* Search Form */}
      <form
        action="/search"
        className="flex flex-1 items-center max-w-3xl mx-4 my-2 sm:my-0"
      >
        <input
          type="text"
          name="query"
          placeholder="Search for products"
          className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-blue-500 focus:ring-opacity-50 border border-gray-300"
        />
      </form>

      {/* Basket Link */}
      <Link
        href="/basket"
        className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <TrolleyIcon className="w-6 h-6" />
        <span>My Basket</span>
      </Link>

      {/* Clerk Section */}
      <ClerkLoaded>
        <SignedIn>
          <Link
            href="/orders"
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
          >
            <PackageIcon className="w-6 h-6" />
            <span>My Orders</span>
          </Link>
        </SignedIn>

        {user ? (
          <div className="flex items-center space-x-2 ml-2">
            <UserButton />
            <div className="hidden sm:block text-xs">
              <p className="text-gray-400">Welcome Back</p>
              <p className="font-bold">{user.fullName}</p>
            </div>
          </div>
        ) : (
          <div className="ml-2">
    <SignInButton mode="modal" />
</div>
        )}

        {user?.passkeys.length === 0 && (
          <button
            onClick={createClerkPasskey}
            className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border ml-2"
          >
            Create Passkey 
          </button>
        )}
      </ClerkLoaded>
    </header>
  );
}

export default Header;
