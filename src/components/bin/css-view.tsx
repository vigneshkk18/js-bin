import { css } from "@codemirror/lang-css";
import { sass } from "@codemirror/lang-sass";
import ReactCodeMirror from "@uiw/react-codemirror";

import WithView from "components/bin/with-view";
import CSSHeader from "components/bin/css-header";

import useBin, { updateCode } from "hooks/useBin";

import { CSSPreProcessor } from "types/bin";

const extensionObj: Record<CSSPreProcessor, ReturnType<typeof css>[]> = {
  none: [css()],
  sass: [sass({ indented: true })],
  scss: [sass({ indented: true })],
};

function View() {
  const bin = useBin();

  function onChange(code: string) {
    updateCode("css", code);
  }

  return (
    <>
      <CSSHeader />
      <ReactCodeMirror
        value={bin?.css ?? ""}
        theme={"none"}
        height="100%"
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
