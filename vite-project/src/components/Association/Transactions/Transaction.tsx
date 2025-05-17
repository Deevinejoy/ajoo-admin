import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

const transactions = [
  { date: '2022-01-15', type: 'Repayment', amount: '+₦500,000', status: 'completed' },
  { date: '2022-01-15', type: 'Repayment', amount: '+₦500,000', status: 'completed' },
  { date: '2022-01-15', type: 'Repayment', amount: '+₦500,000', status: 'completed' },
  { date: '2022-01-15', type: 'Disbursement', amount: '-₦500,000', status: 'completed' },
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

const AmountText = ({ amount }: { amount: string }) => {
  if (amount.startsWith('+')) {
    return <span className="text-green-500">{amount}</span>;
  } else if (amount.startsWith('-')) {
    return <span className="text-red-500">{amount}</span>;
  }
  return <span>{amount}</span>;
};

const AssTransaction: React.FC = () => {
  const [search, setSearch] = useState('');
 // const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 md:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-medium">Transactions</h1>
          <p className="text-sm md:text-base text-[#666666]">View and manage all financial transactions for association members</p>
        </div>
        <button className="bg-[#3161FF] text-white px-4 md:px-6 py-2 rounded-lg flex items-center gap-x-2 font-medium w-full md:w-auto justify-center md:justify-start text-sm md:text-base">
          + New Transaction
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-5 mt-4">
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
        <button className="flex items-center gap-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 w-full md:w-auto justify-center">
          <img src="/filter.svg" alt="pic" width={18} height={18}/>
          <p className='text-nowrap'>All</p>
        </button>
      </div>

      {/* Transaction History Card */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mt-2">
        <h2 className="text-base md:text-lg font-medium mb-4">Transaction History</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-[#E7E7E7]">
                <th className="text-left py-2 pr-4 text-gray-500 font-normal text-sm">Date</th>
                <th className="text-left py-2 pr-4 text-gray-500 font-normal text-sm">Type</th>
                <th className="text-left py-2 pr-4 text-gray-500 font-normal text-sm">Amount</th>
                <th className="text-left py-2 pr-4 text-gray-500 font-normal text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => (
                <tr key={index} className="border-b border-[#E7E7E7]">
                  <td className="py-2 pr-4 text-gray-800 text-sm">{t.date}</td>
                  <td className="py-2 pr-4 text-gray-800 text-sm">{t.type}</td>
                  <td className="py-2 pr-4 text-sm">
                    <AmountText amount={t.amount} />
                  </td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusStyle(t.status)}`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-center gap-1 md:gap-2 mt-6 text-xs md:text-sm text-gray-500">
          <span className="text-gray-500">Previous page</span>
          <span className="font-medium text-black">1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>20</span>
          <span className="text-gray-500">Next page</span>
        </div>
      </div>
    </div>
  );
};

export default AssTransaction;
