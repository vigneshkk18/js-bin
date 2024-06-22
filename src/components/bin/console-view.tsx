import WithView from "components/bin/with-view";

function View() {
  return "Console";
}

export default function ConsoleView() {
  return (
    <WithView layoutName="console">
      <View />
    </WithView>
  );
}
