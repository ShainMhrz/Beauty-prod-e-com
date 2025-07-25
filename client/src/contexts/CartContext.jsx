import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

// Mock cart data
const MOCK_CART_ITEMS = [
  {
    id: "product1",
    name: "Hydrating Face Serum",
    price: 29.99,
    image: "/images/products/serum.jpg",
    quantity: 1,
  },
  {
    id: "product2",
    name: "Volumizing Mascara",
    price: 19.99,
    image: "/images/products/mascara.jpg",
    quantity: 2,
  },
];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = () => {
    try {
      setLoading(true);
      // Simulate API call with mock data
      setTimeout(() => {
        setCart(MOCK_CART_ITEMS);
        setLoading(false);
      }, 300);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setLoading(false);
    }
  };

  const addToCart = (productId, quantity = 1) => {
    try {
      setLoading(true);

      // Simulate API call with mock data
      setTimeout(() => {
        const existingItem = cart.find((item) => item.id === productId);

        if (existingItem) {
          // Update quantity if item already exists
          setCart(
            cart.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          );
        } else {
          // Add new item with mock data
          const newItem = {
            id: productId,
            name: `Product ${productId}`,
            price: Math.floor(Math.random() * 50) + 10,
            image: "/images/products/default.jpg",
            quantity,
          };
          setCart([...cart, newItem]);
        }

        setLoading(false);
      }, 300);

      return { success: true };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        error: "Failed to add item to cart",
      };
    }
  };

  const updateQuantity = (productId, quantity) => {
    try {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        setCart(
          cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
        );
        setLoading(false);
      }, 300);

      return { success: true };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        error: "Failed to update quantity",
      };
    }
  };

  const removeFromCart = (productId) => {
    try {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        setCart(cart.filter((item) => item.id !== productId));
        setLoading(false);
      }, 300);

      return { success: true };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        error: "Failed to remove item from cart",
      };
    }
  };

  const clearCart = () => {
    try {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        setCart([]);
        setLoading(false);
      }, 300);

      return { success: true };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        error: "Failed to clear cart",
      };
    }
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
