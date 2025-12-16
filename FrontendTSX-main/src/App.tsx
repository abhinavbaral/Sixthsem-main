import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail'; 
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Context
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const words = ['Shop', 'Browse', 'Cart', 'Buy'];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord(prev => (prev + 1) % words.length);
    }, 500);

    setTimeout(() => {
      setLoading(false);
      clearInterval(wordInterval);
    }, 2000);

    return () => clearInterval(wordInterval);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
        <div className="text-4xl font-bold text-blue-500 animate-pulse">
          {words[currentWord]}
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
