// src/features/expenses/controllers/useInsightsController.ts
import dayjs from "dayjs";
import { useDeps } from "@/config/DepsContext";
import { useStatsActions } from "@/features/store";

export function useInsightsController() {
  const { statsService } = useDeps();
  const { setByTagThisWeek, setWeeklyTotals, setLoading } = useStatsActions();

  return async () => {
    setLoading(true);
    try {
      const startISO = dayjs().startOf("week").toISOString();
      const endISO = dayjs().endOf("week").toISOString();
      const [{ byTag }, { totals }] = await Promise.all([
        statsService.getByTag({ startISO, endISO }),
        statsService.getTotals({ startISO, endISO }),
      ]);
      setByTagThisWeek(byTag);
      setWeeklyTotals(totals);
    } finally {
      setLoading(false);
    }
  };
}
