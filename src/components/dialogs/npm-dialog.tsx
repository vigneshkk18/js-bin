import {
  forwardRef,
  useDeferredValue,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Virtuoso } from "react-virtuoso";

import Button from "ui/button";

import Dialog from "components/dialog/dialog";

import { usePkgList } from "hooks/usePkgList";
import useScreenName from "hooks/useScreenName";
import useBin, { updateBin } from "hooks/useBin";
import { hideLoading, showLoading } from "hooks/useLoading";

import Add from "assets/add";
import Trash from "assets/trash";
import { entries } from "utils/common";

import { PKG } from "types/npm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NPMDialog = forwardRef(function (_props: any, ref: any) {
  const sizeName = useScreenName();
  const bin = useBin();
  const dialog = useRef<{ openDialog: () => void }>(null);

  const [search, setSearch] = useState("");
  const debounce = useDeferredValue(search);

  const [isPending, pkgList] = usePkgList(debounce);
  const [installedPkgList, setInstalledPkgList] = useState<Record<string, PKG>>(
    {}
  );

  useEffect(() => {
    const installedPkgList = (bin?.extensionEnabled.js?.packages || []).reduce(
      (acc, pkg) => {
        const split = pkg.split("@");
        const [pkgName, pkgVersion] = split;
        acc[pkg] = {
          key: pkg,
          label: pkg,
          pkgName,
          pkgVersion,
          installed: true,
        };
        return acc;
      },
      {} as Record<string, PKG>
    );
    setInstalledPkgList(installedPkgList);
  }, [bin?.extensionEnabled?.js]);

  const updateSearch: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearch(e.target.value);

  const onClick = (pkg: PKG) => () => {
    const updatedInstalledPkgList = { ...installedPkgList };
    if (!(pkg.key in updatedInstalledPkgList)) {
      updatedInstalledPkgList[pkg.key] = { ...pkg, installed: true };
    } else {
      updatedInstalledPkgList[pkg.key].installed =
        !updatedInstalledPkgList[pkg.key].installed;
    }
    setInstalledPkgList(updatedInstalledPkgList);
  };

  const installPackages = (onDialogClose: () => void) => async () => {
    if (!bin) return;
    try {
      showLoading();
      const deps = Array.from(
        new Set([
          ...entries(installedPkgList)
            .filter(([, pkg]) => pkg.installed)
            .map(([key]) => key),
        ])
      );
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
      onDialogClose();
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  useImperativeHandle(ref, () => ({
    openDialog: dialog.current?.openDialog,
  }));

  const list =
    debounce && pkgList.length ? pkgList : Object.values(installedPkgList);

  return (
    <Dialog
      ref={dialog}
      title="Add NPM Package"
      content={
        <div className="md:w-96">
          <input
            value={search}
            onChange={updateSearch}
            placeholder="Search..."
            className="p-2 px-4 w-full bg-inactiveLight/50 focus:bg-inactiveLight rounded-sm outline-none"
          />
          <ul
            className={`my-4 flex flex-col gap-2 ${isPending ? "opacity-50" : ""}`}
          >
            <Virtuoso
              style={{ height: sizeName !== "sm" ? "224px" : "384px" }}
              totalCount={list.length}
              data={list}
              itemContent={(_, pkg) => (
                <PackageItem
                  key={pkg.key}
                  pkg={pkg}
                  installed={installedPkgList?.[pkg.key]?.installed}
                  onClick={onClick}
                />
              )}
            />
          </ul>
        </div>
      }
      action={Action(installPackages)}
    />
  );
});

const Action = (installPackages: (onClose: () => void) => () => void) => {
  return ({ onClose }: { onClose: () => void }) => (
    <Button
      onClick={installPackages(onClose)}
      className="w-full bg-secondary text-white rounded border-none shadow-md"
    >
      Update Packages
    </Button>
  );
};

export default NPMDialog;

interface PackageItem {
  pkg: PKG;
  installed: boolean;
  onClick: (pkg: PKG) => () => void;
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
        onClick={onClick(pkg)}
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
