import { JSTranspiler } from "transpiler/jsTranspiler";
import { CSSTranspiler } from "transpiler/cssTranspiler";

import { Bin, Language } from "types/bin";

export interface TranspilerError {
  id: string;
  location: {
    column: number;
    file: string;
    length: number;
    line: number;
    lineText: string;
    namespace: string;
    suggestion: string;
  };
  notes: any[];
  pluginName: string;
  text: string;
}

export interface TranspilerTemplate {
  transpile: (
    code: string,
    extensionEnabled: Bin["extensionEnabled"]
  ) => Promise<{ code: string; error: TranspilerError | null }>;
}

export class TranspilerStore {
  private jsTranspiler: JSTranspiler;
  private cssTranspiler: CSSTranspiler;

  constructor() {
    this.jsTranspiler = new JSTranspiler();
    this.cssTranspiler = new CSSTranspiler();
  }

  async transpile(
    code: string,
    language: Language,
    extensionsEnabled: Bin["extensionEnabled"]
  ): ReturnType<TranspilerTemplate["transpile"]> {
    try {
      if (language == "js") {
        const res = await this.jsTranspiler.transpile(code, extensionsEnabled);
        return res;
      }
      if (language === "css") {
        const res = await this.cssTranspiler.transpile(code, extensionsEnabled);
        return res;
      }
      return { code: "", error: null };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.toString());
    }
  }
}
