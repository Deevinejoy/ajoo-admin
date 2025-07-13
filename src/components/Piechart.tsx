import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// Define the type for the data prop
interface PieChartData {
  name: string;
  value: number;
}

interface PiechartProps {
  title: string;
  subtitle?: string;
  data: PieChartData[];
  theme?: "dark" | "light";
}

export default function Piechart({
  title,
  subtitle,
  data,
  theme = "light",
}: PiechartProps) {
  // Default colors for the pie slices - you can customize these
  const COLORS = ["#E5B93E", "#4A5568", "#A0AEC0"];
  const textColor = theme === "dark" ? "#FFFFFF" : "#374151";
  const subtextColor = theme === "dark" ? "#D1D5DB" : "#6B7280";

  return (
    <div className="">
      <div className="">
        <h3 className="font-semibold text-xl mb-2" style={{ color: textColor }}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm" style={{ color: subtextColor }}>
            {subtitle}
          </p>
        )}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}`, name]} />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ color: textColor }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
