// src/ui/theme/useTheme.ts
import { palette } from "./palette";
export function useTheme() {
  // Could be dynamic with Appearance; keep static for now.
  return { colors: palette, spacing: (n: number) => 4 * n, radius: 10 };
}
