import { PropsWithChildren } from "react";

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
  const { layout } = useLayout();

  return [
    <div
      key={`view-wrapper-${layoutName}`}
      id={`view-${layoutName}`}
      style={{ display: layout[layoutName] ? undefined : "none" }}
      className="h-full view px-4 py-2"
    >
      {children}
    </div>,
    canResize && (
      <div
        onPointerDown={onPointerDown}
        key={`view-resizer-${layoutName}`}
        id={`view-resizer-${layoutName}`}
        style={{ display: layout[layoutName] ? undefined : "none" }}
        className="view resize absolute top-0 h-full border-r border-r-resizer hover:border-r-resizerActive hover:border-dashed px-2 cursor-all-scroll"
      ></div>
    ),
  ];
}
