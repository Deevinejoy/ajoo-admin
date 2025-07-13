import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import LoadingSpinner from "../../LoadingSpinner";

interface MeetingDetailsData {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  totalMembers: number;
  attendanceRate: string;
  type: string;
  attendanceList: {
    memberId: string;
    memberName: string;
    status: "Present" | "Absent";
    checkinTime: string | null;
  }[];
}

const MeetingDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [meeting, setMeeting] = useState<MeetingDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);
      fetch(`https://ajo.nickyai.online/api/v1/cooperative/meetings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch meeting details");
          }
          return res.json();
        })
        .then((data) => {
          if (data.status === "success") {
            setMeeting(data.data);
          } else {
            throw new Error(data.message || "Error in API response");
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0D0D0D]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div className="p-6 text-white text-center">
        <h1 className="text-xl md:text-2xl font-medium text-red-500">
          Error Loading Meeting Details
        </h1>
        <p className="text-gray-400 mt-2">{error || "Meeting not found."}</p>
        <button
          className="mt-4 bg-[#E5B93E] text-black px-4 py-2 rounded-lg font-bold"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const getStatusClass = (status: string) => {
    return status === "Present" ? "text-green-400" : "text-red-400";
  };

  return (
    <div className="p-4 md:p-6 text-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-medium">{meeting.name}</h1>
        <span className="text-gray-500 ml-2 text-sm">ID: {id}</span>
      </div>

      {/* Meeting Info Card */}
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">{meeting.name}</h2>
          <p className="text-gray-400 mb-1">
            Date: {new Date(meeting.date).toLocaleDateString()}
          </p>
          <p className="text-gray-400 mb-1">Time: {meeting.time}</p>
          <p className="text-gray-400">Location: {meeting.location}</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 border-2 border-gray-700/50 text-white px-6 py-2 rounded-lg hover:bg-gray-700/50 font-bold">
            Edit Meeting
          </button>
          <button className="flex-1 bg-[#E5B93E] text-black px-6 py-2 rounded-lg font-bold">
            Export
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-5 rounded-2xl flex justify-between items-center">
          <div>
            <h3 className="text-gray-400">Attendees</h3>
            <p className="text-2xl font-semibold">
              {meeting.attendees}/{meeting.totalMembers}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800/60">
            <img
              src="/briefcase.svg"
              alt="attendees"
              className="w-6 h-6 invert"
            />
          </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-5 rounded-2xl flex justify-between items-center">
          <div>
            <h3 className="text-gray-400">Attendance Rate</h3>
            <p className="text-2xl font-semibold">{meeting.attendanceRate}</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800/60">
            <img src="/people.svg" alt="rate" className="w-6 h-6 invert" />
          </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-5 rounded-2xl flex justify-between items-center">
          <div>
            <h3 className="text-gray-400">Meeting Type</h3>
            <p className="text-xl font-semibold">{meeting.type}</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800/60">
            <img src="/loans1.svg" alt="type" className="w-6 h-6 invert" />
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4 p-6">Attendance List</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-gray-700/80">
                <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                  Member Name
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                  Check-in time
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {meeting.attendanceList.map((row) => (
                <tr
                  key={row.memberId}
                  className="border-b border-gray-700/50 hover:bg-gray-800/40"
                >
                  <td className="py-4 px-6 text-gray-300">{row.memberName}</td>
                  <td
                    className={`py-4 px-6 font-medium ${getStatusClass(
                      row.status
                    )}`}
                  >
                    {row.status}
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    {row.checkinTime || "N/A"}
                  </td>
                  <td className="py-4 px-6">
                    <button className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg text-sm">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4 border-t border-gray-700/50">
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
    </div>
  );
};

export default MeetingDetails;
