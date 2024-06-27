import { useEffect, useRef } from "react";

interface UseShortcut {
  shortcut: {
    key: string;
    ctrlKey?: boolean;
    altKey?: boolean;
    shiftKey?: boolean;
  };
  fn: () => void;
}

export default function useShortcut(
  shortcut: UseShortcut["shortcut"],
  fn: UseShortcut["fn"]
) {
  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  const { key, ctrlKey = false, altKey = false, shiftKey = false } = shortcut;

  useEffect(() => {
    const cb = (ev: KeyboardEvent) => {
      if (
        key.toLowerCase() !== ev.key.toLowerCase() ||
        ctrlKey !== ev.ctrlKey ||
        altKey !== ev.altKey ||
        shiftKey !== ev.shiftKey
      )
        return;
      ev.preventDefault();
      ref.current();
    };

    window.addEventListener("keydown", cb);
    return () => window.removeEventListener("keydown", cb);
  }, [key, ctrlKey, altKey, shiftKey]);
}
