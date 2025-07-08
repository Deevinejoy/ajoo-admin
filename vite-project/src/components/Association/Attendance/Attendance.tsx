import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Meeting {
  id: number;
  name: string;
  type: string;
  date: string;
  attendeesCount: number;
  totalMembers: number;
  associationId: string;
  association: {
    id: string;
    name: string;
    cooperativeId: string;
    registrationNumber: string;
    foundedDate: string;
    address: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface MemberAttendance {
  memberName: string;
  meetingsAttended: string;
  attendanceRate: string;
}

const AssAttendance: React.FC = () => {
  const [tab, setTab] = useState<'Meeting Tracker' | 'Attendance Reports'>('Meeting Tracker');
  const navigate = useNavigate();

  // State for meetings
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meetingsLoading, setMeetingsLoading] = useState(false);
  const [meetingsError, setMeetingsError] = useState('');

  // State for member attendance reports
  const [memberAttendance, setMemberAttendance] = useState<MemberAttendance[]>([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [attendanceError, setAttendanceError] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ date: '', name: '', type: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<{ id: number | null; date: string; name: string; type: string }>({ id: null, date: '', name: '', type: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  const [associationId, setAssociationId] = useState<string>('');

  useEffect(() => {
    const id = localStorage.getItem('associationId') || '';
    setAssociationId(id);
  }, []);

  // Fetch meetings (refactored to a function for refresh)
  const fetchMeetings = () => {
    setMeetingsLoading(true);
    setMeetingsError('');
    fetch(`https://ajo.nickyai.online/api/v1/admin/meetings/recent?associationId=${associationId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setMeetings(data.data || []);
        } else {
          setMeetingsError(data.message || 'Failed to fetch meetings');
        }
      })
      .catch(() => setMeetingsError('Error fetching meetings'))
      .finally(() => setMeetingsLoading(false));
  };

  // Fetch member attendance reports
  const fetchMemberAttendance = () => {
    setAttendanceLoading(true);
    setAttendanceError('');
    const token = localStorage.getItem('token');
    if (!associationId || !token) {
      setAttendanceLoading(false);
      return;
    }
    console.log('Fetching member attendance for associationId:', associationId);
    console.log('Token:', token);
    fetch(`https://ajo.nickyai.online/api/v1/cooperative/association/${associationId}/member-reports`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => {
        console.log('Member attendance response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Member attendance API Response:', data);
        // Check if data is an array (direct response) or has status/data structure
        if (Array.isArray(data)) {
          setMemberAttendance(data);
        } else if (data.status === 'success' && data.data) {
          setMemberAttendance(data.data);
        } else {
          setAttendanceError(data.message || 'Failed to fetch member attendance');
        }
      })
      .catch((error) => {
        console.error('Member attendance fetch error:', error);
        setAttendanceError('Error fetching member attendance');
      })
      .finally(() => setAttendanceLoading(false));
  };

  useEffect(() => {
    if (associationId) {
      fetchMeetings();
      fetchMemberAttendance();
    }
  }, [associationId]);

  // Handle form submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    setFormSuccess('');
    if (!form.date || !form.name || !form.type) {
      setFormError('All fields are required');
      setFormLoading(false);
      return;
    }
    console.log('Submitting meeting form:', { ...form, associationId });
    try {
      const res = await fetch('https://ajo.nickyai.online/api/v1/admin/meetings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ ...form, associationId }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setFormSuccess('Meeting created successfully!');
        setShowModal(false);
        setForm({ date: '', name: '', type: '' });
        fetchMeetings();
      } else {
        console.error('Backend error creating meeting:', data);
        setFormError(data.message || 'Failed to create meeting');
      }
    } catch {
      setFormError('Error creating meeting');
    } finally {
      setFormLoading(false);
    }
  };

  // Edit meeting handler
  const handleEditClick = (meeting: Meeting) => {
    setEditForm({
      id: meeting.id,
      date: meeting.date,
      name: meeting.name,
      type: meeting.type,
    });
    setEditError('');
    setEditSuccess('');
    setShowEditModal(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');
    setEditSuccess('');
    if (!editForm.date || !editForm.name || !editForm.type) {
      setEditError('All fields are required');
      setEditLoading(false);
      return;
    }
    try {
      const res = await fetch(`https://ajo.nickyai.online/api/v1/admin/meetings/${editForm.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          date: editForm.date,
          name: editForm.name,
          type: editForm.type,
          associationId: associationId,
        }),
      });
      const data = await res.json();
      if (res.ok && (data.status === 'success' || data.status === true)) {
        setEditSuccess('Meeting updated successfully!');
        setShowEditModal(false);
        fetchMeetings();
      } else {
        setEditError(data.message || 'Failed to update meeting');
      }
    } catch {
      setEditError('Error updating meeting');
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="p-3 pt-3 md:p-6  md:pt-3">
      {/* Modal for creating meeting */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
              disabled={formLoading}
            >
              <span className="text-2xl">&times;</span>
            </button>
            <h2 className="text-xl font-semibold mb-4">Create Meeting</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Meeting Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  disabled={formLoading}
                  required
                />
              </div>
              {/* Hidden associationId */}
              <input type="hidden" value={associationId} />
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              {formSuccess && <div className="text-green-600 text-sm">{formSuccess}</div>}
              <button
                type="submit"
                className="w-full bg-[#3161FF] text-white py-2 rounded-lg font-medium mt-2 disabled:opacity-60"
                disabled={formLoading}
              >
                {formLoading ? 'Creating...' : 'Create Meeting'}
              </button>
            </form>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowEditModal(false)}
              disabled={editLoading}
            >
              <span className="text-2xl">&times;</span>
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Meeting</h2>
            <form onSubmit={handleEditFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={editForm.date}
                  onChange={handleEditFormChange}
                  disabled={editLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Meeting Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  disabled={editLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={editForm.type}
                  onChange={handleEditFormChange}
                  disabled={editLoading}
                  required
                />
              </div>
              {editError && <div className="text-red-500 text-sm">{editError}</div>}
              {editSuccess && <div className="text-green-600 text-sm">{editSuccess}</div>}
              <button
                type="submit"
                className="w-full bg-[#3161FF] text-white py-2 rounded-lg font-medium mt-2 disabled:opacity-60"
                disabled={editLoading}
              >
                {editLoading ? 'Updating...' : 'Update Meeting'}
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-3 md:mb-5">
        <div>
          <h1 className="text-xl md:text-2xl font-medium">Attendance</h1>
          <p className="text-sm md:text-base text-[#666666]">Manage all cooperative loans</p>
        </div>
        <button
          className="bg-[#3161FF] text-white px-4 md:px-6 py-2 rounded-lg flex items-center justify-center gap-x-2 font-medium w-full md:w-auto mt-2 md:mt-0"
          onClick={() => setShowModal(true)}
        >
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
            {meetingsLoading ? (
              <div className="text-center text-gray-400 py-8">Loading...</div>
            ) : meetingsError ? (
              <div className="text-center text-red-500 py-8">{meetingsError}</div>
            ) : meetings.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No recent meetings found</div>
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
                {meetings.map((m) => {
                  const percent = m.totalMembers > 0 ? `${Math.round((m.attendeesCount / m.totalMembers) * 100)}%` : '0%';
                  return (
                    <tr key={m.id} className="border-b border-gray-200">
                      <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.date}</td>
                      <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.name}</td>
                      <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.type}</td>
                      <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{m.attendeesCount}/{m.totalMembers}</td>
                      <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{percent}</td>
                      <td className="py-3 md:py-4 px-2 md:px-6 flex gap-2">
                        <button
                          className="bg-[#F5F7FA] border border-[#C4C4C4] px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm"
                          onClick={() => handleEditClick(m)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-[#F5F7FA] border border-[#C4C4C4] px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm"
                          onClick={() => navigate(`/association/attendance/meeting/${m.id}`)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            )}
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
            {attendanceLoading ? (
              <div className="text-center text-gray-400 py-8">Loading...</div>
            ) : attendanceError ? (
              <div className="text-center text-red-500 py-8">{attendanceError}</div>
            ) : memberAttendance.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No member attendance data found</div>
            ) : (
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Member Name</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Meetings attended</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Attendance Rate</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {memberAttendance.map((member, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{member.memberName}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{member.meetingsAttended}</td>
                    <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{member.attendanceRate}%</td>
                    <td className="py-3 md:py-4 px-2 md:px-6">
                      
                      <button 
                        className="flex items-center gap-1 md:gap-x-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200 text-xs md:text-sm"
                        onClick={() => navigate(`/association/attendance/member-report/${member.memberName}`)}
                      >
                        <img src="/view.svg" alt="view" width={16} height={16} className="md:w-[18px] md:h-[18px]" />
                        <span className="font-medium">View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
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
