import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { products as allProducts } from "../Data/productsData";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const { addToCart } = useCart();
  const { user } = useAuth(); // ✅ USER CHECK ADDED

  // -----------------------------------------
  // Add to cart with sign-in check
  // -----------------------------------------
  const handleAddToCart = (product) => {
    if (!user) {
      toast.warning("Please sign in first"); // ⛔ stop here
      return;
    }

    addToCart(product);
    toast.success(`🛒 ${product.name} added to cart!`);
  };

  // Filtering
  const filteredProducts = allProducts
    .filter((p) => (category === "All" ? p : p.category === category))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-orange-700">Our Products</h1>

      <div className="flex gap-10">
        {/* Left Side */}
        <div className="w-1/4 hidden md:block">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-3">
            {["All", "Electronics", "Fashion"].map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer hover:text-orange-700 transition ${
                  category === cat && "font-bold text-orange-700"
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Products Content */}
        <div className="w-full md:w-3/4">

          {/* Search + Sort */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 rounded-md py-2 px-4 w-full md:w-1/2 focus:ring-2 focus:ring-orange-600 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-orange-600 outline-none"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg shadow-md hover:shadow-xl transition hover:-translate-y-1 p-4 relative bg-white"
              >
                {/* Discount */}
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded shadow">
                  -{p.discount}%
                </span>

                {/* Category */}
                <span className="absolute top-3 right-3 bg-orange-600 text-white text-xs px-2 py-1 rounded shadow">
                  {p.category}
                </span>

                {/* Image */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-md"
                />

                {/* Title */}
                <h2 className="mt-4 text-lg font-semibold">{p.name}</h2>

                {/* Prices */}
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-orange-700 font-bold text-xl">${p.price}</p>
                  <p className="line-through text-gray-400 text-md">${p.oldPrice}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center text-yellow-500 mt-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <FaStar
                      key={num}
                      className={`${
                        num <= Math.round(p.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-gray-500 text-sm ml-2">
                    {p.rating.toFixed(1)}
                  </span>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleAddToCart(p)}
                  className="w-full mt-4 bg-orange-700 text-white py-2 rounded-md hover:bg-orange-800 transition cursor-pointer"
                >
                  Add to Cart
                </button>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
