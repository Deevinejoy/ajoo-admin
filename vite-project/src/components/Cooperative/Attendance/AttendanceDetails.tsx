import { ChevronLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Meeting {
  id: string | number;
  meetingDate?: string;
  meetingName?: string;
  meetingType?: string;
  attendees?: string;
  attendanceRate?: string;
}

const attendanceData = [
  { id: 'MM3452', name: 'Member 1', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { id: 'MM3453', name: 'Member 2', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { id: 'MM3454', name: 'Member 3', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { id: 'MM3455', name: 'Member 4', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { id: 'MM3456', name: 'Member 5', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { id: 'MM3457', name: 'Member 6', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
];

const AttendanceDetails: React.FC = () => {
  const [tab, setTab] = useState<'Meeting Tracker' | 'Attendance Reports'>('Meeting Tracker');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  type AssociationDetails = {
    id?: string;
    associationName?: string;
    memberCount?: number;
    totalMeetings?: number;
    dateCreated?: string;
    status?: string;
    averageAttendance?: string;
  };
  const [association, setAssociation] = useState<AssociationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentMeetings, setRecentMeetings] = useState<Meeting[]>([]);
  const [recentMeetingsLoading, setRecentMeetingsLoading] = useState(true);
  const [recentMeetingsError, setRecentMeetingsError] = useState<string | null>(null);
  
  useEffect(() => {
    if (id) {
      console.log('Association ID from URL:', id);
      console.log('Association ID type:', typeof id);
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      
      setLoading(true);
      setError(null);
      
      fetch(`https://ajo.nickyai.online/api/v1/cooperative/association/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(res => {
          console.log('Response status:', res.status);
          console.log('Response headers:', res.headers);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          console.log('API Response:', data);
          // Use data.data or data as the association object
          const associationData = (data.data || data) as AssociationDetails;
          setAssociation(associationData);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching association:', error);
          setError(error.message);
          setLoading(false);
        });
      // Fetch recent meetings
      setRecentMeetingsLoading(true);
      setRecentMeetingsError(null);
      fetch(`https://ajo.nickyai.online/api/v1/cooperative/association/${id}/recent-meetings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          setRecentMeetings(data.data || []);
          setRecentMeetingsLoading(false);
        })
        .catch(error => {
          setRecentMeetingsError(error.message);
          setRecentMeetingsLoading(false);
        });
    }
  }, [id]);

  // Show loading state
  if (loading) {
    return (
      <div className="p-4 md:p-6 pt-1 md:pt-2">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading association details...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4 md:p-6 pt-1 md:pt-2">
        <h1 className="text-xl md:text-2xl font-medium text-red-600">Error Loading Association</h1>
        <p className="text-gray-600 mt-2">Unable to load association details. Please try again.</p>
        <p className="text-sm text-gray-500 mt-1">Error: {error}</p>
        <button 
          className="mt-4 bg-[#3161FF] text-white px-4 py-2 rounded-lg"
          onClick={() => navigate('/attendance')}
        >
          Back to Associations
        </button>
      </div>
    );
  }

  // If association not found, show a message or redirect
  if (!association) {
    return (
      <div className="p-4 md:p-6 pt-1 md:pt-2">
        <h1 className="text-xl md:text-2xl font-medium">Association not found</h1>
        <button 
          className="mt-4 bg-[#3161FF] text-white px-4 py-2 rounded-lg"
          onClick={() => navigate('/attendance')}
        >
          Back to Associations
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 pt-2 md:pt-3 bg-[#F5F7FA]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-5 gap-3 md:gap-0">
    
      
      
        <div className='flex '>
        <button  
          className="text-[#373737] flex items-center gap-x-2 text-2xl font-medium"
          onClick={() => navigate('/attendance')}
        >
         <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-medium">{association.associationName} - Attendance</h1>
          <p className="text-[#666666] text-sm md:text-base">Manage association attendance records</p>
        </div>
        </div>
       
        <button className="bg-[#3161FF] text-white px-4 md:px-6 py-2 rounded-lg flex items-center justify-center md:justify-start gap-x-2 font-medium w-full md:w-auto">
          + Add Meeting
        </button>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-[#373737] text-sm md:text-base">Total Meetings</h3>
                    <p className="text-xl md:text-2xl font-semibold">{association.totalMeetings || 0}</p>
                </div>
                <div className="self-center">
                    <img src="/briefcase.svg" alt="pic" className="w-5 h-5 md:w-auto md:h-auto" />
                </div>
            </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-[#373737] text-sm md:text-base">Avg. Attendance</h3>
                    <p className="text-xl md:text-2xl font-semibold">{association.averageAttendance || '0%'}</p>
                </div>
                <div className="self-center">
                    <img src="/people.svg" alt="pic" className="w-5 h-5 md:w-auto md:h-auto" />
                </div>
            </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-[#373737] text-sm md:text-base">Next Meeting</h3>
                    <p className="text-lg md:text-xl font-semibold">April 12</p>
                </div>
                <div className="self-center">
                    <img src="/loans1.svg" alt="pic" className="w-5 h-5 md:w-auto md:h-auto" />
                </div>
            </div>
        </div>
     
      </div>
      {/* Tabs */}
      <div className="flex gap-4 md:gap-8 border-b border-[#E5E5E5] mb-4 overflow-x-auto">
        <button
          className={`pb-2 px-1 font-medium text-sm md:text-base ${tab === 'Meeting Tracker' ? 'border-b-2 border-[#3161FF] text-[#3161FF]' : 'text-[#939393]'}`}
          onClick={() => setTab('Meeting Tracker')}
        >
          Meeting Tracker
        </button>
        <button
          className={`pb-2 px-1 font-medium text-sm md:text-base ${tab === 'Attendance Reports' ? 'border-b-2 border-[#3161FF] text-[#3161FF]' : 'text-[#939393]'}`}
          onClick={() => setTab('Attendance Reports')}
        >
          Attendance Reports
        </button>
      </div>
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 mb-4">
        <div className="relative w-full md:w-auto md:flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder={`Search by members name or ID...`}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3161FF]"
          />
        </div>
        <button className="flex items-center justify-center gap-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 whitespace-nowrap w-full md:w-auto">
         <img src="/filter.svg" alt="pic" width={18} height={18}/>
         <span className="text-sm">Last 30days</span>
        </button>
        <button className="flex items-center justify-center gap-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 whitespace-nowrap w-full md:w-auto">
         <img src="/filter.svg" alt="pic" width={18} height={18}/>
         <span className="text-sm">All members</span>
        </button>
      </div>
      {/* Tab Content */}
      {tab === 'Meeting Tracker' ? (
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Recent Meetings</h2>
          <div className="overflow-x-auto">
            {recentMeetingsLoading ? (
              <div className="p-4 text-center text-gray-500">Loading recent meetings...</div>
            ) : recentMeetingsError ? (
              <div className="p-4 text-center text-red-500">{recentMeetingsError}</div>
            ) : (
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Date</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Meeting Name</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Type</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Attendees</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Attendance %</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentMeetings.map((m, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.meetingDate || '-'}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.name || m.meetingName || '-'}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.meetingType || '-'}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.attendees || '-'}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.percent || m.attendanceRate || '-'}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 flex gap-2">
                      <button
                        className="bg-[#F5F7FA] border border-[#C4C4C4] px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm"
                        onClick={() => navigate(`/attendance/meeting/${m.id}`)}
                      >
                        Details
                      </button>
                      <button className="bg-[#F5F7FA] border border-[#C4C4C4] px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
          {/* Footer Buttons */}
          <div className="flex flex-wrap gap-2 md:gap-4 mt-4 md:mt-6">
            <button className="bg-[#F5F7FA] border border-[#C4C4C4] px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm">Quick report</button>
            <button className="bg-white border border-[#3161FF] text-[#3161FF] px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm" onClick={() => navigate(`/attendance/monthly-summary/${id}`)}>View monthly summary</button>
            <button className="bg-white border border-[#3161FF] text-[#3161FF] px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm" onClick={() => navigate(`/attendance/trends/${id}`)}>View attendance trends</button>
            <button className="bg-white border border-[#3161FF] text-[#3161FF] px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm" onClick={() => navigate(`/attendance/member-report/${id}`)}>Members report</button>
            <button className="bg-[#3161FF] text-white px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm">Export all data</button>
          </div>
          {/* Pagination */}
          <div className="flex flex-col md:flex-row items-center justify-between p-2 md:p-4 text-xs md:text-sm overflow-x-auto">
            <span className="text-[#939393] mb-2 md:mb-0">Previous page</span>
            <div className="flex items-center gap-1 md:gap-2">
              {[1, 2, 3, '...', 20].map((page, index) => (
                <button
                  key={index}
                  className={`px-2 md:px-3 py-1 rounded ${page === 1 ? 'bg-[#3161FF] text-white' : 'text-[#939393] hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <span className="text-[#939393] mt-2 md:mt-0">Next page</span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Members Attendance</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Member Name</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Member ID</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Meetings attended</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Attendance Rate</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Last Attended</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((m, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.name}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.id}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.attended}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.rate}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.last}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6">
                    <button
                    onClick={() => navigate(`/attendance/member/${m.id}`)}
                    className="flex items-center gap-1 md:gap-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200"
                    >
                        <img src="/view.svg" alt="pic" width={16} height={16} className="md:w-[18px] md:h-[18px]"/> 
                        <span className='font-medium text-xs md:text-sm'>View</span>
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Footer Buttons */}
          <div className="flex flex-wrap gap-2 md:gap-4 mt-4 md:mt-6">
            <button className="bg-[#F5F7FA] border border-[#C4C4C4] px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm">Quick report</button>
            <button className="bg-[#3161FF] text-white px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm ml-0 md:ml-auto">+ Export</button>
          </div>
          {/* Pagination */}
          <div className="flex flex-col md:flex-row items-center justify-between p-2 md:p-4 text-xs md:text-sm overflow-x-auto">
            <span className="text-[#939393] mb-2 md:mb-0">Previous page</span>
            <div className="flex items-center gap-1 md:gap-2">
              {[1, 2, 3, '...', 20].map((page, index) => (
                <button
                  key={index}
                  className={`px-2 md:px-3 py-1 rounded ${page === 1 ? 'bg-[#3161FF] text-white' : 'text-[#939393] hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <span className="text-[#939393] mt-2 md:mt-0">Next page</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceDetails;
