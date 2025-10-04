// server/src/db.ts
import { LowSync } from "lowdb";
import { JSONFileSync } from 'lowdb/node';
type Expense = { id: string; amountCents: number; tag: string; note?: string | null; tsISO: string };
type Data = { expenses: Expense[] };
const adapter = new JSONFileSync<Data>("data.json");
export const db = new LowSync<Data>(adapter, { expenses: [] });
db.read();
db.data ||= { expenses: [] };
db.write();
