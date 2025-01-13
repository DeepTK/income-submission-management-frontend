import React, { createContext, useState, useContext, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {  
  const [authData, setAuthData] = useState({
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    role: localStorage.getItem("role") ? localStorage.getItem("role") : null,
    data: localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : null,
  });

  const setAuth = (token, role, data) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("data", JSON.stringify(data));
    setAuthData({ token, role, data });
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("data");
    setAuthData({ token: null, role: null, data: null });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token") ? localStorage.getItem("token") : null;
    const storedRole = localStorage.getItem("role") ? localStorage.getItem("role") : null;
    const storedData = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : null;
    if (storedToken && storedRole && storedData) {
      setAuthData({ token: storedToken, role: storedRole, data : storedData });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authData, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
