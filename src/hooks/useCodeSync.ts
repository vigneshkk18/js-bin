import { useRef } from "react";
import { useParams } from "wouter";

import { db } from "src/db";

import useBin from "hooks/useBin";
import { Layout } from "hooks/useLayout";
import { writeFile } from "hooks/useCodeStore";

import { languageToExtensionMap, languageToFilePrefix } from "utils/code";

const DELAY = 500;

export default function useCodeSync(
  language: Extract<Layout, "html" | "css" | "js">
) {
  const bin = useBin();
  const { binId } = useParams<{ binId: string }>();
  const timer = useRef<number>();

  const sync = (code: string) => {
    if (!bin) return;
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      db.bins.update(binId, {
        [language]: code,
      });
      const fileName = `${languageToFilePrefix[language]}${
        languageToExtensionMap[language][
          bin.extensionEnabled[language]?.preprocessor || "none"
        ]
      }`;
      writeFile(fileName, code);
    }, DELAY);
  };

  return { sync };
}
