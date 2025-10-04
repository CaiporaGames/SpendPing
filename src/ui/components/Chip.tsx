// src/ui/components/Chip.tsx
import React from "react";
import { Pressable, Text } from "react-native";
import { useTheme } from "@/ui/theme/useTheme";

export const Chip: React.FC<{ label: string; selected?: boolean; onPress: () => void }> = ({
  label,
  selected,
  onPress,
}) => {
  const { colors, spacing, radius } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: selected ? colors.primary : colors.chip,
        paddingVertical: spacing(1.5),
        paddingHorizontal: spacing(3),
        borderRadius: radius,
        marginRight: spacing(2),
      }}
    >
      <Text style={{ color: "white" }}>{label}</Text>
    </Pressable>
  );
};
