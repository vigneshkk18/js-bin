import { create } from "zustand";

const sideMenuHook = create(() => false);

export default function useSideMenu() {
  return sideMenuHook();
}

export const showSideMenu = () => sideMenuHook.setState(true);
export const hideSideMenu = () => sideMenuHook.setState(false);
