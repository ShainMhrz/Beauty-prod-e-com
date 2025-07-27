import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import ProductShowcase from "./components/ProductShowcase.jsx";
import BeautyTips from "./components/BeautyTips.jsx";
import Gallery from "./components/Gallery.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app">
      {!isLoginPage && <Navbar />}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <ProductShowcase />
                <BeautyTips />
                <Gallery />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
