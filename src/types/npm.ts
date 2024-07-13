export interface PKG {
  key: string;
  label: string;
  pkgName: string;
  pkgVersion: string;
  installed: boolean;
}

/**
 * NPM Search Response
 */
export interface NPMResponse {
  objects: SRC[];
  total: number;
  time: string;
}

export interface SRC {
  package: Package;
}

export interface Package {
  name: string;
  scope: string;
  version: string;
  description: string;
}

/**
 * NPM Package Response
 */

export interface NPMPackageResponse {
  _id: string;
  time: Time;
  [key: string]: any;
}

export interface Time {
  created: string;
  modified: string;
  [key: string]: string;
}
