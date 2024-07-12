import { Virtuoso } from "react-virtuoso";
import { useEffect, useState } from "react";

import WithView from "components/bin/with-view";
import ConsoleHeader from "components/bin/console-header";

import AngleRight from "assets/angle-right";

function View() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const ac = new AbortController();
    window.addEventListener(
      "message",
      (event) => {
        if (event.data.type === "console-log" && event.origin) {
          const args = event.data.args.map((arg: any) =>
            typeof arg === "string" ? arg : JSON.stringify(arg)
          );
          setLogs((prev) => [...prev, ...args]);
        }
      },
      { signal: ac.signal }
    );
    return () => {
      ac.abort();
    };
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <>
      <ConsoleHeader clearLogs={clearLogs} />
      <Virtuoso
        className="h-[calc(100vh-71px)]"
        totalCount={logs.length}
        data={logs}
        followOutput={true}
        initialTopMostItemIndex={logs.length - 1}
        itemContent={(index, log) => (
          <div className="flex items-center" key={index}>
            <AngleRight width={30} height={30} color="#3583FC" />
            <span className="break-all basis-[89%]">{log}</span>
          </div>
        )}
      />
    </>
  );
}

export default function ConsoleView() {
  return (
    <WithView layoutName="console">
      <View />
    </WithView>
  );
}
