import Views from "components/bin/views";
import DefaultView from "components/bin/default-view";
import LoadingDialog from "components/loading-dialog/loading-dialog";

export default function Bin() {
  return (
    <main className="h-[calc(100vh-41px)] flex items-center justify-center">
      <DefaultView />
      <LoadingDialog>
        <Views />
      </LoadingDialog>
    </main>
  );
}
