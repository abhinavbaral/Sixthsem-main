import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

const Navbar = () => {
  const { isAdmin, isCustomer } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        E-Shop
      </Link>

      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li>
          <Link className="hover:text-blue-500" to="/">Home</Link>
        </li>
        <li>
          <Link className="hover:text-blue-500" to="/">Products</Link>
        </li>
        <li>
          <Link className="hover:text-blue-500" to="/">Categories</Link>
        </li>
        {isCustomer && (
          <li>
            <Link className="text-green-600 hover:text-green-500" to="/wishlist">Wishlist</Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link className="text-green-600 hover:text-green-500" to="/admin/manage-products">Manage Products</Link>
          </li>
        )}
        {isCustomer && (
          <li>
            <Link className="text-green-600 hover:text-green-500" to="/orders">Orders</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
