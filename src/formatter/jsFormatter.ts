import { FormatterTemplate } from ".";

type Prettier = typeof import("prettier");

export class JSFormatter implements FormatterTemplate {
  private prettier: Prettier | undefined;
  private plugins: any[] | undefined;

  private async getPrettier() {
    if (this.prettier) return this.prettier;
    this.prettier = await import("prettier");
    return this.prettier;
  }

  private async getPlugins() {
    if (this.plugins) return this.plugins;
    this.plugins = [
      await import("prettier/plugins/typescript"),
      await import("prettier/plugins/estree"),
    ];
    return this.plugins;
  }

  async format(code: string): Promise<string> {
    try {
      const prettier = await this.getPrettier();
      const plugins = await this.getPlugins();
      const output = await prettier.format(code, {
        parser: "typescript",
        plugins,
      });
      return output;
    } catch (error: any) {
      console.log(error);
      return "";
    }
  }
}
