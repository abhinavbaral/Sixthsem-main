import React from 'react';
import { useProducts } from '../../Contexts/ProductContext';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="text-center text-blue-500 mt-8">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-center text-green-600 mt-4">No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
