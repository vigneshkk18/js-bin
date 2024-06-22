import { useEffect } from "react";
import { create } from "zustand";
import { useSearch, useLocation } from "wouter";

import useScreenName from "hooks/useScreenName";

import { keys, split } from "utils/common";

export type Layout = "html" | "css" | "js" | "console" | "output";
export type LayoutState = Record<Layout, boolean>;
export const Layouts: Layout[] = ["html", "css", "js", "console", "output"];
const allowedLayouts = new Set(Layouts);

export const useLayoutHook = create<LayoutState>(() => ({
  html: false,
  css: false,
  js: false,
  console: false,
  output: false,
}));

export default function useLayout() {
  const screen = useScreenName();
  const search = useSearch();
  const layout = useLayoutHook();
  const [pathname, navigate] = useLocation();

  useEffect(() => {
    // enable selected layouts from search string.
    const enabledArr = split<Layout>(search, ",");
    if (!enabledArr.length) return;

    // only show one layout for mobile screens
    let enabledLayout = { [enabledArr[0]]: true };
    if (screen !== "sm") {
      enabledLayout = split<Layout>(search, ",").reduce((acc, str) => {
        const supported = allowedLayouts.has(str);
        if (!str.length || !supported) return acc;
        acc[str as Layout] = true;
        return acc;
      }, {} as Record<Layout, boolean>);
    }

    // set default value to false
    Layouts.forEach((layout) => {
      if (!(layout in enabledLayout)) {
        enabledLayout[layout] = false;
      }
    });
    useLayoutHook.setState(enabledLayout);
  }, [search, screen]);

  const toggleLayout = (currLayout: Layout) => () => {
    const updatedLayout = { ...layout };
    updatedLayout[currLayout] = !updatedLayout[currLayout];
    const enabledLayoutKeys = keys(updatedLayout).filter(
      (key) => updatedLayout[key]
    );
    navigate(`${pathname}?${enabledLayoutKeys.join(",")}`, { replace: true });
  };

  const selectLayout = (currLayout: Layout) => () => {
    navigate(`${pathname}?${currLayout}`);
  };

  return { layout, toggleLayout, selectLayout };
}
