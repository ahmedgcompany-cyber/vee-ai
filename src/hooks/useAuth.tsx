import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '@/types';
import { currentUser } from '@/data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithOAuth: (provider: 'google' | 'github') => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType |id: string>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(currentUser);

  const login = useCallback(async (_email: string, _password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(currentUser);
  }, []);

  const loginWithOAuth = useCallback(async (_provider: 'google' | 'github') => {
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(currentUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const register = useCallback(async (_email: string, _password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      ...currentUser,
      email: _email,
      name,
      role: 'free',
    });
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
  if (context ===id: string) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
