// src/features/store/slices/expensesSlice.ts
import { StateCreator } from "zustand";
import { Expense } from "@/domain/expense";

export type ExpensesState = {
  expenses: Expense[];           // local cache (today + maybe recent)
  pendingIds: Record<string, true>;
};

export type ExpensesActions = {
  upsertExpenseOptimistic: (e: Expense) => void; // add with pending flag
  confirmExpense: (tempId: string, real: Expense) => void; // swap IDs & clear pending
  rollbackExpense: (tempId: string) => void;
  setExpenses: (rows: Expense[]) => void;
  clearAll: () => void;
};

export type ExpensesSlice = ExpensesState & { actions: ExpensesActions };

export const createExpensesSlice: StateCreator<
  any,
  [["zustand/devtools", never]],
  [],
  ExpensesSlice
> = (set, get) => ({
  expenses: [],
  pendingIds: {},
  actions: {
    upsertExpenseOptimistic: (e) =>
      set((s: any) => ({
        expenses: [e, ...s.expenses],
        pendingIds: e.pending ? { ...s.pendingIds, [e.id]: true } : s.pendingIds,
      })),
    confirmExpense: (tempId, real) =>
      set((s: any) => {
        const idx = s.expenses.findIndex((x: any) => x.id === tempId);
        if (idx < 0) return {};
        const copy = s.expenses.slice();
        copy[idx] = { ...copy[idx], ...real, pending: false };
        const pendingIds = { ...s.pendingIds };
        delete pendingIds[tempId];
        return { expenses: copy, pendingIds };
      }),
    rollbackExpense: (tempId) =>
      set((s: any) => ({
        expenses: s.expenses.filter((x: any) => x.id !== tempId),
        pendingIds: Object.fromEntries(Object.entries(s.pendingIds).filter(([k]) => k !== tempId)),
      })),
    setExpenses: (rows) => set(() => ({ expenses: rows })),
    clearAll: () => set(() => ({ expenses: [], pendingIds: {} })),
  },
});
