import { useEffect } from "react";
import shortUUID from "short-uuid";
import { useLocation } from "wouter";
import { FileNode } from "@webcontainer/api";

import { db } from "src/db";

import DefaultView from "components/bin/default-view";

import jsFile from "utils/fst/js";
import cssFile from "utils/fst/css";
import { defaultJS } from "utils/default-codes/js";
import { defaultCSS } from "utils/default-codes/css";
import { defaultHTML } from "utils/default-codes/html";

import { Bin } from "types/bin";

export default function DefaultRoute() {
  const [, navigate] = useLocation();

  useEffect(() => {
    const newBin: Bin = {
      id: shortUUID.generate(),
      title: "Untitled",
      html: defaultHTML,
      css: (cssFile(defaultCSS) as FileNode)?.file?.contents as string,
      js: (jsFile(defaultJS) as FileNode)?.file?.contents as string,
      extensionEnabled: {
        html: {},
        css: {},
        js: { packages: ["vite", "typescript"] },
      },
    };

    const timer = setTimeout(async () => {
      try {
        await db.bins.add(newBin);
        navigate("/" + newBin.id);
      } catch (error) {
        console.error(error);
      }
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="h-[calc(100vh-41px)] flex items-center justify-center">
      <DefaultView />
    </main>
  );
}
