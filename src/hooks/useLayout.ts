import { useEffect } from "react";
import { create } from "zustand";
import { useSearch, useLocation } from "wouter";

import { keys, split } from "utils/common";

export type Layout = "html" | "css" | "js" | "console" | "output";
const Layouts: Layout[] = ["html", "css", "js", "console", "output"];
const allowedLayouts = new Set(Layouts);

const useLayoutHook = create<Record<Layout, boolean>>(() => ({
  html: false,
  css: false,
  js: false,
  console: false,
  output: false,
}));

export const toggleLayout = (layout: Layout) => () => {
  useLayoutHook.setState({ [layout]: !useLayoutHook.getState()[layout] });
};

export default function useLayout() {
  const search = useSearch();
  const layout = useLayoutHook();
  const [pathname, navigate] = useLocation();

  useEffect(() => {
    // enable selected layouts from search string.
    const enabledLayout = split<Layout>(search, ",").reduce((acc, str) => {
      const supported = allowedLayouts.has(str);
      if (!str.length || !supported) return acc;
      acc[str as Layout] = true;
      return acc;
    }, {} as Record<Layout, boolean>);

    // set default value to false
    Layouts.forEach((layout) => {
      if (!(layout in enabledLayout)) {
        enabledLayout[layout] = false;
      }
    });
    useLayoutHook.setState(enabledLayout);
  }, [search]);

  const toggleLayout = (currLayout: Layout) => () => {
    const updatedLayout = { ...layout };
    updatedLayout[currLayout] = !updatedLayout[currLayout];
    const enabledLayoutKeys = keys(updatedLayout).filter(
      (key) => updatedLayout[key]
    );
    navigate(`${pathname}?${enabledLayoutKeys.join(",")}`, { replace: true });
  };

  return { layout, toggleLayout };
}
