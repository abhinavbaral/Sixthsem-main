import React from 'react';
import Register from '../../Components/auth/Register';
import Header from '../../Components/common/Header';
import Footer from '../../Components/common/Footer';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col">


      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <Register />
      </main>

    </div>
  );
};

export default RegisterPage;
