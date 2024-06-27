import Button from "ui/button";

import useScreenName from "hooks/useScreenName";
import { showSideMenu } from "hooks/useSideMenu";

export default function Logo() {
  const screenName = useScreenName();

  if (screenName !== "sm") {
    return (
      <div className="p-2">
        <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
      </div>
    );
  }

  return (
    <Button
      onClick={showSideMenu}
      className="p-2 bg-transparent hover:bg-transparent border-none"
    >
      <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
    </Button>
  );
}
