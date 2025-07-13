import React from "react";

interface AddLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssAddLoanModal: React.FC<AddLoanModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold">Add New Loan</h2>
            <p className="text-gray-400 text-sm">
              Submit a loan application for a cooperative member.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">
              Member Association
            </label>
            <select className="w-full p-2 bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg focus:outline-none focus:border-[#E5B93E]">
              <option value="">Select an association</option>
              <option value="1">Association 1</option>
              <option value="2">Association 2</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">
              Member Name
            </label>
            <input
              type="text"
              placeholder="Enter member name"
              className="w-full p-2 bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg focus:outline-none focus:border-[#E5B93E]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">
              Loan Type
            </label>
            <select className="w-full p-2 bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg focus:outline-none focus:border-[#E5B93E]">
              <option value="">Select Loan Type</option>
              <option value="Education">Education</option>
              <option value="House">House</option>
              <option value="Car">Car</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">
              Loan Amount
            </label>
            <input
              type="number"
              placeholder="Enter loan amount"
              className="w-full p-2 bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg focus:outline-none focus:border-[#E5B93E]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">
              Repayment Plan
            </label>
            <select className="w-full p-2 bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg focus:outline-none focus:border-[#E5B93E]">
              <option value="">Select Plan</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">
              Interest Rate
            </label>
            <input
              type="number"
              placeholder="Enter interest rate %"
              className="w-full p-2 bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg focus:outline-none focus:border-[#E5B93E]"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-end gap-4 mt-6 pt-4 border-t border-gray-700/50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border-2 border-gray-700/50 rounded-lg font-bold hover:bg-gray-800/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#E5B93E] text-black rounded-lg font-bold hover:bg-yellow-400"
            >
              Submit application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssAddLoanModal;
