import { createContext, useContext, useEffect, useState } from "react";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appLoading, setAppLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const getUserProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/user/profile`, {
        method: "GET",
        credentials: "include", 
      });

      if (res.ok) {
        const result = await res.json();
        setUser(result.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setAppLoading(false);
    }
  };

  // --------------------------
  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (res.ok) {
        setUser(result.user);
        setIsLoggedIn(true);
        ShowSuccessToast("Login successful!");
        return result.user;
      } else {
        ShowErrorToast(result.message || "Login failed!");
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        return null;
      }
    } catch (err) {
      ShowErrorToast(`Login error: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // Signup
  const signup = async (otp, name, password, otpId ) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, name, password, otpId }),
      });
      console.log(otp, name, password, otpId)
      const result = await res.json();

      if (res.ok) {
        setUser(result.user);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(result.user));
        ShowSuccessToast("Signup successful!");
        return result.user;
      } else {
        ShowErrorToast(result.message || "Signup failed!");
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        return null;
      }
    } catch (err) {
      ShowErrorToast(`Signup error: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };


  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        ShowSuccessToast("Logged out successfully!");
      } else {
        const result = await res.json();
        ShowErrorToast(result.message || "Logout failed!");
      }
    } catch (err) {
      ShowErrorToast(`Logout error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  const sendOtp = async (email) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (res.ok) {
        ShowSuccessToast("OTP sent successfully!");
        return result;
      } else {
        ShowErrorToast(result.message || "Failed to send OTP");
        return false;
      }
    } catch (err) {
      ShowErrorToast(`OTP error: ${err.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };


useEffect(() => {
  getUserProfile();
}, []);

  const sharedValues = {
    user,
    isLoggedIn,
    appLoading,
    loading,
    getUserProfile,
    login,
    signup,
    logout,
    sendOtp,
  };

  return <AuthContext.Provider value={sharedValues}>{children}</AuthContext.Provider>;
};

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
