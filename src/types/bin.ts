interface CSSExtension {
  preprocessor: string;
}

interface JSExtension {
  preprocessor: string;
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
