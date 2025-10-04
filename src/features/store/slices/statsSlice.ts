// src/features/store/slices/statsSlice.ts
import { StateCreator } from "zustand";
import { ByTagStat, DailyStat } from "@/domain/stats";

export type StatsState = {
  weeklyTotals: DailyStat[];
  byTagThisWeek: ByTagStat[];
  loading: boolean;
};

export type StatsActions = {
  setWeeklyTotals: (rows: DailyStat[]) => void;
  setByTagThisWeek: (rows: ByTagStat[]) => void;
  setLoading: (v: boolean) => void;
  clear: () => void;
};

export type StatsSlice = StatsState & { actions: StatsActions };

export const createStatsSlice: StateCreator<any, [["zustand/devtools", never]], [], StatsSlice> = (
  set,
) => ({
  weeklyTotals: [],
  byTagThisWeek: [],
  loading: false,
  actions: {
    setWeeklyTotals: (rows) => set(() => ({ weeklyTotals: rows })),
    setByTagThisWeek: (rows) => set(() => ({ byTagThisWeek: rows })),
    setLoading: (v) => set(() => ({ loading: v })),
    clear: () => set(() => ({ weeklyTotals: [], byTagThisWeek: [], loading: false })),
  },
});
