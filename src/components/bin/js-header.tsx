import { useState } from "react";
import { useParams } from "wouter";

import Button from "ui/button";

import useBin, { updateBin } from "hooks/useBin";
import { hideLoading, showLoading } from "hooks/useLoading";

import {
  defaultHTML,
  defaultHTMLReactHelper,
  defaultReactHelper,
} from "utils/default-codes/html";
import { entries } from "utils/common";
import { defaultJS } from "utils/default-codes/js";
import { jsPreProcessorPkg, jsPreProcessorLabel } from "utils/code";

import CaretDown from "assets/caret-down";

import { JSPreProcessor } from "types/bin";

export default function JSHeader() {
  const bin = useBin();
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="w-full relative layout-header">
      <Button
        onClick={openMenu}
        className="border-0 flex items-center gap-1 p-2 px-3 text-secondary"
      >
        <span>
          {
            jsPreProcessorLabel[
              bin?.extensionEnabled?.js?.preprocessor ?? "none"
            ]
          }
        </span>
        <CaretDown width={10} height={10} color="#00aaff" />
      </Button>
      <Menu isOpen={isOpen} closeMenu={closeMenu} />
    </header>
  );
}

interface MenuOption {
  label: string;
  active: boolean;
  onClick: () => Promise<void>;
}

function MenuOption({ label, active, onClick }: Readonly<MenuOption>) {
  return (
    <li
      onClick={onClick}
      className={`p-2 px-4 cursor-pointer flex justify-between ${
        active ? "bg-buttonHover" : "hover:bg-inactiveLight"
      }`}
    >
      {label}
    </li>
  );
}

interface Menu {
  isOpen: boolean;
  closeMenu: () => void;
}

function Menu({ isOpen, closeMenu }: Menu) {
  const { binId } = useParams<{ binId: string }>();
  const bin = useBin();
  const selectPreprocessor = (preprocessor: JSPreProcessor) => async () => {
    if (!bin) return;
    showLoading();
    try {
      const updatedBin = { ...bin };
      updatedBin.extensionEnabled.js = {
        ...updatedBin.extensionEnabled.js,
        preprocessor,
        packages: Array.from(
          new Set([
            ...(bin.extensionEnabled.js?.packages || []),
            ...jsPreProcessorPkg[preprocessor],
          ])
        ),
      };

      if (updatedBin.extensionEnabled?.js?.preprocessor === "react") {
        updatedBin.html = updatedBin.html.replace(
          /<body[^>]*>([\s\S]*?)<\/body>/,
          defaultHTMLReactHelper
        );
        updatedBin.js = defaultReactHelper;
      } else {
        updatedBin.html = defaultHTML;
        updatedBin.js = defaultJS;
      }
      await updateBin(binId, updatedBin);
      closeMenu();
    } catch (err) {
      console.error(err);
    } finally {
      hideLoading();
    }
  };

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
          {entries(jsPreProcessorLabel).map(([key, label]) => (
            <MenuOption
              key={key}
              label={label}
              active={
                (bin?.extensionEnabled?.js?.preprocessor || "none") === key
              }
              onClick={selectPreprocessor(key)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
