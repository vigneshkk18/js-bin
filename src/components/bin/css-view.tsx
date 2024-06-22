import WithView from "components/bin/with-view";

function View() {
  return "CSS";
}

export default function CSSView() {
  return (
    <WithView layoutName="css">
      <View />
    </WithView>
  );
}
