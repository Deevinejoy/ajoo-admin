import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const meetingData = [
  { id: 1, date: 'Jan 10,2023', name: 'Monthly General Meeting', type: 'General', attendees: '42/56', percent: '78%' },
  { id: 2, date: 'Jan 10,2023', name: 'Committee  Meeting', type: 'General', attendees: '42/56', percent: '78%' },
  { id: 3, date: 'Jan 10,2023', name: 'Board Meeting', type: 'General', attendees: '42/56', percent: '78%' },
  { id: 4, date: 'Jan 10,2023', name: 'Monthly General Meeting', type: 'General', attendees: '42/56', percent: '78%' },
];

const attendanceData = [
  { name: 'Member 1', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { name: 'Member 1', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { name: 'Member 1', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { name: 'Member 1', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { name: 'Member 1', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
  { name: 'Member 1', attended: '11/12', rate: '92%', last: 'Mar 15,2023' },
];

const Attendance: React.FC = () => {
  const [tab, setTab] = useState<'Meeting Tracker' | 'Attendance Reports'>('Meeting Tracker');
  const navigate = useNavigate();

  return (
    <div className="p-6 pt-1">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-medium">Attendance</h1>
          <p className="text-[#666666]">Manage all cooperative loans</p>
        </div>
        <button className="bg-[#3161FF] text-white px-6 py-2 rounded-lg flex items-center gap-x-2 font-medium">
          + Add Meeting
        </button>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-[#373737]">Total Meetings</h3>
                    <p className="text-2xl font-semibold">24</p>
                </div>
                <div className="self-center">
                    <img src="/briefcase.svg" alt="pic" />
                </div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-[#373737]">Avg. Attendance</h3>
                    <p className="text-2xl font-semibold">78%</p>
                </div>
                <div className="self-center">
                    <img src="/people.svg" alt="pic" />
                </div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-[#373737]">Next Meeting</h3>
                    <p className="text-xl font-semibold">April 12</p>
                </div>
                <div className="self-center">
                    <img src="/loans1.svg" alt="pic" />
                </div>
            </div>
        </div>
     
      </div>
      {/* Tabs */}
      <div className="flex gap-8 border-b border-[#E5E5E5] mb-4">
        <button
          className={`pb-2 px-1 font-medium ${tab === 'Meeting Tracker' ? 'border-b-2 border-[#3161FF] text-[#3161FF]' : 'text-gray-500'}`}
          onClick={() => setTab('Meeting Tracker')}
        >
          Meeting Tracker
        </button>
        <button
          className={`pb-2 px-1 font-medium ${tab === 'Attendance Reports' ? 'border-b-2 border-[#3161FF] text-[#3161FF]' : 'text-gray-500'}`}
          onClick={() => setTab('Attendance Reports')}
        >
          Attendance Reports
        </button>
      </div>
      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder={`Search by members name or ID...`}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3161FF]"
        />
        <button className="flex items-center gap-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
         <img src="/filter.svg" alt="pic" width={18} height={18}/>
         <p className='w-full text-nowrap'>Last 30days</p>
        </button>
        <button className="flex items-center gap-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
         <img src="/filter.svg" alt="pic" width={18} height={18}/>
         <p className='w-full text-nowrap'>All members</p>
        </button>
     
      </div>
      {/* Tab Content */}
      {tab === 'Meeting Tracker' ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Meetings</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-[#939393] font-medium">Date</th>
                <th className="text-left py-4 px-6 text-[#939393] font-medium">Meeting Name</th>
                <th className="text-left py-4 px-6 text-[#939393] font-medium">Type</th>
                <th className="text-left py-4 px-6 text-[#939393] font-medium">Attendees</th>
                <th className="text-left py-4 px-6 text-[#939393] font-medium">Attendance %</th>
                <th className="text-left py-4 px-6 text-[#939393] font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetingData.map((m, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="py-4 px-6 text-[#373737]">{m.date}</td>
                  <td className="py-4 px-6 text-[#373737]">{m.name}</td>
                  <td className="py-4 px-6 text-[#373737]">{m.type}</td>
                  <td className="py-4 px-6 text-[#373737]">{m.attendees}</td>
                  <td className="py-4 px-6 text-[#373737]">{m.percent}</td>
                  <td className="py-4 px-6 flex gap-2">
                    <button
                      className="bg-[#F5F7FA] border border-[#C4C4C4] px-4 py-2 rounded-lg"
                      onClick={() => navigate(`/attendance/meeting/${m.id}`)}
                    >
                      Details
                    </button>
                    <button className="bg-[#F5F7FA] border border-[#C4C4C4] px-4 py-2 rounded-lg">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Footer Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-[#F5F7FA] border border-[#C4C4C4] px-4 py-2 rounded-lg">Quick report</button>
            <button className="bg-white border border-[#3161FF] text-[#3161FF] px-4 py-2 rounded-lg">View monthly summary</button>
            <button className="bg-white border border-[#3161FF] text-[#3161FF] px-4 py-2 rounded-lg">View attendance trends</button>
            <button className="bg-white border border-[#3161FF] text-[#3161FF] px-4 py-2 rounded-lg">Members report</button>
            <button className="bg-[#3161FF] text-white px-4 py-2 rounded-lg">Export all data</button>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between p-4">
            <span className="text-gray-600">Previous page</span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, '...', 20].map((page, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded ${page === 1 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <span className="text-gray-600">Next page</span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Members Attendance</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-[#939393] font-medium">Member Name</th>
                <th className="text-left py-4 px-6 text-[#939393] font-medium">Meetings attended</th>
                <th className="text-left py-4 px-6 text-[#939393] font-medium">Attendance Rate</th>
                <th className="text-left py-4 px-6 text-[#939393] font-medium">Last Attended</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((m, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="py-4 px-6 text-[#373737]">{m.name}</td>
                  <td className="py-4 px-6 text-[#373737]">{m.attended}</td>
                  <td className="py-4 px-6 text-[#373737]">{m.rate}</td>
                  <td className="py-4 px-6 text-[#373737]">{m.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Footer Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-[#F5F7FA] border border-[#C4C4C4] px-4 py-2 rounded-lg">Quick report</button>
            <button className="bg-[#3161FF] text-white px-4 py-2 rounded-lg ml-auto">+ Export</button>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between p-4">
            <span className="text-gray-600">Previous page</span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, '...', 20].map((page, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded ${page === 1 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <span className="text-gray-600">Next page</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
