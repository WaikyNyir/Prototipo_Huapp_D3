import React, { createContext, useContext, useState, useCallback } from 'react';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
}

// Mock Google users (demonstration only)
const MOCK_GOOGLE_USER: MockUser = {
  id: 'user-001',
  name: 'Ana Llancaleo',
  email: 'ana.llancaleo@gmail.com',
  avatar: 'AL',
  joinDate: 'Mayo 2026',
};

interface AuthContextType {
  user: MockUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    // Simulate Google OAuth flow (1.8 sec delay)
    await new Promise(resolve => setTimeout(resolve, 1800));
    setUser(MOCK_GOOGLE_USER);
    setIsLoading(false);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
