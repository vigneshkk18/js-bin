import { useEffect, useRef, useState, useTransition } from "react";
import { NPMPackageResponse, NPMResponse, PKG } from "types/npm";

const getPkgs = (query: string): Promise<NPMResponse> => {
  return fetch(
    `https://registry.npmjs.com/-/v1/search?text=${query}&size=15`
  ).then((res) => res.json());
};

const getPkg = (name: string): Promise<NPMPackageResponse> => {
  return fetch(`https://registry.npmjs.com/${name}`).then((res) => res.json());
};

export const usePkgList = (query: string): [boolean, PKG[]] => {
  const [isPending, startTransition] = useTransition();
  const pkgQueryList = useRef<PKG[]>();
  const pkgVersionList = useRef<PKG[]>();
  const [pkgList, setPkgList] = useState<PKG[]>([]);

  const getPkgQueryList = async (query: string) => {
    if (pkgQueryList.current) return pkgQueryList.current;
    const search = query.trim().toLowerCase();
    const res = await getPkgs(search);
    const pkgList = res.objects.map((pkg) => {
      const packageKey = `${pkg.package.name}@${pkg.package.version}`;
      return {
        key: packageKey,
        pkgName: pkg.package.name,
        pkgVersion: pkg.package.version,
        label: packageKey,
        installed: false,
      };
    });
    pkgQueryList.current = pkgList;
    pkgVersionList.current = undefined;
    return pkgList;
  };

  const getPkgVersionList = async (name: string, version: string) => {
    if (pkgVersionList.current) return getFilteredPkgVersionList(version);
    const res = await getPkg(name);
    const versions = Object.keys(res.time).filter(
      (version) => version !== "created" && version !== "updated"
    );
    const pkgList = versions.reverse().map((version) => {
      const packageKey = `${res._id}@${version}`;
      return {
        key: packageKey,
        pkgName: res._id,
        pkgVersion: version,
        label: packageKey,
        installed: false,
      };
    });
    pkgVersionList.current = pkgList;
    return getFilteredPkgVersionList(version);
  };

  const getFilteredPkgVersionList = async (
    version: string
  ): Promise<Array<PKG>> => {
    if (!pkgVersionList.current) return [];
    if (!version.trim().length) return pkgVersionList.current;
    return pkgVersionList.current.filter((pkg) =>
      pkg.pkgVersion.startsWith(version)
    );
  };

  useEffect(() => {
    const fn = async () => {
      const search = query.trim().toLowerCase();
      if (!search.length) return;
      const split = search.split("@");
      const isQueryingVersion = search.includes("@") && split.length === 2;

      let res = [] as Array<PKG>;
      if (isQueryingVersion) {
        res = await getPkgVersionList(split[0], split[1]);
      } else {
        pkgQueryList.current = undefined;
        res = await getPkgQueryList(search);
      }

      startTransition(() => {
        setPkgList(res);
      });
    };
    const timer = setTimeout(fn, 200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return [isPending, pkgList];
};
