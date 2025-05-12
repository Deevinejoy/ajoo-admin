import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Linechart from '../../Linechart';
import Piechart from '../../Piechart';

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
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Members');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock data for the selected association
  const association = {
    id: parseInt(id || '1'),
    name: 'Association X',
    description: 'Association details and performance',
    totalMembers: 120,
    activeLoans: 45,
    defaultRate: '3%'
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
  
  const pieChartData = [
    { name: 'Active Loans', value: 65 },
    { name: 'Completed', value: 30 },
    { name: 'Overdue', value: 15 },
  ];
  
  // Pagination
  const totalPages = 20;
  
  const renderPagination = () => {
    return (
      <div className="flex items-center justify-center gap-2 text-sm">
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
    <div className="p-8">
      {/* Back button and title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-500 mb-1">
          <Link to="/associations" className="flex items-center gap-1">
            <span>←</span>
          </Link>
          <h1 className="text-2xl font-semibold text-black">{association.name}</h1>
        </div>
        <p className="text-gray-500 text-sm">{association.description}</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500">Total Members</p>
              <h2 className="text-4xl font-semibold">{association.totalMembers}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500">Active Loans</p>
              <h2 className="text-4xl font-semibold">{association.activeLoans}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-medium mb-4">Association Members</h3>
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3 font-normal">Name</th>
                <th className="pb-3 font-normal">Role</th>
                <th className="pb-3 font-normal">Registration Date</th>
                <th className="pb-3 font-normal">Loan Status</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id} className="border-b">
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
              <div key={activity.id} className="border-b pb-6 last:border-0">
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