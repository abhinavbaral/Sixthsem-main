import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (e) => {
    const newQty = Math.max(1, parseInt(e.target.value));
    onUpdateQuantity(item.id, newQty);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start border-b py-4">
      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
      <div className="flex-1 md:ml-6 mt-2 md:mt-0">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-blue-600">Price: ${item.price} each</p>

        <div className="flex items-center space-x-2 mt-2">
          <label className="text-gray-700">Qty:</label>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="w-16 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span className="ml-2 font-semibold text-green-600">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={handleRemove}
        className="mt-2 md:mt-0 md:ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
