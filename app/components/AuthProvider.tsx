"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';

type User = { email: string; isAdmin: boolean } | null;

interface AuthContextValue {
  user: User;
  login: (email: string, makeAdmin?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('breezecars_user');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const login = (email: string, makeAdmin = true) => {
    const u: User = { email, isAdmin: makeAdmin };
    setUser(u);
    localStorage.setItem('breezecars_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('breezecars_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
