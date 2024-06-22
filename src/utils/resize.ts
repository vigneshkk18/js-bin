import { LayoutState, useLayoutHook } from "hooks/useLayout";
import { views, viewResizers } from "src/hooks/useResize";
import { entries } from "./common";
import { PointerEventHandler } from "react";

export const getViewSize = (layout: LayoutState) => {
  const enabledViews = Object.values(layout).filter(
    (selected) => selected
  ).length;
  return window.innerWidth / enabledViews;
};

let x = 0,
  resizer: HTMLDivElement | null,
  neighbourLeftEl: HTMLDivElement | null,
  neighbourRightEl: HTMLDivElement | null,
  resizerL = 0,
  neighbourLeftW = 0,
  neighbourRightW = 0;

export const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
  const layout = useLayoutHook.getState();
  const resizeEl = event.target as HTMLDivElement;
  resizer = resizeEl;
  resizerL = parseInt(resizeEl.style.left);
  resizeEl.setPointerCapture(event.pointerId);

  const resizeIdx = Object.values(viewResizers).findIndex(
    (el) => el === resizeEl
  );
  entries(views).forEach(([layoutName, el], idx) => {
    if (idx <= resizeIdx && layout[layoutName]) {
      neighbourLeftEl = el;
      neighbourLeftW = el.getBoundingClientRect().width;
    }
    if (idx > resizeIdx && layout[layoutName] && !neighbourRightEl) {
      neighbourRightEl = el;
      neighbourRightW = el.getBoundingClientRect().width;
    }
  });
  console.log(neighbourLeftEl, neighbourRightEl, resizeEl, resizeIdx);
  x = event.clientX;

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
};

const onPointerMove = (event: PointerEvent) => {
  const dx = event.clientX - x;
  const newNeighbourLeftW = neighbourLeftW + dx;
  const newNeighbourRightW = neighbourRightW - dx;

  if (newNeighbourLeftW < 100 || newNeighbourRightW < 100) return;

  if (neighbourLeftEl) neighbourLeftEl.style.width = `${newNeighbourLeftW}px`;
  if (neighbourRightEl)
    neighbourRightEl.style.width = `${newNeighbourRightW}px`;
  if (resizer) {
    resizer.style.left = `${resizerL + dx}px`;
    resizer.style.cursor = "ew-resize";
  }
};

const onPointerUp = (event: PointerEvent) => {
  resizer?.releasePointerCapture(event.pointerId);
  if (resizer) resizer.style.cursor = "";

  resizer = neighbourLeftEl = neighbourRightEl = null;

  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
  window.removeEventListener("pointercancel", onPointerUp);
};
