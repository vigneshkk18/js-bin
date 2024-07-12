import Sass from "sass";

import type { TranspilerError, TranspilerTemplate } from "transpiler/index";

export class SASSTranspiler implements TranspilerTemplate {
  private sass: Promise<typeof Sass>;

  constructor() {
    // @ts-expect-error any
    this.sass = import("https://esm.sh/sass@1.77.7");
  }

  constructErrorObjFromTxt(err: string): TranspilerError {
    const lines = err.split(/\n/);

    const [row, column] = lines[lines.length - 1]
      .trim()
      .split(" ")[1]
      .split(":");
    const text = lines[0].trim();
    const codeLine = lines[2].trim().split(" ");
    const lineText = codeLine[codeLine.length - 1];

    return {
      id: "",
      location: {
        column: parseInt(column),
        file: "style.css",
        length: 0,
        line: parseInt(row),
        lineText,
        namespace: "",
        suggestion: "",
      },
      notes: [],
      pluginName: "",
      text,
    };
  }

  async transpile(code: string) {
    const sass = await this.sass;
    try {
      const res = sass.compileString(code);
      return { code: res.css, error: null };
    } catch (error: any) {
      console.log(error);
      return { code: "", error: this.constructErrorObjFromTxt(error.message) };
    }
  }
}
