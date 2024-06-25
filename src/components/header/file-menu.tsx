interface MenuOption {
  label: string;
  shortcut?: string;
}

function MenuOption({ label, shortcut }: MenuOption) {
  return (
    <li className="p-2 px-4 hover:bg-inactiveLight cursor-pointer flex justify-between">
      <span>{label}</span>
      {shortcut && <code>{shortcut}</code>}
    </li>
  );
}

interface FileMenu {
  isOpen: boolean;
  closeMenu: () => void;
}

export default function FileMenu({ isOpen, closeMenu }: FileMenu) {
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={closeMenu}
        className="w-screen h-screen z-40 top-0 left-0 fixed"
      ></div>
      <div
        id="file-menu"
        className="absolute top-[41px] border border-light shadow-xl bg-white w-[250px] z-50"
      >
        <ul>
          <MenuOption label="New" shortcut="ctrl+shift+n" />
          <MenuOption label="Open" shortcut="ctrl+shift+o" />
          <MenuOption label="Add Title" />
          <MenuOption label="Delete" shortcut="ctrl+shift+del" />
        </ul>
      </div>
    </>
  );
}
