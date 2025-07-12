import React, { useState } from 'react';

interface AddLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoanCreated?: () => void;
}

const AddLoanModal: React.FC<AddLoanModalProps> = ({ isOpen, onClose, onLoanCreated }) => {
  const [associationId, setAssociationId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [termMonths, setTermMonths] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [paymentSchedule, setPaymentSchedule] = useState('monthly');
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://ajo.nickyai.online/api/v1/cooperative/loans/create-with-schedule', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          memberId,
          associationId,
          amount,
          interestRate,
          termMonths,
          issueDate,
          dueDate,
          paymentSchedule,
          purpose,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create loan');
      alert('Loan created successfully!');
      if (onLoanCreated) onLoanCreated();
      onClose();
    } catch (err: unknown) {
      let errorMsg = 'An error occurred';
      if (err && typeof err === 'object' && 'message' in err && typeof (err as { message?: string }).message === 'string') {
        errorMsg = (err as { message: string }).message;
      }
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg p-8 w-full max-w-2xl mx-auto z-10">
        <h2 className="text-xl font-semibold mb-1">Add New Loan</h2>
        <p className="text-gray-600 mb-6">Submit a loan application for a cooperative member</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className='flex gap-x-4'>
            <label className="text-lg font-medium text-gray-700 mb-1 text-nowrap">Member Association</label>
            <input
              type="text"
              placeholder="Enter association ID"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={associationId}
              onChange={e => setAssociationId(e.target.value)}
              required
            />
          </div>
          <div className='flex gap-x-4'>
            <label className="text-lg font-medium text-gray-700 mb-1 text-nowrap">Member ID</label>
            <input
              type="text"
              placeholder="Enter member ID"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={memberId}
              onChange={e => setMemberId(e.target.value)}
              required
            />
          </div>
          <div className='flex gap-x-4'>
            <label className="text-lg font-medium text-gray-700 mb-1 text-nowrap">Loan Type</label>
            <input
              type="text"
              placeholder="Enter loan purpose"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
              required
            />
          </div>
          <div className='flex gap-x-4'>
            <label className="text-lg font-medium text-gray-700 mb-1 text-nowrap">Loan Amount</label>
            <input
              type="number"
              placeholder="Enter loan amount"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
          </div>
          <div className='flex gap-x-4'>
            <label className="text-lg font-medium text-gray-700 mb-1 text-nowrap">Repayment Plan</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={paymentSchedule}
              onChange={e => setPaymentSchedule(e.target.value)}
              required
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div className='flex gap-x-4'>
            <label className="text-lg font-medium text-gray-700 mb-1 text-nowrap">Term (Months)</label>
            <input
              type="number"
              placeholder="Enter number of months"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={termMonths}
              onChange={e => setTermMonths(e.target.value)}
              required
            />
          </div>
          <div className='flex gap-x-4'>
            <label className="text-lg font-medium text-gray-700 mb-1 text-nowrap">Interest Rate</label>
            <input
              type="number"
              placeholder="Enter interest rate %"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={interestRate}
              onChange={e => setInterestRate(e.target.value)}
              required
            />
          </div>
          <div className='flex gap-x-4'>
            <label className="text-lg font-medium text-gray-700 mb-1 text-nowrap">Issue Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={issueDate}
              onChange={e => setIssueDate(e.target.value)}
              required
            />
          </div>
          <div className='flex gap-x-4'>
            <label className="text-lg font-medium text-gray-700 mb-1 text-nowrap">Due Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-6 py-1 border border-[#C4C4C4] rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#111827] text-white rounded-lg flex items-center justify-center" disabled={loading}>
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit loan application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLoanModal; 