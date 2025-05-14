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

const MemberAttendanceReport: React.FC = () => {
  const navigate = useNavigate();
  const { memberId } = useParams<{ memberId: string }>();
  const [member, setMember] = useState<typeof memberData[0] | null>(null);
  
  useEffect(() => {
    // Find the member by ID
    if (memberId) {
      const foundMember = memberData.find(m => m.id === memberId);
      setMember(foundMember || null);
    }
  }, [memberId]);

  // If member not found, show a message or redirect
  if (!member) {
    return (
      <div className="p-6 bg-[#F5F7FA] min-h-screen">
        <h1 className="text-2xl font-medium">Member not found</h1>
        <button 
          className="mt-4 bg-[#3161FF] text-white px-4 py-2 rounded-lg"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F5F7FA]  min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center gap-x-2 text-lg font-medium text-[#22223B]" onClick={() => navigate(-1)}>
          <svg width="24" height="24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#22223B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Members Attendance Report
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
            <div className="font-semibold text-lg">{member.name}</div>
            <div className="text-[#BDBDBD] text-sm">Member ID: {member.id}</div>
            <div className="text-[#BDBDBD] text-sm">Joined: {member.joined}</div>
          </div>
        </div>
        <button 
          className="bg-[#3161FF] text-white px-6 py-2 rounded-lg font-medium"
          onClick={() => navigate(`/members/${member.id}`)}
        >
          View full profile
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[#373737]">Meetings Attended</h3>
              <p className="text-3xl font-semibold">{member.attended}</p>
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
              <p className="text-3xl font-semibold">{member.rate}</p>
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
              <p className="text-3xl font-semibold">{member.lastAttended}</p>
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
            <tr className="text-[#BDBDBD] text-lg">
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Meetings Name</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {meetingsData.map((row, idx) => (
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