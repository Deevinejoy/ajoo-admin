import { useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function AssociationDetails() {
  const [activeTab, setActiveTab] = useState('Members');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock association data
  const association = {
    id: 1,
    name: 'Association X',
    category: 'Class C (Large)',
    location: 'Lagos, Nigeria',
    established: 'January 15, 2022',
    members: 1200,
    loans: 56,
    contributions: '₦12,500,000',
    defaultRate: '3%',
    interestRate: '5%',
    status: 'active',
    description: 'A cooperative association for community development'
  };
  
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
  
  // Mock data for members
  const members: Member[] = [
    { id: 1, name: 'John Doe', role: 'Member', registrationDate: '2022-01-15', loanStatus: 'Active Loan' },
    { id: 2, name: 'John Doe', role: 'Secretary', registrationDate: '2022-01-15', loanStatus: 'Completed' },
    { id: 3, name: 'John Doe', role: 'Treasurer', registrationDate: '2022-01-15', loanStatus: 'No Loan' },
    { id: 4, name: 'John Doe', role: 'President', registrationDate: '2022-01-15', loanStatus: 'Completed' },
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
              <h2 className="text-xl md:text-4xl font-semibold">{association.loans}</h2>
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
                {members.map(member => (
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
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="mt-4 md:mt-6">
            {renderPagination()}
          </div>
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