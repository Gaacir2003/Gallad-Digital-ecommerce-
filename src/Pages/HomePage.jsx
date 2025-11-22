import React, { useEffect, useState } from "react";
import iphone17 from "../assets/iphone17.png";
import chair from "../assets/chair.jpg";
import smart from "../assets/smart.png";
import mackbook from "../assets/mackbook.png";
import Tv from "../assets/Tv.png";
import { FaArrowRight } from "react-icons/fa";
import { useCart } from "../context/cartContext";
import { products } from "../Data/productsData";





const HomePage = () => {

  const { addToCart } = useCart(); 
  const [time, setTime] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  // Counting Down
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => ({
        ...prev,
        seconds: prev.seconds > 0 ? prev.seconds - 1 : 59,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto mt-10 px-4 md:px-10">

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-black opacity-90 p-6 md:p-10 rounded-lg gap-6 md:gap-10">
        <div className="text-white text-left max-w-lg">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Up to <span className="text-red-500 text-3xl sm:text-4xl font-bold">10% Off</span> Voucher
          </h1>

          <p className="mt-2 text-sm sm:text-base">
            Your home for premium electronics at unbeatable prices. Shop smart, shop secure.
          </p>

          <button className="text-white px-4 py-2 bg-orange-700 rounded-lg hover:bg-orange-800 cursor-pointer font-bold mt-4 flex items-center gap-2">
            Shop Now <FaArrowRight />
          </button>
        </div>

        <img
          className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-lg object-cover"
          src={iphone17}
          alt="iPhone 17"
        />
      </div>

      {/* Flash Sales*/}
      <div className="p-4 md:p-6 mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <div>
            <p className="text-red-500 font-semibold">Today's</p>
            <h1 className="text-2xl sm:text-3xl font-bold">Flash Sales</h1>
          </div>

          {/* Timing*/}
          <div className="flex gap-3 md:gap-6 items-center">
            {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
              <div key={i} className="text-center">
                <p className="text-xs sm:text-sm font-medium">{label}</p>
                <p className="text-xl sm:text-2xl font-bold text-red-500">
                  {Object.values(time)[i].toString().padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2 md:gap-3">
            <button className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm md:text-xl">
              ←
            </button>
            <button className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm md:text-xl">
              →
            </button>
          </div>
        </div>

        {/* Product cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <div key={p.id} className="border rounded-xl p-4 relative shadow-sm bg-white">

              {/* Discount */}
              <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs sm:text-sm">
                {p.discount}
              </span>

              {/* Love Icon*/}
              <span className="absolute top-3 right-3 text-lg sm:text-xl cursor-pointer">
                ♡
              </span>

              <img src={p.image} alt={p.title} className="h-40 mx-auto object-contain" />

              <h3 className="mt-4 font-semibold text-sm sm:text-base">{p.title}</h3>

              <div className="flex gap-2 mt-2 items-center">
                <p className="text-red-500 font-bold text-sm sm:text-base">${p.price}</p>
                <p className="line-through text-gray-500 text-xs sm:text-sm">${p.oldPrice}</p>
              </div>

              <div className="flex items-center gap-2 mt-2 text-yellow-500 text-xs sm:text-sm">
                <span>★★★★★</span>
                <span className="text-gray-600">{p.rating}</span>
              </div>

              <button onClick={() => addToCart(p)} className="mt-4 w-full bg-orange-700 text-white py-2 rounded-lg hover:bg-orange-800 text-sm sm:text-base cursor-pointer">
                Add To Cart
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
