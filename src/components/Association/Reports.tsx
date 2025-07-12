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
  CartesianGrid,
} from "recharts";

const pieColors = ["#E5B93E", "#A17A2C", "#F0D48A", "#D4A02C", "#C48A2A"];

type PieChartData = { name: string; value: number; color: string };
type BarChartData = { name: string; value: number };

type LoanDistributionApi = {
  name?: string;
  category?: string;
  value?: number;
  count?: number;
};
type AttendanceTrendApi = {
  month?: string;
  label?: string;
  value?: number;
  attendance?: number;
};
type TransactionVolumeApi = {
  month?: string;
  label?: string;
  value?: number;
  amount?: number;
};

const Reports: React.FC = () => {
  const [loanDistribution, setLoanDistribution] = useState<PieChartData[]>([]);
  const [attendanceTrend, setAttendanceTrend] = useState<BarChartData[]>([]);
  const [transactionVolume, setTransactionVolume] = useState<BarChartData[]>(
    []
  );

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token");
        const associationId = localStorage.getItem("associationId");
        const [loanDistRes, repaymentRes, transactionRes] = await Promise.all([
          fetch(
            `https://ajo.nickyai.online/api/v1/admin/reports/loans/total-distribution/${associationId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          fetch(
            `https://ajo.nickyai.online/api/v1/admin/reports/repayments/trend/${associationId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          fetch(
            `https://ajo.nickyai.online/api/v1/admin/reports/transactions/volume/${associationId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);
        const [loanDistData, repaymentData, transactionData] =
          await Promise.all([
          loanDistRes.json(),
          repaymentRes.json(),
            transactionRes.json(),
        ]);
        setLoanDistribution(
          (loanDistData.data || []).map(
            (item: LoanDistributionApi, idx: number): PieChartData => ({
            name: item.name || item.category || `Type ${idx + 1}`,
            value: item.value || item.count || 0,
              color: pieColors[idx % pieColors.length],
            })
          )
        );
        setAttendanceTrend(
          (repaymentData.data || []).map(
            (item: AttendanceTrendApi): BarChartData => ({
              name: item.month || item.label || "",
              value: item.value || item.attendance || 0,
            })
          )
        );
        setTransactionVolume(
          (transactionData.data || []).map(
            (item: TransactionVolumeApi): BarChartData => ({
              name: item.month || item.label || "",
              value: item.value || item.amount || 0,
            })
          )
        );
      } catch {
        setLoanDistribution([]);
        setAttendanceTrend([]);
        setTransactionVolume([]);
      }
    };
    fetchAll();
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-2 rounded border border-gray-700">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 md:p-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-sm md:text-base text-gray-400">
            Detailed insights into cooperative performance
          </p>
        </div>
        <button className="bg-[#E5B93E] text-black px-4 md:px-6 py-2 rounded-lg flex items-center gap-x-2 font-bold text-sm md:text-base w-full sm:w-auto justify-center cursor-pointer hover:bg-yellow-400">
          + Generate Custom Report
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Loan Distribution */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-4 flex flex-col items-center">
          <div className="font-semibold mb-1 text-white">Loan Distribution</div>
          <div className="text-gray-400 text-sm mb-4">Current period</div>
          <div className="w-full h-48">
            {loanDistribution.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-center text-gray-500">
                No data available
              </div>
            ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                  <Pie
                    data={loanDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={5}
                  >
                  {loanDistribution.map((entry, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={entry.color}
                        stroke={entry.color}
                      />
                  ))}
                </Pie>
                  <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Loan Repayment Trend */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-4 flex flex-col items-center">
          <div className="font-semibold mb-1 text-white">
            Loan Repayment Trend
          </div>
          <div className="text-gray-400 text-sm mb-4">Last 7 months</div>
          <div className="w-full h-48">
            {attendanceTrend.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-center text-gray-500">
                No data available
              </div>
            ) : (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={attendanceTrend}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#9ca3af" }}
                    axisLine={{ stroke: "#4b5563" }}
                    tickLine={{ stroke: "#4b5563" }}
                  />
                  <YAxis
                    tick={{ fill: "#9ca3af" }}
                    axisLine={{ stroke: "#4b5563" }}
                    tickLine={{ stroke: "#4b5563" }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(229, 185, 62, 0.1)" }}
                  />
                  <Bar dataKey="value" fill="#E5B93E" />
              </BarChart>
            </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Member Attendance */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-4 flex flex-col items-center">
          <div className="font-semibold mb-1 text-white">Member Attendance</div>
          <div className="text-gray-400 text-sm mb-4">
            Overall attendance rate
          </div>
          <div className="w-full h-48">
            {/* Replace with actual attendance data if available, for now reusing loan distribution */}
            {loanDistribution.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-center text-gray-500">
                No data available
              </div>
            ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                  <Pie
                    data={[
                      { name: "Attended", value: 82, color: "#E5B93E" },
                      { name: "Absent", value: 18, color: "#4b5563" },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={5}
                  >
                    <Cell fill="#E5B93E" stroke="#E5B93E" />
                    <Cell fill="#4b5563" stroke="#4b5563" />
                </Pie>
                  <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Transaction Volume */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-4 flex flex-col items-center">
          <div className="font-semibold mb-1 text-white">
            Transaction Volume
          </div>
          <div className="text-gray-400 text-sm mb-4">
            Monthly transaction amount
          </div>
          <div className="w-full h-48">
            {transactionVolume.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-center text-gray-500">
                No data available
              </div>
            ) : (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transactionVolume}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#9ca3af" }}
                    axisLine={{ stroke: "#4b5563" }}
                    tickLine={{ stroke: "#4b5563" }}
                  />
                  <YAxis
                    tick={{ fill: "#9ca3af" }}
                    axisLine={{ stroke: "#4b5563" }}
                    tickLine={{ stroke: "#4b5563" }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(229, 185, 62, 0.1)" }}
                  />
                  <Bar dataKey="value" fill="#E5B93E" />
              </BarChart>
            </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-lg font-bold">Report Templates</h2>
        <p className="mb-4 text-sm text-gray-400">
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
              className="bg-[#0D0D0D] border border-gray-700/50 rounded-lg p-4 flex flex-col gap-2"
            >
              <div className="font-semibold text-white">{report.title}</div>
              <div className="text-gray-400 text-sm">
                {report.desc}
                <br />
                Last generated: {report.generated}
          </div>
              <button className="ml-auto mt-2 bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg flex gap-x-2 items-center text-sm cursor-pointer">
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

      {/* Custom Report Section */}
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-bold">Custom Reports</h2>
        <p className="mb-4 text-sm text-gray-400">
          Build reports tailored to your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <button className="flex items-center justify-center gap-x-2 bg-[#E5B93E] text-black px-5 py-2 rounded-lg font-bold text-sm w-full sm:w-auto hover:bg-yellow-400 cursor-pointer">
            <img src="/plus.svg" alt="create" className="w-4 h-4" />
            Create New Report
          </button>
          <button className="flex items-center justify-center gap-x-2 border-2 border-gray-700/50 bg-[#1C1C1C] text-white px-5 py-2 rounded-lg font-bold text-sm w-full sm:w-auto hover:bg-gray-700/50 cursor-pointer">
            <img src="/download.svg" alt="export" className="w-4 h-4 invert" />
            Export All Data
          </button>
        </div>
        <div className="text-gray-400 text-center text-sm p-6 bg-[#0D0D0D] border border-gray-700/50 rounded-lg">
          Use the custom report builder to create reports.
          <br />
          You can select parameters, date ranges, and export formats.
        </div>
      </div>
    </div>
  );
};

export default Reports;
