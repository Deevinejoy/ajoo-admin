import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import AddMemberModal from "./AddMemberModal";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";

type AllMembersRow = {
  type: "all_members";
  member: string;
  memberId: string;
  dateJoined: string;
  activeLoans: string;
  totalBorrowed: string;
  status: string;
};

type LoanRequestRow = {
  type: "loan_request";
  member: string;
  requestDate: string;
  amount: string;
  purpose: string;
  creditScore: string;
  status: string;
};

type FinancialActivityRow = {
  type: "financial_activity";
  member: string;
  transactionId: string;
  date: string;
  transactionType: string;
  amount: string;
  status: string;
};

type LoanPerformanceRow = {
  type: "loan_performance";
  member: string;
  loanId: string;
  amount: string;
  issueDate: string;
  term: string;
  paymentsMade: string;
  status: string;
};

type ApiLoanRequest = {
  id: number;
  applicationId: string;
  amount: string;
  purpose: string;
  status: string;
  creditScore: number;
  appliedOn: string;
  member?: {
    id: string;
    fullName: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    address: string;
    membershipStatus: boolean;
    memberPhoto: string | null;
    dateJoined: string;
    updatedAt: string;
    association: {
      id: string;
      name: string;
      description: string | null;
      leaderName: string;
      leaderPhoneNumber: string;
      category: string;
      numberOfMembers: number;
      isActive: boolean;
      createdAt: string;
      monthlySavings: string;
      minimumLoanAmount: string;
      maximumLoanAmount: string;
      loanDuration: number;
      interestRate: string;
      cooperativeId: string;
      foundedDate: string;
      updatedAt: string;
    };
  };
};

type ApiLoanPerformance = {
  memberName: string;
  loanId: string | null;
  amount: string;
  issueDate: string;
  term: number;
  paymentsMade: string;
  status: string;
};

type ApiTransaction = {
  id: string;
  date: string;
  type: string;
  recipient: string;
  amount: string;
  status: string;
  paymentMethod: string;
  reference: string;
  paymentCycle: string;
  recipientAssociationId: string;
  createdAt: string;
  updatedAt: string;
  member?: {
    id: string;
    fullName: string;
  };
};

type ApiMetrics = {
  totalMembers: number;
  activeLoans: number;
  pendingLoans: number;
};

type TableRow =
  | AllMembersRow
  | LoanRequestRow
  | FinancialActivityRow
  | LoanPerformanceRow;

