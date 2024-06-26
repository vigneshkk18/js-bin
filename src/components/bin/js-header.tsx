import { useState } from "react";
import { useParams } from "wouter";
import { FileNode } from "@webcontainer/api";

import Button from "ui/button";

import useBin, { updateBin } from "hooks/useBin";
import { hideLoading, showLoading } from "hooks/useLoading";
import { addDep, renameFile, writeFile } from "hooks/useCodeStore";

import {
  JSPreProcessor,
  jsPreProcessorExtension,
  jsPreProcessorPkg,
  jsPreProcessorLabel,
  languageToFilePrefix,
} from "utils/code";
import htmlFile from "utils/fst/html";
import { entries } from "utils/common";
import viteConfigFile from "utils/fst/viteConfig";

import CaretDown from "assets/caret-down";

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
              (bin?.extensionEnabled?.js?.preprocessor ||
                "none") as JSPreProcessor
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
  const selectPreprocessor = (preprocessor: JSPreProcessor) => async () => {
    if (!bin) return;
    showLoading();
    try {
      if (jsPreProcessorPkg[preprocessor].length) {
        await addDep(jsPreProcessorPkg[preprocessor]);
      }

      if (preprocessor === "react") {
        const vite = (
          viteConfigFile({
            ...bin.extensionEnabled,
            js: { preprocessor },
          }) as FileNode
        )?.file?.contents as string;
        await writeFile("vite.config.js", vite);
      }

      const oldPreprocessor = bin.extensionEnabled.js?.preprocessor || "none";
      const oldPath = `${languageToFilePrefix.js}${jsPreProcessorExtension[oldPreprocessor]}`;
      const newPath = `${languageToFilePrefix.js}${jsPreProcessorExtension[preprocessor]}`;
      await renameFile(oldPath, newPath);
      const html = (
        htmlFile(bin.html, {
          ...bin.extensionEnabled,
          js: { preprocessor },
        }) as FileNode
      )?.file?.contents as string;
      await writeFile("index.html", html);
      closeMenu();

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
