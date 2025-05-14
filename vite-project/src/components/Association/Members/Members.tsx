import { Search } from 'lucide-react';
import React, { useState } from 'react';
import AddMemberModal from './AddMemberModal';
import { useNavigate } from 'react-router-dom';

type AllMembersRow = {
    type: 'all_members';
    member: string;
    memberId: string;
    dateJoined: string;
    activeLoans: string;
    totalBorrowed: string;
    status: string;
};

type LoanRequestRow = {
    type: 'loan_request';
    member: string;
    requestDate: string;
    amount: string;
    purpose: string;
    creditScore: string;
    status: string;
};

type FinancialActivityRow = {
    type: 'financial_activity';
    member: string;
    transactionId: string;
    date: string;
    transactionType: string;
    amount: string;
    status: string;
};

type LoanPerformanceRow = {
    type: 'loan_performance';
    member: string;
    loanId: string;
    amount: string;
    issueDate: string;
    term: string;
    paymentsMade: string;
    status: string;
};

type TableRow = AllMembersRow | LoanRequestRow | FinancialActivityRow | LoanPerformanceRow;

const AssMembers: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Financial Activity');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const tabs = ['All Members', 'Loan Request', 'Financial Activity', 'Loan Performance'];

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Table headers based on active tab
    const getTableHeaders = () => {
        switch (activeTab) {
            case 'Loan Request':
                return ['Member', 'Request Date', 'Amount', 'Purpose', 'Credit Score', 'Status', 'Actions'];
            case 'Financial Activity':
                return ['Member', 'Transaction ID', 'Date', 'Type', 'Amount', 'Status', 'Actions'];
            case 'Loan Performance':
                return ['Member', 'Loan ID', 'Amount', 'Issue Date', 'Term', 'Payments made', 'Status', 'Actions'];
            case 'All Members':
                return ['Member', 'Member ID', 'Date joined', 'Active loans', 'Total Borrowed', 'Repayment Status', 'Actions'];
            default:
                return ['Member', 'Member ID', 'Date joined', 'Active loans', 'Total Borrowed', 'Repayment Status', 'Actions'];
        }
    };

    // Table data based on active tab
    const getTableData = (): TableRow[] => {
        switch (activeTab) {
            case 'Financial Activity':
                return Array(6).fill(null).map(() => ({
                    type: 'financial_activity',
                    member: 'Member 1',
                    transactionId: 'Trx--7683',
                    date: 'Jan 10,2023',
                    transactionType: 'Repayment',
                    amount: 'N500,000',
                    status: 'Completed'
                }));
            case 'Loan Performance':
                return Array(6).fill(null).map(() => ({
                    type: 'loan_performance',
                    member: 'Member 1',
                    loanId: 'LN-5673',
                    amount: 'N500,000',
                    issueDate: 'Jan 10,2023',
                    term: '1 year',
                    paymentsMade: '2/12',
                    status: 'Current'
                }));
            case 'Loan Request':
                return Array(6).fill(null).map(() => ({
                    type: 'loan_request',
                    member: 'Member 1',
                    requestDate: 'Jan 10,2023',
                    amount: 'N1,000,00',
                    purpose: 'Home repair',
                    creditScore: '720',
                    status: 'New'
                }));
            default:
                return Array(6).fill(null).map(() => ({
                    type: 'all_members',
                    member: 'Member 1',
                    memberId: 'MOD234',
                    dateJoined: 'Jan 10,2023',
                    activeLoans: '1',
                    totalBorrowed: '₦1,000,000',
                    status: 'Good'
                }));
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return 'bg-[#B9FBC0] text-[#0F8B42]';
            case 'new':
                return 'bg-[#E5E7EB] text-[#374151]';
            case 'good':
                return 'bg-[#B9FBC0] text-[#0F8B42]';
            case 'completed':
                return 'bg-[#B9FBC0] text-[#0F8B42]';
            case 'current':
                return 'bg-[#B9FBC0] text-[#0F8B42]';
            default:
                return 'bg-[#B9FBC0] text-[#0F8B42]';
        }
    };

    const handleViewMember = (memberId: string) => {
        navigate(`/association/members/${memberId}`);
    };

    const renderTableRow = (row: TableRow) => {
        switch (row.type) {
            case 'financial_activity':
                return (
                    <>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.member}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.transactionId}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.date}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.transactionType}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.amount}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(row.status)}`}>
                                {row.status}
                            </span>
                        </td>
                        <td className="py-3 md:py-4 px-2 md:px-6">
                            <button className="flex items-center gap-1 md:gap-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200">
                                <span className='font-medium text-xs md:text-sm'>Review</span>
                            </button>
                        </td>
                    </>
                );
            case 'loan_performance':
                return (
                    <>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.member}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.loanId}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.amount}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.issueDate}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.term}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.paymentsMade}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(row.status)}`}>
                                {row.status}
                            </span>
                        </td>
                        <td className="py-3 md:py-4 px-2 md:px-6">
                            <button className="flex items-center gap-1 md:gap-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200">
                                <span className='font-medium text-xs md:text-sm'>Review</span>
                            </button>
                        </td>
                    </>
                );
            case 'loan_request':
                return (
                    <>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.member}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.requestDate}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.amount}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.purpose}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.creditScore}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(row.status)}`}>
                                {row.status}
                            </span>
                        </td>
                        <td className="py-3 md:py-4 px-2 md:px-6">
                            <button className="flex items-center gap-1 md:gap-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200">
                                <span className='font-medium text-xs md:text-sm'>Review</span>
                            </button>
                        </td>
                    </>
                );
            default:
                return (
                    <>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.member}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.memberId}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.dateJoined}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.activeLoans}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{row.totalBorrowed}</td>
                        <td className="py-3 md:py-4 px-2 md:px-6">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(row.status)}`}>
                                {row.status}
                            </span>
                        </td>
                        <td className="py-3 md:py-4 px-2 md:px-6">
                            <button 
                                onClick={() => handleViewMember(row.memberId)}
                                className="flex items-center gap-1 md:gap-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200"
                            >
                                <img src="/view.svg" alt="pic" width={16} height={16} className="md:w-[18px] md:h-[18px]"/> 
                                <span className='font-medium text-xs md:text-sm'>View</span>
                            </button>
                        </td>
                    </>
                );
        }
    };

    return (
        <div className="p-4 md:p-6 pt-2">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-[#373737] text-sm md:text-base">Total Members</h3>
                            <p className="text-xl md:text-3xl font-semibold">247</p>
                        </div>
                        <div className="self-center">
                            <img src="/briefcase.svg" alt="pic" className="w-5 h-5 md:w-auto md:h-auto" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-[#373737] text-sm md:text-base">Active Loans</h3>
                            <p className="text-xl md:text-3xl font-semibold">59</p>
                        </div>
                        <div className="self-center">
                            <img src="/people.svg" alt="pic" className="w-5 h-5 md:w-auto md:h-auto" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-[#373737] text-sm md:text-base">Pending Approvals</h3>
                            <p className="text-xl md:text-3xl font-semibold">12</p>
                        </div>
                        <div className="self-center">
                            <img src="/loans1.svg" alt="pic" className="w-5 h-5 md:w-auto md:h-auto" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Add Member */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search members..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3161FF]"
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#3161FF] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-x-2 hover:bg-black w-full md:w-auto"
                >
                    <img src="/plus.svg" alt="pic" width={18} height={18}/>
                    <span>Add member</span>
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#D9D9D9] mb-4 md:mb-6 overflow-x-auto">
                <nav className="flex gap-4 md:gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`pb-2 md:pb-4 px-1 whitespace-nowrap text-sm md:text-base ${
                                activeTab === tab
                                    ? 'border-b-2 border-[#3161FF] text-[#3161FF]'
                                    : 'text-[#939393]'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Members Table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full min-w-[700px]">
                    <thead>
                        <tr className="border-b border-[#D9D9D9]">
                            {getTableHeaders().map((header, index) => (
                                <th key={index} className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-lg">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {getTableData().map((row, index) => (
                            <tr key={index} className="border-b border-[#D9D9D9]">
                                {renderTableRow(row)}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex flex-col md:flex-row items-center justify-between p-2 md:p-4 text-xs md:text-sm overflow-x-auto">
                    <button className="text-[#939393] mb-2 md:mb-0">Previous page</button>
                    <div className="flex items-center gap-1 md:gap-2">
                        {[1, 2, 3, '...', 20].map((page, index) => (
                            <button
                                key={index}
                                className={`px-2 md:px-3 py-1 rounded ${
                                    page === 1 ? 'bg-[#3161FF] text-white' : 'text-[#939393] hover:bg-gray-100'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button className="text-[#939393] mt-2 md:mt-0">Next page</button>
                </div>
            </div>
            <div className='bg-[#C6C6C82B] mt-4 md:mt-8 p-3 md:p-4 rounded-md'>
                <p className="text-black text-base md:text-xl">
                    Member Detail view 
                </p>
                <p className="text-[#373737] mt-2 md:mt-4 text-sm md:text-base">
                    Click "view" on any member to see detailed information including complete financial activity, loan requests and repayment performance
                </p>
            </div>

            {/* Add Member Modal */}
            <AddMemberModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};

export default AssMembers;