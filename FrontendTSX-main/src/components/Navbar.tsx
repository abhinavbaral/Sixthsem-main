import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.products.slice(0, 5));
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchSelect = (productId: number) => {
    setShowResults(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  const handleContactClick = () => {
    navigate('/');
    setTimeout(() => {
      const contactForm = document.querySelector('form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
        const nameInput = contactForm.querySelector('input[type="text"]') as HTMLInputElement;
        if (nameInput) {
          nameInput.focus();
        }
      }
    }, 100);
    setIsMenuOpen(false);
  };

  const handleServicesClick = () => {
    navigate('/');
    setTimeout(() => {
      const servicesSection = document.querySelector('.py-24.bg-gray-50');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 px-6 shadow-lg transition-all duration-300 ${
      isScrolled ? 'transform translate-y-0 shadow-xl' : ''
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <RouterLink to="/" className="flex items-center group">
          <h1 className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-all duration-300 transform group-hover:scale-105">
          ARStore
          </h1>
        </RouterLink>

        {/* Search Bar */}
        <div className="relative hidden md:block flex-1 mx-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {isSearching && (
              <div className="absolute right-3 top-2.5">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
              </div>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showResults && (searchResults.length > 0 || isSearching) && (
            <div 
              className="absolute mt-2 w-full bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-700"
              onMouseLeave={() => setShowResults(false)}
            >
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSearchSelect(product.id)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                >
                  <img 
                    src={product.thumbnail} 
                    alt={product.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="text-sm text-gray-200">{product.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <RouterLink 
            to="/"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </RouterLink>
          <RouterLink 
            to="/products"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>Products</span>
          </RouterLink>
          <button
            onClick={handleServicesClick}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Services</span>
          </button>
          <RouterLink 
            to="/cart"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold animate-pulse">
                {totalItems}
              </span>
            )}
          </RouterLink>
          <button
            onClick={handleContactClick}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Contact</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
        {/* Mobile Search */}
        <div className="px-4 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {showResults && searchResults.length > 0 && (
            <div className="mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSearchSelect(product.id)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer"
                >
                  <img 
                    src={product.thumbnail} 
                    alt={product.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="text-sm text-gray-200">{product.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-3">
          <RouterLink 
            to="/"
            className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-600 rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </RouterLink>
          <RouterLink 
            to="/products"
            className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-600 rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>Products</span>
          </RouterLink>
          <button
            onClick={handleServicesClick}
            className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-600 rounded-lg transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Services</span>
          </button>
          <RouterLink 
            to="/cart"
            className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-600 rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                {totalItems}
              </span>
            )}
          </RouterLink>
          <button
            onClick={handleContactClick}
            className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-600 rounded-lg transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Contact</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
