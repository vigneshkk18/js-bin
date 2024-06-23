import { FileSystemTree } from "@webcontainer/api";

export default function jsFile(code: string): FileSystemTree["script"] {
  return {
    file: {
      contents: `${code}`,
    },
  };
}
