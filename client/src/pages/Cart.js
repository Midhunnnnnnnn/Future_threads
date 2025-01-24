import React, { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Cart = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const [payNow, setPayNow] = useState(false);
  const [totalAmt, setTotalAmt] = useState("");

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to Checkout");
    }
  };

  const handleRequest = async () => {
    if (userInfo) {
      try {
        const response = await axios.post("http://localhost:8000/tracking-requests", {
          user: userInfo.name,
          email: userInfo.email,
          message: "Customer has requested assistance with their order.",
          status: "Pending",
        });

        if (response.status === 201) {
          toast.success("Request sent to admin successfully!");
        }
      } catch (error) {
        console.error("Error in sending request:", error);
        toast.error("Failed to send the request. Please try again.");
      }
    } else {
      toast.error("Please sign in to send a request.");
    }
  };

  const payment = async (token) => {
    // Simulate a successful payment
    try {
      const response = await axios.post("http://localhost:8000/tracking-requests", {
        user: userInfo.name,
        email: userInfo.email,
        amount: totalAmt,
        status: "Payment Received",
        paymentDetails: token.card,
      });

      if (response.status === 201) {
        toast.success("Payment successful! Notification sent to admin.");
        setPayNow(false); // Reset the payment state
      }
    } catch (error) {
      console.error("Error in processing payment:", error);
      toast.error("An error occurred during payment.");
    }
  };

  return (
    <div>
      <img
        className="w-full h-60 object-cover"
        src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="cartImg"
      />
      {productData.length > 0 ? (
        <div className="max-w-screen-xl mx-auto py-20 flex">
          <CartItem />
          <div className="w-1/3 bg-[#fafafa] py-6 px-4">
            <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
              <h2 className="text-2xl font-medium ">Total Amount</h2>
              <p className="flex items-center gap-4 text-base">
                Subtotal{" "}
                <span className="font-titleFont font-bold text-lg">
                  ${totalAmt}
                </span>
              </p>
              <p className="flex items-start gap-4 text-base">
                Shipping{" "}
                <span>
                  You will be redirected to the payment page shortly. Please enter
                  your address during payment.
                </span>
              </p>
            </div>
            <p className="font-titleFont font-semibold flex justify-between mt-6">
              Total <span className="text-xl font-bold">${totalAmt}</span>
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <button
                onClick={handleCheckout}
                className="text-base bg-black text-white w-full py-3 hover:bg-gray-800 duration-300"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={handleRequest}
                className="text-base bg-blue-500 text-white w-full py-3 hover:bg-blue-700 duration-300"
              >
                Request Assistance
              </button>
            </div>
            {payNow && (
              <div className="w-full mt-6 flex items-center justify-center">
                <StripeCheckout
                  stripeKey="pk_test_51LXpmzBcfNkwYgIPXd3qq3e2m5JY0pvhaNZG7KSCklYpVyTCVGQATRH8tTWxDSYOnRTT5gxOjRVpUZmOWUEHnTxD00uxobBHkc"
                  name="RAZORPAY"
                  amount={totalAmt * 100}
                  label="Pay to Future Threads"
                  description={`Your Payment amount is $${totalAmt}`}
                  token={payment}
                  email={userInfo.email}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto py-10 flex flex-col items-center gap-2 justify-center">
          <p className="text-xl text-orange-600 font-titleFont font-semibold">
            Your Cart is Empty. Please go back to Shopping and add products to
            Cart.
          </p>
          <Link to="/">
            <button className="flex items-center gap-1 text-gray-400 hover:text-black duration-300">
              <span>
                <HiOutlineArrowLeft />
              </span>
              Go Shopping
            </button>
          </Link>
        </div>
      )}
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Cart;
