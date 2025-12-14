import React, { useState, useEffect } from 'react';
import { useProducts } from '../../Contexts/ProductContext';

const ProductForm = ({ product: initialProduct, onSubmit, onCancel }) => {
  const { createProduct } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        name: initialProduct.name,
        price: initialProduct.price,
        image: initialProduct.image,
        description: initialProduct.description || '',
        category: initialProduct.category || '',
      });
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.price || !formData.image || !formData.category) {
      setError('Please fill all required fields.');
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      setError('Price must be greater than 0.');
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    const success = await createProduct(productData);

    if (success) {
      onSubmit();
    } else {
      setError('Failed to save product. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-blue-700">
        {initialProduct ? 'Edit Product' : 'Add New Product'}
      </h2>

      {error && <div className="text-red-600 font-medium">{error}</div>}

      <div className="flex flex-col">
        <label htmlFor="name" className="font-medium text-gray-700">Product Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="price" className="font-medium text-gray-700">Price *</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="image" className="font-medium text-gray-700">Image URL *</label>
        <input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-2">
          <label className="font-medium text-gray-700">Preview:</label>
          <img
            src={formData.image || 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'}
            alt="Product Preview"
            className="w-32 h-32 object-cover rounded mt-1 border"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="category" className="font-medium text-gray-700">Category *</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home">Home & Garden</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {initialProduct ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
