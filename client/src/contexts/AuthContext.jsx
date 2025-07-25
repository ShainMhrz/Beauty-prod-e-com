import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Mock user data
const MOCK_USER = {
  id: "user123",
  name: "Demo User",
  email: "demo@example.com",
  role: "user",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Simulate API response with mock data
        setUser(MOCK_USER);
      }
      setLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      setLoading(false);
    }
  };

  const login = (email, password) => {
    // Simulate successful login with mock data
    if (email && password) {
      const token = "mock-jwt-token";
      localStorage.setItem("token", token);
      setUser(MOCK_USER);
      return { success: true };
    }
    return {
      success: false,
      error: "Invalid email or password",
    };
  };

  const register = (userData) => {
    // Simulate successful registration with mock data
    if (userData && userData.email) {
      const token = "mock-jwt-token";
      localStorage.setItem("token", token);
      setUser({
        ...MOCK_USER,
        name: userData.name || MOCK_USER.name,
        email: userData.email,
      });
      return { success: true };
    }
    return {
      success: false,
      error: "Registration failed",
    };
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
