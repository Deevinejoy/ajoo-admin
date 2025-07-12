import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";

interface MemberData {
  id: string;
  fullName: string;
  association: string;
  dateJoined: string;
  phoneNumber: string;
  email: string;
  address: string;
  membershipStatus: boolean;
}

interface LoanHistory {
  id: string;
  date: string;
  amount: string;
  status: "approved" | "completed" | "pending";
}

interface TransactionHistory {
  id: string;
  date: string;
  type: string;
  amount: string;
  status: "approved" | "completed" | "pending";
}

const MemberProfile: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"transactions" | "loans">(
    "transactions"
  );
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loanHistory, setLoanHistory] = useState<LoanHistory[]>([]);
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionHistory[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!memberId) return;

      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://ajo.nickyai.online/api/v1/cooperative/members/${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch member data");
        }

        const result = await response.json();
        if (result.data?.member) {
          setMemberData(result.data.member);
          setLoanHistory(result.data.loanHistory || []);
          setTransactionHistory(result.data.transactionHistory || []);
        } else {
          throw new Error("Member not found");
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error fetching member data";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [memberId]);

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-blue-800/50 text-blue-300";
      case "completed":
        return "bg-green-800/50 text-green-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 text-white min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !memberData) {
    return (
      <div className="p-4 md:p-6 text-white min-h-screen">
        <button
          onClick={() => navigate("/members")}
          className="text-gray-400 hover:text-white mb-6 flex items-center"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Members</span>
        </button>
        <div className="text-center text-red-400">
          {error || "Member not found"}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#E5B93E] text-black rounded-lg font-bold hover:bg-yellow-400"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 text-white">
      <button
        onClick={() => navigate("/members")}
        className="text-gray-400 hover:text-white mb-6 flex items-center"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Members</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Card - Member Info */}
        <div className="w-full lg:w-1/3 xl:w-1/4 bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-6 self-start">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gray-700 rounded-full mb-4 flex items-center justify-center text-3xl font-bold">
              {memberData.fullName.charAt(0)}
            </div>
            <h2 className="text-xl font-bold">{memberData.fullName}</h2>
            <p className="text-gray-400">{memberData.association}</p>
            <p className="text-sm text-gray-500 mt-1">
              Joined: {new Date(memberData.dateJoined).toLocaleDateString()}
            </p>
          </div>
          <div className="border-t border-gray-700/50 my-6"></div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Phone:</span>
              <span className="font-medium">{memberData.phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="font-medium">{memberData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Address:</span>
              <span className="font-medium text-right">
                {memberData.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span
                className={`font-medium ${
                  memberData.membershipStatus
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {memberData.membershipStatus ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Content - Tabs */}
        <div className="flex-1">
          <div className="border-b border-gray-700/50 mb-6">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("transactions")}
                className={`pb-3 px-1 text-base whitespace-nowrap transition-colors ${
                  activeTab === "transactions"
                    ? "border-b-2 border-[#E5B93E] text-[#E5B93E]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Transaction History
              </button>
              <button
                onClick={() => setActiveTab("loans")}
                className={`pb-3 px-1 text-base whitespace-nowrap transition-colors ${
                  activeTab === "loans"
                    ? "border-b-2 border-[#E5B93E] text-[#E5B93E]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Loan History
              </button>
            </div>
          </div>

          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6">
            {activeTab === "transactions" && (
              <div>
                <h3 className="text-lg font-bold mb-4">Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700/50">
                        <th className="py-3 px-4 text-left font-medium text-gray-400">
                          Date
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-400">
                          Type
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-400">
                          Amount
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-400">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionHistory.map((tx) => (
                        <tr
                          key={tx.id}
                          className="border-b border-gray-700/50 hover:bg-gray-800/40"
                        >
                          <td className="py-3 px-4">{tx.date}</td>
                          <td className="py-3 px-4">{tx.type}</td>
                          <td className="py-3 px-4">{tx.amount}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(
                                tx.status
                              )}`}
                            >
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === "loans" && (
              <div>
                <h3 className="text-lg font-bold mb-4">Loans</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700/50">
                        <th className="py-3 px-4 text-left font-medium text-gray-400">
                          Date
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-400">
                          Amount
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-400">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanHistory.map((loan) => (
                        <tr
                          key={loan.id}
                          className="border-b border-gray-700/50 hover:bg-gray-800/40"
                        >
                          <td className="py-3 px-4">{loan.date}</td>
                          <td className="py-3 px-4">{loan.amount}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(
                                loan.status
                              )}`}
                            >
                              {loan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
