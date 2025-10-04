// src/features/expenses/pages/InsightsPage.tsx
import React, { useEffect, useMemo } from "react";
import { View, Text } from "react-native";
import { Donut } from "@/ui/components/Donut";
import { useByTag, useWeeklyTotals } from "@/features/store";
import { useInsightsController } from "@/features/expenses/controllers/useInsightsController";
import { useTheme } from "@/ui/theme/useTheme";

export const InsightsPage: React.FC = () => {
  const load = useInsightsController();
  const byTag = useByTag();
  const totals = useWeeklyTotals();
  const { colors, spacing } = useTheme();

  useEffect(() => {
    load();
  }, []);

  const sum = byTag.reduce((s, b) => s + b.totalCents, 0) || 1;
  const segments = byTag.map((b) => ({
    frac: b.totalCents / sum,
    color: pickColor(b.tag),
  }));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: spacing(4) }}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: "700", marginBottom: spacing(2) }}>
        This week by tag
      </Text>
      <Donut size={200} stroke={40} segments={segments} />
      <View style={{ height: spacing(4) }} />
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: "700", marginBottom: spacing(2) }}>
        Daily totals
      </Text>
      {totals.map((t) => (
        <Text key={t.dateISO} style={{ color: colors.subtext }}>
          {t.dateISO.slice(5)} — €{(t.totalCents / 100).toFixed(2)}
        </Text>
      ))}
    </View>
  );
};

function pickColor(tag: string) {
  const table: Record<string, string> = {
    food: "#4AA3FF",
    transport: "#FFD166",
    coffee: "#EF476F",
    fun: "#06D6A0",
    other: "#A78BFA",
  };
  return table[tag] ?? "#999";
}
