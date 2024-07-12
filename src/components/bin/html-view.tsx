import { html } from "@codemirror/lang-html";
import ReactCodeMirror from "@uiw/react-codemirror";

import WithView from "components/bin/with-view";
import HTMLHeader from "components/bin/html-header";

import useBin, { updateCode, formatCode } from "hooks/useBin";

function View() {
  const bin = useBin();

  function onCodeFormat() {
    if (!bin) return;
    formatCode(bin.html, "html");
  }

  function onChange(code: string) {
    updateCode("html", code);
  }

  return (
    <>
      <HTMLHeader onCodeFormat={onCodeFormat} />
      <ReactCodeMirror
        value={bin?.html ?? ""}
        theme={"none"}
        height="100%"
        style={{ height: "100%" }}
        className="focus-visible:outline-none outline-none cursor-default"
        extensions={[html({ autoCloseTags: true, matchClosingTags: true })]}
        onChange={onChange}
      />
    </>
  );
}

export default function HTMLView() {
  return (
    <WithView layoutName="html">
      <View />
    </WithView>
  );
}
