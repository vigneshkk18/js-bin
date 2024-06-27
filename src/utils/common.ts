// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const entries = <T extends Record<any, unknown>>(obj: T) => {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
};

export const keys = <T extends Record<string, unknown>>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

export const split = <T>(str: string, separator: string) =>
  str.split(separator) as T[];

export const isNullish = <T>(o: T | null | undefined): o is null | undefined =>
  o === null || o === undefined;
