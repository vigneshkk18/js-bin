import { FileSystemTree } from "@webcontainer/api";

export const packageJSONFile: FileSystemTree["package-json"] = {
  file: {
    contents: `
{
  "name": "js-bin",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {},
  "devDependencies": {}
}    
    `,
  },
};
