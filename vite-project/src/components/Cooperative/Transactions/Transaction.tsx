import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const statusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-[#FFF4CC] text-[#806B00]';
    default:
      return '';
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
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [pagination, setPagination] = useState<{ total: number; page: number; limit: number; totalPages: number }>({ total: 0, page: 1, limit: 10, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    memberId: '',
    loanId: '',
    transactionType: '',
    amount: '',
    paymentMethod: '',
    reference: '',
    paymentCycle: '',
    recipientAssociationId: '',
  });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchTransactions = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    fetch('https://ajo.nickyai.online/api/v1/cooperative/transactions/view', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
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
        const mapped = apiTransactions.map((t): TransactionType => ({
          id: t.id,
          date: t.date || t.createdAt || '',
          type: t.type || '',
          recipient: t.recipient || '',
          amount: t.amount ? `₦${t.amount}` : '',
          status: t.status || '',
        }));
        setTransactions(mapped);
        setPagination(data.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setAddError(null);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://ajo.nickyai.online/api/v1/cooperation/transactions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...addForm,
          amount: Number(addForm.amount),
        }),
      });
      const result = await response.json();
      console.log('Add transaction response:', result);
      if (!response.ok || result.status === 'error') {
        setAddError(result.message || 'Failed to add transaction.');
        setAdding(false);
        return;
      }
      setShowAddModal(false);
      setAddForm({
        memberId: '',
        loanId: '',
        transactionType: '',
        amount: '',
        paymentMethod: '',
        reference: '',
        paymentCycle: '',
        recipientAssociationId: '',
      });
      fetchTransactions();
    } catch {
      setAddError('Network or server error.');
    } finally {
      setAdding(false);
    }
  };

  const filteredTransactions = transactions.filter(t =>
    t.id?.toString().toLowerCase().includes(search.toLowerCase()) ||
    t.type?.toLowerCase().includes(search.toLowerCase()) ||
    t.recipient?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3 md:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-medium">Transactions</h1>
          <p className="text-sm md:text-base text-[#666666]">View and manage all financial transactions for association members</p>
        </div>
        <button className="bg-[#3161FF] text-white px-4 md:px-6 py-2 rounded-lg flex items-center justify-center md:justify-start gap-x-2 font-medium w-full md:w-auto mt-2 md:mt-0 text-sm md:text-base" onClick={() => setShowAddModal(true)}>
          + New Transaction
        </button>
      </div>
      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>
            <form onSubmit={handleAddTransaction} className="space-y-3">
              {addError && <div className="text-red-500 text-sm mb-2">{addError}</div>}
              <div className="flex gap-x-3 items-center mb-4">
                <label className="w-32 text-sm font-medium">Member ID</label>
              <input type="text" className="w-full border p-2 rounded" placeholder="Member ID" required value={addForm.memberId} onChange={e => setAddForm(f => ({ ...f, memberId: e.target.value }))} />
              </div>
              <div className="flex gap-x-3 items-center mb-4">
                <label className="w-32 text-sm font-medium">Loan ID</label>
              <input type="text" className="w-full border p-2 rounded" placeholder="Loan ID" required value={addForm.loanId} onChange={e => setAddForm(f => ({ ...f, loanId: e.target.value }))} />
              </div>
              <div className="flex gap-x-3 items-center mb-4">
                <label className="w-32 text-sm font-medium">Transaction Type</label>
              <input type="text" className="w-full border p-2 rounded" placeholder="Transaction Type" required value={addForm.transactionType} onChange={e => setAddForm(f => ({ ...f, transactionType: e.target.value }))} />
              </div>
              <div className="flex gap-x-3 items-center mb-4">
                <label className="w-32 text-sm font-medium">Amount</label>
              <input type="number" className="w-full border p-2 rounded" placeholder="Amount" required value={addForm.amount} onChange={e => setAddForm(f => ({ ...f, amount: e.target.value }))} />
              </div>
              <div className="flex gap-x-3 items-center mb-4">
                <label className="w-32 text-sm font-medium">Payment Method</label>
              <input type="text" className="w-full border p-2 rounded" placeholder="Payment Method" required value={addForm.paymentMethod} onChange={e => setAddForm(f => ({ ...f, paymentMethod: e.target.value }))} />
              </div>
              <div className="flex gap-x-3 items-center mb-4">
                <label className="w-32 text-sm font-medium">Reference</label>
              <input type="text" className="w-full border p-2 rounded" placeholder="Reference" required value={addForm.reference} onChange={e => setAddForm(f => ({ ...f, reference: e.target.value }))} />
              </div>
              <div className="flex gap-x-3 items-center mb-4">
                <label className="w-32 text-sm font-medium">Payment Cycle</label>
              <input type="text" className="w-full border p-2 rounded" placeholder="Payment Cycle" required value={addForm.paymentCycle} onChange={e => setAddForm(f => ({ ...f, paymentCycle: e.target.value }))} />
              </div>
              <div className="flex gap-x-3 items-center mb-4">
                <label className="w-32 text-sm font-medium">Recipient Assoc. ID</label>
              <input type="text" className="w-full border p-2 rounded" placeholder="Recipient Association ID" required value={addForm.recipientAssociationId} onChange={e => setAddForm(f => ({ ...f, recipientAssociationId: e.target.value }))} />
              </div>
              <div className="flex gap-2 mt-2">
                <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={() => setShowAddModal(false)} disabled={adding}>Cancel</button>
                <button type="submit" className="bg-[#3161FF] text-white px-4 py-2 rounded" disabled={adding}>{adding ? 'Adding...' : 'Add Transaction'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
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
              {(loading ? [] : filteredTransactions).map((t) => (
                <tr key={t.id} className="border-b border-gray-200">
                  <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{t.id}</td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{t.date}</td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{t.type}</td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{t.recipient}</td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{t.amount}</td>
                  <td className="py-3 md:py-4 px-2 md:px-6">
                    <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${statusStyle(t.status)}`}>{t.status}</span>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6 whitespace-nowrap min-w-[90px]">
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
            {Array.from({ length: pagination.totalPages || 1 }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm ${page === pagination.page ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                // onClick handler for page change can be added here
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
