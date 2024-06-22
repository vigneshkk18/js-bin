import WithView from "components/bin/with-view";

function View() {
  return "JS";
}

export default function JSView() {
  return (
    <WithView layoutName="js">
      <View />
    </WithView>
  );
}
