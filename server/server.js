const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Order Schema and Model
const orderSchema = new mongoose.Schema({
  customerName: String,
  orderDetails: Array,
  amount: Number,
  currency: String,
  status: { type: String, default: "Pending" },
  paymentStatus: { type: String, default: "Unpaid" },
  receipt: String,
});

const Order = mongoose.model("Order", orderSchema);

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const port = process.env.PORT || 3000;

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Create an order and initiate payment
app.post("/pay", async (req, res) => {
  try {
    const { amount, currency = "INR", customerName, orderDetails } = req.body;

    // Create an order in Razorpay
    const options = {
      amount: amount * 100, // Convert amount to the smallest unit
      currency: currency,
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save the order in MongoDB
    const newOrder = new Order({
      customerName,
      orderDetails,
      amount,
      currency,
      receipt: order.receipt,
    });

    await newOrder.save();

    // Send order details back to the client
    res.status(200).json({
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
      orderReceipt: order.receipt,
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).send("Payment initiation failed");
  }
});

// Verify payment
app.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  // If signature matches, update the payment status
  if (generated_signature === razorpay_signature) {
    const order = await Order.findOne({ "orderDetails.receipt": razorpay_order_id });
    if (order) {
      order.paymentStatus = "Paid";
      await order.save();
      res.status(200).send("Payment verified successfully");
    } else {
      res.status(404).send("Order not found");
    }
  } else {
    res.status(400).send("Invalid signature, payment verification failed");
  }
});

// Get all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Error fetching orders");
  }
});

// Get a specific order by ID
app.get("/orders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).send("Error fetching order");
  }
});

// Update the order status (admin control)
app.patch("/orders/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(id);
    if (order) {
      order.status = status;
      await order.save();
      res.status(200).json(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).send("Error updating order status");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
