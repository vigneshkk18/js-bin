import WithView from "components/bin/with-view";

function View() {
  return "Output";
}

export default function OutputView() {
  return (
    <WithView canResize={false} layoutName="output">
      <View />
    </WithView>
  );
}
