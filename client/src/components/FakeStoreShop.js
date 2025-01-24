import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/bazarSlice"; // Assuming you have this slice in your Redux store
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsArrowRight } from "react-icons/bs";

const FakeStoreShop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapiserver.reactbd.com/products"
        );

        const productsFromFakeStore = response.data.map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          image: product.image,
          description: product.description, // Include description for detail page
        }));

        setProducts(productsFromFakeStore);

        const uniqueCategories = [
          "all",
          ...new Set(productsFromFakeStore.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products from FakeStore API:", error);
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

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">FakeStore Shop</h1>
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="w-full relative group">
              <div
                onClick={() => handleDetails(product)}
                className="w-full h-72 md:h-96 cursor-pointer overflow-hidden"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-110 duration-500"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="w-full border-[1px] px-2 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="font-titleFont text-sm md:text-base font-bold">
                    {product.title.substring(0, 50)}...
                  </h2>
                  <div className="text-xs md:text-sm relative w-20 md:w-28 flex justify-end overflow-hidden">
                    <div className="flex gap-2 transform group-hover:translate-x-24 transition-transform duration-500">
                      <p className="font-semibold">${product.price}</p>
                    </div>
                    <p
                      onClick={() => {
                        dispatch(
                          addToCart({
                            id: product.id,
                            title: product.title,
                            image: product.image,
                            price: product.price,
                            quantity: 1,
                          })
                        );
                        toast.success(`${product.title} added to cart`);
                      }}
                      className="absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex items-center gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0 transition-transform cursor-pointer duration-500"
                    >
                      Add to Cart
                      <span>
                        <BsArrowRight />
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-xs md:text-sm capitalize">
                  Category: {product.category}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
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

export default FakeStoreShop;
