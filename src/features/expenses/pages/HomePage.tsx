// src/features/expenses/pages/HomePage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Input } from "@/ui/components/Input";
import { Chip } from "@/ui/components/Chip";
import { Button } from "@/ui/components/Button";
import { useAddExpenseController } from "@/features/expenses/controllers/useAddExpenseController";
import { useHomeDataController } from "@/features/expenses/controllers/useHomeDataController";
import { usePending, useTodayExpenses } from "@/features/store";
import { useTheme } from "@/ui/theme/useTheme";

const TAGS = ["food", "transport", "coffee", "fun", "other"] as const;

export const HomePage: React.FC = () => {
  const { colors, spacing } = useTheme();
  const add = useAddExpenseController();
  const load = useHomeDataController();

  const [amountStr, setAmountStr] = useState("");
  const [tag, setTag] = useState<(typeof TAGS)[number]>("food");
  const [note, setNote] = useState("");
  const today = useTodayExpenses();
  const pending = usePending();

  useEffect(() => {
    load();
  }, []);

  const totalCents = useMemo(
    () => today.reduce((sum, e) => sum + e.amountCents, 0),
    [today],
  );

  const onAdd = async () => {
    const cents = Math.round(Number(amountStr.replace(",", ".")) * 100);
    if (!Number.isFinite(cents) || cents <= 0) return;
    await add({ amountCents: cents, tag, note: note || undefined });
    setAmountStr("");
    setNote("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: spacing(4) }}>
      <Text style={{ color: colors.text, fontSize: 24, fontWeight: "700", marginBottom: spacing(3) }}>
        Today total: €{(totalCents / 100).toFixed(2)}
      </Text>

      <Input
        label="Amount (€)"
        keyboardType="numeric"
        value={amountStr}
        onChangeText={setAmountStr}
        placeholder="3.50"
        style={{ marginBottom: spacing(2) }}
      />
      <View style={{ flexDirection: "row", marginBottom: spacing(2) }}>
        {TAGS.map((t) => (
          <Chip key={t} label={t} selected={tag === t} onPress={() => setTag(t)} />
        ))}
      </View>
      <Input
        label="Note"
        value={note}
        onChangeText={setNote}
        placeholder="optional"
        style={{ marginBottom: spacing(3) }}
      />
      <Button title="Add" onPress={onAdd} />

      <Text style={{ color: colors.subtext, marginVertical: spacing(3) }}>Today</Text>
      <FlatList
        data={today}
        keyExtractor={(x) => x.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: colors.card,
              padding: spacing(3),
              borderRadius: 10,
              marginBottom: spacing(2),
              opacity: item.pending ? 0.6 : 1,
            }}
          >
            <Text style={{ color: colors.text, fontWeight: "700" }}>
              €{(item.amountCents / 100).toFixed(2)} — {item.tag}
            </Text>
            {item.note ? <Text style={{ color: colors.subtext }}>{item.note}</Text> : null}
          </View>
        )}
      />
    </View>
  );
};
