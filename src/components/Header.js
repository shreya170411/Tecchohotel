import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TecchoHotel
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/rooms" className="hover:text-blue-600">Rooms</Link>
          <Link to="/checkout" className="hover:text-blue-600">Checkout</Link>
          {user ? (
            <>
              <span className="text-gray-600">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}