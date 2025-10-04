// src/ui/components/Button.tsx
import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "@/ui/theme/useTheme";

export const Button: React.FC<{
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}> = ({ title, onPress, style, disabled }) => {
  const { colors, radius, spacing } = useTheme();
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          backgroundColor: disabled ? "#2a2f36" : colors.primary,
          paddingVertical: spacing(3),
          paddingHorizontal: spacing(4),
          borderRadius: radius,
          alignItems: "center",
        },
        style,
      ]}
    >
      <Text style={{ color: "white", fontWeight: "700" }}>{title}</Text>
    </Pressable>
  );
};
