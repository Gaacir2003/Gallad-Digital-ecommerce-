import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("carts")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          console.log("Fetch Error:", error);
          setCartItems([]);
        } else {
          setCartItems(data || []);
        }
      }

      setLoading(false);
    };

    fetchCart();
  }, []);

  // Increasing Quantity
  const increaseQty = async (id, qty) => {
    const { error } = await supabase
      .from("carts")
      .update({ quantity: qty + 1 })
      .eq("id", id);

    if (!error) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  // Decreasing Quantity
  const decreaseQty = async (id, qty) => {
    if (qty === 1) return;

    const { error } = await supabase
      .from("carts")
      .update({ quantity: qty - 1 })
      .eq("id", id);

    if (!error) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  // Deleting Items
  const deleteItem = async (id) => {
    const { error } = await supabase.from("carts").delete().eq("id", id);

    if (!error) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-700">
        Your Cart
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-2xl mx-auto space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md"
            >
              {/* Showing Image */}
              <img
                src={item.image}
                className="w-24 h-24 rounded-lg object-cover"
                alt={item.name}
              />

              {/* Products Detail */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>

                {/* Quantity Section */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id, item.quantity)}
                    className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                  >
                    <FaMinus />
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id, item.quantity)}
                    className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* delete Section*/}
              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-600 text-xl hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          ))}

         {/* Total Payment */}
          <div className="bg-white p-4 rounded-xl shadow-md text-right mt-6">
            <p className="font-bold text-xl mb-3">
              Total: ${totalPrice.toFixed(2)}
            </p>

            <button className="w-full bg-orange-700 text-white p-3 rounded-lg text-lg font-semibold hover:bg-orange-800 transition">
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
