import { css } from "@codemirror/lang-css";
import { sass } from "@codemirror/lang-sass";
import { less } from "@codemirror/lang-less";
import ReactCodeMirror from "@uiw/react-codemirror";

import WithView from "components/bin/with-view";
import CSSHeader from "components/bin/css-header";

import useCodeSync from "hooks/useCodeSync";
import useBin, { updateCode } from "hooks/useBin";

import { CSSPreProcessor } from "utils/code";

const extensionObj: Record<CSSPreProcessor, ReturnType<typeof css>[]> = {
  none: [css()],
  less: [less()],
  sass: [sass({ indented: true })],
  scss: [sass({ indented: true })],
  stylus: [css()],
};

function View() {
  const bin = useBin();
  const { sync } = useCodeSync("css");

  function onChange(code: string) {
    updateCode("css", code);
    sync(code);
  }

  return (
    <>
      <CSSHeader />
      <ReactCodeMirror
        value={bin?.css || ""}
        theme={"none"}
        height="100%"
        style={{ height: "100%" }}
        className="focus-visible:outline-none outline-none cursor-default"
        extensions={
          extensionObj[
            (bin?.extensionEnabled.css?.preprocessor ||
              "none") as CSSPreProcessor
          ]
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
