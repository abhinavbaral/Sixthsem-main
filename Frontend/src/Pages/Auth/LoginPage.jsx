import React from 'react';
import Login from '../../Components/auth/Login';
import Header from '../../Components/common/Header';
import Footer from '../../Components/common/Footer';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col">

      
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <Login />
      </main>


    </div>
  );
};

export default LoginPage;
