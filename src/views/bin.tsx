import Views from "components/bin/views";
import DefaultView from "components/bin/default-view";

export default function Bin() {
  return (
    <main className="h-[calc(100vh-41px)] flex items-center justify-center">
      <DefaultView />
      <Views />
    </main>
  );
}
