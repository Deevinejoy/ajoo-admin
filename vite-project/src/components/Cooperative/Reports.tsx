import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const pieColors = ['#111827', '#0F8B42', '#B68C2B', '#3161FF', '#FFB800'];
type PieChartData = { name: string; value: number; color: string };
type BarChartData = { name: string; value: number };
type LoanDistributionApi = { name?: string; category?: string; value?: number; count?: number };
type AttendanceTrendApi = { month?: string; label?: string; value?: number; attendance?: number };
type TransactionVolumeApi = { month?: string; label?: string; value?: number; amount?: number };

const Reports: React.FC = () => {
  const [loanDistribution, setLoanDistribution] = useState<PieChartData[]>([]);
  const [attendanceTrend, setAttendanceTrend] = useState<BarChartData[]>([]);
  const [transactionVolume, setTransactionVolume] = useState<BarChartData[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem('token');
        const [loanDistRes, attendanceRes, transactionRes] = await Promise.all([
          fetch('https://ajo.nickyai.online/api/v1/cooperative/analytics/loan-distribution', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('https://ajo.nickyai.online/api/v1/cooperative/analytics/attendance-trend?associationId=9bea0709-6289-4328-b940-963b38b8448c&startDate=2000-01-01&endDate=2025-01-01', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('https://ajo.nickyai.online/api/v1/cooperative/analytics/transaction-volume?startDate=2000-01-01&endDate=2025-01-01', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        const [loanDistData, attendanceData, transactionData] = await Promise.all([
          loanDistRes.json(),
          attendanceRes.json(),
          transactionRes.json()
        ]);
        setLoanDistribution(
          (loanDistData.data || []).map((item: LoanDistributionApi, idx: number): PieChartData => ({
            name: item.name || item.category || `Type ${idx + 1}`,
            value: item.value || item.count || 0,
            color: pieColors[idx % pieColors.length]
          }))
        );
        setAttendanceTrend(
          (attendanceData.data || []).map((item: AttendanceTrendApi): BarChartData => ({
            name: item.month || item.label || '',
            value: item.value || item.attendance || 0
          }))
        );
        setTransactionVolume(
          (transactionData.data || []).map((item: TransactionVolumeApi): BarChartData => ({
            name: item.month || item.label || '',
            value: item.value || item.amount || 0
          }))
        );
      } catch {
        setLoanDistribution([]);
        setAttendanceTrend([]);
        setTransactionVolume([]);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3 md:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-medium">Reports & Analytics</h1>
          <p className="text-[#666666] text-sm md:text-base">Detailed insights into cooperative performance</p>
        </div>
        <button className="bg-[#3161FF] text-white px-4 md:px-6 py-2 rounded-lg flex items-center justify-center md:justify-start gap-x-2 font-medium w-full md:w-auto">
          + Generate Custom Report
        </button>
      </div>
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 rounded-lg pt-4 mb-6 md:mb-8">
        {/* Loan Distribution */}
        <div className="bg-white rounded-lg p-4 flex flex-col items-center">
          <div className="font-medium mb-1 md:mb-2 text-base md:text-lg">Loan Distribution</div>
          <div className="text-[#939393] text-xs md:text-sm mb-2">Current period</div>
          <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={loanDistribution} dataKey="value" innerRadius={50} outerRadius={70} paddingAngle={2} startAngle={90} endAngle={-270} >
                  {loanDistribution.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Loan Repayment Trend */}
        <div className="bg-white rounded-lg p-4 flex flex-col items-center">
          <div className="font-medium mb-1 md:mb-2 text-base md:text-lg">Loan Repayment Trend</div>
          <div className="text-[#939393] text-xs md:text-sm mb-2">Last 7 months</div>
          <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceTrend} barSize={50}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#111827"  />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Member Attendance */}
        <div className="bg-white rounded-lg p-4 flex flex-col items-center">
          <div className="font-medium mb-1 md:mb-2 text-base md:text-lg">Member Attendance</div>
          <div className="text-[#939393] text-xs md:text-sm mb-2">Overall attendance rate</div>
          <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={loanDistribution} dataKey="value" innerRadius={50} outerRadius={70} paddingAngle={2} startAngle={90} endAngle={-270} >
                  {loanDistribution.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Transaction Volume */}
        <div className="bg-white rounded-lg p-4 flex flex-col items-center">
          <div className="font-medium mb-1 md:mb-2 text-base md:text-lg">Transaction Volume</div>
          <div className="text-[#939393] text-xs md:text-sm mb-2">Monthly transaction amount</div>
          <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactionVolume} barSize={50}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#111827"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Report Templates */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
        <h2 className="text-lg font-semibold">Report Templates</h2>
        <p className='mb-3 md:mb-4 text-sm md:text-base'>Generate standard reports for your cooperative</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="border border-[#E5E5E5] rounded-lg p-3 md:p-4 flex flex-col gap-2">
             <div className="font-medium text-base md:text-lg">Monthly Financial Summary</div>
             <div className="text-[#939393] text-xs md:text-sm">Overview of all financial activities within the cooperative for the month.<br/>Last generated: 2023-03-05</div>
             <button className="ml-auto bg-[#FBFBFB] border border-[#E7E7E7] text-[#373737] px-3 md:px-4 py-1 md:py-2 rounded-lg flex gap-x-2 md:gap-x-4 items-center">
              <img src='/generate.svg' alt='generate' className="w-4 h-4 md:w-auto md:h-auto"/>
              <span className='text-base md:text-lg'>Generate</span>
            </button>
          </div>
          <div className="border border-[#E5E5E5] rounded-lg p-3 md:p-4 flex flex-col gap-2">
            <div className="font-medium text-base md:text-lg">Loan Performance Report</div>
            <div className="text-[#939393] text-xs md:text-sm">Analysis of loan repayments, defaults, and overall performance.<br/>Last generated: 2023-03-05</div>
            <button className="ml-auto bg-[#FBFBFB] border border-[#E7E7E7] text-[#373737] px-3 md:px-4 py-1 md:py-2 rounded-lg flex gap-x-2 md:gap-x-4 items-center">
              <img src='/generate.svg' alt='generate' className="w-4 h-4 md:w-auto md:h-auto"/>
              <span className='text-base md:text-lg'>Generate</span>
            </button>
          </div>
          <div className="border border-[#E5E5E5] rounded-lg p-3 md:p-4 flex flex-col gap-2">
            <div className="font-medium text-base md:text-lg">Member Engagement Report</div>
            <div className="text-[#939393] text-xs md:text-sm">Tracks member attendance and participation ...<br/>Last generated: 2023-03-05</div>
            <button className="ml-auto bg-[#FBFBFB] border border-[#E7E7E7] text-[#373737] px-3 md:px-4 py-1 md:py-2 rounded-lg flex gap-x-2 md:gap-x-4 items-center">
              <img src='/generate.svg' alt='generate' className="w-4 h-4 md:w-auto md:h-auto"/>
              <span className='text-base md:text-lg'>Generate</span>
            </button>
          </div>
          <div className="border border-[#E5E5E5] rounded-lg p-3 md:p-4 flex flex-col gap-2">
            <div className="font-medium text-base md:text-lg">Association Growth Report</div>
            <div className="text-[#939393] text-xs md:text-sm">Monitors the growth and performance of each association.<br/>Last generated: 2023-03-05</div>
            <button className="ml-auto bg-[#FBFBFB] border border-[#E7E7E7] text-[#373737] px-3 md:px-4 py-1 md:py-2 rounded-lg flex gap-x-2 md:gap-x-4 items-center">
              <img src='/generate.svg' alt='generate' className="w-4 h-4 md:w-auto md:h-auto"/>
              <span className='text-base md:text-lg'>Generate</span>
            </button>
          </div>
        </div>
      </div>
      {/* Custom Report Section */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-lg font-semibold">Report Templates</h2>
        <p className='mb-3 md:mb-4 text-sm md:text-base'>Generate standard reports for your cooperative</p>
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4">
          <button className="flex items-center justify-center gap-x-2 border border-gray-300 px-4 md:px-6 py-2 rounded-lg bg-black text-white text-base md:text-lg w-full md:w-auto">
            <img src='/filter.svg' alt='generate' color='white'/>
            Create New Report
          </button>
          <button className="flex items-center justify-center gap-x-2 border border-gray-300 px-4 md:px-6 py-2 rounded-lg bg-white text-base md:text-lg w-full md:w-auto">
            <img src='/download.svg' alt='generate'/>
            Create New Report
          </button>
        </div>
        <div className="text-black text-center text-sm md:text-lg p-4 md:p-6 border border-[#E7E7E7] rounded-lg">Use the custom report builder to create reports tailored to your specific needs.<br/>You can select parameters, date ranges, and export formats.</div>
      </div>
    </div>
  );
};

export default Reports;
