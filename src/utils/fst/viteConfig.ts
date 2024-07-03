import { FileSystemTree } from "@webcontainer/api";
import { Bin } from "src/types/bin";
import { reactImport, reactPlugin } from "../default-codes/viteConfig";

export default function viteConfigFile(
  extensions?: Bin["extensionEnabled"]
): FileSystemTree["html"] {
  return {
    file: {
      contents: `
    ${extensions?.js?.preprocessor === "react" ? reactImport : ""}
    import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [${extensions?.js?.preprocessor === "react" ? reactPlugin : ""}],
});`,
    },
  };
}
