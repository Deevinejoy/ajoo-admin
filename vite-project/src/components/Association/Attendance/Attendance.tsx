import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const meetingData = [
  { id: 1, date: 'Jan 10,2023', name: 'Monthly General Meeting', type: 'General', attendees: '42/56', percent: '78%' },
  { id: 2, date: 'Jan 10,2023', name: 'Committee  Meeting', type: 'General', attendees: '42/56', percent: '78%' },
  { id: 3, date: 'Jan 10,2023', name: 'Board Meeting', type: 'General', attendees: '42/56', percent: '78%' },
  { id: 4, date: 'Jan 10,2023', name: 'Monthly General Meeting', type: 'General', attendees: '42/56', percent: '78%' },
];

const attendanceData = [
  { id: 'MM3452', name: 'Member 1', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { id: 'MM3453', name: 'Member 1', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { id: 'MM3454', name: 'Member 1', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { id: 'MM3455', name: 'Member 1', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { id: 'MM3456', name: 'Member 1', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { id: 'MM3457', name: 'Member 1', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
];

const AssAttendance: React.FC = () => {
  const [tab, setTab] = useState<'Meeting Tracker' | 'Attendance Reports'>('Meeting Tracker');
  const navigate = useNavigate();

  return (
    <div className="p-3 pt-3 md:p-6  md:pt-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-3 md:mb-5">
        <div>
          <h1 className="text-xl md:text-2xl font-medium">Attendance</h1>
          <p className="text-sm md:text-base text-[#666666]">Manage all cooperative loans</p>
        </div>
        <button className="bg-[#3161FF] text-white px-4 md:px-6 py-2 rounded-lg flex items-center justify-center gap-x-2 font-medium w-full md:w-auto mt-2 md:mt-0">
          + Add Meeting
        </button>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[#373737] text-sm md:text-base">Total Meetings</h3>
              <p className="text-xl md:text-2xl font-semibold">24</p>
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
              <p className="text-xl md:text-2xl font-semibold">78%</p>
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
              <p className="text-xl md:text-xl font-semibold">April 12</p>
            </div>
            <div className="self-center">
              <img src="/loans1.svg" alt="pic" className="w-5 h-5 md:w-auto md:h-auto" />
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-4 md:gap-8 border-b border-[#E5E5E5] mb-3 md:mb-4 overflow-x-auto">
        <button
          className={`pb-2 px-1 font-medium text-sm md:text-base whitespace-nowrap ${tab === 'Meeting Tracker' ? 'border-b-2 border-[#3161FF] text-[#3161FF]' : 'text-gray-500'}`}
          onClick={() => setTab('Meeting Tracker')}
        >
          Meeting Tracker
        </button>
        <button
          className={`pb-2 px-1 font-medium text-sm md:text-base whitespace-nowrap ${tab === 'Attendance Reports' ? 'border-b-2 border-[#3161FF] text-[#3161FF]' : 'text-gray-500'}`}
          onClick={() => setTab('Attendance Reports')}
        >
          Attendance Reports
        </button>
      </div>
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-4">
        <input
          type="text"
          placeholder={`Search by members name or ID...`}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3161FF]"
        />
        <div className="flex gap-2 md:gap-4">
          <button className="flex items-center justify-center gap-x-2 border border-gray-300 px-3 md:px-4 py-2 rounded-lg hover:bg-gray-50 w-full md:w-auto">
            <img src="/filter.svg" alt="pic" width={16} height={16} className="md:w-[18px] md:h-[18px]"/>
            <p className='text-sm md:text-base text-nowrap'>Last 30days</p>
          </button>
          <button className="flex items-center justify-center gap-x-2 border border-gray-300 px-3 md:px-4 py-2 rounded-lg hover:bg-gray-50 w-full md:w-auto">
            <img src="/filter.svg" alt="pic" width={16} height={16} className="md:w-[18px] md:h-[18px]"/>
            <p className='text-sm md:text-base text-nowrap'>All members</p>
          </button>
        </div>
      </div>
      {/* Tab Content */}
      {tab === 'Meeting Tracker' ? (
        <div className="bg-white rounded-lg shadow p-3 md:p-6 overflow-x-auto">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Recent Meetings</h2>
          <div className="overflow-x-auto">
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
                {meetingData.map((m, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.date}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.name}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.type}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.attendees}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.percent}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 flex gap-2">
                      <button
                        className="bg-[#F5F7FA] border border-[#C4C4C4] px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm"
                        onClick={() => navigate(`/association/attendance/meeting/${m.id}`)}
                      >
                        Details
                      </button>
                      <button className="bg-[#F5F7FA] border border-[#C4C4C4] px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Footer Buttons */}
          <div className="flex flex-wrap gap-2 md:gap-4 mt-4 md:mt-6">
            <button className="bg-[#F5F7FA] border border-[#C4C4C4] px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm">Quick report</button>
            <button className="bg-white border border-[#3161FF] text-[#3161FF] px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm" onClick={() => navigate('/association/attendance/monthly-summary')}>View monthly summary</button>
            <button className="bg-white border border-[#3161FF] text-[#3161FF] px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm" onClick={() => navigate('/association/attendance/trends')}>View attendance trends</button>
            <button className="bg-white border border-[#3161FF] text-[#3161FF] px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm" onClick={() => navigate('/association/attendance/member-report')}>Members report</button>
            <button className="bg-[#3161FF] text-white px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm">Export all data</button>
          </div>
          {/* Pagination */}
          <div className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 text-xs md:text-sm">
            <span className="text-gray-600 mb-2 md:mb-0">Previous page</span>
            <div className="flex items-center gap-1 md:gap-2">
              {[1, 2, 3, '...', 20].map((page, index) => (
                <button
                  key={index}
                  className={`px-2 md:px-3 py-1 rounded ${page === 1 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <span className="text-gray-600 mt-2 md:mt-0">Next page</span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-3 md:p-6 overflow-x-auto">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Members Attendance</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Member Name</th>
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
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.attended}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.rate}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.last}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6">
                      
                      <button 
                        className="flex items-center gap-1 md:gap-x-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200 text-xs md:text-sm"
                        onClick={() => navigate(`/association/attendance/member-report/${m.id}`)}
                      >
                        <img src="/view.svg" alt="view" width={16} height={16} className="md:w-[18px] md:h-[18px]" />
                        <span className="font-medium">View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Footer Buttons */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-4 md:mt-6">
            <button className="bg-[#F5F7FA] border border-[#C4C4C4] px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm w-full md:w-auto">Quick report</button>
            <button className="bg-[#3161FF] text-white px-3 md:px-4 py-1 md:py-2 rounded-lg w-full md:w-auto text-xs md:text-sm md:ml-auto">+ Export</button>
          </div>
          {/* Pagination */}
          <div className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 text-xs md:text-sm">
            <span className="text-gray-600 mb-2 md:mb-0">Previous page</span>
            <div className="flex items-center gap-1 md:gap-2">
              {[1, 2, 3, '...', 20].map((page, index) => (
                <button
                  key={index}
                  className={`px-2 md:px-3 py-1 rounded ${page === 1 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <span className="text-gray-600 mt-2 md:mt-0">Next page</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssAttendance;
