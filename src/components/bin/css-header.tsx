import { useState } from "react";
import { useParams } from "wouter";
import { FileNode } from "@webcontainer/api";

import Button from "ui/button";

import useBin, { updateBin } from "hooks/useBin";
import { hideLoading, showLoading } from "hooks/useLoading";
import { addDep, renameFile, writeFile } from "hooks/useCodeStore";

import {
  CSSPreProcessor,
  cssPreProcessorExtension,
  cssPreProcessorLabel,
  cssPreProcessorPkg,
  languageToFilePrefix,
} from "utils/code";
import { entries } from "utils/common";
import htmlFile from "utils/fst/html";

import CaretDown from "assets/caret-down";

export default function CSSHeader() {
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
    showLoading();
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

      const updatedBin = { ...bin };
      updatedBin.extensionEnabled.css = {
        ...updatedBin.extensionEnabled.css,
        preprocessor,
      };
      updatedBin.extensionEnabled.js = {
        ...updatedBin.extensionEnabled.js,
        packages: Array.from(
          new Set([
            ...(updatedBin.extensionEnabled.js?.packages || []),
            ...cssPreProcessorPkg[preprocessor],
          ])
        ),
      };
      await updateBin(binId, updatedBin);
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
