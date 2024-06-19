import File from "components/header/file";
import LayoutButtonGroup from "components/header/layout-button-group";

export default function Header() {
  return (
    <header className="w-full flex items-stretch justify-between bg-headerLight border-b border-b-light">
      <div className="flex gap-1 h-full">
        <div className="p-2">
          <img
            src="https://static.jsbin.com/images/dave.min.svg"
            alt="Logo"
            className="w-6 h-6"
          />
        </div>
        <File />
      </div>
      <LayoutButtonGroup />
      <div className="hidden sm:block"></div>
    </header>
  );
}
