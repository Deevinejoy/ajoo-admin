import { ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface MemberData {
  id: string;
  fullName: string;
  association: string;
  dateJoined: string;
  phoneNumber: string;
  email: string;
  address: string;
  membershipStatus: boolean;
}

interface LoanHistory {
  id: string;
  amount: string;
  date: string;
  dueDate: string;
  status: string;
}

interface TransactionHistory {
  date: string;
  type: string;
  amount: string;
  status: string;
}

// Interface for fallback member data from the main members list
interface FallbackMember {
  id: string;
  fullName: string;
  association: string;
  dateJoined: string;
  loanStatus: string;
  attendancePercentage: string;
  phoneNumber: string;
  email: string;
}

const MemberProfile: React.FC = () => {
    const { memberId } = useParams<{ memberId: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'transactions' | 'loans'>('transactions');
    const [memberData, setMemberData] = useState<MemberData | null>(null);
    const [loanHistory, setLoanHistory] = useState<LoanHistory[]>([]);
    const [transactionHistory, setTransactionHistory] = useState<TransactionHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMemberData = async () => {
            if (!memberId) return;
            
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem('token');
                
                // Try the individual member endpoint
                const response = await fetch(`https://ajo.nickyai.online/api/v1/cooperative/members/${memberId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                
                if (response.ok) {
                    const result = await response.json();
                    if (result.data?.member) {
                        setMemberData(result.data.member);
                        setLoanHistory(result.data.loanHistory || []);
                        setTransactionHistory(result.data.transactionHistory || []);
                        return;
                    }
                }
                
                // If individual endpoint fails, fetch from main members list and filter
                const fallbackResponse = await fetch('https://ajo.nickyai.online/api/v1/cooperative/members/view', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                
                if (!fallbackResponse.ok) {
                    throw new Error('Failed to fetch member data');
                }
                
                const fallbackResult = await fallbackResponse.json();
                const data = fallbackResult.data;
                
                if (data?.members) {
                    const member = data.members.find((m: FallbackMember) => m.id === memberId);
                    if (member) {
                        setMemberData(member);
                        setLoanHistory([]);
                        setTransactionHistory([]);
                    } else {
                        throw new Error('Member not found');
                    }
                } else {
                    throw new Error('No members data available');
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Error fetching member data';
                setError(errorMessage);
                console.error('Error fetching member data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMemberData();
    }, [memberId]);

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
            <div className="flex items-center justify-center text-xs md:text-sm space-x-1 overflow-x-auto">
                <span className="text-[#939393]">Previous page</span>
                <span className="text-blue-600 font-medium">1</span>
                <span className="text-[#939393]">2</span>
                <span className="text-[#939393]">3</span>
                <span className="text-[#939393]">...</span>
                <span className="text-[#939393]">20</span>
                <span className="text-[#939393]">Next page</span>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen p-4 md:p-8">
                <button 
                    onClick={() => navigate('/members')}
                    className="text-[#373737] mb-4 md:mb-8 flex items-center"
                >
                     <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center text-gray-500">Loading member data...</div>
            </div>
        );
    }

    if (error || !memberData) {
        return (
            <div className="min-h-screen p-4 md:p-8">
                <button 
                    onClick={() => navigate('/members')}
                    className="text-[#373737] mb-4 md:mb-8 flex items-center"
                >
                     <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center text-red-500">
                    {error || 'Member not found'}
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md block mx-auto"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="p-4 md:p-8">
                {/* Back button */}
                <button 
                    onClick={() => navigate('/members')}
                    className="text-[#373737] mb-4 md:mb-8 flex items-center"
                >
                     <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    {/* Left sidebar - Member info */}
                    <div className="w-full md:w-1/4 bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-0">
                        <div className="flex flex-col items-center mb-4 md:mb-6">
                            <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-full mb-3 md:mb-4"></div>
                            <h2 className="text-lg md:text-xl font-medium">{memberData.fullName}</h2>
                            <p className="text-[#939393] text-sm md:text-base">Member</p>
                            <p className="text-[#939393] text-sm md:text-base mt-1 md:mt-2">{memberData.association}</p>
                            <p className="text-[#939393] text-sm md:text-base mt-1">Joined: {new Date(memberData.dateJoined).toLocaleDateString()}</p>
                        </div>

                        <div className="border-t border-[#9E9E9E] pt-3 md:pt-4">
                            <div className="flex justify-between py-2 text-sm md:text-base">
                                <span className="text-[#373737]">Phone:</span>
                                <span className="font-medium">{memberData.phoneNumber}</span>
                            </div>
                            <div className="flex justify-between py-2 text-sm md:text-base">
                                <span className="text-[#373737]">Email:</span>
                                <span className="font-medium">{memberData.email}</span>
                            </div>
                            <div className="flex justify-between py-2 text-sm md:text-base">
                                <span className="text-[#373737]">Address:</span>
                                <span className="font-medium">{memberData.address}</span>
                            </div>
                            <div className="flex justify-between py-2 text-sm md:text-base">
                                <span className="text-[#373737]">Status:</span>
                                <span className={`font-medium ${memberData.membershipStatus ? 'text-green-600' : 'text-red-600'}`}>
                                    {memberData.membershipStatus ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="w-full md:w-3/4">
                        {/* Tabs */}
                        <div className="border-b border-gray-200 overflow-x-auto">
                            <div className="flex space-x-1">
                                <button 
                                    className={`py-2 md:py-3 px-4 md:px-8 font-medium transition-colors relative text-sm md:text-base ${
                                        activeTab === 'loans' 
                                        ? 'text-blue-600 hover:text-blue-700' 
                                        : 'text-[#373737] hover:text-gray-900'
                                    }`}
                                    onClick={() => setActiveTab('loans')}
                                    aria-current={activeTab === 'loans' ? 'page' : undefined}
                                >
                                    Loans
                                    {activeTab === 'loans' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                                    )}
                                </button>
                                <button 
                                    className={`py-2 md:py-3 px-4 md:px-8 font-medium transition-colors relative text-sm md:text-base ${
                                        activeTab === 'transactions' 
                                        ? 'text-blue-600 hover:text-blue-700' 
                                        : 'text-[#373737] hover:text-gray-900'
                                    }`}
                                    onClick={() => setActiveTab('transactions')}
                                    aria-current={activeTab === 'transactions' ? 'page' : undefined}
                                >
                                    Transactions
                                    {activeTab === 'transactions' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                                    )}
                                </button>
                            </div>
                        </div>
                        
                        {/* Tab content */}
                        <div className="bg-white rounded-b-lg shadow-md p-4 md:p-6 overflow-x-auto">
                            {activeTab === 'loans' && (
                                <>
                                    <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Loan History</h3>
                                    {loanHistory.length === 0 ? (
                                        <div className="text-center text-gray-500 py-8">No loan history available</div>
                                    ) : (
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="text-left text-[#939393]">
                                                    <th className="pb-2 font-normal text-xs md:text-sm">Loan ID</th>
                                                    <th className="pb-2 font-normal text-xs md:text-sm">Amount</th>
                                                    <th className="pb-2 font-normal text-xs md:text-sm">Date</th>
                                                    <th className="pb-2 font-normal text-xs md:text-sm">Due Date</th>
                                                    <th className="pb-2 font-normal text-xs md:text-sm">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loanHistory.map((loan, index) => (
                                                    <tr key={index} className="">
                                                        <td className="py-2 md:py-3 text-xs md:text-sm">{loan.id}</td>
                                                        <td className="py-2 md:py-3 text-xs md:text-sm">{loan.amount}</td>
                                                        <td className="py-2 md:py-3 text-xs md:text-sm">{loan.date}</td>
                                                        <td className="py-2 md:py-3 text-xs md:text-sm">{loan.dueDate}</td>
                                                        <td className="py-2 md:py-3">{getStatusBadge(loan.status)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </>
                            )}

                            {activeTab === 'transactions' && (
                                <>
                                    <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Transaction History</h3>
                                    {transactionHistory.length === 0 ? (
                                        <div className="text-center text-gray-500 py-8">No transaction history available</div>
                                    ) : (
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="text-left text-[#939393]">
                                                    <th className="pb-2 font-normal text-xs md:text-sm">Date</th>
                                                    <th className="pb-2 font-normal text-xs md:text-sm">Type</th>
                                                    <th className="pb-2 font-normal text-xs md:text-sm">Amount</th>
                                                    <th className="pb-2 font-normal text-xs md:text-sm">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {transactionHistory.map((transaction, index) => (
                                                    <tr key={index} className="">
                                                        <td className="py-2 md:py-3 text-xs md:text-sm">{transaction.date}</td>
                                                        <td className="py-2 md:py-3 text-xs md:text-sm">{transaction.type}</td>
                                                        <td className="py-2 md:py-3 text-red-500 text-xs md:text-sm">{transaction.amount}</td>
                                                        <td className="py-2 md:py-3">{getStatusBadge(transaction.status)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </>
                            )}

                            {/* Pagination */}
                            {(loanHistory.length > 0 || transactionHistory.length > 0) && (
                                <div className="flex justify-center mt-4 md:mt-6">
                                    {renderPagination()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberProfile;