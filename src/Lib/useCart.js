import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useCart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    if (!user) {
      navigate("/signin");
      return;
    }

    const { data: existing } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .single();

    if (existing) {
      await supabase
        .from("carts")
        .update({ quantity: existing.quantity + 1 })
        .eq("id", existing.id);
    } else {
      await supabase.from("carts").insert({
        user_id: user.id,
        product_id: productId,
        quantity: 1,
      });
    }
  };

  return { addToCart };
};
