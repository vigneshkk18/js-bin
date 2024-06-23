import { FileSystemTree } from "@webcontainer/api";

import { cssPreProcessorExtension } from "utils/code";
import { defaultImport, reactHelper } from "utils/default-codes/html";

import { Bin } from "types/bin";

export default function htmlFile(
  code: string,
  extension?: Bin["extensionEnabled"]
): FileSystemTree["html"] {
  const isReact = extension?.js?.preprocessor === "react";
  return {
    file: {
      contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSBin</title>
    <link rel="stylesheet" href="/style${
      cssPreProcessorExtension[extension?.css?.preprocessor || "none"]
    }" />
    ${!isReact && defaultImport(extension)}
  </head>
  <body>
    ${extension?.js?.preprocessor === "react" ? reactHelper : code}
  </body>
</html>`,
    },
  };
}
