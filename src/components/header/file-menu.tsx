interface MenuOption {
  label: string;
  shortcut?: string;
  onClick: () => void;
}

function MenuOption({ label, onClick, shortcut }: MenuOption) {
  return (
    <li
      onClick={onClick}
      className="p-2 px-4 hover:bg-inactiveLight cursor-pointer flex justify-between"
    >
      <span>{label}</span>
      {shortcut && <code>{shortcut}</code>}
    </li>
  );
}

interface FileMenu {
  isOpen: boolean;
  closeMenu: () => void;
  onMenuClick: (target: "open" | "title" | "delete" | "new") => () => void;
}

export default function FileMenu({ isOpen, onMenuClick, closeMenu }: FileMenu) {
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
          <MenuOption
            onClick={onMenuClick("new")}
            label="New"
            shortcut="ctrl+shift+n"
          />
          <MenuOption
            onClick={onMenuClick("open")}
            label="Open"
            shortcut="ctrl+shift+o"
          />
          <MenuOption onClick={onMenuClick("title")} label="Add Title" />
          <MenuOption
            onClick={onMenuClick("delete")}
            label="Delete"
            shortcut="ctrl+shift+del"
          />
        </ul>
      </div>
    </>
  );
}
