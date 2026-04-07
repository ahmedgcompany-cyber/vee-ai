import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithOAuth: (provider: 'google' | 'github') => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultAdmin: User = {
  id: '1',
  email: 'admin@vee.ai',
  name: 'Ahmed M T Alghoul',
  role: 'admin',
  createdAt: new Date(),
  downloads: [],
  purchases: [],
  subscriptions: [],
  favorites: [],
  uploads: [],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultAdmin);

  const login = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(defaultAdmin);
  }, []);

  const loginWithOAuth = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(defaultAdmin);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const register = useCallback(async (_email: string, _password: string, name: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      id: '2',
      email: _email,
      name,
      role: 'free',
      createdAt: new Date(),
      downloads: [],
      purchases: [],
      subscriptions: [],
      favorites: [],
      uploads: [],
    };
    setUser(newUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        loginWithOAuth,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
