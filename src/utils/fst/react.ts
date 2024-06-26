import { FileSystemTree } from "@webcontainer/api";

import { reactHelper } from "utils/default-codes/html";

export default function reactFile(): FileSystemTree["html"] {
  return {
    file: {
      contents: reactHelper,
    },
  };
}
