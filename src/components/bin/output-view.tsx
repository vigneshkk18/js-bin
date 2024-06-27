import WithView from "components/bin/with-view";
import OutputHeader from "components/bin/output-header";

import useCodeStore from "hooks/useCodeStore";

function View() {
  const { devUrl } = useCodeStore();

  return (
    <>
      <OutputHeader />
      <iframe
        srcDoc={!devUrl ? "<h1>Loading...</h1>" : undefined}
        className="w-full h-full pointer-events-none"
        title="Dev Preview"
        src={!devUrl ? undefined : devUrl}
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
