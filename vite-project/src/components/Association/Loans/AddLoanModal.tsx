import React from 'react';

interface AddLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssAddLoanModal: React.FC<AddLoanModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg p-4 md:p-8 w-full max-w-2xl mx-auto z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg md:text-xl font-semibold mb-1">Add New Loan</h2>
        <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">Submit a loan application for a cooperative member</p>
        <form className="space-y-4 md:space-y-6">
          <div className='flex flex-col md:flex-row gap-2 md:gap-x-4'>
            <label className="text-base md:text-lg font-medium text-gray-700 md:mb-1 md:text-nowrap">Member Association</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
              <option value="">Select an association</option>
              <option value="1">Association 1</option>
              <option value="2">Association 2</option>
            </select>
          </div>
          <div className='flex flex-col md:flex-row gap-2 md:gap-x-4'>
            <label className="text-base md:text-lg font-medium text-gray-700 md:mb-1 md:text-nowrap">Member Name</label>
            <input type="text" placeholder="Enter member name" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div className='flex flex-col md:flex-row gap-2 md:gap-x-4'>
            <label className="text-base md:text-lg font-medium text-gray-700 md:mb-1 md:text-nowrap">Loan Type</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
              <option value="">Select Loan Type</option>
              <option value="Education">Education</option>
              <option value="House">House</option>
              <option value="Car">Car</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div className='flex flex-col md:flex-row gap-2 md:gap-x-4'>
            <label className="text-base md:text-lg font-medium text-gray-700 md:mb-1 md:text-nowrap">Loan Amount</label>
            <input type="number" placeholder="Enter loan amount" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div className='flex flex-col md:flex-row gap-2 md:gap-x-4'>
            <label className="text-base md:text-lg font-medium text-gray-700 md:mb-1 md:text-nowrap">Repayment Plan</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
              <option value="">Select Plan</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
            </select>
          </div>
          <div className='flex flex-col md:flex-row gap-2 md:gap-x-4'>
            <label className="text-base md:text-lg font-medium text-gray-700 md:mb-1 md:text-nowrap">Interest Rate</label>
            <input type="number" placeholder="Enter interest rate %" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="flex flex-col md:flex-row md:justify-end gap-3 md:gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-[#C4C4C4] rounded-lg w-full md:w-auto order-2 md:order-1">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-[#111827] text-white rounded-lg w-full md:w-auto order-1 md:order-2">Register Member</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssAddLoanModal; 