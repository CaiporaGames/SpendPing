// src/features/store/createRootStore.ts
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PERSIST_ENABLED } from "@/config/env";
import { createExpensesSlice, ExpensesSlice } from "./slices/expensesSlice";
import { createStatsSlice, StatsSlice } from "./slices/statsSlice";

type RootState = ExpensesSlice & StatsSlice;

const makeStore = () =>
  create<RootState>()(
    devtools(
      persist(
        (set, get, api) => ({
          ...createExpensesSlice(set as any, get as any, api as any),
          ...createStatsSlice(set as any, get as any, api as any),
        }),
        {
          name: "spendping",
          storage: createJSONStorage(() => AsyncStorage),
          partialize: (s) => ({
            // Persist only expense cache + pending flags
            expenses: s.expenses,
            pendingIds: s.pendingIds,
          }),
          version: 1,
          skipHydration: !PERSIST_ENABLED,
        },
      ),
    ),
  );

export const rootStore = makeStore();
export type { RootState };
