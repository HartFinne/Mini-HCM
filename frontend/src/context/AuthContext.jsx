import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // Auto-check token on first load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const expiration = localStorage.getItem("token_expiration");

    if (savedToken && savedRole && expiration) {
      if (Date.now() > Number(expiration)) {
        // Token expired → auto logout
        logout();
      } else {
        // Token still valid → auto login
        setToken(savedToken);
        setRole(savedRole);
      }
    }
  }, []);

  // Login
  const login = (token, role) => {
    setToken(token);
    setRole(role);

    const expiresInMs = 3600 * 1000; // 1 hour
    const expirationTime = Date.now() + expiresInMs;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("token_expiration", expirationTime);
  };

  // Logout
  const logout = () => {
    setToken(null);
    setRole(null);

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("token_expiration");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
