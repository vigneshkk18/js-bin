import { PropsWithChildren, useRef } from "react";

import useLayout, { Layout } from "hooks/useLayout";

import { onPointerDown } from "src/utils/resize";

interface WithView {
  canResize?: boolean;
  layoutName: Layout;
}

export default function WithView({
  canResize = true,
  children,
  layoutName,
}: PropsWithChildren<WithView>) {
  const ref = useRef<HTMLDivElement>(null);
  const { layout } = useLayout();

  function onClick() {
    if (!ref.current) return;
    const coords = ref.current.getBoundingClientRect();

    const fn = (event: MouseEvent) => {
      if (!ref.current) return;
      if (
        event.clientX >= coords.x &&
        event.clientX <= coords.x + coords.width &&
        event.clientY >= coords.y &&
        event.clientY <= coords.y + coords.height
      )
        return;
      ref.current.classList.remove("view-focused");
      window.removeEventListener("click", fn);
    };

    ref.current.classList.add("view-focused");
    setTimeout(() => window.addEventListener("click", fn), 500);
  }

  return [
    <div
      key={`view-wrapper-${layoutName}`}
      id={`view-${layoutName}`}
      onClick={onClick}
      ref={ref}
      tabIndex={0}
      style={{ display: layout[layoutName] ? undefined : "none" }}
      className="h-full view"
    >
      {children}
    </div>,
    canResize && (
      <div
        onPointerDown={onPointerDown}
        key={`view-resizer-${layoutName}`}
        id={`view-resizer-${layoutName}`}
        style={{ display: layout[layoutName] ? undefined : "none" }}
        className="view resize absolute top-0 h-full border-r border-r-resizer hover:border-r-resizerActive hover:border-dashed cursor-all-scroll z-[1]"
      ></div>
    ),
  ];
}
