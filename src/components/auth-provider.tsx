import {
  createContext,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Navigate } from "react-router-dom";

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

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const mockLogin = useCallback((password: string) => {
    return new Promise<{ success: boolean }>((resolve, reject) => {
      setTimeout(() => {
        if (password === import.meta.env.VITE_PASSWORD) {
          setIsAuthenticated(true);
          resolve({
            success: true,
          });
        } else {
          reject({
            success: false,
            message: "Incorrect password",
          });
        }
      }, 500);
    });
  }, []);

  const value = useMemo(() => {
    return {
      signIn: mockLogin,
      isAuthenticated,
    };
  }, [isAuthenticated, mockLogin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const PrivateRoute = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const auth = useAuthContext();
  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
