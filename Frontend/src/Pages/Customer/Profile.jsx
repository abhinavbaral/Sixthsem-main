import React from 'react';
import { useAuth } from '../../Contexts/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">Profile</h1>

      {user ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold text-blue-600">Email:</span> {user.email}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-blue-600">Role:</span> {user.role}
          </p>
          <button
            onClick={logout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">Please log in to view profile.</p>
      )}
    </div>
  );
};

export default Profile;
