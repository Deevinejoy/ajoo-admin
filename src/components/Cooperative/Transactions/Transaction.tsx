import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";

const statusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-green-800/50 text-green-300";
    case "pending":
      return "bg-yellow-800/50 text-yellow-300";
    case "failed":
      return "bg-red-800/50 text-red-300";
    default:
      return "bg-gray-700 text-gray-300";
  }
};

type TransactionType = {
  id: string | number;
  date: string;
  type: string;
  recipient: string;
  amount: string;
  status: string;
};

const Transaction: React.FC = () => {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>({ total: 0, page: 1, limit: 10, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    memberId: "",
    loanId: "",
    transactionType: "",
    amount: "",
    paymentMethod: "",
    reference: "",
    paymentCycle: "",
    recipientAssociationId: "",
  });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchTransactions = (page = 1) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch(
      `https://ajo.nickyai.online/api/v1/cooperative/transactions/view?page=${page}&limit=10`,
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
        type ApiTransaction = {
          id: string | number;
          date?: string;
          createdAt?: string;
          type?: string;
          recipient?: string;
          amount?: string | number;
          status?: string;
        };
        const apiTransactions = (data.transactions || []) as ApiTransaction[];
        const mapped = apiTransactions.map(
          (t): TransactionType => ({
            id: t.id,
            date: t.date || t.createdAt || "",
            type: t.type || "",
            recipient: t.recipient || "",
            amount: t.amount ? `₦${t.amount}` : "",
            status: t.status || "",
          })
        );
        setTransactions(mapped);
        setPagination(
          data.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 }
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setAddError(null);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://ajo.nickyai.online/api/v1/cooperation/transactions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...addForm,
            amount: Number(addForm.amount),
          }),
        }
      );
      const result = await response.json();
      console.log("Add transaction response:", result);
      if (!response.ok || result.status === "error") {
        setAddError(result.message || "Failed to add transaction.");
        setAdding(false);
        return;
      }
      setShowAddModal(false);
      setAddForm({
        memberId: "",
        loanId: "",
        transactionType: "",
        amount: "",
        paymentMethod: "",
        reference: "",
        paymentCycle: "",
        recipientAssociationId: "",
      });
      fetchTransactions();
    } catch {
      setAddError("Network or server error.");
    } finally {
      setAdding(false);
    }
  };

  const filteredTransactions = transactions.filter(
    (t) =>
      t.id?.toString().toLowerCase().includes(search.toLowerCase()) ||
      t.type?.toLowerCase().includes(search.toLowerCase()) ||
      t.recipient?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Transactions</h1>
          <p className="text-sm text-gray-400">
            View and manage all financial transactions
          </p>
        </div>
        <button
          className="bg-[#E5B93E] text-black px-5 py-2 rounded-lg flex items-center justify-center gap-x-2 hover:bg-yellow-400 font-bold w-full md:w-auto"
          onClick={() => setShowAddModal(true)}
        >
          + New Transaction
        </button>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 w-full max-w-md text-white">
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              {addError && (
                <div className="text-red-400 text-sm mb-2">{addError}</div>
              )}

              <input
                type="text"
                className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                placeholder="Member ID"
                required
                value={addForm.memberId}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, memberId: e.target.value }))
                }
              />
              <input
                type="text"
                className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                placeholder="Loan ID (Optional)"
                value={addForm.loanId}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, loanId: e.target.value }))
                }
              />
              <input
                type="text"
                className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                placeholder="Transaction Type (e.g., Savings, Loan Repayment)"
                required
                value={addForm.transactionType}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, transactionType: e.target.value }))
                }
              />
              <input
                type="number"
                className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                placeholder="Amount"
                required
                value={addForm.amount}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, amount: e.target.value }))
                }
              />
              <input
                type="text"
                className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                placeholder="Payment Method"
                required
                value={addForm.paymentMethod}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, paymentMethod: e.target.value }))
                }
              />
              <input
                type="text"
                className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                placeholder="Reference (Optional)"
                value={addForm.reference}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, reference: e.target.value }))
                }
              />
              <input
                type="text"
                className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                placeholder="Payment Cycle (Optional)"
                value={addForm.paymentCycle}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, paymentCycle: e.target.value }))
                }
              />
              <input
                type="text"
                className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                placeholder="Recipient Association ID"
                required
                value={addForm.recipientAssociationId}
                onChange={(e) =>
                  setAddForm((f) => ({
                    ...f,
                    recipientAssociationId: e.target.value,
                  }))
                }
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-sm"
                  onClick={() => setShowAddModal(false)}
                  disabled={adding}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#E5B93E] text-black px-4 py-2 rounded-lg font-bold text-sm"
                  disabled={adding}
                >
                  {adding ? "Adding..." : "Add Transaction"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative w-full">
          <img
            src="/search.png"
            alt="search"
            width={16}
            height={16}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 invert opacity-50"
          />
          <input
            type="text"
            placeholder="Search by recipient or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1C1C1C] border-2 border-gray-700/50 text-white rounded-lg focus:outline-none focus:border-[#E5B93E]"
          />
        </div>
        <button className="flex items-center justify-center gap-x-2 border-2 border-gray-700/50 bg-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-gray-700/50 font-bold w-full md:w-auto">
          <img
            src="/filter.svg"
            alt="filter"
            width={18}
            height={18}
            className="invert"
          />
          <p className="text-sm">All</p>
        </button>
      </div>

      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b-2 border-gray-700/80">
                    <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                      Type
                    </th>
                    <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                      Recipient
                    </th>
                    <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                      Amount
                    </th>
                    <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((t) => (
                    <tr
                      key={t.id}
                      className="border-b border-gray-700/50 hover:bg-gray-800/40"
                    >
                      <td className="py-4 px-6 text-gray-300 text-sm">
                        {t.date}
                      </td>
                      <td className="py-4 px-6 text-gray-300 text-sm">
                        {t.type}
                      </td>
                      <td className="py-4 px-6 text-gray-300 text-sm">
                        {t.recipient}
                      </td>
                      <td className="py-4 px-6 text-gray-300 text-sm">
                        {t.amount}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                            t.status
                          )}`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          className="flex items-center gap-x-2 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 text-sm font-medium text-white"
                          onClick={() =>
                            navigate(`/cooperative/transactions/${t.id}`)
                          }
                        >
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
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden p-4 space-y-4">
              {filteredTransactions.map((t) => (
                <div
                  key={t.id}
                  className="bg-gray-800/50 rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{t.type}</h3>
                      <p className="text-sm text-gray-400">{t.recipient}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{t.date}</span>
                    <span className="font-bold text-lg">{t.amount}</span>
                  </div>
                  <button
                    className="w-full mt-2 flex items-center justify-center gap-x-2 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 text-sm text-white font-medium"
                    onClick={() => navigate(`/transactions/${t.id}`)}
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
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4 border-t border-gray-700/50">
              <button
                onClick={() => fetchTransactions(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="text-gray-400 hover:text-white text-sm font-medium disabled:opacity-50"
              >
                Previous page
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
              </div>
              <button
                onClick={() => fetchTransactions(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="text-gray-400 hover:text-white text-sm font-medium disabled:opacity-50"
              >
                Next page
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Transaction;
