import { create } from "zustand";

const loadingHook = create(() => false);

export default function useLoading() {
  return loadingHook();
}

export const showLoading = () => loadingHook.setState(true);
export const hideLoading = () => loadingHook.setState(false);
