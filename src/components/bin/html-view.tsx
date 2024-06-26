import { html } from "@codemirror/lang-html";
import ReactCodeMirror from "@uiw/react-codemirror";

import WithView from "components/bin/with-view";
import HTMLHeader from "components/bin/html-header";

import useCodeSync from "hooks/useCodeSync";
import useBin, { updateCode } from "hooks/useBin";

function View() {
  const bin = useBin();
  const { sync } = useCodeSync("html");

  function onChange(code: string) {
    updateCode("html", code);
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
      <HTMLHeader />
      <ReactCodeMirror
        value={bin?.html || ""}
        theme={"none"}
        height="100%"
        style={{ height: "100%" }}
        onFocus={onFocus}
        onBlur={onBlur}
        className="focus-visible:outline-none outline-none bg-panel cursor-default"
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
