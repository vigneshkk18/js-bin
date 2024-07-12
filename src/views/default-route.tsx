import { useEffect, useRef } from "react";
import shortUUID from "short-uuid";
import { useLocation } from "wouter";

import { db } from "src/db";

import Button from "ui/button";

import Dialog from "components/dialog/dialog";
import { Content } from "components/dialogs/open-bin";
import DefaultView from "components/bin/default-view";

import { defaultJS } from "utils/default-codes/js";
import { defaultCSS } from "utils/default-codes/css";
import { defaultHTML } from "utils/default-codes/html";

import { Bin } from "types/bin";

export default function DefaultRoute() {
  const modal = useRef<{ openDialog: () => void }>(null);
  const [, navigate] = useLocation();

  const createNewBin = async () => {
    const newBin: Bin = {
      id: shortUUID.generate(),
      title: "Untitled",
      html: defaultHTML,
      css: defaultCSS,
      js: defaultJS,
      extensionEnabled: {
        html: {},
        css: {},
        js: { packages: [] },
      },
    };
    try {
      await db.bins.add(newBin);
      navigate("/" + newBin.id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!modal.current) return;
    modal.current.openDialog();
  }, []);

  return (
    <main className="h-[calc(100vh-41px)] flex items-center justify-center">
      <Dialog
        ref={modal}
        closable={false}
        title="Create New / Open Existing Bin"
        content={<Content />}
        action={Action(createNewBin)}
      />
      <DefaultView />
    </main>
  );
}

const Action = (createNewBin: () => Promise<void>) => () =>
  (
    <Button
      onClick={createNewBin}
      className="bg-secondary text-white w-full rounded-md"
    >
      Create New Bin
    </Button>
  );
