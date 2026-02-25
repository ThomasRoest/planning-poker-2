import { toast } from "react-hot-toast";

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
