import { Toaster as HotToaster } from "react-hot-toast";
import { useThemeMode } from "../lib/theme/use-theme-mode";
import { useThemeColors } from "../lib/theme/use-theme-colors";

export const AppToaster = () => {
  const colors = useThemeColors();
  const { mode } = useThemeMode();

  return (
    <HotToaster
      key={mode}
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          border: `1px solid ${colors.border}`,
          background: colors.cardBg,
          color: colors.text,
          boxShadow: colors.cardShadow,
        },
      }}
    />
  );
};
