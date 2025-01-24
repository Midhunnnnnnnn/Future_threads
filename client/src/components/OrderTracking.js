import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure you have axios installed

const OrderTracking = () => {
  // State to track logged-in status and order tracking data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trackingSteps, setTrackingSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Assume the order ID will be passed or fetched from the app context or route
  const orderId = localStorage.getItem("orderId");

  // Effect to check logged-in status
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedInStatus);
    };

    // Initial check
    checkLoginStatus();

    // Listen for changes in localStorage
    window.addEventListener("storage", checkLoginStatus);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  // Fetch order tracking data
  useEffect(() => {
    if (isLoggedIn && orderId) {
      const fetchTrackingData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/orders/${orderId}`); // Replace with your real backend endpoint
          const order = response.data;

          // Set tracking steps based on order data
          setTrackingSteps(order.trackingSteps || []);
        } catch (error) {
          console.error("Error fetching tracking data:", error);
          setError("Failed to load tracking information.");
        } finally {
          setLoading(false);
        }
      };

      fetchTrackingData();
    }
  }, [isLoggedIn, orderId]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Login Required</h1>
          <p className="text-gray-600">Please log in to track your order.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Loading...</h1>
          <p className="text-gray-600">Please wait while we fetch your order details.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Track Your Order</h1>
        <div className="space-y-4">
          {trackingSteps.length === 0 ? (
            <p className="text-center text-gray-600">No tracking information available.</p>
          ) : (
            trackingSteps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-4 p-4 rounded-lg shadow-sm
                  ${step.completed ? "bg-green-100 border-l-4 border-green-500" : "bg-gray-50 border-l-4 border-gray-300"}
                `}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full
                    ${step.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"}
                  `}
                >
                  {step.completed ? <span>&#10003;</span> : <span>{step.id}</span>}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{step.label}</h3>
                  <p className="text-sm text-gray-600">{step.date}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
