import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Banner from "./components/Banner";
import Products from "./components/Products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const data = useLoaderData();

  useEffect(() => {
    setProducts(data.data);
  }, [data]);

  // Show the "Go to Top" button when the user scrolls down 100px
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  // Scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Banner />
      <Products products={products} />
      <br />
      <br />

      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-blue-500 text-white p-3 rounded-full shadow-md transition-opacity duration-300 hover:bg-blue-600"
          style={{
            opacity: showScrollTop ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Home;
