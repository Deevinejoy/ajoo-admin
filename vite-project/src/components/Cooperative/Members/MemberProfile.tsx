import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MemberProfile: React.FC = () => {
    const { memberId } = useParams<{ memberId: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'transactions' | 'loans'>('transactions');

    // Mock member data
    const memberData = {
        id: memberId,
        name: 'John Doe',
        role: 'Member',
        association: 'Association X',
        joined: '2022-02-13',
        memberNumber: 1,
        loanStatus: 'Active'
    };

    // Mock loan history data
    const loanHistory = [
        { id: 'L001', member: 'John Doe', amount: 'Member', date: '2022-01-15', dueDate: '2022-07-15', status: 'approved' },
        { id: 'L002', member: 'John Doe', amount: 'Member', date: '2022-01-15', dueDate: '2022-07-15', status: 'completed' },
        { id: 'L003', member: 'John Doe', amount: 'Member', date: '2022-01-15', dueDate: '2022-07-15', status: 'approved' },
        { id: 'L004', member: 'John Doe', amount: 'Member', date: '2022-01-15', dueDate: '2022-07-15', status: 'completed' },
    ];

    // Mock transaction history data
    const transactionHistory = [
        { date: '2022-01-15', type: 'Repayment', amount: '₦500,000', status: 'completed' },
        { date: '2022-01-15', type: 'Repayment', amount: '₦500,000', status: 'completed' },
        { date: '2022-01-15', type: 'Repayment', amount: '₦500,000', status: 'completed' },
        { date: '2022-01-15', type: 'Disbursement', amount: '₦500,000', status: 'completed' },
    ];

    const getStatusBadge = (status: string) => {
        switch(status) {
            case 'approved':
                return <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">approved</span>;
            case 'completed':
                return <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">completed</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">{status}</span>;
        }
    };

    const renderPagination = () => {
        return (
            <div className="flex items-center justify-center text-sm space-x-1">
                <span className="text-gray-500">Previous page</span>
                <span className="text-blue-600 font-medium">1</span>
                <span className="text-gray-500">2</span>
                <span className="text-gray-500">3</span>
                <span className="text-gray-500">. . .</span>
                <span className="text-gray-500">20</span>
                <span className="text-gray-500">Next page</span>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="p-8">
                {/* Back button */}
                <button 
                    onClick={() => navigate('/members')}
                    className="text-gray-500 mb-8 flex items-center"
                >
                    ←
                </button>

                <div className="flex">
                    {/* Left sidebar - Member info */}
                    <div className="w-1/4 bg-white rounded-lg shadow-sm p-6 mr-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                            <h2 className="text-xl font-medium">{memberData.name}</h2>
                            <p className="text-gray-500">{memberData.role}</p>
                            <p className="text-gray-500 mt-2">{memberData.association}</p>
                            <p className="text-gray-500 mt-1">Joined: {memberData.joined}</p>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between py-2">
                                <span className="text-gray-600">Member:</span>
                                <span className="font-medium">{memberData.memberNumber}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-600">Loan Status:</span>
                                <span className="text-blue-600">{memberData.loanStatus}</span>
                            </div>
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="w-3/4">
                        {/* Tabs */}
                        <div className="bg-white rounded-t-lg overflow-hidden">
                            <div className="flex">
                                <button 
                                    className={`py-4 px-12 ${activeTab === 'loans' ? 'bg-white' : 'bg-gray-100'}`}
                                    onClick={() => setActiveTab('loans')}
                                >
                                    Loans
                                </button>
                                <button 
                                    className={`py-4 px-12 ${activeTab === 'transactions' ? 'bg-white' : 'bg-gray-100'}`}
                                    onClick={() => setActiveTab('transactions')}
                                >
                                    Transactions
                                </button>
                            </div>
                        </div>

                        {/* Tab content */}
                        <div className="bg-white rounded-b-lg shadow-sm p-6">
                            {activeTab === 'loans' && (
                                <>
                                    <h3 className="text-lg font-medium mb-4">Loan History</h3>
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="text-left text-gray-500 border-b">
                                                <th className="pb-2 font-normal">Loan ID</th>
                                                <th className="pb-2 font-normal">Amount</th>
                                                <th className="pb-2 font-normal">Date</th>
                                                <th className="pb-2 font-normal">Due Date</th>
                                                <th className="pb-2 font-normal">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loanHistory.map((loan, index) => (
                                                <tr key={index} className="border-b">
                                                    <td className="py-3">{loan.member}</td>
                                                    <td className="py-3">{loan.amount}</td>
                                                    <td className="py-3">{loan.date}</td>
                                                    <td className="py-3">{loan.dueDate}</td>
                                                    <td className="py-3">{getStatusBadge(loan.status)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}

                            {activeTab === 'transactions' && (
                                <>
                                    <h3 className="text-lg font-medium mb-4">Transaction History</h3>
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="text-left text-gray-500 border-b">
                                                <th className="pb-2 font-normal">Date</th>
                                                <th className="pb-2 font-normal">Type</th>
                                                <th className="pb-2 font-normal">Amount</th>
                                                <th className="pb-2 font-normal">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactionHistory.map((transaction, index) => (
                                                <tr key={index} className="border-b">
                                                    <td className="py-3">{transaction.date}</td>
                                                    <td className="py-3">{transaction.type}</td>
                                                    <td className="py-3 text-red-500">{transaction.amount}</td>
                                                    <td className="py-3">{getStatusBadge(transaction.status)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}

                            {/* Pagination */}
                            <div className="flex justify-center mt-6">
                                {renderPagination()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberProfile; 