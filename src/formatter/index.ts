import { JSFormatter } from "formatter/jsFormatter";
import { CSSFormatter } from "formatter/cssFormatter";
import { HTMLFormatter } from "formatter/htmlFormatter";

import { Bin, Language } from "types/bin";

export interface FormatterTemplate {
  format: (
    code: string,
    extensionEnabled: Bin["extensionEnabled"]
  ) => Promise<string>;
}

class Formatter {
  private htmlFormatter: HTMLFormatter;
  private jsFormatter: JSFormatter;
  private cssFormatter: CSSFormatter;

  constructor() {
    this.htmlFormatter = new HTMLFormatter();
    this.jsFormatter = new JSFormatter();
    this.cssFormatter = new CSSFormatter();
  }

  async format(code: string, language: Language): Promise<string> {
    if (language == "js") {
      return await this.jsFormatter.format(code);
    }
    if (language === "css") {
      return await this.cssFormatter.format(code);
    }
    if (language === "html") {
      return await this.htmlFormatter.format(code);
    }
    return code;
  }
}

export const formatter = new Formatter();
