import { createContext, type ReactNode, useEffect, useMemo, useState } from "react";

export type AppColorMode = "light" | "dark";

type ThemeModeContextValue = {
  mode: AppColorMode;
  toggleMode: () => void;
};

export const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<AppColorMode>(() => {
    const stored = localStorage.getItem("planning-poker-color-mode");
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("planning-poker-color-mode", mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((current) => (current === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
};


