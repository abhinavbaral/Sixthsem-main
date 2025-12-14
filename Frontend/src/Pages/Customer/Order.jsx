import React from 'react';

const Orders = () => {
  const orders = [{ id: 1, date: '2025-10-01', total: '$99.99' }];

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
        Order History
      </h1>

      {orders.length > 0 ? (
        <ul className="w-full max-w-3xl space-y-4">
          {orders.map(order => (
            <li
              key={order.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <span>Order #{order.id}</span>
              <span>{order.date}</span>
              <span className="font-semibold text-blue-600">{order.total}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mt-4">No orders yet.</p>
      )}
    </div>
  );
};

export default Orders;
