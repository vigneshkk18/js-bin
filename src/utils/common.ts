export const entries = <T extends Record<string, unknown>>(obj: T) => {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
};

export const keys = <T extends Record<string, unknown>>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

export const split = <T>(str: string, separator: string) =>
  str.split(separator) as T[];
