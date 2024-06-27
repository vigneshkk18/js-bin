import { Link } from "wouter";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import Button from "ui/button";

import useBin from "hooks/useBin";

import { db } from "src/db";

import { Bin } from "types/bin";

export const title = "Open Bin";

const BinItem = ({ bin, disabled }: { bin: Bin; disabled: boolean }) => {
  if (disabled) {
    return (
      <li className="w-full px-4 py-2 rounded-sm bg-black/5">
        {bin.title} (Active)
      </li>
    );
  }
  return (
    <Link to={"/" + bin.id} key={bin.id}>
      <li className="cursor-pointer w-full px-4 py-2 rounded-sm bg-inactiveLight/30 hover:bg-inactiveLight">
        {bin.title}
      </li>
    </Link>
  );
};

export const Content = () => {
  const [search, setSearch] = useState("");
  const bins = useLiveQuery(() => {
    return search.trim().length
      ? db.bins.where("title").startsWithIgnoreCase(search).toArray()
      : db.bins.toArray();
  }, [search]);
  const bin = useBin();

  const updateSearch: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearch(e.target.value);

  if (!bins || !bin) return null;

  return (
    <div className="w-full md:w-96">
      <input
        value={search}
        onChange={updateSearch}
        placeholder="Search..."
        className="p-2 px-4 w-full bg-inactiveLight/50 focus:bg-inactiveLight rounded-sm outline-none"
      />
      <ul className="my-4 flex flex-col gap-2 w-full max-h-56 sm:max-h-96 overflow-y-auto">
        {bins.length ? (
          bins.map((currBin) => (
            <BinItem
              key={currBin.id}
              bin={currBin}
              disabled={bin.id === currBin.id}
            />
          ))
        ) : (
          <p>No Bin Found !!!</p>
        )}
      </ul>
    </div>
  );
};

export const Actions = ({ onClose }: { onClose: () => void }) => (
  <div className="flex w-full justify-end gap-4 mt-2">
    <Button className="rounded-md px-2" onClick={onClose}>
      Close
    </Button>
  </div>
);
