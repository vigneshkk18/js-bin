import { useState } from "react";

import ReactCodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
// import { sass } from "@codemirror/lang-sass";
// import { less } from "@codemirror/lang-less";

import WithView from "components/bin/with-view";

function View() {
  const [value, setValue] = useState("");

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
    <ReactCodeMirror
      value={value}
      theme={"none"}
      height="100%"
      style={{ height: "100%" }}
      onFocus={onFocus}
      onBlur={onBlur}
      className="focus-visible:outline-none outline-none bg-panel cursor-default"
      extensions={[css()]}
      onChange={setValue}
    />
  );
}

export default function CSSView() {
  return (
    <WithView layoutName="css">
      <View />
    </WithView>
  );
}
