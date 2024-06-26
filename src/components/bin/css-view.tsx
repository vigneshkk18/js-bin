import { css } from "@codemirror/lang-css";
import ReactCodeMirror from "@uiw/react-codemirror";
// import { sass } from "@codemirror/lang-sass";
// import { less } from "@codemirror/lang-less";

import WithView from "components/bin/with-view";
import CSSHeader from "components/bin/css-header";

import useCodeSync from "hooks/useCodeSync";
import useBin, { updateCode } from "hooks/useBin";

function View() {
  const bin = useBin();
  const { sync } = useCodeSync("css");

  function onChange(code: string) {
    updateCode("css", code);
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
      <CSSHeader />
      <ReactCodeMirror
        value={bin?.css || ""}
        theme={"none"}
        height="100%"
        style={{ height: "100%" }}
        onFocus={onFocus}
        onBlur={onBlur}
        className="focus-visible:outline-none outline-none bg-panel cursor-default"
        extensions={[css()]}
        onChange={onChange}
      />
    </>
  );
}

export default function CSSView() {
  return (
    <WithView layoutName="css">
      <View />
    </WithView>
  );
}
