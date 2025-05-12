import React from 'react';
import { useNavigate } from 'react-router-dom';

const MonthlySummary: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center gap-x-2 text-lg font-medium text-[#22223B]" onClick={() => navigate(-1)}>
          <svg width="24" height="24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#22223B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Monthly summary
        </button>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg bg-white text-[#22223B]">
          <img src="/filter.svg" alt="filter"/>
            March 2025
          </button>
          <button className="bg-[#3161FF] text-white px-6 py-2 rounded-lg font-medium">Export</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-6">
      
        <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-[#373737]">Total Mettings</h3>
                <p className="text-3xl font-semibold">24</p>
            </div>
            <div className="self-center">
                <img src="/briefcase.svg" alt="pic" />
            </div>
        </div>
    </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-[#373737]">Avg.Attendance</h3>
                <p className="text-3xl font-semibold">78%</p>
            </div>
            <div className="self-center">
                <img src="/people.svg" alt="pic" />
            </div>
        </div>
    </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex justify-between items-center">
        <div>
            <h3 className="text-[#373737]">Total Attendance Hour</h3>
            <p className="text-3xl font-semibold">174</p>
        </div>
        <div className="self-center">
            <img src="/loans1.svg" alt="pic" />
        </div>
    </div>
</div>
       
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-lg mb-4">Monthly attendance trends</div>
        <div className="w-full h-72 flex items-end gap-8">
          {/* Mock bar chart */}
          {[55, 80, 79, 30, 15].map((val, idx) => (
            <div key={idx} className="flex flex-col items-center justify-end h-full">
              <div className={`w-16 ${val === 15 ? 'bg-[#F87171]' : 'bg-[#3B82F6]'} rounded-t-lg`} style={{ height: `${val * 2}px` }}></div>
              <span className="mt-2 text-sm font-medium">{val} %</span>
              <span className="text-xs text-[#BDBDBD]">Week {idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary; 