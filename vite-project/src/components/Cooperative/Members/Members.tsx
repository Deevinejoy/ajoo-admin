import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddMemberModal from './AddMemberModal';

interface Member {
  id: string;
  name: string;
  association: string;
  role: string;
    dateJoined: string;
  loanStatus: string;
  attendance: string;
}

const Members: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for members
  const members: Member[] = [
    { id: '1', name: 'John Doe', association: 'Association X', role: 'Member', dateJoined: '2022-01-15', loanStatus: 'Active Loan', attendance: '85%' },
    { id: '2', name: 'John Doe', association: 'Association X', role: 'Secretary', dateJoined: '2022-01-15', loanStatus: 'Completed', attendance: '85%' },
    { id: '3', name: 'John Doe', association: 'Association X', role: 'Member', dateJoined: '2022-01-15', loanStatus: 'No Loan', attendance: '85%' },
    { id: '4', name: 'John Doe', association: 'Association X', role: 'Member', dateJoined: '2022-01-15', loanStatus: 'Active Loan', attendance: '85%' },
    { id: '5', name: 'John Doe', association: 'Association X', role: 'Member', dateJoined: '2022-01-15', loanStatus: 'Completed', attendance: '85%' },
  ];

    const handleViewMember = (memberId: string) => {
        navigate(`/members/${memberId}`);
    };

  const getLoanStatusClass = (status: string) => {
    switch (status) {
      case 'Active Loan':
        return 'bg-blue-100 text-blue-600';
      case 'Completed':
        return 'bg-green-100 text-green-600';
      case 'No Loan':
            default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    };

    return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
                        <div>
          <h1 className="text-2xl font-semibold">Members</h1>
          <p className="text-gray-600 text-sm">Manage all cooperative members</p>
                        </div>
        <button 
          className="bg-blue-600 text-white rounded-md flex items-center gap-2 px-4 py-2"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-lg">+</span>
          Add Member
        </button>
                </div>

      <div className="flex justify-between mb-6">
        <div className="relative w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            </div>
                    <input
                        type="text"
            placeholder="Search associations..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
        <button className="border border-gray-300 px-4 py-2 rounded-md flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
                </button>
            </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
                    <thead>
            <tr className="bg-white">
              <th className="px-6 py-4 text-left text-gray-500 font-normal">Name</th>
              <th className="px-6 py-4 text-left text-gray-500 font-normal">Association</th>
              <th className="px-6 py-4 text-left text-gray-500 font-normal">Role</th>
              <th className="px-6 py-4 text-left text-gray-500 font-normal">Date Joined</th>
              <th className="px-6 py-4 text-left text-gray-500 font-normal">Loan Status</th>
              <th className="px-6 py-4 text-left text-gray-500 font-normal">Attendance</th>
              <th className="px-6 py-4 text-left text-gray-500 font-normal">Actions</th>
                        </tr>
                    </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.association}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.dateJoined}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getLoanStatusClass(member.loanStatus)}`}>
                    {member.loanStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{member.attendance}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewMember(member.id)}
                    className="inline-flex items-center gap-2 px-4 py-1 bg-gray-100 rounded"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    View
                  </button>
                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

        <div className="flex items-center justify-center py-4 bg-white border-t border-gray-200">
          <span className="text-gray-500 mx-4">Previous page</span>
          <div className="flex space-x-1">
            {[1, 2, 3].map((page) => (
                            <button
                key={page}
                className={`px-2 ${currentPage === page ? 'text-blue-600' : 'text-gray-500'}`}
                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
            <span className="text-gray-500">. . .</span>
            <button className="px-2 text-gray-500">20</button>
                    </div>
          <span className="text-gray-500 mx-4">Next page</span>
                </div>
            </div>

            {/* Add Member Modal */}
      {isModalOpen && (
            <AddMemberModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
      )}
        </div>
    );
};

export default Members;