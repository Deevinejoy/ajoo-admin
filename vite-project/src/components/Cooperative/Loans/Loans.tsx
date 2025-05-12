import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddLoanModal from './AddLoanModal';

interface Loan {
  id: string;
  member: string;
  association: string;
  amount: string;
  date: string;
  dueDate: string;
  status: string;
}

const Loans: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddLoanOpen, setIsAddLoanOpen] = useState(false);
  const navigate = useNavigate();

  // Mock data for loans
  const loans: Loan[] = [
    { id: '1', member: 'John Doe', association: 'Association X', amount: '₦20,000', date: '2022-01-15', dueDate: '2022-04-25', status: 'approved' },
    { id: '2', member: 'John Doe', association: 'Association X', amount: '₦20,000', date: '2022-01-15', dueDate: '2022-04-25', status: 'completed' },
    { id: '3', member: 'John Doe', association: 'Association X', amount: '₦20,000', date: '2022-01-15', dueDate: '2022-04-25', status: 'pending' },
    { id: '4', member: 'John Doe', association: 'Association X', amount: '₦20,000', date: '2022-01-15', dueDate: '---', status: 'rejected' },
    { id: '5', member: 'John Doe', association: 'Association X', amount: '₦20,000', date: '2022-01-15', dueDate: '2022-04-25', status: 'pending' },
  ];

  const handleViewLoan = (loanId: string) => {
    navigate(`/loans/${loanId}`);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">approved</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">completed</span>;
      case 'pending':
        return <span className="px-2.5 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">pending</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">rejected</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">{status}</span>;
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      {/* Add Loan Modal */}
      <AddLoanModal isOpen={isAddLoanOpen} onClose={() => setIsAddLoanOpen(false)} />

      <div className="mb-1">
        <h1 className="text-2xl font-semibold">Loans</h1>
        <p className="text-gray-500 text-sm">Manage all cooperative loans</p>
      </div>

      {/* Search and Actions */}
      <div className="flex justify-between my-6">
        <div className="w-1/2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search members..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            onClick={() => setIsAddLoanOpen(true)}
          >
            <span className="text-lg">+</span>
            Add loan
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-md flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="p-4 font-normal">ID</th>
              <th className="p-4 font-normal">Member</th>
              <th className="p-4 font-normal">Association</th>
              <th className="p-4 font-normal">Amount</th>
              <th className="p-4 font-normal">Date</th>
              <th className="p-4 font-normal">Due Date</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td className="p-4">{loan.id}</td>
                <td className="p-4">{loan.member}</td>
                <td className="p-4">{loan.association}</td>
                <td className="p-4">{loan.amount}</td>
                <td className="p-4">{loan.date}</td>
                <td className="p-4">{loan.dueDate}</td>
                <td className="p-4">{getStatusBadge(loan.status)}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleViewLoan(loan.id)}
                    className="inline-flex items-center gap-2 px-4 py-1 bg-gray-100 rounded"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-center py-4 border-t border-gray-200">
          <span className="text-gray-500 mx-4">Previous page</span>
          <div className="flex space-x-1">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`px-2 ${page === 1 ? 'text-blue-600' : 'text-gray-500'}`}
              >
                {page}
              </button>
            ))}
            <span className="text-gray-500">. . .</span>
            <button className="px-2 text-gray-500">20</button>
          </div>
          <span className="text-gray-500 mx-4">Next page</span>
        </div>
      </div>
    </div>
  );
};

export default Loans; 