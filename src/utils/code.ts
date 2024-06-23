import { Layout } from "hooks/useLayout";

type Language = Extract<Layout, "html" | "css" | "js">;

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
  none: [""],
  scss: ["sass"],
  sass: ["sass"],
  less: ["less"],
  styl: ["stylus"],
  stylus: ["stylus"],
};

export const jsPreProcessorExtension: Record<string, string> = {
  none: ".js",
  typescript: ".ts",
  react: ".tsx",
};

export const scriptPreProcessorPkg: Record<string, string[]> = {
  none: [""],
  typescript: [""],
  react: ["react", "react-dom", "@vitejs/plugin-react"],
};

export const languageToFilePrefix: Record<Language, string> = {
  html: "index",
  css: "style",
  js: "script",
};

export const languageToExtensionMap: Record<
  Language,
  Record<string, string>
> = {
  html: htmlPreProcessorExtension,
  css: cssPreProcessorExtension,
  js: jsPreProcessorExtension,
};
