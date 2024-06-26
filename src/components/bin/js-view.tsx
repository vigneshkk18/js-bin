import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import WithView from "components/bin/with-view";
import JSHeader from "components/bin/js-header";

import useCodeSync from "hooks/useCodeSync";
import useBin, { updateCode } from "src/hooks/useBin";

function View() {
  const bin = useBin();
  const { sync } = useCodeSync("js");

  function onChange(code: string) {
    updateCode("js", code);
    sync(code);
  }

  function onFocus(event: React.FocusEvent) {
    const el = event.target as HTMLDivElement;
    el.style.backgroundColor = "#fff";
    el.style.cursor = "text";
  }

  function onBlur(event: React.FocusEvent) {
    const el = event.target as HTMLDivElement;
    el.style.backgroundColor = "";
    el.style.cursor = "";
  }

  return (
    <>
      <JSHeader />
      <ReactCodeMirror
        value={bin?.js || ""}
        theme={"none"}
        height="100%"
        style={{ height: "100%" }}
        onFocus={onFocus}
        onBlur={onBlur}
        className="focus-visible:outline-none outline-none bg-panel cursor-default"
        extensions={[javascript({ jsx: true, typescript: true })]}
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
