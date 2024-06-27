import { useRoute } from "wouter";
import { PropsWithChildren } from "react";

import useSideMenu, { hideSideMenu } from "hooks/useSideMenu";

import { Target } from "components/header/file";

import Cross from "assets/cross";

export default function WithSideMenu({ children }: PropsWithChildren) {
  const [isBinPage] = useRoute("/:binId");
  const show = useSideMenu();

  const onSideMenuOptionClick = (target: Target) => () => {
    hideSideMenu();
    window.postMessage({ type: "open-dialog", target });
  };

  return (
    <>
      <nav className="sm:hidden h-full bg-[#ebf3ff] z-50">
        <ul
          style={{ visibility: show ? "visible" : "hidden" }}
          className={`${
            show ? "w-56" : "w-0"
          } transition-[width] bg-white border-b-2 border-b-[#ffffff]`}
        >
          <SideMenuOption onClick={hideSideMenu}>
            <Cross
              width={22}
              height={22}
              color="rgb(152, 185, 228)"
              className="mr-2"
            />
            <span>Dismiss</span>
          </SideMenuOption>
          <SideMenuOption onClick={onSideMenuOptionClick("new")}>
            New
          </SideMenuOption>
          <SideMenuOption onClick={onSideMenuOptionClick("open")}>
            Open...
          </SideMenuOption>
          {isBinPage && (
            <>
              <SideMenuOption onClick={onSideMenuOptionClick("title")}>
                Title
              </SideMenuOption>
              <SideMenuOption onClick={onSideMenuOptionClick("delete")}>
                Delete
              </SideMenuOption>
            </>
          )}
        </ul>
      </nav>
      {children}
    </>
  );
}

interface SideMenuOption {
  onClick: () => void;
}

function SideMenuOption({
  onClick,
  children,
}: PropsWithChildren<SideMenuOption>) {
  return (
    <li
      onClick={onClick}
      className="cursor-pointer p-4 bg-[#ebf3ff] text-[#6293d3] px-[16px] py-[10px] mt-[2px] text-xl font-semibold flex items-center"
    >
      {children}
    </li>
  );
}
