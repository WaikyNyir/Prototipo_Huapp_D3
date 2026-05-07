import React, { createContext, useContext } from 'react';
import { useProgress } from '../hooks/useProgress';

type ProgressContextType = ReturnType<typeof useProgress>;

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const progressHook = useProgress();
  return (
    <ProgressContext.Provider value={progressHook}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgressContext must be used inside ProgressProvider');
  return ctx;
}
