import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import WithView from "components/bin/with-view";
import JSHeader from "components/bin/js-header";

import useCodeSync from "hooks/useCodeSync";
import useBin, { updateCode } from "hooks/useBin";

import { Bin } from "types/bin";

const extension = (extension?: Bin["extensionEnabled"]) => [
  javascript({
    jsx: extension?.js?.preprocessor === "react",
    typescript: extension?.js?.preprocessor === "typescript",
  }),
];

function View() {
  const bin = useBin();
  const { sync } = useCodeSync("js");

  function onChange(code: string) {
    updateCode("js", code);
    sync(code);
  }

  return (
    <>
      <JSHeader />
      <ReactCodeMirror
        value={bin?.js || ""}
        theme={"none"}
        height="100%"
        style={{ height: "100%" }}
        className="focus-visible:outline-none outline-none cursor-default"
        extensions={extension(bin?.extensionEnabled)}
        onChange={onChange}
      />
    </>
  );
}

export default function JSView() {
  return (
    <WithView layoutName="js">
      <View />
    </WithView>
  );
}
