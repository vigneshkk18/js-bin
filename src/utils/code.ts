import { Layout } from "hooks/useLayout";

export type Language = Extract<Layout, "html" | "css" | "js">;
export type CSSPreProcessor = "none" | "scss" | "sass" | "less" | "stylus";
export type JSPreProcessor = "none" | "typescript" | "react";

export const defaultPkg = ["vite@5.2.0", "typescript@5.2.2"];

export const htmlPreProcessorExtension: Record<string, string> = {
  none: ".html",
};

export const cssPreProcessorExtension: Record<string, string> = {
  none: ".css",
  scss: ".scss",
  sass: ".sass",
  less: ".less",
  styl: ".styl",
  stylus: ".stylus",
};

export const cssPreProcessorPkg: Record<string, string[]> = {
  none: [],
  scss: ["sass@1.77.6"],
  sass: ["sass@1.77.6"],
  less: ["less@4.2.0"],
  stylus: ["stylus@0.63.0"],
};

export const jsPreProcessorExtension: Record<string, string> = {
  none: ".js",
  typescript: ".ts",
  react: ".tsx",
};

export const jsPreProcessorPkg: Record<string, string[]> = {
  none: [],
  typescript: [],
  react: ["react@18.2.0", "react-dom@18.2.0", "@vitejs/plugin-react@4.2.1"],
};

export const languageToFilePrefix: Record<Language, string> = {
  html: "index",
  css: "style",
  js: "script",
};

export const cssPreProcessorLabel: Record<CSSPreProcessor, string> = {
  none: "None (Css)",
  scss: "Scss",
  sass: "Sass",
  stylus: "Stylus",
  less: "Less",
};

export const jsPreProcessorLabel: Record<JSPreProcessor, string> = {
  none: "None",
  react: "React",
  typescript: "Typescript",
};

export const languageToExtensionMap: Record<
  Language,
  Record<string, string>
> = {
  html: htmlPreProcessorExtension,
  css: cssPreProcessorExtension,
  js: jsPreProcessorExtension,
};

export const extranctHTMLCode = (html: string) => {
  const startIdx = html.indexOf("<body>") + 6;
  const endIdx = html.lastIndexOf("</body>");
  return html.substring(startIdx, endIdx);
};

export const extranctHeadCode = (html: string) => {
  const startIdx = html.indexOf("<head>") + 6;
  const endIdx = html.lastIndexOf("</head>");
  return html.substring(startIdx, endIdx);
};
