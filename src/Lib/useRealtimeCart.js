import { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export const useRealtimeCart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      const { data } = await supabase.from("carts").select("*").eq("user_id", user.id);
      setCart(data);
    };
    fetchCart();

    const subscription = supabase
      .channel("public:carts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "carts", filter: `user_id=eq.${user.id}` },
        (payload) => {
          if (payload.eventType === "INSERT") setCart((prev) => [...prev, payload.new]);
          if (payload.eventType === "UPDATE")
            setCart((prev) =>
              prev.map((item) => (item.id === payload.new.id ? payload.new : item))
            );
          if (payload.eventType === "DELETE")
            setCart((prev) => prev.filter((item) => item.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [user]);

  return cart;
};
