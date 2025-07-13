import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MyChartProps {
  data?: { name: string; value: number }[];
  theme?: "dark" | "light";
}

export default function MyChart({ data, theme = "light" }: MyChartProps) {
  const chartData = data || [
    { name: "Jan", value: 80 },
    { name: "Feb", value: 85 },
    { name: "Mar", value: 90 },
    { name: "Apr", value: 88 },
    { name: "May", value: 92 },
    { name: "Jun", value: 95 },
  ];
  const textColor = theme === "dark" ? "#A0AEC0" : "#4A5568";
  const strokeColor = theme === "dark" ? "#4A5568" : "#D1D5DB";
  const lineColor = theme === "dark" ? "#E5B93E" : "#1A202C";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} />
        <XAxis dataKey="name" tick={{ fill: textColor }} />
        <YAxis tick={{ fill: textColor }} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1A1A1A" : "#FFFFFF",
            border: `1px solid ${strokeColor}`,
          }}
          labelStyle={{ color: textColor }}
        />
        <Legend wrapperStyle={{ color: textColor }} />
        <Line
          type="monotone"
          dataKey="value"
          name="Attendance"
          stroke={lineColor}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
