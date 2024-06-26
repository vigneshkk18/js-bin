import { FileSystemTree } from "@webcontainer/api";

import jsFile from "utils/fst/js";
import cssFile from "utils/fst/css";
import htmlFile from "utils/fst/html";
import reactFile from "utils/fst/react";
import viteConfigFile from "utils/fst/viteConfig";
import { packageJSONFile } from "utils/default-codes/package-json";
import { cssPreProcessorExtension, jsPreProcessorExtension } from "utils/code";

import { Bin } from "types/bin";

export const transformPenToFileSystemTree = (bin: Bin) => {
  const fileSystemTree: FileSystemTree = {};
  fileSystemTree["index.html"] = htmlFile(bin.html, bin.extensionEnabled);
  fileSystemTree[
    `style${
      cssPreProcessorExtension[bin.extensionEnabled.css?.preprocessor || "none"]
    }`
  ] = cssFile(bin.css);
  fileSystemTree[
    `script${
      jsPreProcessorExtension[bin.extensionEnabled.js?.preprocessor || "none"]
    }`
  ] = jsFile(bin.js);
  fileSystemTree["package.json"] = packageJSONFile;
  fileSystemTree["vite.config.js"] = viteConfigFile(bin.extensionEnabled);
  fileSystemTree["main.tsx"] = reactFile();
  return fileSystemTree;
};

export const transformFileSystemTreeToBin = (
  fileSystemTree: FileSystemTree
) => {
  const bin: Partial<Pick<Bin, "html" | "css" | "js">> = {};
  bin.html =
    "file" in fileSystemTree.html
      ? (fileSystemTree.html.file.contents as string)
      : "";
  bin.css =
    "file" in fileSystemTree.css
      ? (fileSystemTree.css.file.contents as string)
      : "";
  bin.js =
    "file" in fileSystemTree.script
      ? (fileSystemTree.script.file.contents as string)
      : "";
  return bin as Pick<Bin, "html" | "css" | "js">;
};
