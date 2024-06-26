import { PropsWithChildren } from "react";

import useLayout from "hooks/useLayout";
import useLoading from "hooks/useLoading";

export default function LoadingDialog({ children }: PropsWithChildren) {
  const isLoading = useLoading();
  const { layout } = useLayout();
  const layoutSelected = Object.values(layout).some((selected) => selected);

  return (
    <div className={`relative w-full h-full ${layoutSelected ? "" : "hidden"}`}>
      {children}
      <div
        className={
          isLoading
            ? "absolute top-0 left-0 z-[60] w-full h-full bg-black/10"
            : "hidden"
        }
      ></div>
      <div
        className={
          isLoading
            ? "z-[70] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : "hidden"
        }
      >
        <div className="loading-dialog">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
