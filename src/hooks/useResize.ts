import { useLayoutEffect } from "react";

import useLayout, { Layout, Layouts } from "hooks/useLayout";

import { entries } from "utils/common";
import { getViewSize } from "utils/resize";

export const views = {} as Record<Layout, HTMLDivElement>;
export const viewResizers = {} as Record<Layout, HTMLDivElement>;

export default function useResize() {
  const { layout } = useLayout();

  useLayoutEffect(() => {
    // initialize global elements
    Layouts.forEach((layout) => {
      viewResizers[layout] = document.querySelector(
        `#view-resizer-${layout}`
      ) as HTMLDivElement;
      views[layout] = document.querySelector(
        `#view-${layout}`
      ) as HTMLDivElement;
    });
  }, []);

  useLayoutEffect(() => {
    const resizeLayoutToFit = () => {
      const viewSize = getViewSize(layout);
      let enabledLayout = 1;
      entries(views).forEach(([layoutName, el]) => {
        el.style.width = `${viewSize}px`;
        if (viewResizers[layoutName]) {
          viewResizers[layoutName].style.left = `${
            viewSize * enabledLayout - 8
          }px`; // 8 is half of resizer width
        }
        if (layout[layoutName]) enabledLayout += 1;
      });

      // hide the resizer for the last layout
      let lastActiveLayout: Layout | null = null;
      entries(viewResizers).forEach(([layoutName, el]) => {
        if (layout[layoutName]) lastActiveLayout = layoutName;
        if (!el) return;
        el.style.display = layout[layoutName] ? "" : "none";
      });
      if (lastActiveLayout && viewResizers[lastActiveLayout]) {
        viewResizers[lastActiveLayout as Layout].style.display = "none";
      }
    };

    resizeLayoutToFit();
    window.addEventListener("resize", resizeLayoutToFit);
    return () => window.removeEventListener("resize", resizeLayoutToFit);
  }, [layout]);
}
