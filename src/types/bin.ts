import { Layout } from "hooks/useLayout";

export type Language = Extract<Layout, "html" | "css" | "js">;
export type CSSPreProcessor = "none" | "scss" | "sass";
export type JSPreProcessor = "none" | "typescript" | "react";

interface CSSExtension {
  preprocessor: CSSPreProcessor;
}

interface JSExtension {
  preprocessor: JSPreProcessor;
  packages: string[];
}

export interface Bin {
  id: string;
  title: string;
  html: string;
  css: string;
  js: string;
  extensionEnabled: Partial<{
    html: Partial<Record<string, string>>;
    css: Partial<CSSExtension>;
    js: Partial<JSExtension>;
  }>;
}
