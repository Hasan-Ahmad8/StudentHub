import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth_id, setAuthID] = useState(() => localStorage.getItem("auth_id"));

  const login = (id) => {
    localStorage.setItem("auth_id", id);
    setAuthID(id);
  };

  const logout = () => {
    localStorage.removeItem("auth_id");
    setAuthID(null);
  };

  return (
    <AuthContext.Provider value={{ auth_id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

