import { createContext, useContext } from "react";

interface AuthContextValue {
  signIn: (value: string) => Promise<{ success: boolean }>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("Expected AuthContext");
  }

  return context;
};
