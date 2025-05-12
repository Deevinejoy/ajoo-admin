import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssAttendanceTrends: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center gap-x-2 text-lg font-medium text-[#22223B]" onClick={() => navigate(-1)}>
          <svg width="24" height="24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#22223B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Attendance Trends analysis
        </button>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg bg-white text-[#22223B]">
            <svg width="18" height="18" fill="none"><circle cx="9" cy="9" r="8" stroke="#BDBDBD" strokeWidth="2"/></svg>
            Last 12 month
          </button>
          <button className="bg-[#3161FF] text-white px-6 py-2 rounded-lg font-medium">Export</button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="font-semibold text-lg mb-4">Attendance Rate</div>
        {/* Mock line chart */}
        <div className="w-full h-64 flex items-end">
          <svg width="100%" height="100%" viewBox="0 0 700 200" className="w-full h-48">
            <polyline fill="none" stroke="#3B82F6" strokeWidth="3" points="20,120 80,80 140,100 200,90 260,130 320,60 380,100 440,80 500,150 560,120 620,140" />
            {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
              <text key={m} x={20 + i*60} y={190} fontSize="14" fill="#BDBDBD">{m}</text>
            ))}
          </svg>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 w-[400px]">
        <div className="font-semibold text-lg mb-4">Attendance by meeting type</div>
        {/* Mock donut chart */}
        <div className="flex items-center gap-6">
          <svg width="100" height="100" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16" fill="none" stroke="#111827" strokeWidth="4" strokeDasharray="60,40 40,60 36,64" strokeDashoffset="0" />
            <circle cx="18" cy="18" r="16" fill="none" stroke="#0F8B42" strokeWidth="4" strokeDasharray="10,90 90,10 36,64" strokeDashoffset="60" />
            <circle cx="18" cy="18" r="16" fill="none" stroke="#B68C2B" strokeWidth="4" strokeDasharray="30,70 70,30 36,64" strokeDashoffset="70" />
          </svg>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#111827] inline-block"></span> General (60%)</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#0F8B42] inline-block"></span> Board (10%)</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#B68C2B] inline-block"></span> Committee (30%)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssAttendanceTrends; 