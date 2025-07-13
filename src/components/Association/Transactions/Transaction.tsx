import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../LoadingSpinner";
//import { useNavigate } from 'react-router-dom';

// Define Transaction and Member types based on API response
interface Member {
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
}

interface Transaction {
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
  member?: Member;
  loan?: any;
}

const statusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-green-500/10 text-green-400";
    case "pending":
      return "bg-yellow-500/10 text-yellow-400";
    default:
      return "bg-gray-500/10 text-gray-400";
  }
};

const AmountText = ({ amount }: { amount: string | number }) => {
  const amt = typeof amount === "string" ? amount : amount.toString();
  if (amt.startsWith("+")) {
    return <span className="text-green-400">{amt}</span>;
  } else if (amt.startsWith("-")) {
    return <span className="text-red-400">{amt}</span>;
  }
  return <span className="text-gray-300">{amt}</span>;
};

const RECIPIENT_ASSOCIATION_ID = "9bea0709-6289-4328-b940-963b38b8448c";

const AssTransaction: React.FC = () => {
  const [search, setSearch] = useState("");
  // const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    memberId: "",
    loanId: "",
    transactionType: "",
    amount: "",
    paymentMethod: "",
    reference: "",
    paymentCycle: "",
    recipientAssociationId: RECIPIENT_ASSOCIATION_ID,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Fetch transactions (refactored for refresh)
  const fetchTransactions = () => {
    setLoading(true);
    setError("");
    fetch("https://ajo.nickyai.online/api/v1/admin/transactions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setTransactions(data.data || []);
        } else {
          setError(data.message || "Failed to fetch transactions");
        }
      })
      .catch(() => setError("Error fetching transactions"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle form submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    setFormSuccess("");
    // Validate
    if (
      !form.memberId ||
      !form.transactionType ||
      !form.amount ||
      !form.paymentMethod ||
      !form.reference ||
      !form.paymentCycle ||
      !form.recipientAssociationId
    ) {
      setFormError("All fields except loanId are required");
      setFormLoading(false);
      return;
    }
    try {
      const res = await fetch(
        "https://ajo.nickyai.online/api/v1/admin/transactions",
        {
          method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
        }
      );
      const data = await res.json();
      if (data.status === "success") {
        setFormSuccess("Transaction added successfully!");
        setShowModal(false);
        setForm({
          memberId: "",
          loanId: "",
          transactionType: "",
          amount: "",
          paymentMethod: "",
          reference: "",
          paymentCycle: "",
          recipientAssociationId: RECIPIENT_ASSOCIATION_ID,
        });
        fetchTransactions();
      } else {
        setFormError(data.message || "Failed to add transaction");
      }
    } catch {
      setFormError("Error adding transaction");
    } finally {
      setFormLoading(false);
    }
  };

  // Filter transactions by search
  const filteredTransactions = transactions.filter((t) => {
    const memberName = t.member?.fullName || "";
    return (
      memberName.toLowerCase().includes(search.toLowerCase()) ||
      t.type?.toLowerCase().includes(search.toLowerCase()) ||
      t.id?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-4 md:p-6 text-white">
      {/* Modal for adding transaction */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
              onClick={() => setShowModal(false)}
              disabled={formLoading}
            >
              <span className="text-2xl">&times;</span>
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Member ID
                </label>
                <input
                  type="text"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  value={form.memberId}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, memberId: e.target.value }))
                  }
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Loan ID (optional)
                </label>
                <input
                  type="text"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  value={form.loanId}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, loanId: e.target.value }))
                  }
                  disabled={formLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Transaction Type
                </label>
                <input
                  type="text"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  value={form.transactionType}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, transactionType: e.target.value }))
                  }
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Amount
                </label>
                <input
                  type="number"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, amount: e.target.value }))
                  }
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Payment Method
                </label>
                <input
                  type="text"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  value={form.paymentMethod}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, paymentMethod: e.target.value }))
                  }
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Reference
                </label>
                <input
                  type="text"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  value={form.reference}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, reference: e.target.value }))
                  }
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Payment Cycle
                </label>
                <input
                  type="text"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  value={form.paymentCycle}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, paymentCycle: e.target.value }))
                  }
                  disabled={formLoading}
                  required
                />
              </div>
                <input
                type="hidden"
                  value={form.recipientAssociationId}
                name="recipientAssociationId"
              />
              {formError && (
                <div className="text-red-400 text-sm">{formError}</div>
              )}
              {formSuccess && (
                <div className="text-green-400 text-sm">{formSuccess}</div>
              )}
              <button
                type="submit"
                className="w-full bg-[#E5B93E] text-black py-2 rounded-lg font-bold mt-2 disabled:opacity-60 cursor-pointer"
                disabled={formLoading}
              >
                {formLoading ? "Submitting..." : "Submit Transaction"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <div className="flex gap-4">
          <button className="bg-gray-700/50 px-4 py-2 rounded-lg text-sm text-white hover:bg-gray-600/50 cursor-pointer">
            Export
          </button>
        <button
            className="bg-[#E5B93E] text-black px-5 py-2 rounded-lg flex items-center justify-center gap-x-2 hover:bg-yellow-400 font-bold w-full md:w-auto cursor-pointer"
          onClick={() => setShowModal(true)}
        >
            + Add Transaction
        </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Revenue */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
          <div className="self-center">
            <p className="text-gray-400 text-base">Total Revenue</p>
            <h2 className="text-4xl font-semibold text-white mt-1">₦1.2M</h2>
          </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/card.svg" alt="pic" className="w-6 h-6 invert" />
          </div>
        </div>
        {/* Total Dues */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
          <div className="self-center">
            <p className="text-gray-400 text-base">Total Dues</p>
            <h2 className="text-4xl font-semibold text-white mt-1">₦300K</h2>
          </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/pending.svg" alt="pic" className="w-6 h-6 invert" />
          </div>
        </div>
        {/* Completed Transactions */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
          <div className="self-center">
            <p className="text-gray-400 text-base">Completed</p>
            <h2 className="text-4xl font-semibold text-white mt-1">450</h2>
          </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/dashboard1.svg" alt="pic" className="w-6 h-6 invert" />
          </div>
        </div>
        {/* Pending Transactions */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
          <div className="self-center">
            <p className="text-gray-400 text-base">Pending</p>
            <h2 className="text-4xl font-semibold text-white mt-1">32</h2>
          </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/security.svg" alt="pic" className="w-6 h-6 invert" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            type="text"
          placeholder="Search by name, type, or ID..."
            value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-4 pr-4 py-2 bg-[#1C1C1C] border-2 border-gray-700/50 text-white rounded-lg focus:outline-none focus:border-[#E5B93E]"
        />
        <div className="flex gap-4">
          <button className="flex items-center justify-center gap-x-2 border-2 border-gray-700/50 bg-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-gray-700/50 font-bold w-full md:w-auto cursor-pointer">
            <img
              src="/filter.svg"
              alt="pic"
              width={18}
              height={18}
              className="invert"
            />
            <p className="text-sm text-nowrap">Filter by Status</p>
          </button>
          <button className="flex items-center justify-center gap-x-2 border-2 border-gray-700/50 bg-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-gray-700/50 font-bold w-full md:w-auto cursor-pointer">
            <img
              src="/filter.svg"
              alt="pic"
              width={18}
              height={18}
              className="invert"
            />
            <p className="text-sm text-nowrap">Filter by Date</p>
          </button>
        </div>
      </div>

      {/* Main Table / Cards */}
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-1">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
        {loading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner />
            </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : filteredTransactions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No transactions found
            </div>
        ) : (
            <table className="w-full min-w-[1000px]">
            <thead>
                <tr className="border-b-2 border-gray-700/80">
                  <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                    Transaction ID
                  </th>
                  <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                    Date
                  </th>
                  <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                    Member
                  </th>
                  <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                    Type
                  </th>
                  <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                    Amount
                  </th>
                  <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-sm">
                    Action
                  </th>
              </tr>
            </thead>
            <tbody>
                {filteredTransactions.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-gray-700/50 hover:bg-gray-800/40"
                  >
                    <td className="py-3 px-4 md:px-6 text-gray-300 text-sm">
                      {t.id.substring(0, 8)}...
                    </td>
                    <td className="py-3 px-4 md:px-6 text-gray-300 text-sm">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 md:px-6 text-gray-300 text-sm">
                      {t.member?.fullName || "N/A"}
                    </td>
                    <td className="py-3 px-4 md:px-6 text-gray-300 text-sm">
                      {t.type}
                    </td>
                    <td className="py-3 px-4 md:px-6 text-sm">
                    <AmountText amount={t.amount} />
                  </td>
                    <td className="py-3 px-4 md:px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle(
                          t.status
                        )}`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 md:px-6">
                      <button className="flex items-center gap-x-2 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 text-sm text-white font-medium cursor-pointer">
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

        {/* Mobile Cards */}
        <div className="block md:hidden">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No transactions found
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {filteredTransactions.map((t) => (
                <div
                  key={t.id}
                  className="bg-gray-800/50 rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">
                      {t.member?.fullName || "N/A"}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    ID: {t.id.substring(0, 8)}...
                  </p>
                  <p className="text-sm">
                    Amount: <AmountText amount={t.amount} />
                  </p>
                  <p className="text-sm">
                    Date:{" "}
                    <span className="font-medium">
                      {new Date(t.date).toLocaleDateString()}
                    </span>
                  </p>
                  <button className="w-full mt-2 flex items-center justify-center gap-x-2 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 text-sm text-white font-medium cursor-pointer">
                    <img
                      src="/view.svg"
                      alt="view"
                      width={16}
                      height={16}
                      className="invert"
                    />
                    <span>View</span>
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
            {[1, 2, 3, "...", 8].map((page, index) => (
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

export default AssTransaction;
