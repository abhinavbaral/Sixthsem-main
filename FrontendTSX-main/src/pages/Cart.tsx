import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item: CartItem) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 px-4 py-2"
              >
                Remove
              </button>
            </div>
          ))}
          
          <div className="mt-8 border-t pt-6">
            <p className="text-xl font-semibold mb-4">Total: ${calculateTotal().toFixed(2)}</p>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
