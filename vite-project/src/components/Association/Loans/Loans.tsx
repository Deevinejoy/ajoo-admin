import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoanApplicationReviews from './LoanApplicationReviews';
import AddLoanModal from './AddLoanModal';

interface Loan {
    id: string;
    loanId: string;
    amount: string;
    issueDate: string;
    dueDate: string;
    repaymentStatus: string;
    member?: {
        fullName: string;
    };
}

type TabType = 'Members Loan Breakdown' | 'Loan Application Reviews';

const AssLoans: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('Members Loan Breakdown');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddLoanOpen, setIsAddLoanOpen] = useState(false);
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const tabs: TabType[] = ['Members Loan Breakdown', 'Loan Application Reviews'];

    useEffect(() => {
        const fetchLoans = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('https://ajo.nickyai.online/api/v1/admin/loans', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch loans');
                const data = await response.json();
                setLoans(data.data.loans || []);
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };
        fetchLoans();
    }, []);

    const handleViewLoan = (id: string) => {
        navigate(`/association/loans/${id}`);
    };

    const handleViewApplication = (applicationId: string) => {
        navigate(`/association/loan-applications/${applicationId}`);
    };

    return (
        <div className="p-3 md:p-6">
            {/* Add Loan Modal */}
            <AddLoanModal isOpen={isAddLoanOpen} onClose={() => setIsAddLoanOpen(false)} />

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0 mb-4 md:mb-6">
                <h1 className="text-xl md:text-2xl font-medium">Loans</h1>
                <p className="text-sm md:text-base text-[#666666]">Manage all cooperative loans</p>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col md:flex-row gap-3 md:justify-between md:items-center md:gap-x-4 mb-4 md:mb-6">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder="Search by members name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3161FF]"
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <div className="flex gap-3">
                    <button
                        className="flex items-center justify-center gap-x-2 bg-[#3161FF] text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto"
                        onClick={() => setIsAddLoanOpen(true)}
                    >
                        <Plus className="w-5 h-5" />
                        <span>New loan</span>
                    </button>
                    <button className="flex items-center justify-center gap-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 w-full md:w-auto">
                        <Filter className="w-5 h-5" />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-300 mb-4 md:mb-6 overflow-x-auto">
                <div className="flex gap-4 md:gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 md:pb-4 px-1 whitespace-nowrap text-sm md:text-base ${
                                activeTab === tab
                                    ? 'border-b-2 border-[#3161FF] text-[#3161FF]'
                                    : 'text-gray-500'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'Loan Application Reviews' ? (
                <LoanApplicationReviews onView={handleViewApplication} />
            ) : (
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <div className="p-3 md:p-4 border-b border-gray-200">
                        <h2 className="text-base md:text-lg font-medium">Active Loans</h2>
                    </div>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="p-4 text-center text-gray-500">Loading loans...</div>
                        ) : error ? (
                            <div className="p-4 text-center text-red-500">{error}</div>
                        ) : (
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Member</th>
                                    <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Loan ID</th>
                                    <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Amount</th>
                                    <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Issued Date</th>
                                    <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Due Date</th>
                                    <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Repayment Status</th>
                                    <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans.length === 0 ? (
                                    <tr><td colSpan={7} className="text-center py-6 text-gray-400">No loans found.</td></tr>
                                ) : (
                                loans.filter(loan => {
                                    const memberName = loan.member?.fullName || '';
                                    const loanId = loan.loanId || '';
                                    return (
                                        memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        loanId.toLowerCase().includes(searchQuery.toLowerCase())
                                    );
                                }).map((loan, index) => (
                                    <tr key={loan.id || index} className="border-b border-gray-200">
                                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{loan.member?.fullName || '-'}</td>
                                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{loan.loanId}</td>
                                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">₦{Number(loan.amount).toLocaleString()}</td>
                                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{loan.issueDate ? new Date(loan.issueDate).toLocaleDateString() : '-'}</td>
                                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{loan.dueDate ? new Date(loan.dueDate).toLocaleDateString() : '-'}</td>
                                        <td className="py-3 md:py-4 px-2 md:px-6">
                                    <span className={`px-2 md:px-3 py-1 rounded-full text-xs ${(() => {
                                        switch (loan.repaymentStatus) {
                                            case 'pending':
                                                return 'bg-[#FFF4CC] text-[#806B00]';
                                            case 'overdue':
                                                return 'bg-[#FFE5E5] text-[#D30000]';
                                            case 'current':
                                                return 'bg-[#B9FBC0] text-[#0F8B42]';
                                            default:
                                                return 'bg-[#B9FBC0] text-[#0F8B42]';
                                        }
                                    })()}`}>
                                        {loan.repaymentStatus ? loan.repaymentStatus.charAt(0).toUpperCase() + loan.repaymentStatus.slice(1) : '-'}
                                    </span>
                                </td>
                                <td className="py-3 md:py-4 px-2 md:px-6">
                                    <button 
                                        onClick={() => handleViewLoan(loan.id)}
                                        className="flex items-center gap-1 md:gap-x-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200"
                                    >
                                        <img src="/view.svg" alt="view" width={16} height={16} className="md:w-[18px] md:h-[18px]" />
                                        <span className="font-medium text-xs md:text-sm">View</span>
                                    </button>
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </table>
                )}
            </div>
            {/* Pagination */}
            <div className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 text-xs md:text-sm">
                <button className="text-gray-600 hover:text-gray-900 mb-2 md:mb-0">Previous page</button>
                <div className="flex items-center gap-1 md:gap-2">
                    {[1, 2, 3, '...', 20].map((page, index) => (
                        <button
                            key={index}
                            className={`px-2 md:px-3 py-1 rounded ${
                                page === 1 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button className="text-gray-600 hover:text-gray-900 mt-2 md:mt-0">Next page</button>
            </div>
        </div>
    )}
</div>
);
};

export default AssLoans; 