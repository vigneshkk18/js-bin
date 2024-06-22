import { useLayoutEffect, useState } from "react";
import { screens } from "tailwindcss/defaultTheme";

import { entries } from "utils/common";

type ScreenName = keyof typeof screens;

export default function useScreenName() {
  const [screenName, setScreenName] = useState<ScreenName>("sm");

  useLayoutEffect(() => {
    const updateScreenName = () => {
      const screenEntries = entries(screens);
      let screenName: ScreenName =
        window.innerWidth > parseInt(screens["2xl"]) ? "2xl" : "sm";

      for (let i = screenEntries.length - 1; i >= 0; i--) {
        if (window.innerWidth <= parseInt(screenEntries[i][1]))
          screenName = screenEntries[i][0];
      }
      console.log(screenName, screens, window.innerWidth);
      setScreenName(screenName);
    };

    updateScreenName();
    window.addEventListener("resize", updateScreenName);
    return () => window.removeEventListener("resize", updateScreenName);
  }, []);

  return screenName;
}
