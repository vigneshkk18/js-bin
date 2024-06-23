import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import WithView from "components/bin/with-view";

import useCachedCode from "hooks/useCachedCode";
import useCodeSync from "hooks/useCodeSync";

function View() {
  const initialCode = useCachedCode("js");
  const { sync } = useCodeSync("js");

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
    <ReactCodeMirror
      value={initialCode}
      theme={"none"}
      height="100%"
      style={{ height: "100%" }}
      onFocus={onFocus}
      onBlur={onBlur}
      className="focus-visible:outline-none outline-none bg-panel cursor-default"
      extensions={[javascript({ jsx: true, typescript: true })]}
      onChange={onChange}
    />
  );
}

export default function JSView() {
  return (
    <WithView layoutName="js">
      <View />
    </WithView>
  );
}
