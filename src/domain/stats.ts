// src/domain/stats.ts
export type DailyStat = {
  dateISO: string;      // YYYY-MM-DD (ISO date)
  totalCents: number;   // total for that day
};

export type ByTagStat = {
  tag: string;
  totalCents: number;
};
