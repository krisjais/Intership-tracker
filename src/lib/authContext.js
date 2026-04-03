"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, getAuthToken, isAuthenticated } from "./api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      const token = getAuthToken();

      if (token && currentUser) {
        setUser(currentUser);
        setIsAuth(true);
      } else {
        setUser(null);
        setIsAuth(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Also set as cookie for middleware to use
    if (typeof document !== "undefined") {
      document.cookie = `authToken=${token}; path=/;`;
    }
    
    setUser(userData);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    
    // Clear cookie
    if (typeof document !== "undefined") {
      document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
