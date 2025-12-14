import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import { useAuth } from '../../Contexts/AuthContext';

const Header = () => {
  const { user, logout, isAdmin, isCustomer } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
          <Navbar />
          <SearchBar />
        </div>

        <div className="mt-2 md:mt-0 flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-800 font-medium">
                Hello, {user.email || user.role}
              </span>
              {isCustomer && (
                <a href="/cart" className="text-blue-600 hover:text-blue-800 font-semibold">
                  Cart
                </a>
              )}
              {isAdmin && (
                <a href="/admin/dashboard" className="text-green-600 hover:text-green-800 font-semibold">
                  Admin
                </a>
              )}
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                Sign In
              </a>
              <a href="/register" className="text-green-600 hover:text-green-800 font-semibold">
                Account & Links
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
