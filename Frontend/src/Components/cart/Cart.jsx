import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../Contexts/ProductContext';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useProducts();

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearCart = () => {
    cart.forEach(item => removeFromCart(item.id));
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 text-lg">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-green-600 mb-6">Your Cart</h1>
      <ul className="space-y-4">
        {cart.map(item => (
          <li key={item.id} className="flex flex-col md:flex-row md:justify-between items-center border-b pb-4">
            <div>
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-blue-600">Price: ${item.price}</p>
            </div>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <button 
                onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))} 
                className="px-2 py-1 bg-green-500 text-white rounded"
              >-</button>
              <span className="px-2">{item.quantity}</span>
              <button 
                onClick={() => updateCartQuantity(item.id, item.quantity + 1)} 
                className="px-2 py-1 bg-green-500 text-white rounded"
              >+</button>
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >Remove</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right text-lg font-semibold">
        Subtotal: <span className="text-green-600">${calculateTotal()}</span>
      </div>

      <div className="mt-6 flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
        <button 
          onClick={clearCart} 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
        <Link 
          to="/checkout" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
