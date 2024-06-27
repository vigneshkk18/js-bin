import Button from "ui/button";

interface ConsoleHeader {
  clearLogs: () => void;
}

export default function ConsoleHeader({ clearLogs }: ConsoleHeader) {
  return (
    <header className="w-full relative layout-header flex items-center justify-between pr-2">
      <Button className="cursor-default border-0 flex items-center gap-1 p-2 px-3 text-secondary">
        <span>Console</span>
      </Button>
      <Button onClick={clearLogs} className="px-2 py-0 rounded-sm">
        clear
      </Button>
    </header>
  );
}
