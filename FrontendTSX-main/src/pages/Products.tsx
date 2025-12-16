import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const Products: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        
        // Transform the data to match our Product interface
        const transformedProducts: Product[] = data.products.map((p: any) => ({
          id: p.id,
          name: p.title,
          price: p.price,
          description: p.description,
          image: p.thumbnail
        }));

        setProducts(transformedProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    alert('Added to cart');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-green-600 font-bold mb-2">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="flex flex-col gap-2">
                <button 
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View Details
                </button>
                
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
