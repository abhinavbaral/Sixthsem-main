import React from 'react';
import Cart from '../../Components/cart/Cart';
import Header from '../../Components/common/Header';
import Footer from '../../Components/common/Footer';

const CartPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-green-50">


      <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 text-center">
          Your Shopping Cart
        </h1>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <Cart />
        </div>
      </main>


    </div>
  );
};

export default CartPage;
