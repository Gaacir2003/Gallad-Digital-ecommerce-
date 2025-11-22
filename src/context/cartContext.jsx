import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../Lib/supabaseClient";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) fetchCart();
    else setCart([]);
  }, [user]);

  
  const fetchCart = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching cart:", error);
      return;
    }

    setCart(data || []);
  };

  const addToCart = async (product) => {
    if (!user) {
      alert("Please sign in first");
      return;
    }

    const { data, error } = await supabase
      .from("carts")
      .insert([
        {
          user_id: user.id,
          product_id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1,
        },
      ])
      .select(); 

    if (error) {
      console.error("Add to cart error:", error);
      alert("Failed to add to cart");
      return;
    }

    
    setCart((prev) => [...prev, data[0]]);
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
