import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Mock member data
const memberData = [
  { id: 'MM3452', name: 'Member 1', joined: '2022-02-13', attended: '11/12', rate: '92%', lastAttended: 'Mar 15, 2025' },
  { id: 'MM3453', name: 'Member 2', joined: '2022-01-25', attended: '11/12', rate: '92%', lastAttended: 'Mar 15, 2025' },
  { id: 'MM3454', name: 'Member 3', joined: '2022-03-05', attended: '11/12', rate: '92%', lastAttended: 'Mar 15, 2025' },
  { id: 'MM3455', name: 'Member 4', joined: '2022-04-18', attended: '11/12', rate: '92%', lastAttended: 'Mar 15, 2025' },
  { id: 'MM3456', name: 'Member 5', joined: '2022-05-30', attended: '11/12', rate: '92%', lastAttended: 'Mar 15, 2025' },
  { id: 'MM3457', name: 'Member 6', joined: '2022-06-12', attended: '11/12', rate: '92%', lastAttended: 'Mar 15, 2025' },
];

const meetingsData = [
  {date: 'Jan 10, 2023', name: 'Monthly General meeting', type: 'General', status: 'Present'},
  {date: 'Feb 15, 2023', name: 'Monthly General meeting', type: 'General', status: 'Present'},
  {date: 'Mar 12, 2023', name: 'Monthly General meeting', type: 'General', status: 'Present'},
  {date: 'Apr 10, 2023', name: 'Monthly General meeting', type: 'General', status: 'Present'},
  {date: 'May 15, 2023', name: 'Monthly General meeting', type: 'General', status: 'Present'},
  {date: 'Jun 10, 2023', name: 'Monthly General meeting', type: 'General', status: 'Absent'},
];

const AssMemberAttendanceReport: React.FC = () => {
  const navigate = useNavigate();
  const { memberId } = useParams<{ memberId: string }>();
  // In a real app, you'd have loading and error states
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [member] = useState(() => memberData.find(m => m.id === memberId) || null);
  
  // If member not found, show a styled message
  if (!member) {
    return (
      <div className="p-3 md:p-6 text-white min-h-screen">
        <h1 className="text-lg md:text-2xl font-medium">Member not found</h1>
        <button 
          className="mt-3 md:mt-4 bg-[#E5B93E] text-black px-3 md:px-4 py-1 md:py-2 rounded-lg text-sm md:text-base font-bold"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6 text-white min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-4 md:mb-6">
        <button className="flex items-center gap-x-1 md:gap-x-2 text-base md:text-lg font-medium text-gray-300 hover:text-white" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Members Attendance Report
        </button>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <button className="flex items-center justify-center gap-2 border-2 border-gray-700/50 bg-[#1C1C1C] px-3 md:px-4 py-1 md:py-2 rounded-lg text-white text-sm md:text-base w-full md:w-auto">
            <img src="/filter.svg" alt="filter" className="w-4 h-4 md:w-5 md:h-5 invert"/>
            Last 12 months
          </button>
          <button className="bg-[#E5B93E] text-black px-4 md:px-6 py-1 md:py-2 rounded-lg font-bold text-sm md:text-base w-full md:w-auto">Export</button>
        </div>
      </div>
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-3 md:p-6 mb-4 md:mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gray-700 flex items-center justify-center text-base md:text-lg font-semibold text-[#E5B93E]">
            {member.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-base md:text-lg">{member.name}</div>
            <div className="text-gray-400 text-xs md:text-sm">Member ID: {member.id}</div>
            <div className="text-gray-400 text-xs md:text-sm">Joined: {member.joined}</div>
          </div>
        </div>
        <button 
          className="bg-[#E5B93E] text-black px-4 md:px-6 py-1 md:py-2 rounded-lg font-bold text-sm md:text-base w-full md:w-auto"
          onClick={() => navigate(`/members/${member.id}`)}
        >
          View full profile
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-3 md:p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-400 text-sm md:text-base">Meetings Attended</h3>
              <p className="text-xl md:text-3xl font-semibold">{member.attended}</p>
            </div>
            <div className="self-center bg-gray-800/60 p-3 rounded-lg">
              <img src="/briefcase.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
          </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-3 md:p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-400 text-sm md:text-base">Attendance Rate</h3>
              <p className="text-xl md:text-3xl font-semibold">{member.rate}</p>
            </div>
            <div className="self-center bg-gray-800/60 p-3 rounded-lg">
              <img src="/people.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
          </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-3 md:p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-400 text-sm md:text-base">Last Meeting Attended</h3>
              <p className="text-xl md:text-3xl font-semibold">{member.lastAttended}</p>
            </div>
            <div className="self-center bg-gray-800/60 p-3 rounded-lg">
              <img src="/loans1.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-3 md:p-6 mb-4 md:mb-6 overflow-x-auto">
        <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">Meetings Attendance History</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-gray-700/80">
                <th className="text-left py-2 md:py-3 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">Date</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">Meetings Name</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">Type</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {meetingsData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-800/40 last:border-b-0">
                  <td className="py-2 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">{row.date}</td>
                  <td className="py-2 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">{row.name}</td>
                  <td className="py-2 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">{row.type}</td>
                  <td className={`py-2 md:py-4 px-2 md:px-6 font-medium text-xs md:text-sm ${row.status === 'Present' ? 'text-green-400' : 'text-red-400'}`}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-3 md:mt-4 gap-3 md:gap-0">
          <button className="bg-gray-700/50 hover:bg-gray-600/50 px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm text-white w-full md:w-auto">Quick report</button>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="bg-[#E5B93E] text-black px-3 md:px-4 py-1 md:py-2 rounded-lg flex items-center justify-center gap-2 font-bold text-xs md:text-sm w-full md:w-auto">
              <img src="/plus.svg" alt="export" className="w-4 h-4 md:w-5 md:h-5"/> Export
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 text-xs md:text-sm">
          <button className="text-gray-400 hover:text-white mb-2 md:mb-0">Previous page</button>
          <div className="flex items-center gap-1 md:gap-2">
            {[1, 2, 3, '...', 20].map((page, index) => (
              <button
                key={index}
                className={`px-2 md:px-3 py-1 rounded-md ${page === 1 ? 'bg-[#E5B93E] text-black' : 'text-gray-400 hover:bg-gray-700/50'}`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="text-gray-400 hover:text-white mt-2 md:mt-0">Next page</button>
        </div>
      </div>
    </div>
  );
};

export default AssMemberAttendanceReport; 