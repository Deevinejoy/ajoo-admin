import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddLoanModal from "./AddLoanModal";
import LoadingSpinner from "../../LoadingSpinner";

interface Loan {
  id: string;
  member: string;
  amount: string;
  interest: string;
  purpose: string;
  status: "Pending" | "Approved" | "Declined";
  date: string;
}

interface ApiLoan {
  id: string;
  memberName: string;
  amount: number;
  interestRate: number;
  purpose: string;
  status: "Pending" | "Approved" | "Declined";
  issueDate: string;
}

const Loans: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://ajo.nickyai.online/api/v1/cooperative/loans/view-all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }

        const result = await response.json();
        const data = result.data.loanApplications;

        const transformedLoans = Array.isArray(data)
          ? data.map((item: ApiLoan) => ({
              id: item.id,
              member: item.memberName,
              amount: `₦${item.amount.toLocaleString()}`,
              interest: `${item.interestRate}%`,
              purpose: item.purpose,
              status: item.status,
              date: new Date(item.issueDate).toLocaleDateString(),
            }))
          : [];

        setLoans(transformedLoans);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error fetching loans";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const handleViewLoan = (loanId: string) => {
    navigate(`/loans/${loanId}`);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-800/50 text-green-300";
      case "Pending":
        return "bg-yellow-800/50 text-yellow-300";
      case "Declined":
        return "bg-red-800/50 text-red-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const filteredLoans = loans.filter(
    (loan) =>
      loan.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 text-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Loans</h1>
          <p className="text-gray-400 text-sm">
            Manage all loan applications
          </p>
        </div>
        <button
          className="bg-[#E5B93E] text-black px-5 py-2 rounded-lg flex items-center justify-center gap-x-2 hover:bg-yellow-400 font-bold w-full md:w-auto cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Loan
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by member or purpose..."
            className="w-full pl-10 pr-4 py-2 bg-[#1C1C1C] border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#E5B93E]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Member</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Interest</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Purpose</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map((loan) => (
                  <tr key={loan.id} className="border-b border-gray-700/50 hover:bg-gray-800/40">
                    <td className="px-6 py-4 text-sm">{loan.member}</td>
                    <td className="px-6 py-4 text-sm">{loan.amount}</td>
                    <td className="px-6 py-4 text-sm">{loan.interest}</td>
                    <td className="px-6 py-4 text-sm">{loan.purpose}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(loan.status)}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{loan.date}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewLoan(loan.id)}
                        className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-sm"
                      >
                        <img src="/view.svg" alt="view" className="w-4 h-4 invert" />
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
            {filteredLoans.map((loan) => (
              <div key={loan.id} className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg">{loan.member}</p>
                    <p className="text-sm text-gray-400">{loan.purpose}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(loan.status)}`}>
                    {loan.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-400">Amount</p>
                    <p>{loan.amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Interest</p>
                    <p>{loan.interest}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleViewLoan(loan.id)}
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
        <AddLoanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Loans; 