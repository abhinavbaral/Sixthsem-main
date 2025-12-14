import React, { useState } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { useProducts } from '../../Contexts/ProductContext';
import ProductForm from './ProductForm';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { products, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const stats = {
    totalProducts: products.length,
    totalOrders: 150,
    totalRevenue: '$5,250.00',
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 sm:mb-0">
          Welcome, {user?.email || 'Admin'}
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          Add New Product
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="font-semibold text-blue-600">Total Products</h3>
          <p className="text-2xl font-bold">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="font-semibold text-blue-600">Total Orders</h3>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="font-semibold text-blue-600">Total Revenue</h3>
          <p className="text-2xl font-bold">{stats.totalRevenue}</p>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Manage Products</h2>
        {products.length === 0 ? (
          <p>No products available. Add one to get started.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{product.id}</td>
                  <td className="p-2 border">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">${product.price}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-red-600 font-bold text-xl"
            >
              &times;
            </button>
            <ProductForm
              product={editingProduct}
              onSubmit={handleCloseForm}
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
