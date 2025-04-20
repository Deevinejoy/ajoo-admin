import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Define the type for the data prop
interface PieChartData {
  name: string;
  value: number;
}

interface PiechartProps {
  title: string;
  subtitle?: string;
  data: PieChartData[];
}

export default function Piechart({ title, subtitle, data }: PiechartProps) {
  // Default colors for the pie slices - you can customize these
  const COLORS = ['#1A202C', '#0F8B42', '#D69E2E'];

  return (
    <div className="">
      <div className="">
        <h3 className="font-semibold text-xl mb-2 text-gray-800">{title}</h3>
        {subtitle && <p className="text-sm text-gray-700">{subtitle}</p>}
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}`, name]} />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}