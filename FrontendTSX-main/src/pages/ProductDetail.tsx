import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  brand: string;
  category: string;
  rating: number;
  stock: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.thumbnail);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: quantity,
        image: product.thumbnail
      });
      alert('Added to cart successfully!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="space-y-4" data-aos="fade-right">
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className={`w-full h-20 object-cover rounded-md cursor-pointer transform transition-all duration-300 hover:scale-110 ${
                      selectedImage === image ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6" data-aos="fade-left">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
                <p className="text-lg text-gray-500 mt-2">{product.brand}</p>
              </div>

              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.round(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-600">({product.rating})</span>
              </div>

              <p className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</p>

              <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-600">
                  {product.stock} units available
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
