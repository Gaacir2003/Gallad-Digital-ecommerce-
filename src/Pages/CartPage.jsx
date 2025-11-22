import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching Cart
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("carts")
          .select("*")
          .eq("user_id", user.id);

        if (!error) setCartItems(data || []);
      } else {
        const local = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(local);
      }
      setLoading(false);
    };

    fetchCart();
  }, []);

  // Updating Quantity
  const updateQuantity = async (id, newQty) => {
    if (newQty <= 0) return deleteItem(id);

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );

    await supabase.from("carts").update({ quantity: newQty }).eq("id", id);
  };

  // Deleting Items
  const deleteItem = async (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    await supabase.from("carts").delete().eq("id", id);
  };

  // Calculating Total
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-700">
        Your Shopping Cart
      </h2>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-5">

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white shadow-md rounded-lg p-4 gap-4 hover:shadow-lg transition"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md border"
              />

              {/* Product Details*/}
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-orange-700 font-semibold text-xl">
                  ${item.price}
                </p>

                {/* Controlling Quantity */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    –
                  </button>

                  <span className="font-semibold text-lg">{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Deleting Section*/}
              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-500 font-bold text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Payment Section */}
          <div className="bg-white p-5 rounded-lg shadow-md mt-5">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button className="w-full mt-4 bg-orange-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-800 transition">
              Pay Now
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
