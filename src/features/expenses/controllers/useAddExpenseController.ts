// src/features/expenses/controllers/useAddExpenseController.ts
import { useDeps } from "@/config/DepsContext";
import { useExpenseActions } from "@/features/store";
import { Expense } from "@/domain/expense";
import { v4 as uuid } from "uuid";

export function useAddExpenseController() {
  const { expensesService } = useDeps();
  const { upsertExpenseOptimistic, confirmExpense, rollbackExpense } = useExpenseActions();

  return async (input: { amountCents: number; tag: string; note?: string | null }) => {
    // 1) Create an optimistic row
    const tempId = uuid();
    const nowISO = new Date().toISOString();
    const optimistic: Expense = {
      id: tempId,
      amountCents: input.amountCents,
      tag: input.tag,
      note: input.note ?? null,
      tsISO: nowISO,
      pending: true,
    };
    upsertExpenseOptimistic(optimistic);

    try {
      // 2) Call backend
      const { expense } = await expensesService.addExpense({
        amountCents: input.amountCents,
        tag: input.tag,
        note: input.note,
        tsISO: nowISO,
      });

      // 3) Confirm (swap temp → real id, clear pending)
      confirmExpense(tempId, { ...optimistic, id: expense.id, tsISO: expense.tsISO, pending: false });
      return { ok: true };
    } catch (e) {
      // 4) Rollback on failure
      rollbackExpense(tempId);
      return { ok: false, error: e };
    }
  };
}
