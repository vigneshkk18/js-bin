import { FileNode } from "@webcontainer/api";
import { useState } from "react";
import CaretDown from "src/assets/caret-down";
import useBin, { updatePreProcessor } from "src/hooks/useBin";
import { addDep, renameFile, writeFile } from "src/hooks/useCodeStore";
import {
  CSSPreProcessor,
  cssPreProcessorExtension,
  cssPreProcessorLabel,
  cssPreProcessorPkg,
  languageToFilePrefix,
} from "src/utils/code";
import { entries } from "src/utils/common";
import htmlFile from "src/utils/fst/html";
import Button from "ui/button";
import { useParams } from "wouter";

export default function CSSHeader() {
  const bin = useBin();
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="w-full relative">
      <Button
        onClick={openMenu}
        className="border-0 flex items-center gap-1 p-2 px-3 text-secondary"
      >
        <span>
          {
            cssPreProcessorLabel[
              (bin?.extensionEnabled?.css?.preprocessor ||
                "none") as CSSPreProcessor
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

function MenuOption({ label, active, onClick }: MenuOption) {
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
  const selectPreprocessor = (preprocessor: CSSPreProcessor) => async () => {
    if (!bin) return;
    try {
      if (cssPreProcessorPkg[preprocessor].length) {
        await addDep(cssPreProcessorPkg[preprocessor]);
      }

      const oldPreprocessor = bin.extensionEnabled.css?.preprocessor || "none";
      const oldPath = `${languageToFilePrefix.css}${cssPreProcessorExtension[oldPreprocessor]}`;
      const newPath = `${languageToFilePrefix.css}${cssPreProcessorExtension[preprocessor]}`;
      await renameFile(oldPath, newPath);
      const html = (
        htmlFile(bin.html, {
          ...bin.extensionEnabled,
          css: { preprocessor },
        }) as FileNode
      )?.file?.contents as string;
      await writeFile("index.html", html);
      closeMenu();

      await updatePreProcessor(binId, "css", preprocessor);
    } catch (err) {
      console.error(err);
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
          {entries(cssPreProcessorLabel).map(([key, label]) => (
            <MenuOption
              key={key}
              label={label}
              active={
                (bin?.extensionEnabled?.css?.preprocessor || "none") === key
              }
              onClick={selectPreprocessor(key)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
