import { FileSystemTree } from "@webcontainer/api";

import {
  cssPreProcessorExtension,
  extranctHTMLCode,
  extranctHeadCode,
} from "utils/code";
import { defaultImport, reactImport } from "utils/default-codes/html";

import { Bin } from "types/bin";

export default function htmlFile(
  code: string,
  extension?: Bin["extensionEnabled"]
): FileSystemTree["html"] {
  const head = extranctHeadCode(code);
  const body = extranctHTMLCode(code);
  const isReact = extension?.js?.preprocessor === "react";
  return {
    file: {
      contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    ${head ? head : ""}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSBin</title>
    <link rel="stylesheet" href="/style${
      cssPreProcessorExtension[extension?.css?.preprocessor || "none"]
    }" />
    ${!isReact ? defaultImport(extension) : reactImport()}
  </head>
  <body>
    ${extension?.js?.preprocessor === "react" ? "<div id='root'></div>" : ""}
    ${body}
  </body>
</html>`,
    },
  };
}
