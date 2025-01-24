import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaClipboardList } from "react-icons/fa";

const AdminDashboard = () => {
  // Dummy orders and payment requests data
  const [orders, setOrders] = useState([
    { _id: 1, customerName: "John Doe", status: "Pending", amount: 50, paymentStatus: "Unpaid" },
    { _id: 2, customerName: "Jane Smith", status: "Shipped", amount: 100, paymentStatus: "Paid" },
    { _id: 3, customerName: "Alice Johnson", status: "Pending", amount: 150, paymentStatus: "Unpaid" },
  ]);
  const [loading, setLoading] = useState(false);

  // Function to update order status (simulate API call)
  const updateOrderStatus = (id, status) => {
    const updatedOrders = orders.map((order) =>
      order._id === id ? { ...order, status } : order
    );
    setOrders(updatedOrders);
  };

  // Function to simulate accepting payment (updating paymentStatus)
  const handlePaymentStatus = (id, status) => {
    const updatedOrders = orders.map((order) =>
      order._id === id ? { ...order, paymentStatus: status } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Orders Section */}
      <div className="bg-white shadow-md rounded-md p-4 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Order ID</th>
                <th className="border border-gray-300 p-2">Customer</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Total</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="border border-gray-300 p-2">{order._id}</td>
                  <td className="border border-gray-300 p-2">{order.customerName}</td>
                  <td className="border border-gray-300 p-2">{order.status}</td>
                  <td className="border border-gray-300 p-2">${order.amount}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 mr-2 rounded hover:bg-green-600"
                      onClick={() => updateOrderStatus(order._id, "Shipped")}
                    >
                      Mark as Shipped
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => updateOrderStatus(order._id, "Cancelled")}
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders available</p>
        )}
      </div>

      {/* Payment Requests Section */}
      <div className="bg-white shadow-md rounded-md p-4">
        <h2 className="text-2xl font-semibold mb-4">Payment Requests</h2>
        {orders.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Request ID</th>
                <th className="border border-gray-300 p-2">Customer</th>
                <th className="border border-gray-300 p-2">Amount</th>
                <th className="border border-gray-300 p-2">Payment Status</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="border border-gray-300 p-2">{order._id}</td>
                  <td className="border border-gray-300 p-2">{order.customerName}</td>
                  <td className="border border-gray-300 p-2">${order.amount}</td>
                  <td className="border border-gray-300 p-2">{order.paymentStatus}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600"
                      onClick={() => handlePaymentStatus(order._id, "Paid")}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      onClick={() => handlePaymentStatus(order._id, "Declined")}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No payment requests available</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
