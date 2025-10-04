// src/domain/expense.ts
// Money as integer cents; timestamps as ISO strings.
export type Tag = "food" | "transport" | "coffee" | "fun" | "other";

export type Expense = {
  id: string;            // UUID
  amountCents: number;   // int cents
  tag: Tag;
  note?: string | null;
  tsISO: string;         // ISO timestamp when created
  pending?: boolean;     // UI helper for optimistic rows
};
