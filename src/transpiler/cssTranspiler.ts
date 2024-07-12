import type { TranspilerTemplate } from "transpiler/index";
import { SASSTranspiler } from "transpiler/sassTranspiler";

import { Bin } from "types/bin";

export class CSSTranspiler implements TranspilerTemplate {
  private sassTranspiler: TranspilerTemplate;

  constructor() {
    this.sassTranspiler = new SASSTranspiler();
  }

  async transpile(
    code: string,
    extensionEnabled: Bin["extensionEnabled"]
  ): ReturnType<TranspilerTemplate["transpile"]> {
    if (
      !extensionEnabled?.css?.preprocessor ||
      extensionEnabled?.css?.preprocessor === "none"
    ) {
      return { code, error: null };
    }
    try {
      return await this.sassTranspiler.transpile(code, extensionEnabled);
    } catch (error: any) {
      console.log(error);
      return { error, code: "" };
    }
  }
}
