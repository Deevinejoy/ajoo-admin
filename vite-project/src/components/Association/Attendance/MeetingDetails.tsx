import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Define types for meeting and attendanceList
interface Meeting {
  id: number;
  name: string;
  date: string;
  type: string;
  totalMembers: number;
  attendeesCount: number;
  attendanceRate: number;
}
interface Attendance {
  id: number;
  meetingId: number;
  status: string;
  checkInTime: string | null;
  member: {
    id: string;
    fullName: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    address: string;
    memberId: number;
    membershipStatus: boolean;
    memberPhoto: string;
    dateJoined: string;
    updatedAt: string;
  };
}

const AssMeetingDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [meeting, setMeeting] = React.useState<Meeting | null>(null);
  const [attendanceList, setAttendanceList] = React.useState<Attendance[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://ajo.nickyai.online/api/v1/admin/attendance/meeting/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setMeeting(data.data.meeting);
          setAttendanceList(data.data.attendanceList);
        } else {
          setError(data.message || 'Failed to fetch meeting details');
        }
      })
      .catch(() => setError('Error fetching meeting details'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }
  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-3 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
        <button onClick={() => navigate(-1)} className="text-[#373737] flex items-center gap-x-1 md:gap-x-2 text-base md:text-lg font-medium">
          <svg width="20" height="20" className="md:w-6 md:h-6" fill="none"><path d="M15 18l-6-6 6-6" stroke="#373737" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-lg md:text-xl font-medium">{meeting?.name || 'Meeting'}</span>
        <span className="text-[#939393] text-sm md:text-base ml-1 md:ml-2">ID:{id}</span>
      </div>

      {/* Meeting Info Card */}
      <div className="bg-white rounded-lg p-3 md:p-6 mb-3 md:mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <div>
          <div className="text-base md:text-lg font-semibold mb-1">{meeting?.name || '-'}</div>
          <div className="text-[#666] text-sm md:text-base mb-1">Date : {meeting?.date || '-'}</div>
        </div>
        <div className="flex gap-2">
          <button className="border border-[#3161FF] text-[#3161FF] px-3 md:px-6 py-1 md:py-2 rounded-lg bg-white text-sm md:text-base">Edit Meeting</button>
          <button className="bg-[#3161FF] text-white px-3 md:px-6 py-1 md:py-2 rounded-lg text-sm md:text-base">Export</button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[#373737] text-sm md:text-base">Attendees</h3>
              <p className="text-xl md:text-2xl font-semibold">{meeting?.attendeesCount ?? '-'}{meeting?.totalMembers ? `/${meeting.totalMembers}` : ''}</p>
            </div>
            <div className="self-center">
              <img src="/briefcase.svg" alt="pic" className="w-5 h-5 md:w-auto md:h-auto" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[#373737] text-sm md:text-base">Attendance Rate</h3>
              <p className="text-xl md:text-2xl font-semibold">{meeting?.attendanceRate ? `${meeting.attendanceRate}%` : '-'}</p>
            </div>
            <div className="self-center">
              <img src="/people.svg" alt="pic" className="w-5 h-5 md:w-auto md:h-auto" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[#373737] text-sm md:text-base">Meeting Type</h3>
              <p className="text-xl md:text-xl font-semibold">{meeting?.type || '-'}</p>
            </div>
            <div className="self-center">
              <img src="/loans1.svg" alt="pic" className="w-5 h-5 md:w-auto md:h-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-lg shadow-md p-3 md:p-6 overflow-x-auto">
        <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Attendance List</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Member Name</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Status</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Check-in time</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((row, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.member?.fullName || 'N/A'}</td>
                  <td className={`py-3 md:py-4 px-2 md:px-6 font-medium text-xs md:text-sm ${row.status === 'present' ? 'text-[#0F8B42]' : 'text-[#D30000]'}`}>{row.status === 'present' ? 'Present' : 'Absent'}</td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.checkInTime ? new Date(row.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                  <td className="py-3 md:py-4 px-2 md:px-6">
                    <button className="bg-[#F5F7FA] border border-[#C4C4C4] px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm">View Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 text-xs md:text-sm">
          <span className="text-gray-600 mb-2 md:mb-0">Previous page</span>
          <div className="flex items-center gap-1 md:gap-2">
            {[1, 2, 3, '...', 20].map((page, index) => (
              <button
                key={index}
                className={`px-2 md:px-3 py-1 rounded ${page === 2 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
          </div>
          <span className="text-gray-600 mt-2 md:mt-0">Next page</span>
        </div>
      </div>
    </div>
  );
};

export default AssMeetingDetails; 