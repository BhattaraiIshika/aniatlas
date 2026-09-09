"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function YearLineChart({
  data,
}: {
  data: { year: number; count: number; avg_score: number | null }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <LineChart data={data} margin={{ left: 8, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="year" stroke="var(--muted-foreground)" fontSize={12} />
        <YAxis stroke="var(--muted-foreground)" fontSize={12} />
        <Tooltip
          contentStyle={{
            background: "var(--popover)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            color: "var(--popover-foreground)",
            fontSize: 12,
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          name="Titles released"
          stroke="var(--chart-1)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
