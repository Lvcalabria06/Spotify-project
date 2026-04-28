import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string, userData?: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('spotify_token'));

  useEffect(() => {
    if (token) {
      setUser({ name: 'Usuário Logado' });
    }
  }, [token]);

  const login = (newToken: string, userData?: any) => {
    setToken(newToken);
    localStorage.setItem('spotify_token', newToken);
    if (userData) setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('spotify_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
