import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useRealtimeCart } from "../Lib/useRealtimeCart";
import { supabase } from "../Lib/supabaseClient";


export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user: authUser, signOut } = useAuth();
  const cart = useRealtimeCart();

  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const load = async () => {
      const ctxUser = authUser || null;

      if (ctxUser) {
        setUser(ctxUser);
        setAvatarUrl(
          ctxUser.user_metadata?.avatar_url ||
          ctxUser.user_metadata?.avatar ||
          ""
        );
      } else {
        const { data } = await supabase.auth.getUser();
        const u = data?.user || null;
        setUser(u);
        setAvatarUrl(u?.user_metadata?.avatar_url || "");
      }
    };

    load();

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      (async () => {
        const { data } = await supabase.auth.getUser();
        const u = data?.user || null;
        setUser(u);
        setAvatarUrl(u?.user_metadata?.avatar_url || "");
      })();
    });

    return () => {
      if (sub?.subscription) sub.subscription.unsubscribe();
      else if (sub?.unsubscribe) sub.unsubscribe();
    };
  }, [authUser]);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="flex justify-around items-center bg-orange-700 shadow-xl py-1 text-sm font-semibold text-white">
        <h1>Summer sale for all Swim suits and free Express delivery</h1>
        <span className="font-bold">-Off -50%</span>
        <span className="font-bold text-green-500 underline cursor-pointer">Shop Now</span>
      </div>

      <header className="border-b border-orange-700 bg-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          <h1 className="font-bold text-2xl text-orange-700">Gallad Digital</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-8 font-medium">
              {navItems.map((item, i) => (
                <NavLink
                  key={i}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-md transition duration-300 ${
                      isActive ? "bg-orange-600 text-white" : "text-gray-800 hover:bg-orange-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </ul>
          </nav>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search your products..."
                className="border border-gray-300 rounded-md pl-3 pr-10 py-1.5 focus:outline-none focus:ring-2 
                focus:ring-orange-600"
              />
              <FaSearch className="absolute right-2 top-3 text-gray-400" />
            </div>

            {/* Cart */}
            <NavLink to="/cart" className="text-gray-600 hover:text-black relative">
              <FaShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-xs rounded-full px-2">
                  {cart.length}
                </span>
              )}
            </NavLink>

            {/* Login Area */}
            {!user && (
              <>
                <Link to="/signin" className="px-3 py-2 text-gray-700 hover:bg-orange-100 rounded-md">
                  Sign In
                </Link>
                <Link to="/signup" className="px-3 py-2 text-gray-700 hover:bg-orange-100 rounded-md">
                  Sign Up
                </Link>
              </>
            )}

            
            {user && (
              <div
                className="relative"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <img
                  src={
                    avatarUrl ||
                    user.user_metadata?.avatar_url ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  className="w-8 h-8 rounded-full object-cover cursor-pointer border-2 border-orange-600"
                  alt="avatar"
                />

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-50">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-orange-100">
                      Manage Profile
                    </Link>

                    
                    <Link
                      to={`/orders?items=${encodeURIComponent(JSON.stringify(cart))}`}
                      className="block px-4 py-2 hover:bg-orange-100"
                    >
                      Your Orders
                    </Link>

                    <button
                      onClick={async () => {
                        await signOut();
                        setUser(null);
                        setProfileOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-orange-100 w-full text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          
          <button className="md:hidden text-orange-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>
        </div>

        
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-orange-200 px-4 py-3">
            <NavLink className="block py-2 px-2 hover:bg-orange-100" to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink className="block py-2 px-2 hover:bg-orange-100" to="/products" onClick={() => setMenuOpen(false)}>Products</NavLink>
            <NavLink className="block py-2 px-2 hover:bg-orange-100" to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink className="block py-2 px-2 hover:bg-orange-100" to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>

            <div className="mt-3 border-t border-orange-200 pt-3">

              {/* Cart */}
              <NavLink to="/cart" onClick={() => setMenuOpen(false)} className="relative block py-2">
                <FaShoppingCart className="w-6 h-6 text-gray-700 inline-block" />
                {cart.length > 0 && (
                  <span className="ml-2 bg-red-500 text-xs rounded-full px-2">
                    {cart.length}
                  </span>
                )}
              </NavLink>

              {/* Login Area */}
              {!user && (
                <>
                  <Link to="/signin" className="block py-2 hover:bg-orange-100" onClick={() => setMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Link to="/signup" className="block py-2 hover:bg-orange-100" onClick={() => setMenuOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}

              {/* Logged In */}
              {user && (
                <>
                  <Link to="/profile" className="block py-2 hover:bg-orange-100" onClick={() => setMenuOpen(false)}>
                    Manage Profile
                  </Link>

                  
                  <Link
                    to={`/orders?items=${encodeURIComponent(JSON.stringify(cart))}`}
                    className="block py-2 hover:bg-orange-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Your Orders
                  </Link>

                 
                  <button
                    onClick={async () => {
                      await signOut();
                      setUser(null);
                      setMenuOpen(false);
                    }}
                    className="block py-2 hover:bg-orange-100 text-left w-full"
                  >
                    Sign Out
                  </button>
                </>
              )}

            </div>
          </div>
        )}
      </header>
    </div>
  );
}
