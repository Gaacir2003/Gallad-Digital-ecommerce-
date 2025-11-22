import React from "react";
import { supabase } from "../Lib/supabaseClient";

const CartItem = ({ item }) => {
  const increase = async () => {
    await supabase
      .from("carts")
      .update({ quantity: item.quantity + 1 })
      .eq("id", item.id);
  };

  const decrease = async () => {
    if (item.quantity > 1) {
      await supabase
        .from("carts")
        .update({ quantity: item.quantity - 1 })
        .eq("id", item.id);
    } else {
      await supabase.from("carts").delete().eq("id", item.id);
    }
  };

  return (
    <div className="flex justify-between items-center border p-2 rounded">
      <span>{item.product.title}</span>
      <div className="flex items-center gap-2">
        <button onClick={decrease} className="bg-red-500 text-white px-2 rounded">-</button>
        <span>{item.quantity}</span>
        <button onClick={increase} className="bg-green-500 text-white px-2 rounded">+</button>
      </div>
      <span>${item.product.price * item.quantity}</span>
    </div>
  );
};

export default CartItem;