const AssMembers: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Financial Activity");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<AllMembersRow[]>([]);
  const [loanRequests, setLoanRequests] = useState<LoanRequestRow[]>([]);
  const [loanRequestsLoading, setLoanRequestsLoading] = useState(false);
  const [loanPerformance, setLoanPerformance] = useState<LoanPerformanceRow[]>(
    []
  );
  const [loanPerformanceLoading, setLoanPerformanceLoading] = useState(false);
  const [transactions, setTransactions] = useState<FinancialActivityRow[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [metrics, setMetrics] = useState<ApiMetrics>({
    totalMembers: 0,
    activeLoans: 0,
    pendingLoans: 0,
  });
  const [metricsLoading, setMetricsLoading] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    "All Members",
    "Loan Request",
    "Financial Activity",
    "Loan Performance",
  ];

  const fetchMembers = () => {
    const token = localStorage.getItem("token");
    fetch("https://ajo.nickyai.online/api/v1/admin/all-member", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        type ApiMember = {
          id: string;
          fullName?: string;
          name?: string;
          memberId?: string;
          dateJoined?: string;
          createdAt?: string;
          activeLoans?: number;
          totalBorrowed?: number;
          status?: string;
        };
        const apiMembers = (data.data?.members || []) as ApiMember[];
        const rows = apiMembers.map(
          (m): AllMembersRow => ({
            type: "all_members",
            member: m.fullName || m.name || "",
            memberId: m.memberId || m.id || "",
            dateJoined: m.dateJoined || m.createdAt || "",
            activeLoans: m.activeLoans?.toString() || "0",
            totalBorrowed: m.totalBorrowed ? `₦${m.totalBorrowed}` : "₦0",
            status: m.status || "Good",
          })
        );
        setMembers(rows);
      })
      .catch(() => {});
  };

  const fetchLoanRequests = () => {
    const token = localStorage.getItem("token");
    setLoanRequestsLoading(true);
    fetch("https://ajo.nickyai.online/api/v1/admin/get-all-applied-loans", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Loan Requests API Response:", data);
        if (data.status === "success" && data.data) {
          console.log("Loan Requests Data:", data.data);
          const rows = data.data.map(
            (loan: ApiLoanRequest): LoanRequestRow => ({
              type: "loan_request",
              member: loan.member?.fullName || "Unknown Member",
              requestDate: new Date(loan.appliedOn).toLocaleDateString(),
              amount: `₦${Number(loan.amount).toLocaleString()}`,
              purpose: loan.purpose || "Not specified",
              creditScore: loan.creditScore?.toString() || "N/A",
              status: loan.status || "PENDING",
            })
          );
          console.log("Processed Loan Request Rows:", rows);
          setLoanRequests(rows);
        } else {
          console.log("No loan requests data found or API error");
          setLoanRequests([]);
        }
        setLoanRequestsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching loan requests:", error);
        setLoanRequests([]);
        setLoanRequestsLoading(false);
      });
  };

  const fetchLoanPerformance = () => {
    const token = localStorage.getItem("token");
    setLoanPerformanceLoading(true);
    fetch("https://ajo.nickyai.online/api/v1/admin/loans/performance", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Loan Performance API Response:", data);
        if (data.status === "success" && data.data) {
          console.log("Loan Performance Data:", data.data);
          const rows = data.data.map(
            (loan: ApiLoanPerformance): LoanPerformanceRow => ({
              type: "loan_performance",
              member: loan.memberName || "Unknown Member",
              loanId: loan.loanId || "N/A",
              amount: `₦${Number(loan.amount).toLocaleString()}`,
              issueDate: loan.issueDate,
              term: `${loan.term} months`,
              paymentsMade: loan.paymentsMade,
              status: loan.status || "pending",
            })
          );
          console.log("Processed Loan Performance Rows:", rows);
          setLoanPerformance(rows);
        } else {
          console.log("No loan performance data found or API error");
          setLoanPerformance([]);
        }
        setLoanPerformanceLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching loan performance:", error);
        setLoanPerformance([]);
        setLoanPerformanceLoading(false);
      });
  };

  const fetchTransactions = () => {
    const token = localStorage.getItem("token");
    setTransactionsLoading(true);
    fetch("https://ajo.nickyai.online/api/v1/admin/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Transactions API Response:", data);
        if (data.status === "success" && data.data) {
          console.log("Transactions Data:", data.data);
          const rows = data.data.map(
            (transaction: ApiTransaction): FinancialActivityRow => ({
              type: "financial_activity",
              member: transaction.member?.fullName || "Unknown Member",
              transactionId: transaction.id,
              date: transaction.date,
              transactionType: transaction.type,
              amount: `₦${Number(transaction.amount).toLocaleString()}`,
              status: transaction.status,
            })
          );
          console.log("Processed Transaction Rows:", rows);
          setTransactions(rows);
        } else {
          console.log("No transactions data found or API error");
          setTransactions([]);
        }
        setTransactionsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
        setTransactionsLoading(false);
      });
  };

  const fetchMetrics = () => {
    const token = localStorage.getItem("token");
    const associationId = localStorage.getItem("associationId");
    setMetricsLoading(true);
    fetch(
      `https://ajo.nickyai.online/api/v1/admin/loans/metrics?associationId=${associationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Metrics API Response:", data);
        if (data.status === "success" && data.data) {
          console.log("Metrics Data:", data.data);
          setMetrics(data.data);
        } else {
          console.log("No metrics data found or API error");
          setMetrics({ totalMembers: 0, activeLoans: 0, pendingLoans: 0 });
        }
        setMetricsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching metrics:", error);
        setMetrics({ totalMembers: 0, activeLoans: 0, pendingLoans: 0 });
        setMetricsLoading(false);
      });
  };

  useEffect(() => {
    fetchMembers();
    fetchLoanRequests();
    fetchLoanPerformance();
    fetchTransactions();
    fetchMetrics();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Table headers based on active tab
  const getTableHeaders = () => {
    switch (activeTab) {
      case "Loan Request":
        return [
          "Member",
          "Request Date",
          "Amount",
          "Purpose",
          "Credit Score",
          "Status",
          "Actions",
        ];
      case "Financial Activity":
        return [
          "Member",
          "Transaction ID",
          "Date",
          "Type",
          "Amount",
          "Status",
          "Actions",
        ];
      case "Loan Performance":
        return [
          "Member",
          "Loan ID",
          "Amount",
          "Issue Date",
          "Term",
          "Payments made",
          "Status",
          "Actions",
        ];
      case "All Members":
        return [
          "Member",
          "Member ID",
          "Date joined",
          "Active loans",
          "Total Borrowed",
          "Repayment Status",
          "Actions",
        ];
      default:
        return [
          "Member",
          "Member ID",
          "Date joined",
          "Active loans",
          "Total Borrowed",
          "Repayment Status",
          "Actions",
        ];
    }
  };

  // Table data based on active tab
  const getTableData = (): TableRow[] => {
    switch (activeTab) {
      case "Financial Activity":
        return transactions;
      case "Loan Performance":
        return loanPerformance;
      case "Loan Request":
        return loanRequests;
      default:
        // Filter by search query
        if (searchQuery) {
          return members.filter((m) =>
            m.member.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        return members;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "good":
      case "completed":
      case "current":
        return "bg-green-800/50 text-green-300";
      case "new":
      case "pending":
        return "bg-yellow-800/50 text-yellow-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const handleViewMember = (memberId: string) => {
    navigate(`/association/members/${memberId}`);
  };

  const renderTableRow = (row: TableRow) => {
    switch (row.type) {
      case "financial_activity":
        return (
          <>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.member}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.transactionId.substring(0, 8)}...
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.date}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.transactionType}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.amount}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                  row.status
                )}`}
              >
                {row.status}
              </span>
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6">
              <button className="flex items-center gap-1 md:gap-2 bg-gray-700/50 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-600/50 cursor-pointer">
                <span className="font-medium text-xs md:text-sm text-white">
                  Review
                </span>
              </button>
            </td>
          </>
        );
      case "loan_performance":
        return (
          <>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.member}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.loanId !== "N/A"
                ? `${row.loanId.substring(0, 8)}...`
                : "N/A"}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.amount}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.issueDate}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.term}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.paymentsMade}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                  row.status
                )}`}
              >
                {row.status}
              </span>
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6">
              <button className="flex items-center gap-1 md:gap-2 bg-gray-700/50 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-600/50 cursor-pointer">
                <span className="font-medium text-xs md:text-sm text-white">
                  Review
                </span>
              </button>
            </td>
          </>
        );
      case "loan_request":
        return (
          <>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.member}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.requestDate}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.amount}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.purpose}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.creditScore}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                  row.status
                )}`}
              >
                {row.status}
              </span>
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6">
              <button className="flex items-center gap-1 md:gap-2 bg-gray-700/50 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-600/50 cursor-pointer">
                <span className="font-medium text-xs md:text-sm text-white">
                  Review
                </span>
              </button>
            </td>
          </>
        );
      default:
        return (
          <>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.member}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.memberId.substring(0, 8)}...
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.dateJoined}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.activeLoans}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
              {row.totalBorrowed}
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                  row.status
                )}`}
              >
                {row.status}
              </span>
            </td>
            <td className="py-3 md:py-4 px-2 md:px-6">
              <button
                onClick={() => handleViewMember(row.memberId)}
                className="flex items-center gap-1 md:gap-2 bg-gray-700/50 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-600/50 cursor-pointer"
              >
                <img
                  src="/view.svg"
                  alt="pic"
                  width={16}
                  height={16}
                  className="md:w-[18px] md:h-[18px] invert"
                />
                <span className="font-medium text-xs md:text-sm text-white">
                  View
                </span>
              </button>
            </td>
          </>
        );
    }
  };

  return (
    <div className="p-4 md:p-6 pt-2 text-white">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-400 text-base">Total Members</h3>
              <p className="text-3xl font-semibold mt-1">
                {metricsLoading ? "..." : metrics.totalMembers}
              </p>
            </div>
            <div className="bg-gray-800/60 p-3 rounded-lg">
              <img src="/briefcase.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
          </div>
        </div>

        <div className="bg-[#1C1C1C] border border-gray-700/50 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-400 text-base">Active Loans</h3>
              <p className="text-3xl font-semibold mt-1">
                {metricsLoading ? "..." : metrics.activeLoans}
              </p>
            </div>
            <div className="bg-gray-800/60 p-3 rounded-lg">
              <img src="/people.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
          </div>
        </div>

        <div className="bg-[#1C1C1C] border border-gray-700/50 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-400 text-base">Pending Approvals</h3>
              <p className="text-3xl font-semibold mt-1">
                {metricsLoading ? "..." : metrics.pendingLoans}
              </p>
            </div>
            <div className="bg-gray-800/60 p-3 rounded-lg">
              <img src="/loans1.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Add Member */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 bg-[#1C1C1C] border-2 border-gray-700/50 text-white rounded-lg focus:outline-none focus:border-[#E5B93E]"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#E5B93E] text-black px-5 py-2 rounded-lg flex items-center justify-center gap-x-2 hover:bg-yellow-400 font-bold w-full md:w-auto cursor-pointer"
        >
          <img src="/plus.svg" alt="pic" width={18} height={18} />
          <span>Add Member</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700/50 mb-6">
        <nav className="flex flex-wrap gap-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`pb-3 px-1 whitespace-nowrap text-sm md:text-base font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-[#E5B93E] text-[#E5B93E]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Members Table / Cards */}
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-1">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-700/80">
                {getTableHeaders().map((header, index) => (
                  <th
                    key={index}
                    className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeTab === "Loan Request" && loanRequestsLoading ? (
                <tr>
                  <td colSpan={7} className="py-8">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : activeTab === "Loan Performance" && loanPerformanceLoading ? (
                <tr>
                  <td colSpan={8} className="py-8">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : activeTab === "Financial Activity" && transactionsLoading ? (
                <tr>
                  <td colSpan={7} className="py-8">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : getTableData().length === 0 ? (
                <tr>
                  <td
                    colSpan={activeTab === "Loan Performance" ? 8 : 7}
                    className="text-center py-8 text-gray-500"
                  >
                    No {activeTab.toLowerCase()} data found
                  </td>
                </tr>
              ) : (
                getTableData().map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700/50 hover:bg-gray-800/40"
                  >
                    {renderTableRow(row)}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden">
          {activeTab === "Loan Request" && loanRequestsLoading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner />
            </div>
          ) : activeTab === "Loan Performance" && loanPerformanceLoading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner />
            </div>
          ) : activeTab === "Financial Activity" && transactionsLoading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner />
            </div>
          ) : getTableData().length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No {activeTab.toLowerCase()} data found
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {getTableData().map((row, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 rounded-lg p-4 space-y-3"
                >
                  {row.type === "all_members" && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">{row.member}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                            row.status
                          )}`}
                        >
                          {row.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        ID: {row.memberId.substring(0, 8)}...
                      </p>
                      <p className="text-sm">
                        Active Loans:{" "}
                        <span className="font-medium">{row.activeLoans}</span>
                      </p>
                      <p className="text-sm">
                        Total Borrowed:{" "}
                        <span className="font-medium">{row.totalBorrowed}</span>
                      </p>
                      <button
                        onClick={() => handleViewMember(row.memberId)}
                        className="w-full mt-2 flex items-center justify-center gap-2 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 cursor-pointer"
                      >
                        <img
                          src="/view.svg"
                          alt="pic"
                          width={16}
                          height={16}
                          className="invert"
                        />
                        <span className="font-medium text-sm text-white">
                          View Details
                        </span>
                      </button>
                    </>
                  )}
                  {row.type === "loan_request" && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">{row.member}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                            row.status
                          )}`}
                        >
                          {row.status}
                        </span>
                      </div>
                      <p className="text-sm">
                        Amount:{" "}
                        <span className="font-medium">{row.amount}</span>
                      </p>
                      <p className="text-sm text-gray-400">
                        Purpose: {row.purpose}
                      </p>
                      <button className="w-full mt-2 flex items-center justify-center gap-1 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 cursor-pointer">
                        <span className="font-medium text-sm text-white">
                          Review
                        </span>
                      </button>
                    </>
                  )}
                  {row.type === "financial_activity" && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">{row.member}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                            row.status
                          )}`}
                        >
                          {row.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        ID: {row.transactionId.substring(0, 8)}...
                      </p>
                      <p className="text-sm">
                        Type:{" "}
                        <span className="font-medium">
                          {row.transactionType}
                        </span>
                      </p>
                      <p className="text-sm">
                        Amount:{" "}
                        <span className="font-medium">{row.amount}</span>
                      </p>
                      <button className="w-full mt-2 flex items-center justify-center gap-1 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 cursor-pointer">
                        <span className="font-medium text-sm text-white">
                          Review
                        </span>
                      </button>
                    </>
                  )}
                  {row.type === "loan_performance" && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">{row.member}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                            row.status
                          )}`}
                        >
                          {row.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Loan ID:{" "}
                        {row.loanId !== "N/A"
                          ? `${row.loanId.substring(0, 8)}...`
                          : "N/A"}
                      </p>
                      <p className="text-sm">
                        Amount:{" "}
                        <span className="font-medium">{row.amount}</span>
                      </p>
                      <p className="text-sm">
                        Term: <span className="font-medium">{row.term}</span>
                      </p>
                      <button className="w-full mt-2 flex items-center justify-center gap-1 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 cursor-pointer">
                        <span className="font-medium text-sm text-white">
                          Review
                        </span>
                      </button>
                    </>
                  )}
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
      <div className="bg-[#1C1C1C] border border-gray-700/50 mt-8 p-4 rounded-2xl">
        <p className="text-white text-lg font-semibold">Member Detail View</p>
        <p className="text-gray-400 mt-2 text-sm">
          Click "view" on any member to see detailed information including
          complete financial activity, loan requests and repayment performance.
        </p>
      </div>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMemberAdded={fetchMembers}
      />
    </div>
  );
};

export default AssMembers;
