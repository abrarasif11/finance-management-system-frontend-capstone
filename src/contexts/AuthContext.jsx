/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const useUser = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        { email, password }
      );

      if (res.status === 200) {
        const userData = {
          ...res.data,
        };

        // Save user data to context and localStorage
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // Save token in cookies for authenticated API requests
        Cookies.set("XTOKEN", res.data.token, { expires: 1 });

        return {
          message: res?.data?.message,
          success: res?.data?.success,
          statusCode: res?.status,
        };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!", {
        position: "top-right",
      });
    }
  };

  const logout = () => {
    try {
      // Clear user data from context, localStorage, and cookies
      setUser(null);
      localStorage.removeItem("user");
      Cookies.remove("XTOKEN");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  useEffect(() => {
    // Restore user data from localStorage when the app initializes
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
