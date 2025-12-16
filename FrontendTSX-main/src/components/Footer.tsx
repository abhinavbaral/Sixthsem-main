import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-12 shadow-lg relative">
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 group z-50"
          aria-label="Back to top"
        >
          <svg 
            className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-8 text-blue-400 hover:text-blue-300 transition-colors duration-300">
       ARStore
          </h2>
          
          <nav className="flex flex-wrap justify-center gap-8 mb-8">
            <RouterLink 
              to="/" 
              className="group flex items-center space-x-2 hover:text-blue-400 transform hover:scale-110 transition-all duration-300 ease-in-out"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-200">Home</span>
            </RouterLink>
            <RouterLink 
              to="/products"
              className="group flex items-center space-x-2 hover:text-blue-400 transform hover:scale-110 transition-all duration-300 ease-in-out"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-200">Products</span>
            </RouterLink>
            <RouterLink 
              to="/cart"
              className="group flex items-center space-x-2 hover:text-blue-400 transform hover:scale-110 transition-all duration-300 ease-in-out"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-200">Cart</span>
            </RouterLink>
          </nav>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-8 animate-pulse"></div>
          
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2 hover:text-gray-300 transition-colors duration-300">
              © {new Date().getFullYear()} ARStore
            </p>
            <p className="text-gray-500 text-xs">
              All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
