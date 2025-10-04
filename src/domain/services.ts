// src/domain/services.ts
export type DateRange = { startISO: string; endISO: string };

export interface IExpensesService {
  addExpense(input: {
    amountCents: number;
    tag: string;
    note?: string | null;
    tsISO?: string; // optional override
  }): Promise<{ expense: { id: string; tsISO: string } }>;

  listExpenses(range?: Partial<DateRange>): Promise<{ expenses: Array<{
    id: string; amountCents: number; tag: string; note?: string | null; tsISO: string;
  }> }>;
}

export interface IStatsService {
  getTotals(range: DateRange): Promise<{ totals: Array<{ dateISO: string; totalCents: number }> }>;
  getByTag(range: DateRange): Promise<{ byTag: Array<{ tag: string; totalCents: number }> }>;
}
