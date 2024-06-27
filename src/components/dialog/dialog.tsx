import { createPortal } from "react-dom";
import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";

interface Dialog {
  title?: string;
  action?: (props: { onClose: () => void }) => ReactNode;
  content: ReactNode;
}

const Dialog = forwardRef(
  ({ title = "", content, action: Action = () => "" }: Dialog, ref: any) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openDialog = () => {
      if (!dialogRef.current) return;
      dialogRef.current.showModal();

      const dialogCoords = dialogRef.current.getBoundingClientRect();

      const fn = (ev: MouseEvent) => {
        if (
          ev.clientX >= dialogCoords.x &&
          ev.clientX <= dialogCoords.x + dialogCoords.width &&
          ev.clientY >= dialogCoords.y &&
          ev.clientY <= dialogCoords.y + dialogCoords.height
        )
          return;
        closeDialog();
        window.removeEventListener("click", fn);
      };
      setTimeout(() => window.addEventListener("click", fn), 0);
    };

    const closeDialog = () => {
      if (!dialogRef.current) return;
      dialogRef.current.close();
    };

    useImperativeHandle(ref, () => ({
      openDialog,
    }));

    return createPortal(
      <dialog
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 p-6 rounded-md shadow-lg max-h-none max-w-none w-max h-max backdrop:bg-black/50"
        ref={dialogRef}
      >
        {title && <h1 className="text-2xl font-bold mb-3">{title}</h1>}
        {content}
        <form className="w-full mt-3" method="dialog">
          <Action onClose={closeDialog} />
        </form>
      </dialog>,
      document.body
    );
  }
);

export default Dialog;
