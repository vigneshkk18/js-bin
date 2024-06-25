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

export const updatePreProcessor = async (
  binId: string,
  language: Language,
  preprocessor: string
) => {
  try {
    await db.bins.update(binId, {
      [`extensionEnbled.${language}`]: {
        preprocessor,
      },
    });
    const bin = binHook.getState();
    binHook.setState({
      ...bin,
      extensionEnabled: {
        ...bin?.extensionEnabled,
        [language]: {
          ...bin?.extensionEnabled[language],
          preprocessor,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};
