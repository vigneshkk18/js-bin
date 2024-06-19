import { useState } from "react";

import Button from "ui/button";
import FileMenu from "components/header/file-menu";

import CaretDown from "assets/caret-down";

export default function File() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative hidden sm:block">
      <Button
        onClick={openMenu}
        className="flex items-center gap-1 text-sm px-2 border-x border-transparent hover:bg-buttonHover hover:border-x-button"
      >
        <span>File</span>
        <CaretDown width={10} height={10} color="#232323" />
      </Button>
      <FileMenu isOpen={isOpen} closeMenu={closeMenu} />
    </div>
  );
}
