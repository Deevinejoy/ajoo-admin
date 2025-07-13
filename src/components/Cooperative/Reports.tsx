import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import LoadingSpinner from "../LoadingSpinner"; // Assuming this is the correct path

const pieColors = ["#E5B93E", "#4A5568", "#A0AEC0", "#718096", "#F7FAFC"];

type PieChartData = { name: string; value: number; color: string };
type BarChartData = { name: string; value: number };
type TransactionVolumeData = {
  name: string;
  [key: string]: number | string;
};

const Reports: React.FC = () => {
  const [loanDistribution, setLoanDistribution] = useState<PieChartData[]>([]);
  const [attendanceTrend, setAttendanceTrend] = useState<BarChartData[]>([]);
  const [transactionVolume, setTransactionVolume] = useState<
    TransactionVolumeData[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [loanDistRes, attendanceRes, transactionRes] = await Promise.all([
          fetch(
            "https://ajo.nickyai.online/api/v1/cooperative/analytics/loan-distribution",
            { headers }
          ),
          fetch(
            "https://ajo.nickyai.online/api/v1/cooperative/analytics/attendance-trend?associationId=9bea0709-6289-4328-b940-963b38b8448c&startDate=2000-01-01&endDate=2025-01-01",
            { headers }
          ),
          fetch(
            "https://ajo.nickyai.online/api/v1/cooperative/analytics/transaction-volume?startDate=2000-01-01&endDate=2025-01-01",
            { headers }
          ),
        ]);

        const [loanDistDataRaw, attendanceDataRaw, transactionDataRaw] =
          await Promise.all([
            loanDistRes.json(),
            attendanceRes.json(),
            transactionRes.json(),
          ]);

        if (loanDistDataRaw.status === "success" && loanDistDataRaw.data) {
          const { labels, values } = loanDistDataRaw.data;
          setLoanDistribution(
            labels.map((label: string, idx: number) => ({
              name: label,
              value: values[idx],
              color: pieColors[idx % pieColors.length],
            }))
          );
        }

        if (attendanceDataRaw.status === "success" && attendanceDataRaw.data) {
          const { labels, values } = attendanceDataRaw.data;
          setAttendanceTrend(
            labels.map((label: string, idx: number) => ({
              name: label,
              value: values[idx],
            }))
          );
        }

        if (
          transactionDataRaw.status === "success" &&
          transactionDataRaw.data
        ) {
          const { labels, datasets } = transactionDataRaw.data;
          const volumeData = labels.map((label: string, idx: number) => {
            const entry: TransactionVolumeData = { name: label };
            datasets.forEach((ds: { label: string; data: number[] }) => {
              entry[ds.label] = ds.data[idx];
            });
            return entry;
          });
          setTransactionVolume(volumeData);
        }
      } catch (error) {
        console.error("Failed to fetch reports data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-2 rounded border border-gray-700">
          <p className="label">{`${label}`}</p>
          {payload.map((pld: any, index: number) => (
            <p
              key={index}
              style={{ color: pld.color }}
            >{`${pld.name}: ${pld.value}`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0D0D0D]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-[#0D0D0D] text-white min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-400 text-sm">
            Detailed insights into cooperative performance
          </p>
        </div>
        <button className="bg-[#E5B93E] text-black px-5 py-2 rounded-lg flex items-center justify-center gap-x-2 font-bold w-full md:w-auto hover:bg-yellow-400">
          + Generate Custom Report
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Loan Distribution */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">Loan Distribution</h2>
          <p className="text-gray-400 text-sm mb-4">Current period</p>
          <div className="w-full h-52">
            {loanDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={loanDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {loanDistribution.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">No loan data</p>
            )}
          </div>
        </div>

        {/* Loan Repayment Trend */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">Loan Repayment Trend</h2>
          <p className="text-gray-400 text-sm mb-4">Last 7 months</p>
          <div className="w-full h-52">
            {attendanceTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={attendanceTrend}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <XAxis
                    dataKey="name"
                    stroke="#A0AEC0"
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#A0AEC0"
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(229, 185, 62, 0.1)" }}
                  />
                  <Bar dataKey="value" fill="#E5B93E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">No repayment data</p>
            )}
          </div>
        </div>

        {/* Member Attendance */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">Member Attendance</h2>
          <p className="text-gray-400 text-sm mb-4">Overall attendance rate</p>
          <div className="w-full h-52">
            {/* Mock data for pie chart */}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Present", value: 85, color: "#E5B93E" },
                    { name: "Absent", value: 15, color: "#4A5568" },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  <Cell fill="#E5B93E" />
                  <Cell fill="#4A5568" />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction Volume */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">Transaction Volume</h2>
          <p className="text-gray-400 text-sm mb-4">
            Monthly transaction amount
          </p>
          <div className="w-full h-52">
            {transactionVolume.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transactionVolume}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <XAxis
                    dataKey="name"
                    stroke="#A0AEC0"
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#A0AEC0"
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(229, 185, 62, 0.1)" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar
                    dataKey="Savings"
                    stackId="a"
                    fill="#E5B93E"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar dataKey="Loan Repayment" stackId="a" fill="#4A5568" />
                  <Bar
                    dataKey="Withdrawal"
                    stackId="a"
                    fill="#A0AEC0"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">No transaction data</p>
            )}
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-1">Report Templates</h2>
        <p className="mb-6 text-sm text-gray-400">
          Generate standard reports for your cooperative
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Monthly Financial Summary",
              desc: "Overview of all financial activities for the month.",
              generated: "2023-03-05",
            },
            {
              title: "Loan Performance Report",
              desc: "Analysis of loan repayments, defaults, and performance.",
              generated: "2023-03-05",
            },
            {
              title: "Member Engagement Report",
              desc: "Tracks member attendance and participation.",
              generated: "2023-03-05",
            },
            {
              title: "Association Growth Report",
              desc: "Monitors the growth and performance of each association.",
              generated: "2023-03-05",
            },
          ].map((report, idx) => (
            <div
              key={idx}
              className="bg-[#0D0D0D] border border-gray-700/50 rounded-lg p-4 flex flex-col"
            >
              <h3 className="font-semibold text-base mb-1">{report.title}</h3>
              <p className="text-gray-400 text-xs mb-3 flex-grow">
                {report.desc}
                <br />
                Last generated: {report.generated}
              </p>
              <button className="self-end bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex gap-x-2 items-center text-sm">
                <img
                  src="/generate.svg"
                  alt="generate"
                  className="w-4 h-4 invert"
                />
                <span>Generate</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
