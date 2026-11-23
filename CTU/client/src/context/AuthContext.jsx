import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fanfun_user');
      return saved ? JSON.parse(saved) : {
        id: "cust-01",
        name: "Nguyễn Văn An",
        email: "nguyenvanan@gmail.com",
        phone: "0912 345 678",
        tier: "VIP Gold",
        address: "Căn hộ 1806, Tòa Landmark 3, Vinhomes Central Park, TP.HCM",
        isAdmin: true
      };
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('fanfun_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fanfun_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: Boolean(user?.isAdmin) }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
