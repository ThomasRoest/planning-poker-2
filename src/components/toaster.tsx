import { Toaster as HotToaster, toast } from "react-hot-toast";
import { useThemeColors, useThemeMode } from "../lib/theme";

type ToastType = "success" | "error" | "loading" | "info";

type CreateToastInput = {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
};

export const toaster = {
  create: ({ title, description, type = "info", duration = 3000 }: CreateToastInput) => {
    const message = description ? `${title}\n${description}` : title;

    if (type === "success") {
      return toast.success(message, { duration });
    }

    if (type === "error") {
      return toast.error(message, { duration });
    }

    if (type === "loading") {
      return toast.loading(message, { duration });
    }

    return toast(message, { duration, icon: "ℹ️" });
  },
};

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
