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

const Members: React.FC = () => {
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
        navigate(`/members/${memberId}`);
    };

    const renderTableRow = (row: TableRow) => {
        switch (row.type) {
            case 'financial_activity':
                return (
                    <>
                        <td className="py-4 px-6 text-[#373737]">{row.member}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.transactionId}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.date}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.transactionType}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.amount}</td>
                        <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(row.status)}`}>
                                {row.status}
                            </span>
                        </td>
                        <td className="py-4 px-6">
                            <button className="flex justify-between gap-x-4 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                                <span className='font-medium text-lg'>Review</span>
                            </button>
                        </td>
                    </>
                );
            case 'loan_performance':
                return (
                    <>
                        <td className="py-4 px-6 text-[#373737]">{row.member}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.loanId}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.amount}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.issueDate}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.term}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.paymentsMade}</td>
                        <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(row.status)}`}>
                                {row.status}
                            </span>
                        </td>
                        <td className="py-4 px-6">
                            <button className="flex justify-between gap-x-4 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                                <span className='font-medium text-lg'>Review</span>
                            </button>
                        </td>
                    </>
                );
            case 'loan_request':
                return (
                    <>
                        <td className="py-4 px-6 text-[#373737]">{row.member}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.requestDate}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.amount}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.purpose}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.creditScore}</td>
                        <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(row.status)}`}>
                                {row.status}
                            </span>
                        </td>
                        <td className="py-4 px-6">
                            <button className="flex justify-between gap-x-4 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                                <span className='font-medium text-lg'>Review</span>
                            </button>
                        </td>
                    </>
                );
            default:
                return (
                    <>
                        <td className="py-4 px-6 text-[#373737]">{row.member}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.memberId}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.dateJoined}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.activeLoans}</td>
                        <td className="py-4 px-6 text-[#373737]">{row.totalBorrowed}</td>
                        <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(row.status)}`}>
                                {row.status}
                            </span>
                        </td>
                        <td className="py-4 px-6">
                            <button 
                                onClick={() => handleViewMember(row.memberId)}
                                className="flex justify-between gap-x-4 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
                            >
                                <img src="/view.svg" alt="pic" width={18} height={18}/> 
                                <span className='font-medium text-lg'>View</span>
                            </button>
                        </td>
                    </>
                );
        }
    };

    return (
        <div className="p-6 pt-2">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-[#373737]">Total Members</h3>
                            <p className="text-3xl font-semibold">247</p>
                        </div>
                        <div className="self-center">
                            <img src="/briefcase.svg" alt="pic" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-[#373737]">Active Loans</h3>
                            <p className="text-3xl font-semibold">59</p>
                        </div>
                        <div className="self-center">
                            <img src="/people.svg" alt="pic" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-[#373737]">Pending Approvals</h3>
                            <p className="text-3xl font-semibold">12</p>
                        </div>
                        <div className="self-center">
                            <img src="/loans1.svg" alt="pic" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Add Member */}
            <div className="flex justify-between items-center gap-x-4 mb-6">
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
                    className="bg-[#3161FF] text-white px-4 py-2 rounded-lg flex gap-x-2 items-center hover:bg-black w-[195px]"
                >
                    <img src="/plus.svg" alt="pic" width={18} height={18}/>
                    <span>Add member</span>
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#D9D9D9] mb-6">
                <nav className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`pb-4 px-1 ${
                                activeTab === tab
                                    ? 'border-b-2 border-[#3161FF] text-[#3161FF]'
                                    : 'text-gray-500'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Members Table */}
            <div className="bg-white rounded-lg shadow">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#D9D9D9]">
                            {getTableHeaders().map((header, index) => (
                                <th key={index} className="text-left py-4 px-6 text-[#939393] text-lg font-semibold">
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
                <div className="flex items-center justify-between px-6 py-4">
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
            <div className='bg-[#C6C6C82B] mt-8 p-4 rounded-md'>
                <p className="text-black text-xl">
                    Member Detail view 
                </p>
                <p className="text-[#373737] mt-4">
                    Click "view" on any member to see detailed information including complete financial activity ,loan requests and repayment performance
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

export default Members;