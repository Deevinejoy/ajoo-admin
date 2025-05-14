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
    <div className="p-4 md:p-8">
      {/* Add Loan Modal */}
      <AddLoanModal isOpen={isAddLoanOpen} onClose={() => setIsAddLoanOpen(false)} />

      <div className="mb-1 md:mb-2">
        <h1 className="text-xl md:text-2xl font-medium">Loans</h1>
        <p className="text-[#666666] text-sm md:text-base">Manage all cooperative loans</p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row md:justify-between my-4 md:my-6 gap-3 md:gap-4">
        <div className="w-full md:w-1/2 relative">
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
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2 md:mt-0">
          <button 
            className="bg-[#3161FF] text-white px-4 md:px-6 py-2 rounded-lg flex items-center justify-center gap-2 w-full md:w-auto"
            onClick={() => setIsAddLoanOpen(true)}
          >
            <span className="text-lg">+</span>
            Add loan
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-md flex items-center justify-center gap-2 w-full md:w-auto">
         <img src="/filter.svg" alt="filter"/>
            Filter
          </button>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-[#939393]">
              <th className="px-2 md:px-4 py-3 md:py-4 font-normal text-xs md:text-sm">ID</th>
              <th className="px-2 md:px-4 py-3 md:py-4 font-normal text-xs md:text-sm">Member</th>
              <th className="px-2 md:px-4 py-3 md:py-4 font-normal text-xs md:text-sm">Association</th>
              <th className="px-2 md:px-4 py-3 md:py-4 font-normal text-xs md:text-sm">Amount</th>
              <th className="px-2 md:px-4 py-3 md:py-4 font-normal text-xs md:text-sm">Date</th>
              <th className="px-2 md:px-4 py-3 md:py-4 font-normal text-xs md:text-sm">Due Date</th>
              <th className="px-2 md:px-4 py-3 md:py-4 font-normal text-xs md:text-sm">Status</th>
              <th className="px-2 md:px-4 py-3 md:py-4 font-normal text-xs md:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td className="px-2 md:px-4 py-3 md:py-4 text-xs md:text-sm">{loan.id}</td>
                <td className="px-2 md:px-4 py-3 md:py-4 text-xs md:text-sm">{loan.member}</td>
                <td className="px-2 md:px-4 py-3 md:py-4 text-xs md:text-sm">{loan.association}</td>
                <td className="px-2 md:px-4 py-3 md:py-4 text-xs md:text-sm">{loan.amount}</td>
                <td className="px-2 md:px-4 py-3 md:py-4 text-xs md:text-sm">{loan.date}</td>
                <td className="px-2 md:px-4 py-3 md:py-4 text-xs md:text-sm">{loan.dueDate}</td>
                <td className="px-2 md:px-4 py-3 md:py-4">{getStatusBadge(loan.status)}</td>
                <td className="px-2 md:px-4 py-3 md:py-4">
              
                  <button
                    onClick={() => handleViewLoan(loan.id)}
                   className="flex items-center gap-1 md:gap-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200"
                  >
                      <img src="/view.svg" alt="pic" width={16} height={16} className="md:w-[18px] md:h-[18px]"/> 
                      <span className='font-medium text-xs md:text-sm'>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-center py-4 border-t border-gray-200 text-xs md:text-sm overflow-x-auto">
          <span className="text-[#939393] mx-1 md:mx-4 mb-2 md:mb-0">Previous page</span>
          <div className="flex space-x-1">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`px-2 ${page === 1 ? 'text-blue-600' : 'text-[#939393]'}`}
              >
                {page}
              </button>
            ))}
            <span className="text-[#939393]">...</span>
            <button className="px-2 text-[#939393]">20</button>
          </div>
          <span className="text-[#939393] mx-1 md:mx-4 mt-2 md:mt-0">Next page</span>
        </div>
      </div>
    </div>
  );
};

export default Loans; 