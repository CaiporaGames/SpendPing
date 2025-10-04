// src/ui/components/Input.tsx
import React from "react";
import { TextInput, StyleSheet, View, Text, ViewStyle } from "react-native";
import { useTheme } from "@/ui/theme/useTheme";

export const Input: React.FC<{
  label?: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  keyboardType?: "default" | "numeric";
}> = ({ label, value, onChangeText, placeholder, style, keyboardType = "default" }) => {
  const { colors, radius, spacing } = useTheme();
  return (
    <View style={[{ width: "100%" }, style]}>
      {label ? <Text style={{ color: colors.subtext, marginBottom: spacing(1) }}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.subtext}
        keyboardType={keyboardType}
        style={{
          backgroundColor: colors.card,
          color: colors.text,
          padding: spacing(3),
          borderRadius: radius,
        }}
      />
    </View>
  );
};
