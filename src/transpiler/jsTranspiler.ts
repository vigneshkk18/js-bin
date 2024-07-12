import * as esbuild from "esbuild-wasm";

import type { TranspilerTemplate } from "transpiler/index";

import { Bin, JSPreProcessor } from "types/bin";

const PreProcessorToLoader: Record<JSPreProcessor, esbuild.Loader> = {
  none: "js",
  react: "tsx",
  typescript: "ts",
};

export class JSTranspiler implements TranspilerTemplate {
  private waiting: Promise<void>;

  constructor() {
    this.waiting = esbuild.initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.23.0/esbuild.wasm",
    });
  }

  async transpile(
    code: string,
    extensionEnabled: Bin["extensionEnabled"]
  ): ReturnType<TranspilerTemplate["transpile"]> {
    await this.waiting;
    try {
      const output = await esbuild.transform(code, {
        loader:
          PreProcessorToLoader[extensionEnabled?.js?.preprocessor ?? "none"],
        logLevel: "error",
      });
      return { code: output.code, error: null };
    } catch (error: any) {
      const err = error.errors.length ? error.errors[0] : null;
      if (!err) return { code: "", error: err };
      return {
        code: "",
        error: { ...err, location: { ...err.location, file: "main.js" } },
      };
    }
  }
}
