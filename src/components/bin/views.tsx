import { useEffect } from "react";
import { useParams } from "wouter";

import JSView from "components/bin/js-view";
import CSSView from "components/bin/css-view";
import HTMLView from "components/bin/html-view";
import OutputView from "components/bin/output-view";
import ConsoleView from "components/bin/console-view";

import useLayout from "hooks/useLayout";
import useResize from "hooks/useResize";
import { fetchBin } from "hooks/useBin";

export default function Views() {
  useResize();
  const { binId } = useParams<{ binId: string }>();
  const { layout } = useLayout();
  const layoutSelected = Object.values(layout).some((selected) => selected);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBin(binId);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, [binId]);

  return (
    <div
      className={`w-full h-full flex relative select-none ${
        layoutSelected ? "" : "hidden"
      }`}
    >
      <HTMLView />
      <CSSView />
      <JSView />
      <ConsoleView />
      <OutputView />
    </div>
  );
}
