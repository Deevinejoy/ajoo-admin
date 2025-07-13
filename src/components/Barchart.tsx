import { 
    BarChart, 
    Bar, 
 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
  } from 'recharts';

  const barChartData = [
    { name: 'Jan', amount: 500 },
    { name: 'Feb', amount: 700 },
    { name: 'Mar', amount: 800 },
    { name: 'Apr', amount: 600 },
    { name: 'May', amount: 900 },
    { name: 'Jun', amount: 1000 },
  ];
export default function MyChart() {
  return (
    <ResponsiveContainer width="100%">
        <BarChart data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" name="Loan Repayments" fill="#5090D1" />
        </BarChart>
    </ResponsiveContainer>
  );
}