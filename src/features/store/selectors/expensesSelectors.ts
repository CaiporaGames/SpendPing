// src/features/store/selectors/expensesSelectors.ts
import { rootStore } from "../createRootStore";
import { Expense } from "@/domain/expense";

export const useTodayExpenses = () =>
  rootStore((s) => s.expenses.filter((e) => isTodayISO(e.tsISO)));

export const usePending = () => rootStore((s) => s.pendingIds);

export const useExpenseActions = () =>
  rootStore((s) => s.actions as any as {
    upsertExpenseOptimistic: (e: Expense) => void;
    confirmExpense: (tempId: string, real: Expense) => void;
    rollbackExpense: (tempId: string) => void;
    setExpenses: (rows: Expense[]) => void;
  });

// Tiny helper (kept here to avoid date lib in store)
function isTodayISO(tsISO: string) {
  const d = new Date(tsISO);
  const now = new Date();
  return (
    d.getUTCFullYear() === now.getUTCFullYear() &&
    d.getUTCMonth() === now.getUTCMonth() &&
    d.getUTCDate() === now.getUTCDate()
  );
}
