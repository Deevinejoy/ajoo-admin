import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';

// Define Transaction and Member types based on API response
interface Member {
  id: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  address: string;
  memberId: number;
  membershipStatus: boolean;
  memberPhoto: string;
  dateJoined: string;
  updatedAt: string;
}

interface Transaction {
  id: string;
  date: string;
  type: string;
  recipient: string;
  amount: string;
  status: string;
  paymentMethod: string;
  reference: string;
  paymentCycle: string;
  recipientAssociationId: string;
  createdAt: string;
  updatedAt: string;
  member?: Member;
  loan?: any;
}

const statusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'bg-[#B9FBC0] text-[#0F8B42]';
    case 'pending':
      return 'bg-[#FFF4CC] text-[#806B00]';
    default:
      return '';
  }
};

const AmountText = ({ amount }: { amount: string | number }) => {
  const amt = typeof amount === 'string' ? amount : amount.toString();
  if (amt.startsWith('+')) {
    return <span className="text-green-500">{amt}</span>;
  } else if (amt.startsWith('-')) {
    return <span className="text-red-500">{amt}</span>;
  }
  return <span>{amt}</span>;
};

const RECIPIENT_ASSOCIATION_ID = '9bea0709-6289-4328-b940-963b38b8448c';

const AssTransaction: React.FC = () => {
  const [search, setSearch] = useState('');
  // const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    memberId: '',
    loanId: '',
    transactionType: '',
    amount: '',
    paymentMethod: '',
    reference: '',
    paymentCycle: '',
    recipientAssociationId: RECIPIENT_ASSOCIATION_ID,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Fetch transactions (refactored for refresh)
  const fetchTransactions = () => {
    setLoading(true);
    setError('');
    fetch('https://ajo.nickyai.online/api/v1/admin/transactions', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setTransactions(data.data || []);
        } else {
          setError(data.message || 'Failed to fetch transactions');
        }
      })
      .catch(() => setError('Error fetching transactions'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle form submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    setFormSuccess('');
    // Validate
    if (!form.memberId || !form.transactionType || !form.amount || !form.paymentMethod || !form.reference || !form.paymentCycle || !form.recipientAssociationId) {
      setFormError('All fields except loanId are required');
      setFormLoading(false);
      return;
    }
    try {
      const res = await fetch('https://ajo.nickyai.online/api/v1/admin/transactions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setFormSuccess('Transaction added successfully!');
        setShowModal(false);
        setForm({
          memberId: '',
          loanId: '',
          transactionType: '',
          amount: '',
          paymentMethod: '',
          reference: '',
          paymentCycle: '',
          recipientAssociationId: RECIPIENT_ASSOCIATION_ID,
        });
        fetchTransactions();
      } else {
        setFormError(data.message || 'Failed to add transaction');
      }
    } catch {
      setFormError('Error adding transaction');
    } finally {
      setFormLoading(false);
    }
  };

  // Filter transactions by search
  const filteredTransactions = transactions.filter((t) => {
    const memberName = t.member?.fullName || '';
    return (
      memberName.toLowerCase().includes(search.toLowerCase()) ||
      t.type?.toLowerCase().includes(search.toLowerCase()) ||
      t.id?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-4 md:p-6">
      {/* Modal for adding transaction */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
              disabled={formLoading}
            >
              <span className="text-2xl">&times;</span>
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Member ID</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={form.memberId}
                  onChange={e => setForm(f => ({ ...f, memberId: e.target.value }))}
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Loan ID (optional)</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={form.loanId}
                  onChange={e => setForm(f => ({ ...f, loanId: e.target.value }))}
                  disabled={formLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Transaction Type</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={form.transactionType}
                  onChange={e => setForm(f => ({ ...f, transactionType: e.target.value }))}
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={form.amount}
                  onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Payment Method</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={form.paymentMethod}
                  onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))}
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reference</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={form.reference}
                  onChange={e => setForm(f => ({ ...f, reference: e.target.value }))}
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Payment Cycle</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={form.paymentCycle}
                  onChange={e => setForm(f => ({ ...f, paymentCycle: e.target.value }))}
                  disabled={formLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Recipient Association ID</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3161FF]"
                  value={form.recipientAssociationId}
                  onChange={e => setForm(f => ({ ...f, recipientAssociationId: e.target.value }))}
                  disabled={formLoading}
                  required
                />
              </div>
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              {formSuccess && <div className="text-green-600 text-sm">{formSuccess}</div>}
              <button
                type="submit"
                className="w-full bg-[#3161FF] text-white py-2 rounded-lg font-medium mt-2 disabled:opacity-60"
                disabled={formLoading}
              >
                {formLoading ? 'Adding...' : 'Add Transaction'}
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 md:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-medium">Transactions</h1>
          <p className="text-sm md:text-base text-[#666666]">View and manage all financial transactions for association members</p>
        </div>
        <button
          className="bg-[#3161FF] text-white px-4 md:px-6 py-2 rounded-lg flex items-center gap-x-2 font-medium w-full md:w-auto justify-center md:justify-start text-sm md:text-base"
          onClick={() => setShowModal(true)}
        >
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
        {loading ? (
          <div className="text-center text-gray-400 py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No transactions found</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#E7E7E7]">
                <th className="text-left py-2 pr-4 text-gray-500 font-normal text-sm">Date</th>
                <th className="text-left py-2 pr-4 text-gray-500 font-normal text-sm">Type</th>
                <th className="text-left py-2 pr-4 text-gray-500 font-normal text-sm">Member</th>
                <th className="text-left py-2 pr-4 text-gray-500 font-normal text-sm">Amount</th>
                <th className="text-left py-2 pr-4 text-gray-500 font-normal text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t, index) => (
                <tr key={t.id || index} className="border-b border-[#E7E7E7]">
                  <td className="py-2 pr-4 text-gray-800 text-sm">{t.date || t.createdAt?.slice(0, 10)}</td>
                  <td className="py-2 pr-4 text-gray-800 text-sm">{t.type}</td>
                  <td className="py-2 pr-4 text-gray-800 text-sm">{t.member?.fullName || '-'}</td>
                  <td className="py-2 pr-4 text-sm">
                    <AmountText amount={t.amount} />
                  </td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusStyle(t.status)}`}>{t.status?.toLowerCase()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
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
