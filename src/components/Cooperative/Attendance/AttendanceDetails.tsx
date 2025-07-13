import { ChevronLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";

interface Meeting {
  id: string | number;
  meetingDate?: string;
  meetingName?: string;
  name?: string;
  meetingType?: string;
  attendees?: string;
  attendanceRate?: string;
  percent?: string;
}

interface MemberReport {
  memberName: string;
  meetingsAttended: string;
  attendanceRate: string;
}

const AttendanceDetails: React.FC = () => {
  const [tab, setTab] = useState<"Meeting Tracker" | "Attendance Reports">(
    "Meeting Tracker"
  );
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
  const [association, setAssociation] = useState<AssociationDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentMeetings, setRecentMeetings] = useState<Meeting[]>([]);
  const [recentMeetingsLoading, setRecentMeetingsLoading] = useState(true);
  const [recentMeetingsError, setRecentMeetingsError] = useState<string | null>(
    null
  );
  
  // State for meeting summary (for the cards)
  const [meetingSummary, setMeetingSummary] = useState<{
    totalMeetings?: number;
    averageAttendance?: string;
    nextMeeting?: {
      id: number;
      name: string;
      type: string;
      date: string;
    } | null;
  }>({});
  const [_meetingSummaryLoading, setMeetingSummaryLoading] = useState(false);
  // Add state for member reports
  const [memberReports, setMemberReports] = useState<MemberReport[]>([]);
  const [memberReportsLoading, setMemberReportsLoading] = useState(false);
  const [memberReportsError, setMemberReportsError] = useState<string | null>(
    null
  );
  
  // --- Duplicated Meeting Creation Modal, Form, API, and States ---
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ date: "", name: "", type: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Extract fetch functions for reusability
  const fetchRecentMeetings = async () => {
    setRecentMeetingsLoading(true);
    setRecentMeetingsError(null);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://ajo.nickyai.online/api/v1/cooperative/association/${id}/recent-meetings`,
        {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log("Recent meetings API Response:", data);
      setRecentMeetings(Array.isArray(data) ? data : data.data || []);
    } catch (error: unknown) {
      setRecentMeetingsError(
        error instanceof Error
          ? error.message
          : "Failed to fetch recent meetings"
      );
    } finally {
      setRecentMeetingsLoading(false);
    }
  };

  const fetchMeetingSummary = async () => {
    setMeetingSummaryLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://ajo.nickyai.online/api/v1/cooperative/${id}/meeting-summary`,
        {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.status === "success" && data.data) {
        setMeetingSummary(data.data);
      } else {
        setMeetingSummary({});
      }
    } catch {
      setMeetingSummary({});
    } finally {
      setMeetingSummaryLoading(false);
    }
  };

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
    const associationId = id;
    try {
      // Use the new endpoint for meeting creation
      const res = await fetch(
        "https://ajo.nickyai.online/api/v1/cooperative/meetings/association",
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
        // Refresh meetings and summary after successful creation
        fetchRecentMeetings();
        fetchMeetingSummary();
      } else {
        setFormError(data.message || "Failed to create meeting");
      }
    } catch {
      setFormError("Error creating meeting");
    } finally {
      setFormLoading(false);
    }
  };
  
  useEffect(() => {
    if (id) {
      console.log("Association ID from URL:", id);
      console.log("Association ID type:", typeof id);
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      
      setLoading(true);
      setError(null);
      
      fetch(`https://ajo.nickyai.online/api/v1/cooperative/association/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => {
          console.log("Response status:", res.status);
          console.log("Response headers:", res.headers);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("API Response:", data);
          // Use data.data or data as the association object
          const associationData = (data.data || data) as AssociationDetails;
          setAssociation(associationData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching association:", error);
          setError(error.message);
          setLoading(false);
        });
      // Fetch recent meetings
      fetchRecentMeetings();
      // Fetch meeting summary for the cards
      fetchMeetingSummary();
    }
  }, [id]);

  // Add useEffect to fetch member reports when tab changes to Attendance Reports
  useEffect(() => {
    if (tab === "Attendance Reports" && id) {
      setMemberReportsLoading(true);
      setMemberReportsError(null);
      const token = localStorage.getItem("token");
      
      fetch(
        `https://ajo.nickyai.online/api/v1/cooperative/association/${id}/member-reports`,
        {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Member reports API Response:", data);
          setMemberReports(data || []);
          setMemberReportsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching member reports:", error);
          setMemberReportsError(error.message);
          setMemberReportsLoading(false);
        });
    }
  }, [tab, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0D0D0D]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-white text-center">
        <h1 className="text-xl md:text-2xl font-medium text-red-500">
          Error Loading Association
        </h1>
        <p className="text-gray-400 mt-2">
          Unable to load association details. Please try again.
        </p>
        <p className="text-sm text-gray-500 mt-1">Error: {error}</p>
        <button 
          className="mt-4 bg-[#E5B93E] text-black px-4 py-2 rounded-lg font-bold"
          onClick={() => navigate("/attendance")}
        >
          Back to Attendance
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 text-white">
      {/* Modal for creating meeting */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
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
              {formError && (
                <div className="text-red-400 text-sm">{formError}</div>
              )}
              {formSuccess && (
                <div className="text-green-400 text-sm">{formSuccess}</div>
              )}
              <button
                type="submit"
                className="w-full bg-[#E5B93E] text-black py-2 rounded-lg font-bold mt-2 disabled:opacity-60"
                disabled={formLoading}
              >
                {formLoading ? "Creating..." : "Create Meeting"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-2"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold">
            {association?.associationName || "Association Details"}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <button className="flex items-center justify-center gap-x-2 border-2 border-gray-700/50 bg-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-gray-700/50 font-bold w-full md:w-auto">
            <img
              src="/download.svg"
              alt="pic"
              width={18}
              height={18}
              className="invert"
            />
            <p className="text-sm">Download</p>
          </button>
          <button
            className="bg-[#E5B93E] text-black px-5 py-2 rounded-lg flex items-center justify-center gap-x-2 hover:bg-yellow-400 font-bold w-full md:w-auto"
            onClick={() => setShowModal(true)}
          >
            + Add Meeting
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
                <div className="self-center">
            <p className="text-gray-400 text-base">Total Meetings</p>
            <h2 className="text-4xl font-semibold text-white mt-1">
              {meetingSummary.totalMeetings || 0}
            </h2>
                </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/briefcase.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
                <div className="self-center">
            <p className="text-gray-400 text-base">Avg. Attendance</p>
            <h2 className="text-4xl font-semibold text-white mt-1">
              {meetingSummary.averageAttendance || "0%"}
            </h2>
                </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/people.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
          <div className="self-center">
            <p className="text-gray-400 text-base">Next Meeting</p>
            <h2 className="text-4xl font-semibold text-white mt-1">
              {meetingSummary.nextMeeting
                ? new Date(meetingSummary.nextMeeting.date).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric" }
                  )
                : "N/A"}
            </h2>
          </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/loans1.svg" alt="pic" className="w-6 h-6 invert" />
          </div>
                </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
                <div className="self-center">
            <p className="text-gray-400 text-base">Members</p>
            <h2 className="text-4xl font-semibold text-white mt-1">
              {association?.memberCount || 0}
            </h2>
          </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/member.svg" alt="pic" className="w-6 h-6 invert" />
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

      {/* Tab Content */}
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-1">
        {tab === "Meeting Tracker" ? (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
            {recentMeetingsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <LoadingSpinner />
                </div>
            ) : recentMeetingsError ? (
                <div className="text-center text-red-500 py-8">
                  {recentMeetingsError}
                </div>
              ) : recentMeetings.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No recent meetings found
                </div>
              ) : (
                <table className="w-full min-w-[800px]">
              <thead>
                    <tr className="border-b-2 border-gray-700/80">
                      <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                        Date
                      </th>
                      <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                        Meeting Name
                      </th>
                      <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                        Type
                      </th>
                      <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                        Attendees
                      </th>
                      <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                        Attendance %
                      </th>
                </tr>
              </thead>
              <tbody>
                    {recentMeetings.map((m) => (
                      <tr
                        key={m.id}
                        className="border-b border-gray-700/50 hover:bg-gray-800/40"
                      >
                        <td className="py-3 px-6 text-gray-300 text-sm">
                          {m.meetingDate || "N/A"}
                        </td>
                        <td className="py-3 px-6 text-gray-300 text-sm">
                          {m.meetingName || m.name || "N/A"}
                        </td>
                        <td className="py-3 px-6 text-gray-300 text-sm">
                          {m.meetingType || "N/A"}
                        </td>
                        <td className="py-3 px-6 text-gray-300 text-sm">
                          {m.attendees || "N/A"}
                        </td>
                        <td className="py-3 px-6 text-gray-300 text-sm">
                          {m.percent || m.attendanceRate || "0%"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
            {/* Mobile Cards */}
            <div className="block md:hidden">
              {recentMeetingsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <LoadingSpinner />
                </div>
              ) : recentMeetingsError ? (
                <div className="text-center text-red-500 py-8">
                  {recentMeetingsError}
                </div>
              ) : recentMeetings.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No recent meetings found
          </div>
              ) : (
                <div className="space-y-4 p-4">
                  {recentMeetings.map((m) => (
                    <div
                      key={m.id}
                      className="bg-gray-800/50 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">
                          {m.meetingName || m.name || "N/A"}
                        </span>
                        <span className="text-sm text-gray-400">
                          {m.meetingDate || "N/A"}
                        </span>
                      </div>
                      <p className="text-sm">
                        Type:{" "}
                        <span className="font-medium">
                          {m.meetingType || "N/A"}
                        </span>
                      </p>
                      <p className="text-sm">
                        Attendance:{" "}
                        <span className="font-medium">
                          {m.attendees || "N/A"} (
                          {m.percent || m.attendanceRate || "0%"})
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Desktop Table for Attendance Reports */}
            <div className="hidden md:block overflow-x-auto">
              {memberReportsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <LoadingSpinner />
                </div>
              ) : memberReportsError ? (
                <div className="text-center text-red-500 py-8">
                  {memberReportsError}
          </div>
              ) : memberReports.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No member attendance data found
        </div>
            ) : (
            <table className="w-full min-w-[700px]">
              <thead>
                    <tr className="border-b-2 border-gray-700/80">
                      <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                        Member Name
                      </th>
                      <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                        Meetings Attended
                      </th>
                      <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                        Attendance Rate
                      </th>
                      <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                        Actions
                      </th>
                </tr>
              </thead>
              <tbody>
                    {memberReports.map((member, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-700/50 hover:bg-gray-800/40"
                      >
                        <td className="py-3 px-6 text-gray-300 text-sm">
                          {member.memberName}
                        </td>
                        <td className="py-3 px-6 text-gray-300 text-sm">
                          {member.meetingsAttended}
                        </td>
                        <td className="py-3 px-6 text-gray-300 text-sm">
                          {member.attendanceRate}%
                        </td>
                        <td className="py-3 px-6">
                          <button className="flex items-center gap-x-2 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 text-sm text-white font-medium">
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
            {/* Mobile Cards for Attendance Reports */}
            <div className="block md:hidden">
              {memberReportsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <LoadingSpinner />
                </div>
              ) : memberReportsError ? (
                <div className="text-center text-red-500 py-8">
                  {memberReportsError}
                </div>
              ) : memberReports.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No member attendance data found
          </div>
              ) : (
                <div className="space-y-4 p-4">
                  {memberReports.map((member, i) => (
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
                      <button className="w-full mt-2 flex items-center justify-center gap-x-2 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 text-sm text-white font-medium">
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
          </>
        )}
        </div>
    </div>
  );
};

export default AttendanceDetails;
