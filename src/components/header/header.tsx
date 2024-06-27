import File from "components/header/file";
import LayoutButtonGroup from "components/header/layout-button-group";
import Button from "src/ui/button";
import NPMDialog from "../dialogs/npm-dialog";
import { useRef } from "react";

export default function Header() {
  const dialog = useRef<{ openDialog: () => void }>(null);

  const addPackage = () => {
    dialog.current?.openDialog();
  };

  return (
    <header className="w-full flex items-stretch justify-between bg-headerLight border-b border-b-light">
      <div className="flex gap-1 h-full items-center">
        <div className="p-2">
          <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
        </div>
        <File />
        <Button className="px-4 rounded-md self-center" onClick={addPackage}>
          Add Packages
        </Button>
        <NPMDialog ref={dialog} />
      </div>
      <LayoutButtonGroup />
      <div className="hidden sm:block"></div>
    </header>
  );
}
