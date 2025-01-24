import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/bazarSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [escuelajsResponse, fakestoreResponse] = await Promise.all([
          axios.get("https://api.escuelajs.co/api/v1/products"),
          axios.get("https://fakestoreapi.com/products"),
        ]);

        let productsFromEscuelajs = [];
        let productsFromFakeStore = [];

        if (escuelajsResponse.data && Array.isArray(escuelajsResponse.data)) {
          productsFromEscuelajs = escuelajsResponse.data.map((product) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category?.name || "Uncategorized",
            image: product.images[0],
            description: product.description,
          }));
        }

        if (fakestoreResponse.data && Array.isArray(fakestoreResponse.data)) {
          productsFromFakeStore = fakestoreResponse.data.map((product) => ({
            id: `fake-${product.id}`,
            title: product.title,
            price: product.price,
            category: product.category,
            image: product.image,
            description: product.description,
          }));
        }

        const mergedProducts = [
          ...productsFromEscuelajs,
          ...productsFromFakeStore,
        ].slice(0, 24);
        setProducts(mergedProducts);

        const uniqueCategories = [
          "all",
          ...new Set(mergedProducts.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { item: product } });
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4">
      <ToastContainer position="top-left" autoClose={2000} />
      <h1 className="text-3xl font-bold mb-8">Shop</h1>
      <div className="mb-8">
        <label htmlFor="category" className="mr-4">
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleDetails(product)}
            className="cursor-pointer w-full bg-white shadow-md rounded-lg overflow-hidden group"
          >
            <div className="w-full h-64 md:h-80">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 duration-500"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600 mt-2">${product.price}</p>
              <p className="text-sm text-gray-500 capitalize">
                Category: {product.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
