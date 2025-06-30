import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface ActivityItem {
  id: number;
  type: string;
  description: string;
  time: string;
  status: 'pending' | 'completed';
}

interface Member {
  id: number;
  name: string;
  role: string;
  registrationDate: string;
  loanStatus: string;
}

interface ApiMember {
  id?: string | number;
  memberId?: string | number;
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  memberRole?: string;
  registrationDate?: string;
  createdAt?: string;
  dateJoined?: string;
  loanStatus?: string;
  currentLoanStatus?: string;
}

interface Association {
  id: string;
  name: string;
  category: string;
  location: string;
  established: string;
  members: number;
  activeLoans: number;
  contributions: string;
  defaultRate: string;
  interestRate: string;
  status: string;
  description: string;
  leaderName: string;
  leaderPhoneNumber: string;
  monthlySavings: string;
  minimumLoanAmount: string;
  maximumLoanAmount: string;
  loanDuration: number;
  foundedDate: string;
  createdAt: string;
}

export default function AssociationDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Members');
  const [currentPage, setCurrentPage] = useState(1);
  const [association, setAssociation] = useState<Association | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [membersError, setMembersError] = useState('');
  
  // Mock data for activity log
  const activityLog: ActivityItem[] = [
    {
      id: 1,
      type: 'New Loan Request',
      description: 'John Doe has requested a new loan of ₦5,000,000.',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'Loan Repayment',
      description: 'John Doe has repaid ₦5,000,000 for his loan.',
      time: '5 hours ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'New Member',
      description: 'John Doe just joined the association.',
      time: '1 day ago',
      status: 'pending'
    }
  ];
  
  // Mock data for charts
  const memberGrowthData = [
    { name: 'Jan', value: 75 },
    { name: 'Feb', value: 25 },
    { name: 'Mar', value: 90 },
    { name: 'Apr', value: 65 },
    { name: 'May', value: 50 },
    { name: 'Jun', value: 45 },
    { name: 'Jul', value: 90 },
  ];

  useEffect(() => {
    const fetchAssociationDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://ajo.nickyai.online/api/v1/cooperative/associations/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch association details');
        }
        
        const result = await response.json();
        const data = result.data || result;
        
        // Transform the API data to match our interface
        const transformedAssociation: Association = {
          id: data.association.id,
          name: data.association.name,
          category: data.association.category,
          location: '', // Not provided in API response
          established: data.association.foundedDate,
          members: data.statistics.totalMembers,
          activeLoans: data.statistics.activeLoans,
          contributions: data.association.monthlySavings ? `₦${parseFloat(data.association.monthlySavings).toLocaleString()}` : '₦0',
          defaultRate: data.statistics.defaultRate,
          interestRate: data.association.interestRate ? `${data.association.interestRate}%` : '0%',
          status: 'active', // Not provided in API response
          description: `Association ${data.association.name}`,
          leaderName: data.association.leaderName,
          leaderPhoneNumber: data.association.leaderPhoneNumber,
          monthlySavings: data.association.monthlySavings,
          minimumLoanAmount: data.association.minimumLoanAmount,
          maximumLoanAmount: data.association.maximumLoanAmount,
          loanDuration: data.association.loanDuration,
          foundedDate: data.association.foundedDate,
          createdAt: data.association.createdAt,
        };
        
        setAssociation(transformedAssociation);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error fetching association details';
        setError(errorMessage);
        console.error('Error fetching association details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssociationDetails();
  }, [id]);
  
  // Fetch members when Members tab is active
  useEffect(() => {
    const fetchMembers = async () => {
      if (!id || activeTab !== 'Members') return;
      
      setMembersLoading(true);
      setMembersError('');
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://ajo.nickyai.online/api/v1/cooperative/members/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        
        const result = await response.json();
        const data = result.data || result;
        
        // Transform the API data to match our interface
        const transformedMembers = Array.isArray(data) ? data.map((item: ApiMember) => ({
          id: Number(item.id || item.memberId || 0),
          name: item.name || item.fullName || `${item.firstName || ''} ${item.lastName || ''}`.trim(),
          role: item.role || item.memberRole || 'Member',
          registrationDate: item.registrationDate || item.createdAt || item.dateJoined || '',
          loanStatus: item.loanStatus || item.currentLoanStatus || 'No Loan',
        })) : [];
        
        setMembers(transformedMembers);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error fetching members';
        setMembersError(errorMessage);
        console.error('Error fetching members:', err);
      } finally {
        setMembersLoading(false);
      }
    };

    fetchMembers();
  }, [id, activeTab]);
  
  // Pagination
  const renderPagination = () => {
    return (
      <div className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 text-xs md:text-sm">
        <span className="text-gray-600 mb-2 md:mb-0">Previous page</span>
        <div className="flex items-center gap-1 md:gap-2">
          {[1, 2, 3, '...', 20].map((page, index) => (
            <button
              key={index}
              className={`px-2 md:px-3 py-1 rounded ${
                page === currentPage ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
        <span className="text-gray-600 mt-2 md:mt-0">Next page</span>
      </div>
    );
  };
  
  const getLoanStatusColor = (status: string) => {
    switch(status) {
      case 'Active Loan':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'No Loan':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-3 md:p-8 bg-[#F5F7FA]">
        <div className="text-center">
          <div className="text-gray-500">Loading association details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 md:p-8 bg-[#F5F7FA]">
        <div className="text-center">
          <div className="text-red-500">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!association) {
    return (
      <div className="p-3 md:p-8 bg-[#F5F7FA]">
        <div className="text-center">
          <div className="text-gray-500">Association not found</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-3 md:p-8 bg-[#F5F7FA]">
      {/* Back button and title */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-2 text-gray-500 mb-1">
          <Link to="/associations" className="flex items-center gap-1">
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
          <h1 className="text-xl md:text-2xl font-semibold text-black">{association.name}</h1>
        </div>
        <p className="text-gray-500 text-xs md:text-sm">{association.description}</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white rounded-lg shadow-md p-3 md:p-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1 md:p-2">
              <img src="/people.svg" alt="people" className="w-4 h-4 md:w-5 md:h-5"/>
            </div>
            <div>
              <p className="text-gray-500 text-xs md:text-sm">Total Members</p>
              <h2 className="text-xl md:text-4xl font-semibold">{association.members}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-3 md:p-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1 md:p-2">
              <img src="/loans1.svg" alt="loans" className="w-4 h-4 md:w-5 md:h-5"/>
            </div>
            <div>
              <p className="text-gray-500 text-xs md:text-sm">Active Loans</p>
              <h2 className="text-xl md:text-4xl font-semibold">{association.activeLoans}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-3 md:p-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1 md:p-2">
              <img src="/briefcase.svg" alt="briefcase" className="w-4 h-4 md:w-5 md:h-5"/>
            </div>
            <div>
              <p className="text-gray-500 text-xs md:text-sm">Default Rate</p>
              <h2 className="text-xl md:text-4xl font-semibold">{association.defaultRate}</h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b mb-4 md:mb-6 overflow-x-auto">
        <div className="flex gap-4 md:gap-8 min-w-max">
          {['Members', 'Activity Log', 'Performance'].map(tab => (
            <button
              key={tab}
              className={`pb-2 md:pb-3 px-1 text-sm md:text-base whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'Members' && (
        <div className="bg-white rounded-lg shadow-md p-3 md:p-6 overflow-x-auto">
          <h3 className="text-base md:text-xl font-medium mb-3 md:mb-4">Association Members</h3>
          {membersLoading ? (
            <div className="text-center py-8">
              <div className="text-gray-500">Loading members...</div>
            </div>
          ) : membersError ? (
            <div className="text-center py-8">
              <div className="text-red-500">{membersError}</div>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Retry
              </button>
            </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b border-[#D9D9D9]">
                  <th className="pb-2 md:pb-3 font-normal text-xs md:text-sm">Name</th>
                  <th className="pb-2 md:pb-3 font-normal text-xs md:text-sm">Role</th>
                  <th className="pb-2 md:pb-3 font-normal text-xs md:text-sm">Registration Date</th>
                  <th className="pb-2 md:pb-3 font-normal text-xs md:text-sm">Loan Status</th>
                </tr>
              </thead>
              <tbody>
                  {members.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">
                        No members found for this association.
                      </td>
                    </tr>
                  ) : (
                    members.map(member => (
                  <tr key={member.id} className="border-b border-[#D9D9D9]">
                    <td className="py-2 md:py-4 text-xs md:text-sm">{member.name}</td>
                    <td className="py-2 md:py-4 text-xs md:text-sm">{member.role}</td>
                    <td className="py-2 md:py-4 text-xs md:text-sm">{member.registrationDate}</td>
                    <td className="py-2 md:py-4">
                      <span className={`px-2 py-1 text-[10px] md:text-xs rounded-full ${getLoanStatusColor(member.loanStatus)}`}>
                        {member.loanStatus}
                      </span>
                    </td>
                  </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
          )}
          
          {/* Pagination */}
          {members.length > 0 && (
          <div className="mt-4 md:mt-6">
            {renderPagination()}
          </div>
          )}
        </div>
      )}
      
      {activeTab === 'Activity Log' && (
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-6">
          <h3 className="text-base md:text-xl font-medium mb-3 md:mb-4">Activity Log</h3>
          <div className="space-y-4 md:space-y-6">
            {activityLog.map(activity => (
              <div key={activity.id} className="border-b border-[#D9D9D9] pb-4 md:pb-6 last:border-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm md:text-base">{activity.type}</h4>
                  <span className="text-[10px] md:text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full">
                    {activity.status}
                  </span>
                </div>
                <p className="text-xs md:text-sm my-1">{activity.description}</p>
                <p className="text-[10px] md:text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-4 md:mt-6">
            {renderPagination()}
          </div>
        </div>
      )}
      
      {activeTab === 'Performance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Member Growth Chart */}
          <div className="bg-white rounded-lg shadow-sm p-3 md:p-6">
            <h3 className="text-base md:text-lg font-medium">Member Growth</h3>
            <p className="text-xs md:text-sm text-gray-500">Last 7 months</p>
            <div className="h-[200px] md:h-[300px] mt-4">
              {/* Custom bar chart that matches the design */}
              <div className="flex items-end h-full justify-between">
                {memberGrowthData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-6 md:w-10 bg-gray-800 rounded-sm" 
                      style={{ height: `${item.value}%` }}
                    ></div>
                    <span className="text-[10px] md:text-xs mt-2">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Loan Distribution Chart */}
          <div className="bg-white rounded-lg shadow-sm p-3 md:p-6">
            <h3 className="text-base md:text-lg font-medium">Loan Distribution</h3>
            <p className="text-xs md:text-sm text-gray-500">Current period</p>
            <div className="flex justify-center items-center h-[200px] md:h-[300px]">
              <div className="relative w-32 h-32 md:w-48 md:h-48">
                <div className="rounded-full border-[20px] md:border-[30px] border-[#1f2937] w-full h-full"></div>
                <div className="absolute top-0 left-0 rounded-full border-[20px] md:border-[30px] border-t-[#0F8B42] border-r-[#0F8B42] border-b-transparent border-l-transparent w-full h-full" style={{ transform: 'rotate(45deg)' }}></div>
                <div className="absolute top-0 left-0 rounded-full border-[20px] md:border-[30px] border-b-[#f59e0b] border-l-[#f59e0b] border-t-transparent border-r-transparent w-full h-full" style={{ transform: 'rotate(45deg)' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 