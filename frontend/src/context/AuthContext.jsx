"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check token initially
  useEffect(() => {
    const checkAuth = () => {
      const token = document.cookie.split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];

      setUser(token ? { token } : null);
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Listen for storage changes (when login happens)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = document.cookie.split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];

      setUser(token ? { token } : null);
    };

    // Check token every 500ms for real-time updates
    const interval = setInterval(handleStorageChange, 500);
    console.log("interval")
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
