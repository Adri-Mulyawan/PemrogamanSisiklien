import { toast } from "react-hot-toast";

export const toastSuccess = (message) =>
  toast.success(message, {
    duration: 2000,
    position: "top-right",
  });

export const toastError = (message) =>
  toast.error(message, {
    duration: 2000,
    position: "top-right",
  });

export const toastInfo = (message) =>
  toast(message, {
    duration: 2000,
    position: "top-right",
  });