import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner"; // Assuming this is the correct path

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

const TransactionDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const loading = false; // Per instructions, no data fetching, so no real loading state
  const transaction = {
    // Mock data since no fetching is allowed
    status: "completed",
    type: "Repayment",
    date: "2022-12-15",
    amount: "₦500,000",
    relatedLoanId: "1",
    from: { name: "John Doe", id: "1" },
    to: { name: "Association", id: "1" },
    paymentMethod: "Bank Transfer",
    reference: "TRX-1",
    paymentCycle: "Monthly",
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0D0D0D]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-[#0D0D0D] text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-white flex items-center gap-x-1 md:gap-x-2 text-base md:text-lg font-medium"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="text-xl md:text-2xl font-bold">
          Transaction Details
        </span>
        <span className="text-gray-400 ml-2 text-sm md:text-base">
          ID: {id}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Summary */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              Transaction Summary
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                transaction.status
              )}`}
            >
              {transaction.status}
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Transaction Type</span>
              <span className="text-white font-medium text-sm">
                {transaction.type}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Date</span>
              <span className="text-white font-medium text-sm">
                {transaction.date}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Amount</span>
              <span className="text-white font-medium text-sm">
                {transaction.amount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Related Loan</span>
              <Link
                to={`/loans/${transaction.relatedLoanId}`}
                className="text-[#E5B93E] underline text-sm"
              >
                Loan #{transaction.relatedLoanId}
              </Link>
            </div>
          </div>
          <button className="mt-4 bg-[#E5B93E] text-black py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold hover:bg-yellow-400">
            <img src="/download.svg" alt="download" width={16} height={16} />
            Download Receipt
          </button>
        </div>

        {/* Payment Details */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Payment Details</h2>
          <div className="space-y-4">
            <div className="bg-[#0D0D0D] border border-gray-700/50 rounded-lg p-3">
              <p className="text-gray-400 text-sm mb-2">From</p>
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-[#E5B93E]">
                  {transaction.from.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-white text-sm">
                    {transaction.from.name}
                  </div>
                  <div className="text-gray-400 text-xs">
                    ID: {transaction.from.id}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#0D0D0D] border border-gray-700/50 rounded-lg p-3">
              <p className="text-gray-400 text-sm mb-2">To</p>
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-[#E5B93E]">
                  {transaction.to.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-white text-sm">
                    {transaction.to.name}
                  </div>
                  <div className="text-gray-400 text-xs">
                    ID: {transaction.to.id}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700/50 pt-4 mt-2">
              <h3 className="mb-3 text-base font-semibold">
                Additional Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Payment Method</span>
                  <span className="text-white font-medium">
                    {transaction.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Reference</span>
                  <span className="text-white font-medium">
                    {transaction.reference}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Payment Cycle</span>
                  <span className="text-white font-medium">
                    {transaction.paymentCycle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
