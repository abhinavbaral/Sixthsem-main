import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../../Contexts/ProductContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useProducts();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    setProduct(foundProduct || null);
  }, [id, products]);

  const handleAddToCart = () => {
    if (product) {
      const itemToAdd = { ...product, quantity };
      addToCart(itemToAdd);
    }
  };

  if (!product) {
    return (
      <div className="text-red-600 text-center mt-8">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 hover:bg-green-500 text-white rounded"
      >
        Back to Products
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded"
          />
          <div className="flex gap-2 mt-2">
            <img
              src={product.image}
              alt="Thumbnail"
              className="w-24 h-24 object-cover rounded border"
            />
            <img
              src={product.image}
              alt="Thumbnail"
              className="w-24 h-24 object-cover rounded border"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-blue-600">{product.name}</h1>
          <p className="text-green-600 text-xl font-semibold">${product.price}</p>
          <div className="text-yellow-500">*****(5) - 120 reviews</div>

          <div>
            <h3 className="font-semibold">Description</h3>
            <p>{product.description || 'High-quality product with excellent features. Perfect for everyday use.'}</p>
          </div>

          <div className="flex items-center gap-2">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="w-20 p-1 border rounded"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Add to Cart - ${product.price * quantity}
          </button>

          <Link
            to="/cart"
            className="mt-2 inline-block text-blue-600 hover:text-green-600 font-semibold"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
