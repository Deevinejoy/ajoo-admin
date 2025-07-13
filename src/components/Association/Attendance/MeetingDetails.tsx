import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";
import { useScrollToTop } from "../../../lib/utils";

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
  useScrollToTop();
  const navigate = useNavigate();
  const { id } = useParams();
  const [meeting, setMeeting] = React.useState<Meeting | null>(null);
  const [attendanceList, setAttendanceList] = React.useState<Attendance[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://ajo.nickyai.online/api/v1/admin/attendance/meeting/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setMeeting(data.data.meeting);
          setAttendanceList(data.data.attendanceList);
        } else {
          setError(data.message || "Failed to fetch meeting details");
        }
      })
      .catch(() => setError("Error fetching meeting details"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={60} />
      </div>
    );
  }
  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-3 md:p-6 text-white">
      {/* Header */}
      <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-300 hover:text-white flex items-center gap-x-1 md:gap-x-2 text-base md:text-lg font-medium"
        >
          <svg
            width="20"
            height="20"
            className="md:w-6 md:h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="text-lg md:text-xl font-medium">
          {meeting?.name || "Meeting"}
        </span>
        <span className="text-gray-400 text-sm md:text-base ml-1 md:ml-2">
          ID:{id}
        </span>
      </div>

      {/* Meeting Info Card */}
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-3 md:p-6 mb-3 md:mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <div>
          <div className="text-base md:text-lg font-semibold mb-1">
            {meeting?.name || "-"}
          </div>
          <div className="text-gray-400 text-sm md:text-base mb-1">
            Date : {meeting?.date || "-"}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="border border-gray-600 text-gray-300 px-3 md:px-6 py-1 md:py-2 rounded-lg bg-gray-800/60 hover:bg-gray-700/60 text-sm md:text-base">
            Edit Meeting
          </button>
          <button className="bg-[#E5B93E] text-black px-3 md:px-6 py-1 md:py-2 rounded-lg text-sm md:text-base font-bold">
            Export
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-4 md:p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-400 text-sm md:text-base">Attendees</h3>
              <p className="text-xl md:text-2xl font-semibold">
                {meeting?.attendeesCount ?? "-"}
                {meeting?.totalMembers ? `/${meeting.totalMembers}` : ""}
              </p>
            </div>
            <div className="self-center bg-gray-800/60 p-3 rounded-lg">
              <img src="/briefcase.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
          </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-4 md:p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-400 text-sm md:text-base">
                Attendance Rate
              </h3>
              <p className="text-xl md:text-2xl font-semibold">
                {meeting?.attendanceRate ? `${meeting.attendanceRate}%` : "-"}
              </p>
            </div>
            <div className="self-center bg-gray-800/60 p-3 rounded-lg">
              <img src="/people.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
          </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-4 md:p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-400 text-sm md:text-base">
                Meeting Type
              </h3>
              <p className="text-xl md:text-xl font-semibold">
                {meeting?.type || "-"}
              </p>
            </div>
            <div className="self-center bg-gray-800/60 p-3 rounded-lg">
              <img src="/loans1.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-3 md:p-6">
        <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
          Attendance List
        </h2>
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-gray-700/80">
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Member Name
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Status
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Check-in time
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-700/50 hover:bg-gray-800/40"
                >
                  <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                    {row.member?.fullName || "N/A"}
                  </td>
                  <td
                    className={`py-3 md:py-4 px-2 md:px-6 font-medium text-xs md:text-sm ${
                      row.status === "present"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {row.status === "present" ? "Present" : "Absent"}
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                    {row.checkInTime
                      ? new Date(row.checkInTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6">
                    <button className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile Cards */}
        <div className="block md:hidden">
          <div className="space-y-4">
            {attendanceList.map((row, i) => (
              <div key={i} className="bg-[#0D0D0D] p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-base">
                    {row.member?.fullName || "N/A"}
                  </p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      row.status === "present"
                        ? "bg-green-800/50 text-green-300"
                        : "bg-red-800/50 text-red-300"
                    }`}
                  >
                    {row.status === "present" ? "Present" : "Absent"}
                  </span>
                </div>
                <div className="text-sm">
                  Check-in:{" "}
                  <span className="font-medium">
                    {row.checkInTime
                      ? new Date(row.checkInTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </span>
                </div>
                <div className="flex pt-2">
                  <button className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg text-sm">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 text-xs md:text-sm">
          <button className="text-gray-400 hover:text-white mb-2 md:mb-0">
            Previous page
          </button>
          <div className="flex items-center gap-1 md:gap-2">
            {[1, 2, 3, "...", 20].map((page, index) => (
              <button
                key={index}
                className={`px-2 md:px-3 py-1 rounded-md ${
                  page === 2
                    ? "bg-[#E5B93E] text-black"
                    : "text-gray-400 hover:bg-gray-700/50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="text-gray-400 hover:text-white mt-2 md:mt-0">
            Next page
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssMeetingDetails;
