import Dexie, { EntityTable } from "dexie";

import { Bin } from "types/bin";

export const db = new Dexie("bin-database") as Dexie & {
  bins: EntityTable<Bin, "id">;
};

db.version(1).stores({
  bins: "id,title", // Primary key and indexed props
});
