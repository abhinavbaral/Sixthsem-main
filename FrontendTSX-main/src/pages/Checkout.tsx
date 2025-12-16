import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const Checkout: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some(value => !value)) {
      alert("Please fill in all fields");
      return;
    }
    alert("Order placed successfully!");
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button 
          onClick={() => navigate('/products')}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="text-xl font-semibold mb-8">Total Amount: ${calculateTotal().toFixed(2)}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium mb-1">Full Name *</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-medium mb-1">Shipping Address *</label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="123 Main St"
              required
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="city" className="text-sm font-medium mb-1">City *</label>
            <input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="New York"
              required
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="zipCode" className="text-sm font-medium mb-1">ZIP Code *</label>
            <input
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="10001"
              required
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Payment Information</h2>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="cardNumber" className="text-sm font-medium mb-1">Card Number *</label>
            <input
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              required
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="expiryDate" className="text-sm font-medium mb-1">Expiry Date *</label>
            <input
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              required
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="cvv" className="text-sm font-medium mb-1">CVV *</label>
            <input
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              maxLength={3}
              required
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors mt-8"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
