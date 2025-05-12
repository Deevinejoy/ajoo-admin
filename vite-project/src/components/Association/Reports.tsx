import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const pieData = [
  { name: 'A', value: 60, color: '#111827' },
  { name: 'B', value: 25, color: '#0F8B42' },
  { name: 'C', value: 15, color: '#B68C2B' },
];
const barData = [
  { name: 'Jan', value: 80 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 90 },
  { name: 'Apr', value: 70 },
  { name: 'May', value: 50 },
  { name: 'Jun', value: 40 },
  { name: 'Jul', value: 90 },
];

const Reports: React.FC = () => (
  <div className="p-6 bg-[#FBFBFB]">
    <div className="flex justify-between items-center mb-2">
      <div>
        <h1 className="text-2xl font-medium">Reports & Analytics</h1>
        <p className="text-[#666666]">Detailed insights into cooperative performance</p>
      </div>
      <button className="bg-[#3161FF] text-white px-6 py-2 rounded-lg flex items-center gap-x-2 font-medium">
        + Generate Custom Report
      </button>
    </div>
    {/* Analytics Cards */}
    <div className="grid grid-cols-2 gap-6 rounded-lg pt-4 mb-8">
      {/* Loan Distribution */}
      <div className="  bg-white rounded-lg p-4 flex flex-col items-center">
        <div className="font-medium mb-2">Loan Distribution</div>
        <div className="text-[#939393] text-sm mb-2">Current period</div>
        <div className="w-full h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={70} paddingAngle={2} startAngle={90} endAngle={-270} >
                {pieData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Loan Repayment Trend */}
      <div className=" bg-white rounded-lg p-4 flex flex-col items-center">
        <div className="font-medium mb-2">Loan Repayment Trend</div>
        <div className="text-[#939393] text-sm mb-2">Last 7 months</div>
        <div className="w-full h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} barSize={50}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#111827"  />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Member Attendance */}
      <div className=" bg-white rounded-lg p-4 flex flex-col items-center">
        <div className="font-medium mb-2">Member Attendance</div>
        <div className="text-[#939393] text-sm mb-2">Overall attendance rate</div>
        <div className="w-full h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={70} paddingAngle={2} startAngle={90} endAngle={-270} >
                {pieData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Transaction Volume */}
      <div className=" bg-white rounded-lg p-4 flex flex-col items-center">
        <div className="font-medium mb-2">Transaction Volume</div>
        <div className="text-[#939393] text-sm mb-2">Monthly transaction amount</div>
        <div className="w-full h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} barSize={50}>
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
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-semibold ">Report Templates</h2>
      <p className='mb-4'>Generate standard reports for your cooperative</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border border-[#E5E5E5] rounded-lg p-4 flex flex-col gap-2">
           <div className="font-medium">Monthly Financial Summary</div>
           <div className="text-[#939393] text-sm">Overview of all financial activities within the cooperative for the month.<br/>Last generated: 2023-03-05</div>
           <button className="ml-auto bg-[#FBFBFB] border border-[#E7E7E7] text-[#373737] px-4 py-2 rounded-lg flex gap-x-4">
            <img src='/generate.svg' alt='generate'/>
           <span className='text-lg '> Generate</span>
            </button>
        </div>
        <div className="border border-[#E5E5E5] rounded-lg p-4 flex flex-col gap-2">
          <div className="font-medium">Loan Performance Report</div>
          <div className="text-[#939393] text-sm">Analysis of loan repayments, defaults, and overall performance.<br/>Last generated: 2023-03-05</div>
          <button className="ml-auto bg-[#FBFBFB] border border-[#E7E7E7] text-[#373737] px-4 py-2 rounded-lg flex gap-x-4">
            <img src='/generate.svg' alt='generate'/>
           <span className='text-lg '> Generate</span>
            </button>
        </div>
        <div className="border border-[#E5E5E5] rounded-lg p-4 flex flex-col gap-2">
          <div className="font-medium">Member Engagement Report</div>
          <div className="text-[#939393] text-sm">Tracks member attendance and participation ...<br/>Last generated: 2023-03-05</div>
          <button className="ml-auto bg-[#FBFBFB] border border-[#E7E7E7] text-[#373737] px-4 py-2 rounded-lg flex gap-x-4">
            <img src='/generate.svg' alt='generate'/>
           <span className='text-lg '> Generate</span>
            </button>
        </div>
        <div className="border border-[#E5E5E5] rounded-lg p-4 flex flex-col gap-2">
          <div className="font-medium">Association Growth Report</div>
          <div className="text-[#939393] text-sm">Monitors the growth and performance of each association.<br/>Last generated: 2023-03-05</div>
          <button className="ml-auto bg-[#FBFBFB] border border-[#E7E7E7] text-[#373737] px-4 py-2 rounded-lg flex gap-x-4">
            <img src='/generate.svg' alt='generate'/>
           <span className='text-lg '> Generate</span>
            </button>
        </div>
      </div>
    </div>
    {/* Custom Report Section */}
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold">Report Templates</h2>
      <p className=' mb-4'>Generate standard reports for your cooperative</p>
      <div className="flex gap-4 mb-4">
        <button className="flex items-center gap-x-2 border border-gray-300 px-6 py-2 rounded-lg bg-black text-white text-lg">
        <img src='/filter.svg' alt='generate' color='white'/>
          Create New Report
        </button>
        <button className="flex items-center gap-x-2 border border-gray-300 px-6 py-2 rounded-lg bg-white text-lg">
        <img src='/download.svg' alt='generate'/>
          Create New Report
        </button>
      </div>
      <div className="text-black text-center text-lg p-6 border border-[#E7E7E7] rounded-lg">Use the custom report builder to create reports tailored to your specific needs.<br/>You can select parameters, date ranges, and export formats.</div>
    </div>
  </div>
);

export default Reports;
