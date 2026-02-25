import { useContext } from "react";
import { ThemeModeContext } from "./theme";


export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }

  return context;
};
