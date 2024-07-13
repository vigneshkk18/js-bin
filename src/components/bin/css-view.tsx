import { css } from "@codemirror/lang-css";
import { sass } from "@codemirror/lang-sass";
import ReactCodeMirror from "@uiw/react-codemirror";

import WithView from "components/bin/with-view";
import CSSHeader from "components/bin/css-header";

import useBin, { formatCode, updateCode } from "hooks/useBin";

import { CSSPreProcessor } from "types/bin";

const extensionObj: Record<CSSPreProcessor, ReturnType<typeof css>[]> = {
  none: [css()],
  sass: [sass({ indented: true })],
  scss: [sass({ indented: true })],
};

function View() {
  const bin = useBin();

  function onCodeFormat() {
    if (!bin) return;
    formatCode(bin.css, "css");
  }

  function onChange(code: string) {
    updateCode("css", code);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!e.shiftKey || !e.altKey || e.code !== "KeyF") return;
    onCodeFormat();
  }

  return (
    <>
      <CSSHeader onCodeFormat={onCodeFormat} />
      <ReactCodeMirror
        value={bin?.css ?? ""}
        theme={"none"}
        height="100%"
        onKeyDown={onKeyDown}
        style={{ height: "100%" }}
        className="focus-visible:outline-none outline-none cursor-default"
        extensions={
          extensionObj[bin?.extensionEnabled.css?.preprocessor ?? "none"]
        }
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
