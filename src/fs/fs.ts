import { Language } from "types/bin";

export const FS = {
  files: new Map<string, string>(),
  writeFile(language: Language, code: string) {
    this.files.set(language, code);
  },
  readFile(language: Language) {
    if (!this.files.has(language)) return "";
    return this.files.get(language) ?? "";
  },
};
