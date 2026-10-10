import Dexie, { type EntityTable } from "dexie";

export interface ScanRecord {
  id: string;
  type: "text" | "url" | "image";
  riskScore: number | null;
  riskLevel: "low" | "medium" | "high" | "unknown";
  indicators: string[];
  modelVersion: string;
  createdAt: number;
}

const db = new Dexie("ScamShieldDB") as Dexie & {
  scans: EntityTable<ScanRecord, "id">;
};

db.version(1).stores({
  scans: "id, type, riskLevel, createdAt",
});

export { db };

