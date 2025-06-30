import React, { useState, useEffect } from 'react';
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

interface ApiMember {
  id: string;
  fullName: string;
  association: string;
  dateJoined: string;
  loanStatus: string;
  attendancePercentage: string;
  phoneNumber: string;
  email: string;
}

const Members: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://ajo.nickyai.online/api/v1/cooperative/members/view', {
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
        const data = result.data;
        
        // Transform the API data to match our interface
        const transformedMembers = data?.members ? data.members.map((item: ApiMember) => ({
          id: item.id,
          name: item.fullName,
          association: item.association,
          role: 'Member', // Default role since it's not in the API response
          dateJoined: item.dateJoined,
          loanStatus: item.loanStatus,
          attendance: item.attendancePercentage,
        })) : [];
        
        setMembers(transformedMembers);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error fetching members';
        setError(errorMessage);
        console.error('Error fetching members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

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

  // Filter members based on search term
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.association.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3 md:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-medium">Members</h1>
          <p className="text-[#666666] text-sm md:text-base">Manage all cooperative members</p>
        </div>
        <button 
          className="bg-[#3161FF] text-white px-4 md:px-6 py-2 rounded-lg flex items-center justify-center md:justify-start gap-x-2 font-medium w-full md:w-auto"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-lg">+</span>
          Add Member
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-6 gap-3 md:gap-4">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search members..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button className="border border-gray-300 px-4 py-2 rounded-md flex items-center justify-center gap-2 w-full md:w-auto">
          <img src="/filter.svg" alt="filter"/>
          Filter
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center">
            <div className="text-gray-500">Loading members...</div>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-red-500">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-white">
                  <th className="px-2 md:px-6 py-3 md:py-4 text-left text-[#939393] font-normal text-xs md:text-sm">Name</th>
                  <th className="px-2 md:px-6 py-3 md:py-4 text-left text-[#939393] font-normal text-xs md:text-sm">Association</th>
                  <th className="px-2 md:px-6 py-3 md:py-4 text-left text-[#939393] font-normal text-xs md:text-sm">Role</th>
                  <th className="px-2 md:px-6 py-3 md:py-4 text-left text-[#939393] font-normal text-xs md:text-sm">Date Joined</th>
                  <th className="px-2 md:px-6 py-3 md:py-4 text-left text-[#939393] font-normal text-xs md:text-sm">Loan Status</th>
                  <th className="px-2 md:px-6 py-3 md:py-4 text-left text-[#939393] font-normal text-xs md:text-sm">Attendance</th>
                  <th className="px-2 md:px-6 py-3 md:py-4 text-left text-[#939393] font-normal text-xs md:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-2 md:px-6 py-8 text-center text-gray-500">
                      {searchTerm ? 'No members found matching your search.' : 'No members available.'}
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="px-2 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm">{member.name}</td>
                      <td className="px-2 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm">{member.association}</td>
                      <td className="px-2 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm">{member.role}</td>
                      <td className="px-2 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm">{member.dateJoined}</td>
                      <td className="px-2 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getLoanStatusClass(member.loanStatus)}`}>
                          {member.loanStatus}
                        </span>
                      </td>
                      <td className="px-2 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm">{member.attendance}</td>
                      <td className="px-2 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleViewMember(member.id)}
                          className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 bg-gray-100 rounded"
                        >
                          <img src="/view.svg" alt="pic" width={16} height={16} className="md:w-auto md:h-auto"/> 
                          <span className='font-medium text-xs md:text-sm'>View</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {filteredMembers.length > 0 && (
              <div className="flex flex-col md:flex-row items-center justify-center py-4 bg-white border-t border-gray-200 text-xs md:text-sm overflow-x-auto">
                <span className="text-[#939393] mx-1 md:mx-4 mb-2 md:mb-0">Previous page</span>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`px-2 ${currentPage === page ? 'text-blue-600' : 'text-[#939393]'}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <span className="text-[#939393] mx-1 md:mx-4 mt-2 md:mt-0">Next page</span>
                </div>
              </div>
            )}
          </>
        )}
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