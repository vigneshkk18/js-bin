import Button from "ui/button";

import MagicWand from "assets/magic-wand";

export default function HTMLHeader({
  onCodeFormat,
}: {
  onCodeFormat: () => void;
}) {
  return (
    <header className="w-full relative layout-header flex justify-between">
      <Button className="cursor-default border-0 flex items-center gap-1 p-2 px-3 text-secondary">
        <span>HTML</span>
      </Button>
      <Button
        onClick={onCodeFormat}
        className="border-0 mt-1 mr-1 hover:bg-primary/10 p-1 rounded"
      >
        <MagicWand width={16} height={16} />
      </Button>
    </header>
  );
}
