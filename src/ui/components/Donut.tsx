// src/ui/components/Donut.tsx
import React from "react";
import Svg, { G, Path } from "react-native-svg";

// Minimal donut, expects pre-normalized segments (0..1) with colors:
export const Donut: React.FC<{
  size: number;
  stroke: number;
  segments: Array<{ frac: number; color: string }>;
}> = ({ size, stroke, segments }) => {
  const r = size / 2;
  const ir = r - stroke;
  let start = 0;
  return (
    <Svg width={size} height={size}>
      <G transform={`translate(${r},${r})`}>
        {segments.map((s, i) => {
          const end = start + s.frac * Math.PI * 2;
          const p = arcPath(0, 0, ir, r, start, end);
          start = end;
          return <Path key={i} d={p} fill={s.color} />;
        })}
      </G>
    </Svg>
  );
};

// Draw ring sector between inner/outer radii
function arcPath(cx: number, cy: number, r1: number, r2: number, a0: number, a1: number) {
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const x0o = cx + r2 * Math.cos(a0), y0o = cy + r2 * Math.sin(a0);
  const x1o = cx + r2 * Math.cos(a1), y1o = cy + r2 * Math.sin(a1);
  const x0i = cx + r1 * Math.cos(a1), y0i = cy + r1 * Math.sin(a1);
  const x1i = cx + r1 * Math.cos(a0), y1i = cy + r1 * Math.sin(a0);
  return [
    `M ${x0o} ${y0o}`,
    `A ${r2} ${r2} 0 ${large} 1 ${x1o} ${y1o}`,
    `L ${x0i} ${y0i}`,
    `A ${r1} ${r1} 0 ${large} 0 ${x1i} ${y1i}`,
    "Z",
  ].join(" ");
}
