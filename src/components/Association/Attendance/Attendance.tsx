import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";

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
  const [tab, setTab] = useState<"Meeting Tracker" | "Attendance Reports">(
    "Meeting Tracker"
  );
  const navigate = useNavigate();

  // State for meetings
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meetingsLoading, setMeetingsLoading] = useState(false);
  const [meetingsError, setMeetingsError] = useState("");

  // State for member attendance reports
  const [memberAttendance, setMemberAttendance] = useState<MemberAttendance[]>(
    []
  );
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [attendanceError, setAttendanceError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ date: "", name: "", type: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<{
    id: number | null;
    date: string;
    name: string;
    type: string;
  }>({ id: null, date: "", name: "", type: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  const [associationId, setAssociationId] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem("associationId") || "";
    setAssociationId(id);
  }, []);

  // Fetch meetings (refactored to a function for refresh)
  const fetchMeetings = () => {
    setMeetingsLoading(true);
    setMeetingsError("");
    fetch(
      `https://ajo.nickyai.online/api/v1/admin/meetings/recent?associationId=${associationId}`,
      {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setMeetings(data.data || []);
        } else {
          setMeetingsError(data.message || "Failed to fetch meetings");
        }
      })
      .catch(() => setMeetingsError("Error fetching meetings"))
      .finally(() => setMeetingsLoading(false));
  };

  // Fetch member attendance reports
  const fetchMemberAttendance = () => {
    setAttendanceLoading(true);
    setAttendanceError("");
    const token = localStorage.getItem("token");
    if (!associationId || !token) {
      setAttendanceLoading(false);
      return;
    }
    console.log("Fetching member attendance for associationId:", associationId);
    console.log("Token:", token);
    fetch(
      `https://ajo.nickyai.online/api/v1/cooperative/association/${associationId}/member-reports`,
      {
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        console.log("Member attendance response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Member attendance API Response:", data);
        // Check if data is an array (direct response) or has status/data structure
        if (Array.isArray(data)) {
          setMemberAttendance(data);
        } else if (data.status === "success" && data.data) {
          setMemberAttendance(data.data);
        } else {
          setAttendanceError(
            data.message || "Failed to fetch member attendance"
          );
        }
      })
      .catch((error) => {
        console.error("Member attendance fetch error:", error);
        setAttendanceError("Error fetching member attendance");
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
    setFormError("");
    setFormSuccess("");
    if (!form.date || !form.name || !form.type) {
      setFormError("All fields are required");
      setFormLoading(false);
      return;
    }
    console.log("Submitting meeting form:", { ...form, associationId });
    try {
      const res = await fetch(
        "https://ajo.nickyai.online/api/v1/admin/meetings",
        {
          method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ ...form, associationId }),
        }
      );
      const data = await res.json();
      if (data.status === "success") {
        setFormSuccess("Meeting created successfully!");
        setShowModal(false);
        setForm({ date: "", name: "", type: "" });
        fetchMeetings();
      } else {
        console.error("Backend error creating meeting:", data);
        setFormError(data.message || "Failed to create meeting");
      }
    } catch {
      setFormError("Error creating meeting");
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
    setEditError("");
    setEditSuccess("");
    setShowEditModal(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    setEditSuccess("");
    if (!editForm.date || !editForm.name || !editForm.type) {
      setEditError("All fields are required");
      setEditLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `https://ajo.nickyai.online/api/v1/admin/meetings/${editForm.id}`,
        {
          method: "PUT",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
          date: editForm.date,
          name: editForm.name,
          type: editForm.type,
          associationId: associationId,
        }),
        }
      );
      const data = await res.json();
      if (res.ok && (data.status === "success" || data.status === true)) {
        setEditSuccess("Meeting updated successfully!");
        setShowEditModal(false);
        fetchMeetings();
      } else {
        setEditError(data.message || "Failed to update meeting");
      }
    } catch {
      setEditError("Error updating meeting");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 text-white">
      {/* Modal for creating meeting */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
              onClick={() => setShowModal(false)}
              disabled={formLoading}
            >
              <span className="text-2xl">&times;</span>
            </button>
            <h2 className="text-xl font-semibold mb-4">Create Meeting</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Meeting Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Monthly General Meeting"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. General, Executive"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value }))
                  }
                  disabled={formLoading}
                  required
                />
              </div>
              <input type="hidden" value={associationId} />
              {formError && (
                <div className="text-red-400 text-sm">{formError}</div>
              )}
              {formSuccess && (
                <div className="text-green-400 text-sm">{formSuccess}</div>
              )}
              <button
                type="submit"
                className="w-full bg-[#E5B93E] text-black py-2 rounded-lg font-bold mt-2 disabled:opacity-60 cursor-pointer"
                disabled={formLoading}
              >
                {formLoading ? "Creating..." : "Create Meeting"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Modal for editing meeting */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
              onClick={() => setShowEditModal(false)}
              disabled={editLoading}
            >
              <span className="text-2xl">&times;</span>
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Meeting</h2>
            <form onSubmit={handleEditFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  value={editForm.date}
                  onChange={handleEditFormChange}
                  disabled={editLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Meeting Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  disabled={editLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  value={editForm.type}
                  onChange={handleEditFormChange}
                  disabled={editLoading}
                  required
                />
              </div>
              {editError && (
                <div className="text-red-400 text-sm">{editError}</div>
              )}
              {editSuccess && (
                <div className="text-green-400 text-sm">{editSuccess}</div>
              )}
              <button
                type="submit"
                className="w-full bg-[#E5B93E] text-black py-2 rounded-lg font-bold mt-2 disabled:opacity-60 cursor-pointer"
                disabled={editLoading}
              >
                {editLoading ? "Updating..." : "Update Meeting"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-4 mb-6">
        <button
          className="bg-[#E5B93E] text-black px-5 py-2 rounded-lg flex items-center justify-center gap-x-2 hover:bg-yellow-400 font-bold w-full md:w-auto cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          + Add Meeting
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
            <div className="self-center">
            <p className="text-gray-400 text-base">Total Meetings</p>
            <h2 className="text-4xl font-semibold text-white mt-1">24</h2>
            </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/briefcase.svg" alt="pic" className="w-6 h-6 invert" />
          </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
            <div className="self-center">
            <p className="text-gray-400 text-base">Avg. Attendance</p>
            <h2 className="text-4xl font-semibold text-white mt-1">78%</h2>
            </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/people.svg" alt="pic" className="w-6 h-6 invert" />
          </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
            <div className="self-center">
            <p className="text-gray-400 text-base">Next Meeting</p>
            <h2 className="text-4xl font-semibold text-white mt-1">April 12</h2>
            </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/loans1.svg" alt="pic" className="w-6 h-6 invert" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700/50 mb-6">
        <button
          className={`pb-3 px-1 mr-8 font-medium text-base whitespace-nowrap transition-colors ${
            tab === "Meeting Tracker"
              ? "border-b-2 border-[#E5B93E] text-[#E5B93E]"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setTab("Meeting Tracker")}
        >
          Meeting Tracker
        </button>
        <button
          className={`pb-3 px-1 font-medium text-base whitespace-nowrap transition-colors ${
            tab === "Attendance Reports"
              ? "border-b-2 border-[#E5B93E] text-[#E5B93E]"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setTab("Attendance Reports")}
        >
          Attendance Reports
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by meeting name..."
          className="w-full pl-4 pr-4 py-2 bg-[#1C1C1C] border-2 border-gray-700/50 text-white rounded-lg focus:outline-none focus:border-[#E5B93E]"
        />
        <div className="flex gap-4">
          <button className="flex items-center justify-center gap-x-2 border-2 border-gray-700/50 bg-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-gray-700/50 font-bold w-full md:w-auto cursor-pointer">
            <img
              src="/filter.svg"
              alt="pic"
              width={18}
              height={18}
              className="invert"
            />
            <p className="text-sm text-nowrap">Last 30 days</p>
          </button>
          <button className="flex items-center justify-center gap-x-2 border-2 border-gray-700/50 bg-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-gray-700/50 font-bold w-full md:w-auto cursor-pointer">
            <img
              src="/filter.svg"
              alt="pic"
              width={18}
              height={18}
              className="invert"
            />
            <p className="text-sm text-nowrap">All members</p>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {tab === "Meeting Tracker" ? (
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-1">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            {meetingsLoading ? (
              <div className="flex justify-center items-center py-8">
                <LoadingSpinner />
              </div>
            ) : meetingsError ? (
              <div className="text-center text-red-500 py-8">
                {meetingsError}
              </div>
            ) : meetings.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No recent meetings found
              </div>
            ) : (
              <table className="w-full min-w-[800px]">
              <thead>
                  <tr className="border-b-2 border-gray-700/80">
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Date
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Meeting Name
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Type
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Attendees
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Attendance %
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Actions
                    </th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((m) => {
                    const percent =
                      m.totalMembers > 0
                        ? `${Math.round(
                            (m.attendeesCount / m.totalMembers) * 100
                          )}%`
                        : "0%";
                  return (
                      <tr
                        key={m.id}
                        className="border-b border-gray-700/50 hover:bg-gray-800/40"
                      >
                        <td className="py-3 px-4 md:px-6 text-gray-300 text-sm">
                          {m.date}
                        </td>
                        <td className="py-3 px-4 md:px-6 text-gray-300 text-sm">
                          {m.name}
                        </td>
                        <td className="py-3 px-4 md:px-6 text-gray-300 text-sm">
                          {m.type}
                        </td>
                        <td className="py-3 px-4 md:px-6 text-gray-300 text-sm">
                          {m.attendeesCount}/{m.totalMembers}
                        </td>
                        <td className="py-3 px-4 md:px-6 text-gray-300 text-sm">
                          {percent}
                        </td>
                        <td className="py-3 px-4 md:px-6 flex gap-2">
                        <button
                            className="bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-sm text-white cursor-pointer"
                          onClick={() => handleEditClick(m)}
                        >
                          Edit
                        </button>
                        <button
                            className="bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-sm text-white cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/association/attendance/meeting/${m.id}`
                              )
                            }
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
          {/* Mobile Cards */}
          <div className="block md:hidden">
            {meetingsLoading ? (
              <div className="flex justify-center items-center py-8">
                <LoadingSpinner />
              </div>
            ) : meetingsError ? (
              <div className="text-center text-red-500 py-8">
                {meetingsError}
              </div>
            ) : meetings.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No recent meetings found
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {meetings.map((m) => {
                  const percent =
                    m.totalMembers > 0
                      ? `${Math.round(
                          (m.attendeesCount / m.totalMembers) * 100
                        )}%`
                      : "0%";
                  return (
                    <div
                      key={m.id}
                      className="bg-gray-800/50 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">{m.name}</span>
                        <span className="text-sm text-gray-400">{m.date}</span>
                      </div>
                      <p className="text-sm">
                        Type: <span className="font-medium">{m.type}</span>
                      </p>
                      <p className="text-sm">
                        Attendance:{" "}
                        <span className="font-medium">
                          {m.attendeesCount}/{m.totalMembers} ({percent})
                        </span>
                      </p>
                      <div className="flex gap-2 pt-2">
                        <button
                          className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-sm text-white cursor-pointer"
                          onClick={() => handleEditClick(m)}
                        >
                          Edit
                        </button>
                        <button
                          className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-sm text-white cursor-pointer"
                          onClick={() =>
                            navigate(`/association/attendance/meeting/${m.id}`)
                          }
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* Footer Buttons */}
          <div className="flex flex-wrap gap-4 p-4">
            <button className="bg-gray-700/50 px-4 py-2 rounded-lg text-sm text-white hover:bg-gray-600/50 cursor-pointer">
              Quick report
            </button>
            <button
              className="border-2 border-gray-700/50 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700/50 cursor-pointer"
              onClick={() =>
                navigate("/association/attendance/monthly-summary")
              }
            >
              View monthly summary
            </button>
            <button
              className="border-2 border-gray-700/50 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700/50 cursor-pointer"
              onClick={() => navigate("/association/attendance/trends")}
            >
              View attendance trends
            </button>
            <button
              className="border-2 border-gray-700/50 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700/50 cursor-pointer"
              onClick={() => navigate("/association/attendance/member-report")}
            >
              Members report
            </button>
            <button className="bg-[#E5B93E] text-black px-4 py-2 rounded-lg text-sm font-bold md:ml-auto cursor-pointer">
              Export all data
            </button>
          </div>
          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">
            <button className="text-gray-400 hover:text-white text-sm font-medium cursor-pointer">
              Previous page
            </button>
            <div className="flex items-center gap-2">
              {[1, 2, 3, "...", 20].map((page, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    page === 1
                      ? "bg-[#E5B93E] text-black"
                      : "text-gray-400 hover:bg-gray-700/50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="text-gray-400 hover:text-white text-sm font-medium cursor-pointer">
              Next page
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-1">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            {attendanceLoading ? (
              <div className="flex justify-center items-center py-8">
                <LoadingSpinner />
              </div>
            ) : attendanceError ? (
              <div className="text-center text-red-500 py-8">
                {attendanceError}
              </div>
            ) : memberAttendance.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No member attendance data found
              </div>
            ) : (
              <table className="w-full min-w-[700px]">
              <thead>
                  <tr className="border-b-2 border-gray-700/80">
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Member Name
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Meetings attended
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Attendance Rate
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Actions
                    </th>
                </tr>
              </thead>
              <tbody>
                {memberAttendance.map((member, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-700/50 hover:bg-gray-800/40"
                    >
                      <td className="py-3 px-4 md:px-6 text-gray-300 text-sm">
                        {member.memberName}
                      </td>
                      <td className="py-3 px-4 md:px-6 text-gray-300 text-sm">
                        {member.meetingsAttended}
                      </td>
                      <td className="py-3 px-4 md:px-6 text-gray-300 text-sm">
                        {member.attendanceRate}%
                      </td>
                      <td className="py-3 px-4 md:px-6">
                      <button 
                          className="flex items-center gap-x-2 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 text-sm text-white font-medium cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/association/attendance/member-report/${member.memberName}`
                            )
                          }
                        >
                          <img
                            src="/view.svg"
                            alt="view"
                            width={16}
                            height={16}
                            className="invert"
                          />
                          <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
          {/* Mobile Cards */}
          <div className="block md:hidden">
            {attendanceLoading ? (
              <div className="flex justify-center items-center py-8">
                <LoadingSpinner />
              </div>
            ) : attendanceError ? (
              <div className="text-center text-red-500 py-8">
                {attendanceError}
              </div>
            ) : memberAttendance.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No member attendance data found
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {memberAttendance.map((member, i) => (
                  <div
                    key={i}
                    className="bg-gray-800/50 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">
                        {member.memberName}
                      </span>
                      <span className="font-medium text-base">
                        {member.attendanceRate}%
                      </span>
                    </div>
                    <p className="text-sm">
                      Meetings Attended:{" "}
                      <span className="font-medium">
                        {member.meetingsAttended}
                      </span>
                    </p>
                    <button
                      className="w-full mt-2 flex items-center justify-center gap-x-2 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 text-sm text-white font-medium cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/association/attendance/member-report/${member.memberName}`
                        )
                      }
                    >
                      <img
                        src="/view.svg"
                        alt="view"
                        width={16}
                        height={16}
                        className="invert"
                      />
                      <span>View Report</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Footer Buttons */}
          <div className="flex flex-col md:flex-row gap-4 p-4">
            <button className="bg-gray-700/50 px-4 py-2 rounded-lg text-sm text-white hover:bg-gray-600/50 w-full md:w-auto cursor-pointer">
              Quick report
            </button>
            <button className="bg-[#E5B93E] text-black px-4 py-2 rounded-lg w-full md:w-auto text-sm font-bold md:ml-auto cursor-pointer">
              + Export
            </button>
          </div>
          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">
            <button className="text-gray-400 hover:text-white text-sm font-medium cursor-pointer">
              Previous page
            </button>
            <div className="flex items-center gap-2">
              {[1, 2, 3, "...", 20].map((page, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    page === 1
                      ? "bg-[#E5B93E] text-black"
                      : "text-gray-400 hover:bg-gray-700/50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="text-gray-400 hover:text-white text-sm font-medium cursor-pointer">
              Next page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssAttendance;
