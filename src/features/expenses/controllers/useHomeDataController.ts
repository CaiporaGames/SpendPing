// src/features/expenses/controllers/useHomeDataController.ts
import dayjs from "dayjs";
import { useDeps } from "@/config/DepsContext";
import { useExpenseActions, useWeeklyTotals, useStatsActions } from "@/features/store";

export function useHomeDataController() {
  const { expensesService, statsService } = useDeps();
  const { setExpenses } = useExpenseActions();
  const { setWeeklyTotals } = useStatsActions();
  const weeklyTotals = useWeeklyTotals();

  return async () => {
    // Load today's expenses
    const start = dayjs().startOf("day").toISOString();
    const end = dayjs().endOf("day").toISOString();
    const { expenses } = await expensesService.listExpenses({ startISO: start, endISO: end });
    setExpenses(expenses);

    // Prefetch weekly totals if empty
    if (!weeklyTotals.length) {
      const wStart = dayjs().startOf("week").toISOString();
      const wEnd = dayjs().endOf("week").toISOString();
      const { totals } = await statsService.getTotals({ startISO: wStart, endISO: wEnd });
      setWeeklyTotals(totals);
    }
  };
}
