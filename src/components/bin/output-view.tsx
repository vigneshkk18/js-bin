import WithView from "components/bin/with-view";

import useCodeStore from "hooks/useCodeStore";

function View() {
  const { devUrl } = useCodeStore();

  return (
    <iframe
      srcDoc={!devUrl ? "<h1>Loading...</h1>" : undefined}
      className="bg-white w-full h-full"
      title="Dev Preview"
      src={!devUrl ? undefined : devUrl}
      referrerPolicy="no-referrer"
    />
  );
}

export default function OutputView() {
  return (
    <WithView canResize={false} layoutName="output">
      <View />
    </WithView>
  );
}
