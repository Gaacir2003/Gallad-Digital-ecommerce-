import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";




import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import ProfilePage from "./Pages/ProfilePage";
import ContactPage from "./Pages/ContactPage";
import AboutPage from "./Pages/AboutPage";
import Footer from "./Components/Footer";
import ProductsPage from "./Pages/ProductsPage";
import { ToastContainer } from 'react-toastify';
import { CartProvider } from "./context/cartContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import CartPage from './Pages/CartPage'


function App() {
   
  return (
    <AuthProvider>
       <CartProvider >
     
        <ToastContainer />
        <NavBar />
        <Routes>
           <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                
                <CartPage />
              </ProtectedRoute>
            }
          />
           <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
         
          <Route path="/contact" element={<ContactPage />} />
         
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer/>
       
        </CartProvider>
      
    </AuthProvider>
  );
}

export default App;
