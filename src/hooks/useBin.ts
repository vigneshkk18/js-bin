import { create } from "zustand";

import { db } from "src/db";

import { FS } from "fs/fs";
import { bundler } from "bundler/index";
import { Container, setCodeStore } from "hooks/useCodeStore";

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
      FS.writeFile("html", bin.html);
      FS.writeFile("css", bin.css);
      FS.writeFile("js", bin.js);

      const { html, error } = await bundler.bundle(bin.extensionEnabled);
      const state: Partial<Container> = {
        ready: true,
        error,
      };
      if (!error) state.html = html;
      setCodeStore(state);
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
    FS.writeFile(language, code);

    if (!bin) return;

    await db.bins.update(bin?.id, {
      [language]: code,
    });

    const { html, error } = await bundler.bundle(bin.extensionEnabled);
    const state: Partial<Container> = {
      ready: true,
      error,
    };
    if (!error) state.html = html;
    setCodeStore(state);
  };

  binHook.setState({ ...binHook.getState(), [language]: code });
  if (timer) clearTimeout(timer);
  timer = setTimeout(fn, 250);
};

export const updateBin = async (binId: string, updatedBin: Bin) => {
  try {
    const fn = async () => {
      FS.writeFile("html", updatedBin.html);
      FS.writeFile("css", updatedBin.css);
      FS.writeFile("js", updatedBin.js);

      await db.bins.update(binId, updatedBin);

      const bin = binHook.getState();
      if (!bin) return;
      const { html, error } = await bundler.bundle(bin.extensionEnabled);
      const state: Partial<Container> = {
        ready: true,
        error,
      };
      if (!error) state.html = html;
      setCodeStore(state);
    };

    await db.bins.update(binId, updatedBin);
    binHook.setState(updatedBin);

    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, 250);
  } catch (error) {
    console.error(error);
  }
};
