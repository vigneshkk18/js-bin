import { useRef } from "react";

import Button from "ui/button";

import File from "components/header/file";
import Logo from "components/header/logo";
import NPMDialog from "components/dialogs/npm-dialog";
import LayoutButtonGroup from "components/header/layout-button-group";

export default function Header() {
  const dialog = useRef<{ openDialog: () => void }>(null);

  const addPackage = () => {
    dialog.current?.openDialog();
  };

  return (
    <header className="w-full flex items-stretch justify-between bg-headerLight border-b border-b-light">
      <div className="flex gap-1 h-full">
        <Logo />
        <File />
        <Button
          className="px-4 rounded-md self-center hidden sm:block"
          onClick={addPackage}
        >
          Add Packages
        </Button>
        <NPMDialog ref={dialog} />
      </div>
      <LayoutButtonGroup />
      <div className="hidden sm:block"></div>
    </header>
  );
}
