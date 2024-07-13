import { FS } from "fs/fs";
import { TranspilerStore } from "transpiler/index";
import { constructHTML } from "utils/default-codes/html";
import { extractHeadCode, extractHTMLCode } from "utils/code";

import { Bin } from "types/bin";

class Bundler {
  private transpiler: TranspilerStore;
  private importHelper: HTMLScriptElement;

  constructor() {
    this.transpiler = new TranspilerStore();
    this.importHelper = document.createElement("script");
    this.importHelper.type = "importmap";
  }

  private getPkgUrl(name: string, version: string) {
    return `https://esm.sh/${name}@${version}`;
  }

  private generateImportsMap(packages: string[]) {
    const esmPkgMap = packages
      .map((pkg) => {
        const split = pkg.split("@");
        if (split.length < 2) return null;
        const [name, version] = split;
        const pkgUrl = this.getPkgUrl(name, version);
        return `"${name}": "${pkgUrl}", "${name}/": "${pkgUrl}/"`;
      })
      .filter((p) => p)
      .join(",");
    const script = `
      <script type="importmap">
        {
          "imports": {
            ${esmPkgMap}
          }
        }
      </script>
    `;
    return script;
  }

  private async generateScript(
    code: string,
    extensionsEnabled: Bin["extensionEnabled"]
  ) {
    return this.transpiler.transpile(code, "js", extensionsEnabled);
  }

  private async generateStyles(
    code: string,
    extensionsEnabled: Bin["extensionEnabled"]
  ) {
    return this.transpiler.transpile(code, "css", extensionsEnabled);
  }

  private generateHeadAndBody(code: string) {
    const head = extractHeadCode(code);
    const body = extractHTMLCode(code);
    return { head, body };
  }

  async bundle(extensionsEnabled: Bin["extensionEnabled"]) {
    const html = FS.readFile("html"),
      css = FS.readFile("css"),
      js = FS.readFile("js");
    const importsMap = this.generateImportsMap(
      extensionsEnabled.js?.packages || []
    );
    const [script, styles] = await Promise.all([
      this.generateScript(js, extensionsEnabled),
      this.generateStyles(css, extensionsEnabled),
    ]);

    const { head, body } = this.generateHeadAndBody(html);

    let out, error;
    if (script.code && styles.code) {
      out = constructHTML(head, body, importsMap, script.code, styles.code);
      window.postMessage({ type: "console-log-clear" }, "*");
      error = null;
    } else {
      error = script.error ?? styles.error;
    }
    return { html: out, error };
  }
}

export const bundler = new Bundler();
