import { useLocation } from "wouter";

import Button from "ui/button";

import useBin from "hooks/useBin";

import { db } from "src/db";

export const title = "Are you sure you want to delete the bin?";

export default function Actions({ onClose }: { onClose: () => void }) {
  const [, navigate] = useLocation();
  const bin = useBin();

  const onDelete = async () => {
    if (!bin) return;
    try {
      await db.bins.delete(bin.id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full justify-end gap-4 mt-2">
      <Button className="rounded-md px-4" onClick={onClose}>
        Cancel
      </Button>
      <Button
        onClick={onDelete}
        className="px-4 bg-red-500 rounded-md text-white"
      >
        Delete
      </Button>
    </div>
  );
}
