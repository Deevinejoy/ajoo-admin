import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import LoadingSpinner from "../../LoadingSpinner";

interface MemberReportData {
  memberInfo: {
    id: string;
    name: string;
    dateJoined: string;
    avatar: string;
  };
  stats: {
    meetingsAttended: string;
    attendanceRate: string;
    lastMeetingAttended: string;
  };
  meetingsHistory: {
    id: string;
    date: string;
    name: string;
    type: string;
    status: "Present" | "Absent";
  }[];
}

const MemberAttendanceReport: React.FC = () => {
  const navigate = useNavigate();
  const { memberId } = useParams<{ memberId: string }>();
  const [report, setReport] = useState<MemberReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (memberId) {
      setLoading(true);
      setError(null);
      fetch(
        `https://ajo.nickyai.online/api/v1/cooperative/members/${memberId}/attendance-report`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch member report");
          return res.json();
        })
        .then((data) => {
          if (data.status === "success") {
            setReport(data.data);
          } else {
            throw new Error(data.message || "Failed to parse report data");
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [memberId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0D0D0D]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="p-6 text-white text-center">
        <h1 className="text-xl md:text-2xl font-medium text-red-500">
          Error Loading Report
        </h1>
        <p className="text-gray-400 mt-2">
          {error || "Member report not found."}
        </p>
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
    <div className="p-4 md:p-6 text-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-2"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold">Members Attendance Report</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <button className="flex items-center justify-center gap-x-2 border-2 border-gray-700/50 bg-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-gray-700/50 font-bold w-full md:w-auto">
            <img src="/filter.svg" alt="filter" className="w-4 h-4 invert" />
            <span className="text-sm">Last 12 months</span>
          </button>
          <button className="bg-[#E5B93E] text-black px-6 py-2 rounded-lg font-bold w-full md:w-auto">
            Export
          </button>
        </div>
      </div>

      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold text-[#E5B93E]">
            {report.memberInfo.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-lg">
              {report.memberInfo.name}
            </div>
            <div className="text-gray-400 text-sm">
              Member ID: {report.memberInfo.id}
            </div>
            <div className="text-gray-400 text-sm">
              Joined:{" "}
              {new Date(report.memberInfo.dateJoined).toLocaleDateString()}
            </div>
          </div>
        </div>
        <button
          className="bg-[#E5B93E] text-black px-6 py-2 rounded-lg font-bold w-full md:w-auto"
          onClick={() => navigate(`/members/${report.memberInfo.id}`)}
        >
          View full profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-5 rounded-2xl flex justify-between items-center">
          <div>
            <h3 className="text-gray-400">Meetings Attended</h3>
            <p className="text-3xl font-semibold">
              {report.stats.meetingsAttended}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800/60">
            <img src="/briefcase.svg" alt="pic" className="w-6 h-6 invert" />
          </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-5 rounded-2xl flex justify-between items-center">
          <div>
            <h3 className="text-gray-400">Attendance Rate</h3>
            <p className="text-3xl font-semibold">
              {report.stats.attendanceRate}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800/60">
            <img src="/people.svg" alt="pic" className="w-6 h-6 invert" />
          </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-5 rounded-2xl flex justify-between items-center">
          <div>
            <h3 className="text-gray-400">Last Meeting Attended</h3>
            <p className="text-xl font-semibold">
              {new Date(report.stats.lastMeetingAttended).toLocaleDateString()}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800/60">
            <img src="/loans1.svg" alt="pic" className="w-6 h-6 invert" />
          </div>
        </div>
      </div>

      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-6">
        <h2 className="font-semibold text-lg mb-4">
          Meetings Attendance History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-gray-700/80">
                <th className="text-left py-3 px-6 text-gray-400 font-semibold text-sm">
                  Date
                </th>
                <th className="text-left py-3 px-6 text-gray-400 font-semibold text-sm">
                  Meetings Name
                </th>
                <th className="text-left py-3 px-6 text-gray-400 font-semibold text-sm">
                  Type
                </th>
                <th className="text-left py-3 px-6 text-gray-400 font-semibold text-sm">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {report.meetingsHistory.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-700/50 hover:bg-gray-800/40"
                >
                  <td className="py-4 px-6 text-gray-300">
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-gray-300">{row.name}</td>
                  <td className="py-4 px-6 text-gray-300">{row.type}</td>
                  <td
                    className={`py-4 px-6 font-medium ${getStatusClass(
                      row.status
                    )}`}
                  >
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4 mt-4 border-t border-gray-700/50">
          <button className="text-gray-400 hover:text-white text-sm font-medium">
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
          <button className="text-gray-400 hover:text-white text-sm font-medium">
            Next page
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberAttendanceReport;
