import { create } from "zustand";

import { db } from "src/db";

import { Bin } from "types/bin";
import { Language } from "src/utils/code";

const binHook = create<Bin | undefined>(() => undefined);

export default function useBin() {
  return binHook();
}

export const fetchBin = async (binId: string) => {
  try {
    binHook.setState(await db.bins.get(binId));
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
  binHook.setState({ ...binHook.getState(), [language]: code });
};

export const updateBin = async (binId: string, updatedBin: Bin) => {
  try {
    await db.bins.update(binId, updatedBin);
    binHook.setState(updatedBin);
  } catch (error) {
    console.error(error);
  }
};
