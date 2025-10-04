// src/features/store/selectors/statsSelectors.ts
import { rootStore } from "../createRootStore";
import { ByTagStat, DailyStat } from "@/domain/stats";

export const useWeeklyTotals = (): DailyStat[] => rootStore((s) => s.weeklyTotals);
export const useByTag = (): ByTagStat[] => rootStore((s) => s.byTagThisWeek);
export const useStatsActions = () =>
  rootStore((s) => s.actions as any as {
    setWeeklyTotals: (rows: DailyStat[]) => void;
    setByTagThisWeek: (rows: ByTagStat[]) => void;
    setLoading: (v: boolean) => void;
  });
