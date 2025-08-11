// app/not-found.js
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-6">
      <h2 className="text-4xl font-bold mb-4">Post not found</h2>
      <p className="text-lg text-center mb-6">
        Sorry, the post you are looking for does not exist.
      </p>
      <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
        Return Home
      </Link>
    </div>
  );
}