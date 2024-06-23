import { FileSystemTree } from "@webcontainer/api";

export default function cssFile(code: string): FileSystemTree["css"] {
  return {
    file: {
      contents: `${code}`,
    },
  };
}
