import React, { useState, useEffect } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoanApplicationReviews from "./LoanApplicationReviews";
import AddLoanModal from "./AddLoanModal";
import LoadingSpinner from "../../LoadingSpinner";

interface Loan {
    id: string;
    loanId: string;
    amount: string;
    issueDate: string;
    dueDate: string;
    repaymentStatus: string;
    member?: {
        fullName: string;
    };
}

type TabType = "Members Loan Breakdown" | "Loan Application Reviews";

const AssLoans: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Members Loan Breakdown");
  const [searchQuery, setSearchQuery] = useState("");
    const [isAddLoanOpen, setIsAddLoanOpen] = useState(false);
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

  const tabs: TabType[] = [
    "Members Loan Breakdown",
    "Loan Application Reviews",
  ];

    useEffect(() => {
        const fetchLoans = async () => {
            setLoading(true);
            setError(null);
            try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://ajo.nickyai.online/api/v1/admin/loans",
          {
                    headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch loans");
                const data = await response.json();
                setLoans(data.data.loans || []);
            } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };
        fetchLoans();
    }, []);

    const handleViewLoan = (id: string) => {
        navigate(`/association/loans/${id}`);
    };

    const handleViewApplication = (applicationId: string) => {
        navigate(`/association/loan-applications/${applicationId}`);
    };

    return (
    <div className="p-4 md:p-6 text-white">
            {/* Add Loan Modal */}
      <AddLoanModal
        isOpen={isAddLoanOpen}
        onClose={() => setIsAddLoanOpen(false)}
      />

            {/* Search and Actions */}
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center mb-6">
        <div className="relative w-full md:max-w-md">
                    <input
                        type="text"
                        placeholder="Search by members name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1C1C1C] border-2 border-gray-700/50 text-white rounded-lg focus:outline-none focus:border-[#E5B93E]"
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
        <div className="flex gap-4">
                    <button
            className="flex items-center justify-center gap-x-2 bg-[#E5B93E] text-black px-5 py-2 rounded-lg hover:bg-yellow-400 font-bold w-full md:w-auto cursor-pointer"
                        onClick={() => setIsAddLoanOpen(true)}
                    >
                        <Plus className="w-5 h-5" />
            <span>New Loan</span>
                    </button>
          <button className="flex items-center justify-center gap-x-2 border-2 border-gray-700/50 bg-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-gray-700/50 font-bold w-full md:w-auto cursor-pointer">
                        <Filter className="w-5 h-5" />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
      <div className="border-b border-gray-700/50 mb-6">
        <div className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 whitespace-nowrap text-sm md:text-base font-medium transition-colors ${
                                activeTab === tab
                  ? "border-b-2 border-[#E5B93E] text-[#E5B93E]"
                  : "text-gray-400 hover:text-white"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

      {activeTab === "Loan Application Reviews" ? (
                <LoanApplicationReviews onView={handleViewApplication} />
            ) : (
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-1">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center p-8">
                <LoadingSpinner />
                    </div>
                        ) : error ? (
                            <div className="p-4 text-center text-red-500">{error}</div>
                        ) : (
              <table className="w-full">
                            <thead>
                  <tr className="border-b-2 border-gray-700/80">
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Member
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Loan ID
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Amount
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Issued Date
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Due Date
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Repayment Status
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                      Actions
                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-6 text-gray-500"
                      >
                        No loans found.
                      </td>
                    </tr>
                  ) : (
                    loans
                      .filter((loan) => {
                        const memberName = loan.member?.fullName || "";
                        const loanId = loan.loanId || "";
                                    return (
                          memberName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          loanId
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        );
                      })
                      .map((loan, index) => (
                        <tr
                          key={loan.id || index}
                          className="border-b border-gray-700/50 hover:bg-gray-800/40"
                        >
                          <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                            {loan.member?.fullName || "-"}
                          </td>
                          <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                            {loan.loanId && `${loan.loanId.substring(0, 8)}...`}
                          </td>
                          <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                            ₦{Number(loan.amount).toLocaleString()}
                          </td>
                          <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                            {loan.issueDate
                              ? new Date(loan.issueDate).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                            {loan.dueDate
                              ? new Date(loan.dueDate).toLocaleDateString()
                              : "-"}
                          </td>
                                        <td className="py-3 md:py-4 px-2 md:px-6">
                            <span
                              className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${(() => {
                                switch (loan.repaymentStatus.toLowerCase()) {
                                  case "pending":
                                    return "bg-yellow-800/50 text-yellow-300";
                                  case "overdue":
                                    return "bg-red-800/50 text-red-300";
                                  case "current":
                                    return "bg-green-800/50 text-green-300";
                                            default:
                                    return "bg-gray-700 text-gray-300";
                                }
                              })()}`}
                            >
                              {loan.repaymentStatus
                                ? loan.repaymentStatus.charAt(0).toUpperCase() +
                                  loan.repaymentStatus.slice(1)
                                : "-"}
                                    </span>
                                </td>
                                <td className="py-3 md:py-4 px-2 md:px-6 whitespace-nowrap min-w-[90px]">
                                    <button 
                                        onClick={() => handleViewLoan(loan.id)}
                              className="flex items-center gap-1 md:gap-x-2 bg-gray-700/50 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-600/50 cursor-pointer"
                            >
                              <img
                                src="/view.svg"
                                alt="view"
                                width={16}
                                height={16}
                                className="md:w-[18px] md:h-[18px] invert"
                              />
                              <span className="font-medium text-xs md:text-sm text-white">
                                View
                              </span>
                                    </button>
                                </td>
                            </tr>
                      ))
                  )}
                    </tbody>
                </table>
                )}
            </div>
          {/* Mobile Cards */}
          <div className="block md:hidden">
            {loading ? (
              <div className="flex justify-center items-center p-8">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : loans.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No loans found.
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {loans
                  .filter((loan) => {
                    const memberName = loan.member?.fullName || "";
                    const loanId = loan.loanId || "";
                    return (
                      memberName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      loanId.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                  })
                  .map((loan, index) => (
                    <div
                      key={loan.id || index}
                      className="bg-gray-800/50 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">
                          {loan.member?.fullName || "-"}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${(() => {
                            switch (loan.repaymentStatus.toLowerCase()) {
                              case "pending":
                                return "bg-yellow-800/50 text-yellow-300";
                              case "overdue":
                                return "bg-red-800/50 text-red-300";
                              case "current":
                                return "bg-green-800/50 text-green-300";
                              default:
                                return "bg-gray-700 text-gray-300";
                            }
                          })()}`}
                        >
                          {loan.repaymentStatus
                            ? loan.repaymentStatus.charAt(0).toUpperCase() +
                              loan.repaymentStatus.slice(1)
                            : "-"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        ID: {loan.loanId && `${loan.loanId.substring(0, 8)}...`}
                      </p>
                      <p className="text-sm">
                        Amount:{" "}
                        <span className="font-medium">
                          ₦{Number(loan.amount).toLocaleString()}
                        </span>
                      </p>
                      <p className="text-sm">
                        Due Date:{" "}
                        <span className="font-medium">
                          {loan.dueDate
                            ? new Date(loan.dueDate).toLocaleDateString()
                            : "-"}
                        </span>
                      </p>
                      <button
                        onClick={() => handleViewLoan(loan.id)}
                        className="w-full mt-2 flex items-center justify-center gap-2 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 cursor-pointer"
                      >
                        <img
                          src="/view.svg"
                          alt="view"
                          width={16}
                          height={16}
                          className="invert"
                        />
                        <span className="font-medium text-sm text-white">
                          View Details
                        </span>
                      </button>
                    </div>
                  ))}
              </div>
            )}
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

export default AssLoans; 
