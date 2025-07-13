import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddMemberModal from "./AddMemberModal";
import LoadingSpinner from "../../LoadingSpinner";

interface Member {
  id: string;
  name: string;
  association: string;
  role: string;
  dateJoined: string;
  loanStatus: string;
  attendance: string;
}

interface ApiMember {
  id: string;
  fullName: string;
  association: string;
  dateJoined: string;
  loanStatus: string;
  attendancePercentage: string;
  phoneNumber: string;
  email: string;
}

const Members: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://ajo.nickyai.online/api/v1/cooperative/members/view",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }

        const result = await response.json();
        const data = result.data;

        const transformedMembers = data?.members
          ? data.members.map((item: ApiMember) => ({
              id: item.id,
              name: item.fullName,
              association: item.association,
              role: "Member",
              dateJoined: new Date(item.dateJoined).toLocaleDateString(),
              loanStatus: item.loanStatus,
              attendance: `${item.attendancePercentage}%`,
            }))
          : [];

        setMembers(transformedMembers);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error fetching members";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleViewMember = (memberId: string) => {
    navigate(`/members/${memberId}`);
  };

  const getLoanStatusClass = (status: string) => {
    switch (status) {
      case "Active Loan":
        return "bg-blue-800/50 text-blue-300";
      case "Completed":
        return "bg-green-800/50 text-green-300";
      case "No Loan":
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.association.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 text-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Members</h1>
          <p className="text-gray-400 text-sm">
            Manage all cooperative members
          </p>
        </div>
        <button
          className="bg-[#E5B93E] text-black px-5 py-2 rounded-lg flex items-center justify-center gap-x-2 hover:bg-yellow-400 font-bold w-full md:w-auto cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Member
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search members..."
            className="w-full pl-10 pr-4 py-2 bg-[#1C1C1C] border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#E5B93E]"
            value={searchTerm}
            onChange={handleSearch}
          />
          <img
            src="/search.png"
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 invert opacity-50"
          />
        </div>
        <button className="flex items-center justify-center gap-x-2 border border-gray-700/50 bg-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-white w-full md:w-auto">
          <img src="/filter.svg" alt="filter" className="w-4 h-4 invert" />
          <span>Filter</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="p-8 text-center">
          <div className="text-red-400">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#E5B93E] text-black rounded-lg font-bold hover:bg-yellow-400"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Association
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Date Joined
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Loan Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Attendance
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-gray-700/50 hover:bg-gray-800/40"
                  >
                    <td className="px-6 py-4 text-sm">{member.name}</td>
                    <td className="px-6 py-4 text-sm">{member.association}</td>
                    <td className="px-6 py-4 text-sm">{member.role}</td>
                    <td className="px-6 py-4 text-sm">{member.dateJoined}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getLoanStatusClass(
                          member.loanStatus
                        )}`}
                      >
                        {member.loanStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{member.attendance}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewMember(member.id)}
                        className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-sm"
                      >
                        <img
                          src="/view.svg"
                          alt="view"
                          className="w-4 h-4 invert"
                        />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg">{member.name}</p>
                    <p className="text-sm text-gray-400">
                      {member.association}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getLoanStatusClass(
                      member.loanStatus
                    )}`}
                  >
                    {member.loanStatus}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-400">Joined</p>
                    <p>{member.dateJoined}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Attendance</p>
                    <p>{member.attendance}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleViewMember(member.id)}
                  className="w-full mt-2 flex items-center justify-center gap-x-2 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-sm"
                >
                  <img src="/view.svg" alt="view" className="w-4 h-4 invert" />
                  <span>View Details</span>
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {isModalOpen && (
        <AddMemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Members;
