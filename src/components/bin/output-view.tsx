import WithView from "components/bin/with-view";
import OutputHeader from "components/bin/output-header";
import OutputErrorOverlay from "components/bin/output-error-overlay";

import useCodeStore from "hooks/useCodeStore";

function View() {
  const { html, ready } = useCodeStore();

  return (
    <>
      <OutputHeader />
      <OutputErrorOverlay />
      <iframe
        srcDoc={!ready ? "<h1>Loading...</h1>" : html}
        className="w-full h-full"
        title="Dev Preview"
        referrerPolicy="no-referrer"
      />
    </>
  );
}

export default function OutputView() {
  return (
    <WithView canResize={false} layoutName="output">
      <View />
    </WithView>
  );
}
