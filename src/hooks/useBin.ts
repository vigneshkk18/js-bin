import { create } from "zustand";

import { db } from "src/db";

import { Bin } from "types/bin";

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
