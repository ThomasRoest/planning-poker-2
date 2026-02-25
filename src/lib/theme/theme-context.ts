import { createContext } from "react";

export type AppColorMode = "light" | "dark";

export type ThemeModeContextValue = {
  mode: AppColorMode;
  toggleMode: () => void;
};

export const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);
