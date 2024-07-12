import { FormatterTemplate } from ".";

export class CSSFormatter implements FormatterTemplate {
  async format(code: string): Promise<string> {
    return code;
  }
}
