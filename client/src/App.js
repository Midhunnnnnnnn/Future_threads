import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { productsData } from "./api/Api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ClipLoader } from "react-spinners";

// Lazy load components for better performance
const Home = lazy(() => import("./Home"));
const Product = lazy(() => import("./components/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Blog = lazy(() => import("./components/blog"));
const Shop = lazy(() => import("./components/shop")); // Original Shop: New Arrivals
const FakeStoreShop = lazy(() => import("./components/FakeStoreShop")); // New Shop: The Classic
const Community = lazy(() => import("./components/Community"));
const HelpAndSupport = lazy(() => import("./components/HelpAndSupport"));
const ChatbotPage = lazy(() => import("./components/ChatbotPage"));
const LatestTrends = lazy(() => import("./components/LatestTrends"));
const SustainableFashion = lazy(() => import("./components/SustainableFashion"));
const FashionWeekHighlights = lazy(() => import("./components/FashionWeekHighlights"));
const OrderTracking = lazy(() => import("./components/OrderTracking"));

// Admin Dashboard Component
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

const Layout = () => (
  <div>
    <Header />
    <ScrollRestoration />
    <Outlet />
    <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <Home />
          </Suspense>
        ),
        loader: productsData,
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/blog",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "/new-arrivals",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "/the-classic",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <FakeStoreShop />
          </Suspense>
        ),
      },
      {
        path: "/community",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <Community />
          </Suspense>
        ),
      },
      {
        path: "/help-and-support",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <HelpAndSupport />
          </Suspense>
        ),
      },
      {
        path: "/chatbot",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <ChatbotPage />
          </Suspense>
        ),
      },
      {
        path: "/latest-trends",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <LatestTrends />
          </Suspense>
        ),
      },
      {
        path: "/sustainable-fashion",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <SustainableFashion />
          </Suspense>
        ),
      },
      {
        path: "/fashion-week-highlights",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <FashionWeekHighlights />
          </Suspense>
        ),
      },
      {
        path: "/order-tracking",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <OrderTracking />
          </Suspense>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <Suspense fallback={<ClipLoader size={50} color="#36d7b7" />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <ClipLoader color="#36d7b7" loading={loading} size={150} />
      </div>
    );
  }

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
