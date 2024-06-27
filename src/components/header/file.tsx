import { useLocation, useRoute } from "wouter";
import { useRef, useState } from "react";

import Button from "ui/button";
import FileMenu from "components/header/file-menu";

import CaretDown from "assets/caret-down";
import Dialog from "components/dialog/dialog";
import DeleteActions, {
  title as DeleteTitle,
} from "components/dialogs/delete-bin";
import {
  title as OpenTitle,
  Actions as OpenActions,
  Content as OpenContent,
} from "components/dialogs/open-bin";
import {
  title as Title,
  Actions as TitleActions,
  Content as TitleContent,
} from "components/dialogs/title-bin";

import useShortcut from "hooks/useShortcut";

export default function File() {
  const [dialog, setDialog] = useState({
    title: "",
    content: <></>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    actions: (_p: { onClose: () => void }) => <></>,
  });
  const [isBinPage] = useRoute("/:binId/");
  const [, navigate] = useLocation();
  const dialogRef = useRef<{ openDialog: () => void }>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const onDeleteMenuClick = () => {
    setDialog({
      title: DeleteTitle,
      content: <></>,
      actions: DeleteActions,
    });
  };

  const onOpenMenuClick = () => {
    setDialog({
      title: OpenTitle,
      content: <OpenContent />,
      actions: OpenActions,
    });
  };

  const onNewMenuClick = () => {
    navigate("/");
  };

  const onTitleMenuClick = () => {
    setDialog({
      title: Title,
      content: <TitleContent />,
      actions: TitleActions,
    });
  };

  const onMenuClick = (target: "delete" | "title" | "open" | "new") => () => {
    closeMenu();
    dialogRef.current?.openDialog();
    if (target === "delete") onDeleteMenuClick();
    if (target === "open") onOpenMenuClick();
    if (target === "new") onNewMenuClick();
    if (target === "title") onTitleMenuClick();
  };

  useShortcut(
    isBinPage
      ? { key: "delete", ctrlKey: true, shiftKey: true }
      : { key: "None" },
    onMenuClick("delete")
  );

  useShortcut({ key: "o", ctrlKey: true, shiftKey: true }, onMenuClick("open"));

  useShortcut({ key: "n", ctrlKey: true, shiftKey: true }, onNewMenuClick);

  return (
    <div className="relative hidden sm:block">
      <Button
        onClick={openMenu}
        className="flex items-center gap-1 text-sm px-2 border-x border-transparent hover:bg-buttonHover hover:border-x-button"
      >
        <span>File</span>
        <CaretDown width={10} height={10} color="#232323" />
      </Button>
      <FileMenu
        isOpen={isOpen}
        onMenuClick={onMenuClick}
        closeMenu={closeMenu}
      />
      <Dialog
        ref={dialogRef}
        title={dialog.title}
        content={dialog.content}
        action={dialog.actions}
      />
    </div>
  );
}
