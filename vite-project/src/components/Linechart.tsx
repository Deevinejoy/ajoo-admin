import { 
  
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
  } from 'recharts';

export default function MyChart({ data }: { data?: { name: string; value: number }[] }) {
  const chartData = data || [
    { name: 'Jan', value: 80 },
    { name: 'Feb', value: 85 },
    { name: 'Mar', value: 90 },
    { name: 'Apr', value: 88 },
    { name: 'May', value: 92 },
    { name: 'Jun', value: 95 },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" name="Attendance" stroke="#000000" strokeWidth={1}/>
      </LineChart>
    </ResponsiveContainer>
  );
}