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
      <div className="flex items-center justify-center gap-2 text-sm ">
        <span className="text-gray-500">Previous page</span>
        {[1, 2, 3].map(page => (
          <span 
            key={page}
            className={`px-1 ${currentPage === page ? 'text-blue-600' : 'text-gray-500'} cursor-pointer`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </span>
        ))}
        <span className="text-gray-500">. . .</span>
        <span className="text-gray-500 cursor-pointer">20</span>
        <span className="text-gray-500">Next page</span>
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
    <div className="p-8 bg-[#F5F7FA]">
      {/* Back button and title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-500 mb-1">
          <Link to="/associations" className="flex items-center gap-1">
          <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-black">{association.name}</h1>
        </div>
        <p className="text-gray-500 text-sm">{association.description}</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3">
            <div className="p-2">
            <img src="/people.svg" alt="people"/>
            </div>
            <div>
              <p className="text-gray-500">Total Members</p>
              <h2 className="text-4xl font-semibold">{association.members}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3">
            <div className="p-2">
            <img src="/loans1.svg" alt="loans"/>
            </div>
            <div>
              <p className="text-gray-500">Active Loans</p>
              <h2 className="text-4xl font-semibold">{association.loans}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3">
            <div className="p-2">
            <img src="/briefcase.svg" alt="briefcase"/>
            </div>
            <div>
              <p className="text-gray-500">Default Rate</p>
              <h2 className="text-4xl font-semibold">{association.defaultRate}</h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-8">
          {['Members', 'Activity Log', 'Performance'].map(tab => (
            <button
              key={tab}
              className={`pb-3 px-1 ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'Members' && (
        <div className="bg-white rounded-lg shadow-md  p-6">
          <h3 className="text-xl font-medium mb-4">Association Members</h3>
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b border-[#D9D9D9]">
                <th className="pb-3 font-normal">Name</th>
                <th className="pb-3 font-normal">Role</th>
                <th className="pb-3 font-normal">Registration Date</th>
                <th className="pb-3 font-normal">Loan Status</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id} className="border-b border-[#D9D9D9]">
                  <td className="py-4">{member.name}</td>
                  <td className="py-4">{member.role}</td>
                  <td className="py-4">{member.registrationDate}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getLoanStatusColor(member.loanStatus)}`}>
                      {member.loanStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="mt-6">
            {renderPagination()}
          </div>
        </div>
      )}
      
      {activeTab === 'Activity Log' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-medium mb-4">Activity Log</h3>
          <div className="space-y-6">
            {activityLog.map(activity => (
              <div key={activity.id} className="border-b border-[#D9D9D9] pb-6 last:border-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{activity.type}</h4>
                  <span className="text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full">
                    {activity.status}
                  </span>
                </div>
                <p className="text-sm my-1">{activity.description}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-6">
            {renderPagination()}
          </div>
        </div>
      )}
      
      {activeTab === 'Performance' && (
        <div className="grid grid-cols-2 gap-6">
          {/* Member Growth Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium">Member Growth</h3>
            <p className="text-sm text-gray-500">Last 7 months</p>
            <div className="h-[300px] mt-4">
              {/* Custom bar chart that matches the design */}
              <div className="flex items-end h-full justify-between">
                {memberGrowthData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-10 bg-gray-800 rounded-sm" 
                      style={{ height: `${item.value}%` }}
                    ></div>
                    <span className="text-xs mt-2">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Loan Distribution Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium">Loan Distribution</h3>
            <p className="text-sm text-gray-500">Current period</p>
            <div className="flex justify-center items-center h-[300px]">
              <div className="relative w-48 h-48">
                <div className="rounded-full border-[30px] border-[#1f2937] w-full h-full"></div>
                <div className="absolute top-0 left-0 rounded-full border-[30px] border-t-[#0F8B42] border-r-[#0F8B42] border-b-transparent border-l-transparent w-full h-full" style={{ transform: 'rotate(45deg)' }}></div>
                <div className="absolute top-0 left-0 rounded-full border-[30px] border-b-[#f59e0b] border-l-[#f59e0b] border-t-transparent border-r-transparent w-full h-full" style={{ transform: 'rotate(45deg)' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 