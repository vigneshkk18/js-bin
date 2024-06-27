import { restartServer } from "src/hooks/useCodeStore";
import Button from "ui/button";

export default function OutputHeader() {
  return (
    <header className="w-full relative layout-header flex items-center justify-between pr-2">
      <Button className="cursor-default border-0 flex items-center gap-1 p-2 px-3 text-secondary">
        <span>Output</span>
      </Button>
      <Button onClick={restartServer} className="px-2 py-0 rounded-sm">
        restart
      </Button>
    </header>
  );
}
