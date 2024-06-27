import Button from "ui/button";

import useBin, { updateTitle } from "hooks/useBin";

export const title = "Update Title";

export const Content = () => {
  const bin = useBin();
  return (
    <div className="w-full md:w-96">
      <input
        value={bin?.title || ""}
        onChange={(e) => updateTitle(e.target.value)}
        placeholder="Search..."
        className="p-2 px-4 w-full bg-inactiveLight/50 focus:bg-inactiveLight rounded-sm outline-none"
      />
    </div>
  );
};

export const Actions = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex w-full justify-end gap-4 mt-2">
      <Button className="rounded-md px-2" onClick={onClose}>
        Close
      </Button>
    </div>
  );
};
