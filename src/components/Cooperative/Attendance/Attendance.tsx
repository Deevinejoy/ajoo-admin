import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Association {
  id: string;
  name: string;
  members: number;
  loans: number;
  created: string;
  status: string;
  avgAttendance: string;
}

export default function Attendance() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [associations, setAssociations] = useState<Association[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Fetching associations with token:", token);

    fetch(
      "https://ajo.nickyai.online/api/v1/cooperative/associations/attendance/view",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        console.log("Associations list response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Associations API Response:", data);
        console.log("Data type:", typeof data);
        console.log("Data keys:", Object.keys(data));

        type ApiAssociation = {
          id?: string;
          associationId?: string;
          _id?: string;
          name?: string;
          associationName?: string;
          membersCount?: number;
          loansCount?: number;
          dateCreated?: string;
          status?: string;
          averageAttendance?: string;
        };
        const apiAssociations = (data.data || []) as ApiAssociation[];
        console.log("Raw associations from API:", apiAssociations);
        console.log("Number of associations:", apiAssociations.length);

        if (apiAssociations.length > 0) {
          console.log("First association structure:", apiAssociations[0]);
          console.log(
            "First association keys:",
            Object.keys(apiAssociations[0])
          );
        }

        const mapped = apiAssociations.map((a: ApiAssociation, idx: number) => {
          // Try to find the correct ID field
          const actualId = a.id || a.associationId || a._id;
          console.log(`Association ${idx} - Raw ID fields:`, {
            id: a.id,
            associationId: a.associationId,
            _id: a._id,
            actualId: actualId,
          });

          const mappedAssociation = {
            id: actualId || `fallback-${idx + 1}`,
            name: a.name || a.associationName || "",
            members: a.membersCount || 0,
            loans: a.loansCount || 0,
            created: a.dateCreated || "",
            status: a.status || "inactive",
            avgAttendance: a.averageAttendance || "",
          };
          console.log(
            `Mapping association ${idx}:`,
            a,
            "->",
            mappedAssociation
          );
          return mappedAssociation;
        });
        console.log("Final mapped associations:", mapped);
        setAssociations(mapped);
      })
      .catch((error) => {
        console.error("Error fetching associations:", error);
      });
  }, []);

  // Handler to navigate to association details with the specific ID
  const handleViewAssociation = (id: string) => {
    console.log("Attempting to view association with ID:", id);
    // Check if this is a valid database ID (not a fallback index)
    const association = associations.find((a) => a.id === id);
    if (association && association.name) {
      console.log(
        "Navigating to association:",
        association.name,
        "with ID:",
        id
      );
      navigate(`/attendance/${id}`);
    } else {
      console.error("Invalid association ID:", id);
      alert("Unable to view association details. Please try again.");
    }
  };

  // Filter associations based on search term
  const filteredAssociations = searchTerm
    ? associations.filter((association) =>
        association.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : associations;

  const getStatusChipClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-800/50 text-green-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  return (
    <div className="p-4 md:p-6 text-white">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Attendance</h1>
        <p className="text-gray-400 text-sm">
          Manage all associations attendance
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <img
            src="/search.png"
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 invert opacity-50"
          />
          <input
            type="text"
            placeholder="Search associations..."
            className="w-full pl-10 pr-4 py-2 bg-[#1C1C1C] border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#E5B93E]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-x-2 border border-gray-700/50 bg-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-white w-full md:w-auto">
          <img src="/filter.svg" alt="filter" className="w-4 h-4 invert" />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Members
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Loans
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Avg. Attendance
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAssociations.map((association) => (
                <tr
                  key={association.id}
                  className="border-b border-gray-700/50 hover:bg-gray-800/40"
                >
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {association.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {association.members}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {association.loans}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {association.created}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusChipClass(
                        association.status
                      )}`}
                    >
                      {association.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {association.avgAttendance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewAssociation(association.id)}
                      className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-sm text-white"
                    >
                      <img
                        src="/view.svg"
                        alt="pic"
                        width={16}
                        height={16}
                        className="invert"
                      />
                      <span className="font-medium text-sm">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile Cards */}
        <div className="block md:hidden">
          <div className="space-y-4 p-4">
            {filteredAssociations.map((association) => (
              <div
                key={association.id}
                className="bg-[#0D0D0D] border border-gray-700/50 rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-white">
                    {association.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusChipClass(
                      association.status
                    )}`}
                  >
                    {association.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                  <div>
                    <p className="text-gray-400">Members</p>
                    <p className="font-medium text-white">
                      {association.members}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Loans</p>
                    <p className="font-medium text-white">
                      {association.loans}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Avg. Attendance</p>
                    <p className="font-medium text-white">
                      {association.avgAttendance}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Created</p>
                    <p className="font-medium text-white">
                      {association.created}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => handleViewAssociation(association.id)}
                    className="w-full flex items-center justify-center gap-x-2 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-sm text-white font-medium"
                  >
                    <img
                      src="/view.svg"
                      alt="view"
                      width={16}
                      height={16}
                      className="invert"
                    />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

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
}
