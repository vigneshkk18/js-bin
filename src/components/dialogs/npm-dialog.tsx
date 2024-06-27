import {
  forwardRef,
  useDeferredValue,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import Button from "ui/button";

import Dialog from "components/dialog/dialog";

import { addDep } from "hooks/useCodeStore";
import useBin, { updateBin } from "hooks/useBin";
import { hideLoading, showLoading } from "hooks/useLoading";

import Add from "assets/add";
import Trash from "assets/trash";
import { entries } from "utils/common";
import { defaultPkg } from "utils/code";

import { NPMResponse } from "types/npm";

interface PKG {
  key: string;
  label: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NPMDialog = forwardRef(function (_props: any, ref: any) {
  const bin = useBin();
  const dialog = useRef<{ openDialog: () => void }>(null);

  const [search, setSearch] = useState("");
  const debounce = useDeferredValue(search);

  const [pkgList, setPkgList] = useState<Array<PKG>>([]);
  const [installedPkgList, setInstalledPkgList] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const installedPkgList = (bin?.extensionEnabled.js?.packages || []).reduce(
      (acc, pkg) => {
        acc[pkg] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );
    setInstalledPkgList(installedPkgList);
  }, [bin?.extensionEnabled?.js]);

  useEffect(() => {
    const fn = async () => {
      const search = debounce.trim().toLowerCase();
      const res = (await fetch(
        `https://registry.npmjs.com/-/v1/search?text=${search}&size=15`
      ).then((res) => res.json())) as NPMResponse;
      const pkgList = res.objects.map((pkg) => {
        const packageKey = `${pkg.package.name}@${pkg.package.version}`;
        return {
          key: packageKey,
          label: packageKey,
        };
      });
      setPkgList(pkgList);
    };
    const timer = setTimeout(fn, 200);
    return () => clearTimeout(timer);
  }, [debounce]);

  const updateSearch: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearch(e.target.value);

  const onClick = (pkg: string) => () => {
    const updatedInstalledPkgList = { ...installedPkgList };
    updatedInstalledPkgList[pkg] = !updatedInstalledPkgList[pkg];
    setInstalledPkgList(updatedInstalledPkgList);
  };

  const installPackages = async () => {
    if (!bin) return;
    try {
      showLoading();
      const deps = Array.from(
        new Set([
          ...defaultPkg,
          ...entries(installedPkgList)
            .filter(([, installed]) => installed)
            .map(([key]) => key),
        ])
      );
      await addDep(deps);
      await updateBin(bin.id, {
        ...bin,
        extensionEnabled: {
          ...bin.extensionEnabled,
          js: {
            ...bin.extensionEnabled.js,
            packages: deps,
          },
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  useImperativeHandle(ref, () => ({
    openDialog: dialog.current?.openDialog,
  }));

  return (
    <Dialog
      ref={dialog}
      title="Add NPM Package"
      content={
        <div className="w-full md:w-96">
          <input
            value={search}
            onChange={updateSearch}
            placeholder="Search..."
            className="p-2 px-4 w-full bg-inactiveLight/50 focus:bg-inactiveLight rounded-sm outline-none"
          />
          <ul className="my-4 flex flex-col gap-2 w-full max-h-56 sm:max-h-96 overflow-y-auto">
            {debounce && pkgList.length
              ? pkgList.map((pkg) => (
                  <PackageItem
                    key={pkg.key}
                    pkg={pkg}
                    installed={installedPkgList[pkg.key]}
                    onClick={onClick}
                  />
                ))
              : Object.keys(installedPkgList).map((pkg) => (
                  <PackageItem
                    key={pkg}
                    pkg={{ key: pkg, label: pkg }}
                    installed={installedPkgList[pkg]}
                    onClick={onClick}
                  />
                ))}
          </ul>
        </div>
      }
      action={Action(installPackages)}
    />
  );
});

const Action = (installPackages: () => void) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (_P: { onClose: () => void }) => (
    <Button
      onClick={installPackages}
      className="w-full bg-secondary text-white"
    >
      Install Packages
    </Button>
  );
};

export default NPMDialog;

interface PackageItem {
  pkg: PKG;
  installed: boolean;
  onClick: (pkg: string) => () => void;
}

const PackageItem = ({ pkg, installed, onClick }: PackageItem) => {
  return (
    <li className="flex cursor-pointer w-full rounded bg-inactiveLight/30 hover:bg-inactiveLight items-stretch">
      <Button
        title={pkg.label}
        className="flex-grow rounded-s rounded-e-none border-none text-start pl-4 overflow-hidden whitespace-nowrap text-ellipsis"
      >
        {pkg.label}
      </Button>
      <Button
        onClick={onClick(pkg.key)}
        className={`${
          installed ? "bg-red-500" : "bg-secondary"
        } rounded-s-none rounded-e border-none h-full`}
      >
        {installed ? (
          <Trash width={20} height={20} color="#FFFFFF" />
        ) : (
          <Add width={20} height={20} color="#FFFFFF" />
        )}
      </Button>
    </li>
  );
};
