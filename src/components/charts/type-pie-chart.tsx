"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function TypePieChart({ data }: { data: { type: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="type"
          innerRadius={60}
          outerRadius={110}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={entry.type} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "var(--popover)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            color: "var(--popover-foreground)",
            fontSize: 12,
          }}
        />
        <Legend wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
