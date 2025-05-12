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

const AssTransaction: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-medium">Transactions</h1>
          <p className="text-[#666666]">View and manage all financial transactions for association members</p>
        </div>
        <button className="bg-[#3161FF] text-white px-6 py-2 rounded-lg flex items-center gap-x-2 font-medium">
          + New Transaction
        </button>
      </div>
      <div className="flex items-center gap-4 mb-7 mt-4">
        <div className="relative flex-grow">
          <img src="/search.png" alt="pic" width={18} height={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
          <input
            type="text"
            placeholder="Search transactions, ID Member or type"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3161FF]"
          />
        </div>
        <button className="flex items-center gap-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
          <img src="/filter.svg" alt="pic" width={18} height={18}/>
          <p className='w-full text-nowrap'>All</p>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mt-2">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6 text-[#939393] font-medium">ID</th>
              <th className="text-left py-4 px-6 text-[#939393] font-medium">Date</th>
              <th className="text-left py-4 px-6 text-[#939393] font-medium">Type</th>
              <th className="text-left py-4 px-6 text-[#939393] font-medium">Recipient</th>
              <th className="text-left py-4 px-6 text-[#939393] font-medium">Amount</th>
              <th className="text-left py-4 px-6 text-[#939393] font-medium">Status</th>
              <th className="text-left py-4 px-6 text-[#939393] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-gray-200">
                <td className="py-4 px-6 text-[#373737]">{t.id}</td>
                <td className="py-4 px-6 text-[#373737]">{t.date}</td>
                <td className="py-4 px-6 text-[#373737]">{t.type}</td>
                <td className="py-4 px-6 text-[#373737]">{t.recipient}</td>
                <td className="py-4 px-6 text-[#373737]">{t.amount}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm ${statusStyle(t.status)}`}>{t.status}</span>
                </td>
                <td className="py-4 px-6">
                  <button
                    className="flex items-center gap-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
                    onClick={() => navigate(`/transactions/${t.id}`)}
                  >
                    <img src="/view.svg" alt="view" width={18} height={18} />
                    <span className="font-medium">View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex items-center justify-between p-4">
          <span className="text-gray-600">Previous page</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, '...', 20].map((page, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded ${page === 1 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
          </div>
          <span className="text-gray-600">Next page</span>
        </div>
      </div>
    </div>
  );
};

export default AssTransaction;
