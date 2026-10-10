import { db, type ScanRecord } from "./database";

export async function saveScan(
  scan: ScanRecord
): Promise<void> {
  await db.scans.put(scan);
}