import { create } from "zustand";

import { db } from "src/db";

import { FS } from "fs/fs";
import { bundler } from "bundler/index";
import { formatter } from "formatter/index";
import { Container, setCodeStore } from "hooks/useCodeStore";

import { keys } from "utils/common";

import { Bin, Language } from "types/bin";

const binHook = create<Bin | undefined>(() => undefined);

export default function useBin() {
  return binHook();
}

export const fetchBin = async (binId: string) => {
  try {
    const bin = await db.bins.get(binId);

    const fn = async () => {
      if (!bin) return;
      syncCodeToFS(bin);
      await bundleCode(bin);
    };

    binHook.setState(bin);
    fn();
  } catch (error) {
    console.error(error);
  }
};

let timer: number | null = null;

export const updateTitle = (title: string) => {
  const bin = binHook.getState();
  if (!bin) return;

  binHook.setState({ ...bin, title });

  const fn = async () => {
    try {
      await db.bins.update(bin?.id, { title });
    } catch (error) {
      console.error(error);
    }
  };

  if (timer) clearTimeout(timer);
  timer = setTimeout(fn, 500);
};

export const updateCode = async (language: Language, code: string) => {
  const fn = async () => {
    const bin = binHook.getState();
    if (!bin) return;

    syncCodeToFS({ [language]: code });
    await syncCodeToDB(bin.id, { [language]: code });
    await bundleCode({ ...bin, [language]: code });
  };

  binHook.setState({ ...binHook.getState(), [language]: code });
  if (timer) clearTimeout(timer);
  timer = setTimeout(fn, 250);
};

export const updateBin = async (binId: string, updatedBin: Bin) => {
  try {
    const fn = async () => {
      const codeMap: Record<Language, string> = {
        html: updatedBin.html,
        css: updatedBin.css,
        js: updatedBin.js,
      };
      syncCodeToFS(codeMap);
      await syncCodeToDB(binId, updatedBin);
      await bundleCode(updatedBin);
    };

    await db.bins.update(binId, updatedBin);
    binHook.setState(updatedBin);

    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, 250);
  } catch (error) {
    console.error(error);
  }
};

const syncCodeToFS = (codeMap: Partial<Record<Language, string>>) => {
  keys(codeMap).forEach((language) => {
    FS.writeFile(language, codeMap[language] ?? "");
  });
};

const syncCodeToDB = async (
  binId: string,
  codeMap: Partial<Record<Language, string>>
) => {
  await db.bins.update(binId, codeMap);
};

const bundleCode = async (bin: Bin) => {
  const { html, error } = await bundler.bundle(bin.extensionEnabled);
  const state: Partial<Container> = {
    ready: true,
    error,
  };
  if (!error) state.html = html;
  setCodeStore(state);
};

export const formatCode = async (code: string, language: Language) => {
  const formatted = await formatter.format(code, language);
  binHook.setState({ [language]: formatted });

  const bin = binHook.getState();
  if (!bin) return;
  syncCodeToDB(bin.id, { [language]: formatted });
};
