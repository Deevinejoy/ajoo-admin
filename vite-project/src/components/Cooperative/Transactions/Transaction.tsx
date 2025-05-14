import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const transactions = [
  { id: 1, date: '2022-01-15', type: 'Repayment', recipient: 'John Doe', amount: '₦20,000', status: 'completed' },
  { id: 2, date: '2022-01-15', type: 'Repayment', recipient: 'John Doe', amount: '₦20,000', status: 'completed' },
  { id: 3, date: '2022-01-15', type: 'Entrance Fee', recipient: 'Cooperative', amount: '₦20,000', status: 'pending' },
  { id: 4, date: '2022-01-15', type: 'Disbursement', recipient: 'John Doe', amount: '₦20,000', status: 'completed' },
  { id: 5, date: '2022-01-15', type: 'Repayment', recipient: 'John Doe', amount: '₦20,000', status: 'completed' },
];

const statusStyle = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-[#B9FBC0] text-[#0F8B42]';
    case 'pending':
      return 'bg-[#FFF4CC] text-[#806B00]';
    default:
      return '';
  }
};

const Transaction: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3 md:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-medium">Transactions</h1>
          <p className="text-sm md:text-base text-[#666666]">View and manage all financial transactions for association members</p>
        </div>
        <button className="bg-[#3161FF] text-white px-4 md:px-6 py-2 rounded-lg flex items-center justify-center md:justify-start gap-x-2 font-medium w-full md:w-auto mt-2 md:mt-0 text-sm md:text-base">
          + New Transaction
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 mb-5 md:mb-7 mt-2 md:mt-4">
        <div className="relative flex-grow w-full">
          <img src="/search.png" alt="pic" width={18} height={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
          <input
            type="text"
            placeholder="Search transactions, ID Member or type"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3161FF]"
          />
        </div>
        <button className="flex items-center gap-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 w-full md:w-auto justify-center whitespace-nowrap">
          <img src="/filter.svg" alt="pic" width={18} height={18}/>
          <p className='text-sm md:text-base'>All</p>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mt-2">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">ID</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Date</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Type</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Recipient</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Amount</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Status</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-gray-200">
                  <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{t.id}</td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{t.date}</td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{t.type}</td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{t.recipient}</td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{t.amount}</td>
                  <td className="py-3 md:py-4 px-2 md:px-6">
                    <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${statusStyle(t.status)}`}>{t.status}</span>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6">
                    <button
                      className="flex items-center gap-x-1 md:gap-x-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200"
                      onClick={() => navigate(`/transactions/${t.id}`)}
                    >
                      <img src="/view.svg" alt="view" width={16} height={16} className="md:w-[18px] md:h-[18px]" />
                      <span className="font-medium text-xs md:text-sm">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 p-2 md:p-4 mt-4">
          <span className="text-gray-600 text-xs md:text-sm order-2 md:order-1">Previous page</span>
          <div className="flex items-center gap-1 md:gap-2 order-1 md:order-2">
            {[1, 2, 3, '...', 20].map((page, index) => (
              <button
                key={index}
                className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm ${page === 1 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
          </div>
          <span className="text-gray-600 text-xs md:text-sm order-3 md:order-3">Next page</span>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
