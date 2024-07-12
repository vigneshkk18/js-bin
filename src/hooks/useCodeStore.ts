import { create } from "zustand";

import type { TranspilerError } from "transpiler/index";

const defaultContainer = {
  html: "",
  ready: false,
  error: null as TranspilerError | null,
};

export type Container = typeof defaultContainer;

export const codeStoreHook = create<Container>(() => defaultContainer);

export default function useCodeStore() {
  return codeStoreHook();
}

export const setCodeStore = (codeStore: Partial<Container>) =>
  codeStoreHook.setState(codeStore);
