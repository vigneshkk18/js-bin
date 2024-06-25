import ReactCodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";

import WithView from "components/bin/with-view";

import useCachedCode from "hooks/useCachedCode";
import useCodeSync from "hooks/useCodeSync";
import HTMLHeader from "./html-header";

function View() {
  const initialCode = useCachedCode("html");
  const { sync } = useCodeSync("html");

  function onChange(code: string) {
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
        value={initialCode}
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
