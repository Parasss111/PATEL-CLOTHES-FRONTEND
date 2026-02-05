import { createContext, useContext, useEffect, useState } from "react";
import api from "../API/Axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Load user on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // ✅ Login
  const login = async (data) => {
    const res = await api.post("/api/auth/login", data);

    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  // ✅ Signup
  const signup = async (data) => {
    const res = await api.post("/api/auth/signup", data);

    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  // ✅ Logout
  const logout = async () => {
    await api.post("/api/auth/logout");

    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
