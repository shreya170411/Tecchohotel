import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <div className="space-x-4">
          <Link 
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
          >
            Go to Homepage
          </Link>
          <Link 
            to="/rooms"
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-bold hover:bg-gray-300"
          >
            Browse Rooms
          </Link>
        </div>
      </div>
    </div>
  );
}