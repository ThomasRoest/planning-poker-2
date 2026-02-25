import { useThemeMode } from "./use-theme-mode";


export const useThemeColors = () => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  return {
    isDark,
    appBg: isDark ? "#111827" : "#fbfcfc",
    surface: isDark ? "#141c2f" : "#fbfcfc",
    footerBg: isDark ? "#1c2638" : "#d7dde5",
    border: isDark ? "#2f3f5f" : "#bfc8d4",
    text: isDark ? "#d7dde8" : "#232d3a",
    heading: isDark ? "#6d7e9a" : "#64748b",
    mutedText: isDark ? "#9ba9bf" : "#6f7f94",
    brand: "#2d9897",
    cardBg: isDark ? "#141c2f" : "#fbfcfc",
    cardShadow: isDark
      ? "0 0 0 rgba(0, 0, 0, 0)"
      : "0 2px 4px rgba(15, 23, 42, 0.10), 0 10px 24px rgba(15, 23, 42, 0.08)",
    headerShadow: isDark
      ? "0 0 0 rgba(0, 0, 0, 0)"
      : "0 2px 4px rgba(15, 23, 42, 0.09), 0 6px 14px rgba(15, 23, 42, 0.07)",
    neutralButtonBg: isDark ? "#2b3346" : "#dce2ea",
    neutralButtonColor: isDark ? "#d7dde8" : "#374151",
    activeVoteBg: isDark ? "#6bcac2" : "#74d2c8",
    rowSuccessBg: isDark ? "#286a49" : "#b5ebc8",
    rowSuccessIcon: isDark ? "#53cd8a" : "#2eae67",
    iconBtnBg: isDark ? "#212b3f" : "#e1e7ee",
  };
};
