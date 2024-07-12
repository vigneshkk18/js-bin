import { CSSPreProcessor, JSPreProcessor } from "types/bin";

export const cssPreProcessorPkg: Record<string, string[]> = {
  none: [],
  scss: ["sass@1.77.6"],
  sass: ["sass@1.77.6"],
};

export const jsPreProcessorPkg: Record<string, string[]> = {
  none: [],
  typescript: [],
  react: ["react@18.2.0", "react-dom@18.2.0"],
};

export const cssPreProcessorLabel: Record<CSSPreProcessor, string> = {
  none: "None (Css)",
  scss: "Scss",
  sass: "Sass",
};

export const jsPreProcessorLabel: Record<JSPreProcessor, string> = {
  none: "None",
  react: "React",
  typescript: "Typescript",
};

export const extractHTMLCode = (html: string) => {
  const startIdx = html.indexOf("<body>") + 6;
  const endIdx = html.lastIndexOf("</body>");
  return html.substring(startIdx, endIdx);
};

export const extractHeadCode = (html: string) => {
  const startIdx = html.indexOf("<head>") + 6;
  const endIdx = html.lastIndexOf("</head>");
  return html.substring(startIdx, endIdx);
};
