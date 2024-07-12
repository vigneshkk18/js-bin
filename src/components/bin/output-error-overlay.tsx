import useCodeStore from "hooks/useCodeStore";

export default function OutputErrorOverlay() {
  const { error } = useCodeStore();

  if (!error) return null;

  return (
    <div className="w-full h-full bg-black/80 absolute p-4 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <span className="bg-red-500 text-black font-bold px-2 py-1">
          {error.location.file}:{error.location.line}:{error.location.column}:
        </span>
        <span className="text-white/80">{error.text}</span>
      </div>
      <div className="grid grid-cols-[auto_1fr] auto-rows-min gap-x-2 gap-y-[2px] text-white/80">
        <span className="px-2 border-r border-r-white/80">
          {error.location.line}
        </span>
        <span>{error.location.lineText}</span>
        <span className="px-2 border-r border-r-white/80"></span>
        <span style={{ paddingLeft: `${error.location.column - 3}ch` }}>^</span>
        <span className="px-2"></span>
        <span className="bg-blue-400 text-black font-bold px-2 w-max">
          {error.location.suggestion}
        </span>
      </div>
    </div>
  );
}
