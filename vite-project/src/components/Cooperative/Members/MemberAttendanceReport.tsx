import React from 'react';
import { useNavigate } from 'react-router-dom';

const MemberAttendanceReport: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center gap-x-2 text-lg font-medium text-[#22223B]" onClick={() => navigate(-1)}>
          <svg width="24" height="24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#22223B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Members attendance Report
        </button>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg bg-white text-[#22223B]">
      <img src="/filter.svg" alt="filter"/>
            Last 12 month
          </button>
          <button className="bg-[#3161FF] text-white px-6 py-2 rounded-lg font-medium">Export</button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-[#939393]"> </div>
          <div>
            <div className="font-semibold text-lg">Member 1</div>
            <div className="text-[#BDBDBD] text-sm">Member ID : MM3452</div>
            <div className="text-[#BDBDBD] text-sm">Joined: 2022-02-13</div>
          </div>
        </div>
        <button className="bg-[#3161FF] text-white px-6 py-2 rounded-lg font-medium">View full profile</button>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-6">
      
      <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
          <div>
              <h3 className="text-[#373737]">Meetings Attended</h3>
              <p className="text-3xl font-semibold">11/12</p>
          </div>
          <div className="self-center">
              <img src="/briefcase.svg" alt="pic" />
          </div>
      </div>
  </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
          <div>
              <h3 className="text-[#373737]">Attendance Rate</h3>
              <p className="text-3xl font-semibold">92%</p>
          </div>
          <div className="self-center">
              <img src="/people.svg" alt="pic" />
          </div>
      </div>
  </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
  <div className="flex justify-between items-center">
      <div>
          <h3 className="text-[#373737]">Last Meeting Attended</h3>
          <p className="text-3xl font-semibold">Mar 15, 2025</p>
      </div>
      <div className="self-center">
          <img src="/loans1.svg" alt="pic" />
      </div>
  </div>
</div>
</div>


      
   



      <div className="bg-white rounded-xl shadow=md p-6 mb-6">
        <div className="font-semibold text-lg mb-4">Meetings Attendance History</div>
        <table className="w-full mb-4">
          <thead>
            <tr className="text-[#BDBDBD] text-sm">
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Meetings Name</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              {date: 'Jan 10,2023', name: 'Monthly General meeting', type: 'General', status: 'Present'},
              {date: 'Jan 10,2023', name: 'Monthly General meeting', type: 'General', status: 'Present'},
              {date: 'Jan 10,2023', name: 'Monthly General meeting', type: 'General', status: 'Present'},
              {date: 'Jan 10,2023', name: 'Monthly General meeting', type: 'General', status: 'Present'},
              {date: 'Jan 10,2023', name: 'Monthly General meeting', type: 'General', status: 'Present'},
              {date: 'Jan 10,2023', name: 'Monthly General meeting', type: 'General', status: 'Absent'},
            ].map((row, idx) => (
              <tr key={idx} className="border-b last:border-b-0 border-[#D9D9D9]">
               <td className="py-4 px-6 text-[#373737]">{row.date}</td>
               <td className="py-4 px-6 text-[#373737]">{row.name}</td>
               <td className="py-4 px-6 text-[#373737]">{row.type}</td>
                <td className={`py-4 px-6 font-medium ${row.status === 'Present' ? 'text-green-500' : 'text-red-500'}`}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4">
          <button className="bg-[#DDDDDD] px-4 py-2 rounded-lg">Quick report</button>
          <div className="flex items-center gap-2">
            <button className="bg-[#3161FF] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
           <img src="/plus.svg" alt="export"/> Export
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 mt-8 text-[#939393]">
          <span>Previous page</span>
          <span className="font-semibold text-black">1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>20</span>
          <span>Next page</span>
        </div>
      </div>
    </div>
  );
};

export default MemberAttendanceReport; 