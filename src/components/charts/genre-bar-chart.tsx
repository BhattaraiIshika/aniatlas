"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function GenreBarChart({ data }: { data: { genre: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data} layout="vertical" margin={{ left: 24, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
        <YAxis
          type="category"
          dataKey="genre"
          stroke="var(--muted-foreground)"
          fontSize={12}
          width={90}
        />
        <Tooltip
          contentStyle={{
            background: "var(--popover)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            color: "var(--popover-foreground)",
            fontSize: 12,
          }}
          cursor={{ fill: "var(--accent)", opacity: 0.15 }}
        />
        <Bar dataKey="count" fill="var(--chart-1)" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
