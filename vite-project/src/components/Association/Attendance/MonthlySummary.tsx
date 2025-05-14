import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssMonthlySummary: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-3 md:p-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-4 md:mb-6">
        <button className="flex items-center gap-x-1 md:gap-x-2 text-base md:text-lg font-medium text-[#22223B]" onClick={() => navigate(-1)}>
          <svg width="20" height="20" className="md:w-6 md:h-6" fill="none"><path d="M15 18l-6-6 6-6" stroke="#22223B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Monthly summary
        </button>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <button className="flex items-center justify-center gap-2 border border-gray-300 px-3 md:px-4 py-1 md:py-2 rounded-lg bg-white text-[#22223B] text-sm md:text-base w-full md:w-auto">
            <img src="/filter.svg" alt="filter" className="w-4 h-4 md:w-5 md:h-5"/>
            March 2025
          </button>
          <button className="bg-[#3161FF] text-white px-4 md:px-6 py-1 md:py-2 rounded-lg font-medium text-sm md:text-base w-full md:w-auto">Export</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[#373737] text-sm md:text-base">Total Meetings</h3>
              <p className="text-xl md:text-3xl font-semibold">24</p>
            </div>
            <div className="self-center">
              <img src="/briefcase.svg" alt="pic" className="w-5 h-5 md:w-auto md:h-auto" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[#373737] text-sm md:text-base">Avg.Attendance</h3>
              <p className="text-xl md:text-3xl font-semibold">78%</p>
            </div>
            <div className="self-center">
              <img src="/people.svg" alt="pic" className="w-5 h-5 md:w-auto md:h-auto" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[#373737] text-sm md:text-base">Total Attendance Hour</h3>
              <p className="text-xl md:text-3xl font-semibold">174</p>
            </div>
            <div className="self-center">
              <img src="/loans1.svg" alt="pic" className="w-5 h-5 md:w-auto md:h-auto" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow p-3 md:p-6 overflow-x-auto">
        <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">Monthly attendance trends</div>
        <div className="w-full h-56 md:h-72 flex items-end gap-4 md:gap-8 min-w-[300px] justify-center md:justify-start pb-6 md:pb-0">
          {/* Mock bar chart */}
          {[55, 80, 79, 30, 15].map((val, idx) => (
            <div key={idx} className="flex flex-col items-center justify-end h-full">
              <div className={`w-12 md:w-16 ${val === 15 ? 'bg-[#F87171]' : 'bg-[#3B82F6]'} rounded-t-lg`} style={{ height: `${val * 1.5}px` }}></div>
              <span className="mt-1 md:mt-2 text-xs md:text-sm font-medium">{val} %</span>
              <span className="text-[10px] md:text-xs text-[#BDBDBD]">Week {idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssMonthlySummary; 