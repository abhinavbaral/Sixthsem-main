import React, { createContext, useState, useEffect, useContext } from 'react';
import { getProducts, createProduct, deleteProduct } from '../Services/productService';
import { MOCK_PRODUCTS } from '../utils/constants.jsx';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data || MOCK_PRODUCTS);
      } catch {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = id => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, quantity) => {
    setCart(prevCart =>
      prevCart.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const createProductHandler = async newProduct => {
    try {
      const result = await createProduct(newProduct);
      if (result.success) {
        setProducts(prev => [...prev, result.product]);
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch {
      setError('Failed to create product');
      return false;
    }
  };

  const deleteProductHandler = async id => {
    try {
      const success = await deleteProduct(id);
      if (success) {
        setProducts(prev => prev.filter(product => product.id !== id));
      }
    } catch {
      setError('Failed to delete product');
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        createProduct: createProductHandler,
        deleteProduct: deleteProductHandler,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
