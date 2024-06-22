import WithView from "components/bin/with-view";

function View() {
  return "HTML";
}

export default function HTMLView() {
  return (
    <WithView layoutName="html">
      <View />
    </WithView>
  );
}
