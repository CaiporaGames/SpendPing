// src/config/DepsContext.tsx (update to wire services)
import React, { createContext, useContext, useMemo } from "react";
import { ExpensesService } from "@/services/graphql/ExpensesService";
import { StatsService } from "@/services/graphql/StatsService";

type Deps = {
  expensesService: typeof ExpensesService;
  statsService: typeof StatsService;
};

const DepsContext = createContext<Deps | null>(null);

export const DepsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deps = useMemo<Deps>(() => {
    return {
      expensesService: ExpensesService,
      statsService: StatsService,
    };
  }, []);

  return <DepsContext.Provider value={deps}>{children}</DepsContext.Provider>;
};

export const useDeps = () => {
  const ctx = useContext(DepsContext);
  if (!ctx) throw new Error("useDeps must be used within DepsProvider");
  return ctx;
};
