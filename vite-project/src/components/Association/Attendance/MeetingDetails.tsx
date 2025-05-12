import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const attendanceList = [
  { name: 'Member 1', status: 'Present', time: '9:55am' },
  { name: 'Member 1', status: 'Present', time: '9:55am' },
  { name: 'Member 1', status: 'Present', time: '9:55am' },
  { name: 'Member 1', status: 'Absent', time: '-' },
  { name: 'Member 1', status: 'Present', time: '9:55am' },
];

const AssMeetingDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate(-1)} className="text-[#373737] flex items-center gap-x-2 text-lg font-medium">
          <svg width="24" height="24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#373737" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-xl font-medium">Monthly General Meeting</span>
        <span className="text-[#939393] ml-2">ID:{id}</span>
      </div>

      {/* Meeting Info Card */}
      <div className="bg-white rounded-lg p-6 mb-4 flex justify-between items-center">
        <div>
          <div className="text-lg font-semibold mb-1">Monthly General Meeting</div>
          <div className="text-[#666] mb-1">Date : Mar 10,2025</div>
          <div className="text-[#666] mb-1">Time: 10:00am -12:00pm</div>
          <div className="text-[#666]">Location: Main Conference Room</div>
        </div>
        <div className="flex gap-2">
          <button className="border border-[#3161FF] text-[#3161FF] px-6 py-2 rounded-lg bg-white">Edit Meeting</button>
          <button className="bg-[#3161FF] text-white px-6 py-2 rounded-lg">Export</button>
        </div>
      </div>

      {/* Stats Row */}
    
      <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-[#373737]">Attendees</h3>
                    <p className="text-2xl font-semibold">45/58</p>
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
                    <p className="text-2xl font-semibold">92%</p>
                </div>
                <div className="self-center">
                    <img src="/people.svg" alt="pic" />
                </div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-[#373737]">Meeting Type</h3>
                    <p className="text-xl font-semibold">General</p>
                </div>
                <div className="self-center">
                    <img src="/loans1.svg" alt="pic" />
                </div>
            </div>
        </div>
     
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-lg  shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Attendance Liat</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6 text-[#939393] font-medium">Member Name</th>
              <th className="text-left py-4 px-6 text-[#939393] font-medium">Status</th>
              <th className="text-left py-4 px-6 text-[#939393] font-medium">Check-in time</th>
              <th className="text-left py-4 px-6 text-[#939393] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((row, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-4 px-6 text-[#373737]">{row.name}</td>
                <td className={`py-4 px-6 font-medium ${row.status === 'Present' ? 'text-[#0F8B42]' : 'text-[#D30000]'}`}>{row.status}</td>
                <td className="py-4 px-6 text-[#373737]">{row.time}</td>
                <td className="py-4 px-6">
                  <button className="bg-[#F5F7FA] border border-[#C4C4C4] px-4 py-2 rounded-lg">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex items-center justify-between p-4">
          <span className="text-gray-600">Previous page</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, '...', 20].map((page, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded ${page === 2 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
          </div>
          <span className="text-gray-600">Next page</span>
        </div>
      </div>
    </div>
  );
};

export default AssMeetingDetails; 