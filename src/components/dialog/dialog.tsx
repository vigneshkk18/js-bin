import { createPortal } from "react-dom";
import {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

interface Dialog {
  title?: string;
  closable?: boolean;
  action?: (props: { onClose: () => void }) => ReactNode;
  content: ReactNode;
}

const Dialog = forwardRef(
  (
    { title = "", content, action: Action = () => "", closable = true }: Dialog,
    ref: any
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const backdropClose = useCallback((ev: MouseEvent) => {
      if (!dialogRef.current) return;
      const dialogCoords = dialogRef.current.getBoundingClientRect();
      if (
        ev.clientX >= dialogCoords.x &&
        ev.clientX <= dialogCoords.x + dialogCoords.width &&
        ev.clientY >= dialogCoords.y &&
        ev.clientY <= dialogCoords.y + dialogCoords.height
      )
        return;
      closeDialog();
      window.removeEventListener("click", backdropClose);
    }, []);

    const openDialog = () => {
      if (!dialogRef.current) return;
      dialogRef.current.showModal();

      if (closable)
        setTimeout(() => window.addEventListener("click", backdropClose), 0);
    };

    const closeDialog = useCallback(() => {
      if (!dialogRef.current) return;
      dialogRef.current.close();
      window.removeEventListener("click", backdropClose);
    }, []);

    useImperativeHandle(ref, () => ({
      openDialog,
    }));

    return createPortal(
      <dialog
        className="w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 p-6 rounded-md shadow-lg max-h-none max-w-none md:w-max h-max backdrop:bg-black/50"
        ref={dialogRef}
      >
        {title && <h1 className="text-2xl font-bold mb-3">{title}</h1>}
        {content}
        <form
          className="w-full mt-3"
          method="dialog"
          onSubmit={(e) => e.preventDefault()}
        >
          <Action onClose={closable ? closeDialog : () => {}} />
        </form>
      </dialog>,
      document.body
    );
  }
);

export default Dialog;
