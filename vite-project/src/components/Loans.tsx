import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoanApplicationReviews, { LoanApplication } from './LoanApplicationReviews';
import AddLoanModal from './AddLoanModal';

interface Loan {
    member: string;
    loanId: string;
    amount: string;
    issuedDate: string;
    dueDate: string;
    status: 'Current' | 'Overdue' | 'Defaulted';
}

type TabType = 'Members Loan Breakdown' | 'Loan Application Reviews';

const Loans: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('Members Loan Breakdown');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddLoanOpen, setIsAddLoanOpen] = useState(false);
    const navigate = useNavigate();

    const tabs: TabType[] = ['Members Loan Breakdown', 'Loan Application Reviews'];

    const loans: Loan[] = [
        { member: 'Member 1', loanId: 'LN-5342', amount: '₦600,000', issuedDate: 'Jan 10,2023', dueDate: 'Jun 10,2025', status: 'Current' },
        { member: 'Member 1', loanId: 'LN-5342', amount: '₦600,000', issuedDate: 'Jan 10,2023', dueDate: 'Jun 10,2025', status: 'Overdue' },
        { member: 'Member 1', loanId: 'LN-5342', amount: '₦600,000', issuedDate: 'Jan 10,2023', dueDate: 'Jun 10,2025', status: 'Defaulted' },
        { member: 'Member 1', loanId: 'LN-5342', amount: '₦600,000', issuedDate: 'Jan 10,2023', dueDate: 'Jun 10,2025', status: 'Current' },
        { member: 'Member 1', loanId: 'LN-5342', amount: '₦600,000', issuedDate: 'Jan 10,2023', dueDate: 'Jun 10,2025', status: 'Current' },
        { member: 'Member 1', loanId: 'LN-5342', amount: '₦600,000', issuedDate: 'Jan 10,2023', dueDate: 'Jun 10,2025', status: 'Current' },
    ];

    // Mock data for Loan Application Reviews
    const pendingApplications: LoanApplication[] = [
        { member: 'Member 1', applicationId: 'LN-5342', amount: '₦600,000', purpose: 'Education', appliedOn: 'jun 10,2025', status: 'Pending review' },
        { member: 'Member 1', applicationId: 'LN-5342', amount: '₦600,000', purpose: 'Education', appliedOn: 'jun 10,2025', status: 'Pending review' },
        { member: 'Member 1', applicationId: 'LN-5342', amount: '₦600,000', purpose: 'House', appliedOn: 'Jun 10,2025', status: 'Pending review' },
        { member: 'Member 1', applicationId: 'LN-5342', amount: '₦600,000', purpose: 'House', appliedOn: 'Jun 10,2025', status: 'Pending review' },
        { member: 'Member 1', applicationId: 'LN-5342', amount: '₦600,000', purpose: 'Car', appliedOn: 'Jun 10,2025', status: 'Pending review' },
        { member: 'Member 1', applicationId: 'LN-5342', amount: '₦600,000', purpose: 'Loan', appliedOn: 'Jun 10,2025', status: 'Pending review' },
    ];
    const recentApplications: LoanApplication[] = [
        { member: 'Member 1', applicationId: 'LN-5342', amount: '₦600,000', purpose: 'Education', appliedOn: 'jun 10,2025', reviewedOn: 'jun 10,2025', status: 'Approved' },
        { member: 'Member 1', applicationId: 'LN-5342', amount: '₦600,000', purpose: 'Education', appliedOn: 'jun 10,2025', reviewedOn: 'jun 10,2025', status: 'Approved' },
        { member: 'Member 1', applicationId: 'LN-5342', amount: '₦600,000', purpose: 'Education', appliedOn: 'jun 10,2025', reviewedOn: 'jun 10,2025', status: 'Rejected' },
        { member: 'Member 1', applicationId: 'LN-5342', amount: '₦600,000', purpose: 'Education', appliedOn: 'jun 10,2025', reviewedOn: 'jun 10,2025', status: 'Rejected' },
        { member: 'Member 1', applicationId: 'LN-5342', amount: '₦600,000', purpose: 'Education', appliedOn: 'jun 10,2025', reviewedOn: 'jun 10,2025', status: 'Rejected' },
        { member: 'Member 1', applicationId: 'LN-5342', amount: '₦600,000', purpose: 'Education', appliedOn: 'jun 10,2025', reviewedOn: 'jun 10,2025', status: 'Rejected' },
    ];

    const handleViewLoan = (loanId: string) => {
        navigate(`/loans/${loanId}`);
    };

    return (
        <div className="p-6">
            {/* Add Loan Modal */}
            <AddLoanModal isOpen={isAddLoanOpen} onClose={() => setIsAddLoanOpen(false)} />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-medium">Loans</h1>
                <p className="text-[#666666]">Manage all cooperative loans</p>
            </div>

            {/* Search and Actions */}
            <div className="flex justify-between items-center gap-x-4 mb-6">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search by members name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3161FF]"
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <button
                    className="flex items-center gap-x-2 bg-[#3161FF] text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    onClick={() => setIsAddLoanOpen(true)}
                >
                    <Plus className="w-5 h-5" />
                    <span>New loan</span>
                </button>
                <button className="flex items-center gap-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-300 mb-6">
                <div className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 px-1 ${
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
                <LoanApplicationReviews
                    pending={pendingApplications}
                    recent={recentApplications}
                    onView={handleViewLoan}
                />
            ) : (
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium">Active Loans</h2>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-4 px-6 text-[#939393] font-medium">Member</th>
                                <th className="text-left py-4 px-6 text-[#939393] font-medium">Loan ID</th>
                                <th className="text-left py-4 px-6 text-[#939393] font-medium">Amount</th>
                                <th className="text-left py-4 px-6 text-[#939393] font-medium">Issued Date</th>
                                <th className="text-left py-4 px-6 text-[#939393] font-medium">Due Date</th>
                                <th className="text-left py-4 px-6 text-[#939393] font-medium">Repayment Status</th>
                                <th className="text-left py-4 px-6 text-[#939393] font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-4 px-6 text-[#373737]">{loan.member}</td>
                                    <td className="py-4 px-6 text-[#373737]">{loan.loanId}</td>
                                    <td className="py-4 px-6 text-[#373737]">{loan.amount}</td>
                                    <td className="py-4 px-6 text-[#373737]">{loan.issuedDate}</td>
                                    <td className="py-4 px-6 text-[#373737]">{loan.dueDate}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-sm ${(() => {
                                            switch (loan.status) {
                                                case 'Current':
                                                    return 'bg-[#B9FBC0] text-[#0F8B42]';
                                                case 'Overdue':
                                                    return 'bg-[#FFF4CC] text-[#806B00]';
                                                case 'Defaulted':
                                                    return 'bg-[#FFE5E5] text-[#D30000]';
                                                default:
                                                    return 'bg-[#B9FBC0] text-[#0F8B42]';
                                            }
                                        })()}`}>
                                            {loan.status === 'Overdue' ? 'Overdue (13 days)' : loan.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button 
                                            onClick={() => handleViewLoan(loan.loanId)}
                                            className="flex items-center gap-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
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
                        <button className="text-gray-600 hover:text-gray-900">Previous page</button>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, '...', 20].map((page, index) => (
                                <button
                                    key={index}
                                    className={`px-3 py-1 rounded ${
                                        page === 1 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button className="text-gray-600 hover:text-gray-900">Next page</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Loans; 