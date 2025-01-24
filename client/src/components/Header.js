import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartImg, logoDark, userAvatar } from "../assets/index";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [theme, setTheme] = useState("light"); // Initialize with "light"
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapiserver.reactbd.com/products");
        const data = await response.json();
        setProducts(data); // Store fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    // Check if the user prefers dark or light mode
    const userPrefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (userPrefersDarkMode) {
      setTheme("dark"); // Set the theme to dark if the system prefers dark
    } else {
      setTheme("light"); // Set the theme to light if the system prefers light
    }
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      // Filter products based on the search query
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  // Handle search result click
  const handleSearchResultClick = (product) => {
    navigate(`/product/${product.id}`, { state: { item: product } });
    setSearchQuery("");
    setFilteredProducts([]);
  };

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Set the theme (dark or light) on the body element
  useEffect(() => {
    document.body.classList.remove("dark", "light"); // Remove both classes before adding the new one
    document.body.classList.add(theme); // Add the theme class (dark or light)
  }, [theme]); // Update whenever the theme state changes

  return (
    <div className="w-full h-20 bg-white font-serif font-light border-b-[1px] border-b-gray-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="animate-pulse">
            <img className="w-28" src={logoDark} alt="logoDark" />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="relative w-full max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 font-serif font-light"
          />
          {/* Display search results */}
          {searchQuery && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md shadow-md mt-2 max-h-60 overflow-y-auto z-10">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-100 transition-all cursor-pointer"
                    onClick={() => handleSearchResultClick(product)}
                  >
                    {product.title}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No products found</li>
              )}
            </ul>
          )}
        </div>

        {/* Icons & Menu */}
        <div className="flex items-center gap-8 relative">
          {/* Dropdown Menu Toggle */}
          <div
            onClick={toggleMenu}
            className={`text-3xl cursor-pointer transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 text-red-500" : "rotate-0 text-black"
            }`}
          >
            {isMenuOpen ? "×" : "="}
          </div>

          {/* Dropdown Menu */}
          <div
            className={`absolute top-20 right-0 w-48 bg-white border rounded-md shadow-lg overflow-hidden transform transition-all duration-700 ${
              isMenuOpen
                ? "opacity-100 translate-y-0 max-h-[600px]"
                : "opacity-0 -translate-y-10 max-h-0"
            }`}
          >
            <ul className="flex flex-col">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-3 hover:bg-gray-100 transition-all"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="block px-4 py-3 hover:bg-gray-100 transition-all"
                >
                  NEW ARRIVALS
                </Link>
              </li>
              <li>
                <Link
                  to="/the-classic"
                  className="block px-4 py-3 hover:bg-gray-100 transition-all"
                >
                  THE CLASSIC
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="block px-4 py-3 hover:bg-gray-100 transition-all"
                >
                  OUR STORY
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="block px-4 py-3 hover:bg-gray-100 transition-all"
                >
                  COMMUNITY
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="block px-4 py-3 hover:bg-gray-100 transition-all"
                >
                  CART
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block px-4 py-3 hover:bg-gray-100 transition-all"
                >
                  LOGIN
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
