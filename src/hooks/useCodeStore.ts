import { create } from "zustand";
import { WebContainer } from "@webcontainer/api";

import { db } from "src/db";

import { transformPenToFileSystemTree } from "utils/fst";

import { WebContainerState } from "types/code-store";

const defaultContainer: WebContainerState = {
  instance: null,
  devProcess: null,
  ready: false,
  error: "",
  devUrl: "",
  fileMounted: false,
};

export const codeStoreHook = create<WebContainerState>(() => defaultContainer);

export default function useCodeStore() {
  return codeStoreHook();
}

export const bootContainer = async (binId: string) => {
  const updatedContainer = {} as WebContainerState;
  try {
    updatedContainer.instance = await WebContainer.boot();
    updatedContainer.ready = true;

    const bin = await db.bins.get(binId);
    if (!bin) throw new Error("Bin Not Found!!!");

    updatedContainer.instance.on("server-ready", (_, url) => {
      console.log(codeStoreHook.getState());
      codeStoreHook.setState({
        ...codeStoreHook.getState(),
        devUrl: url,
      });
    });
    updatedContainer.instance.on("error", console.log);

    await updatedContainer.instance.mount(transformPenToFileSystemTree(bin));
    const packages = bin.extensionEnabled.js?.packages || ["vite"];
    const p1 = await updatedContainer.instance.spawn("npm", ["i", ...packages]);
    p1.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
        },
      })
    );
    await p1.exit;
    const p2 = await updatedContainer.instance.spawn("npm", ["run", "dev"]);
    p2.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
        },
      })
    );
    updatedContainer.devProcess = p2;
    updatedContainer.fileMounted = true;
  } catch (error: any) {
    updatedContainer.error = error.message;
  } finally {
    console.log(codeStoreHook.getState(), updatedContainer);
    codeStoreHook.setState({
      ...codeStoreHook.getState(),
      ...updatedContainer,
    });
  }
};

export const killContainer = () => {
  const { instance } = codeStoreHook.getState();
  if (!instance) return;
  instance.teardown();
  codeStoreHook.setState(defaultContainer);
};

export const addDep = async (deps: string[]) => {
  const { instance } = codeStoreHook.getState();
  if (!instance) return;
  const p1 = await instance.spawn("npm", ["i", ...deps]);
  p1.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log(data);
      },
    })
  );
  await p1.exit;
};

export const restartServer = async () => {
  const container = codeStoreHook.getState();
  if (!container.instance) return;
  container.devProcess?.kill();
  const p = await container.instance.spawn("npm", ["run", "dev"]);
  p.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log(data);
      },
    })
  );
  codeStoreHook.setState({ ...container, devProcess: p });
};

export const writeFile = async (path: string, code: string) => {
  const { instance } = codeStoreHook.getState();
  if (!instance) return;
  try {
    await instance.fs.writeFile(path, code);
  } catch (error) {
    console.error(error);
  }
};

export const renameFile = async (oldPath: string, newPath: string) => {
  const { instance } = codeStoreHook.getState();
  if (!instance) return;
  try {
    await instance.fs.rename(oldPath, newPath);
  } catch (error) {
    console.error(error);
  }
};
