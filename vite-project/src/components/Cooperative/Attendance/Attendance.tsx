import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Association {
  id: number;
  name: string;
  members: number;
  loans: number;
  created: string;
  status: string;
  avgAttendance: string;
}

export default function Attendance() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for associations with unique names
  const associations: Association[] = [
    { id: 1, name: 'Association X', members: 1200, loans: 64, created: '2022-01-15', status: 'active', avgAttendance: '82%' },
    { id: 2, name: 'Association Y', members: 1200, loans: 64, created: '2022-01-15', status: 'active', avgAttendance: '82%' },
    { id: 3, name: 'Association Z', members: 1200, loans: 64, created: '2022-01-15', status: 'active', avgAttendance: '82%' },
    { id: 4, name: 'Association A', members: 1200, loans: 64, created: '2022-01-15', status: 'active', avgAttendance: '82%' },
    { id: 5, name: 'Association B', members: 1200, loans: 64, created: '2022-01-15', status: 'active', avgAttendance: '82%' },
  ];
  
  // Handler to navigate to association details with the specific ID
  const handleViewAssociation = (id: number) => {
    navigate(`/attendance/${id}`);
  };

  // Filter associations based on search term
  const filteredAssociations = searchTerm 
    ? associations.filter(association => 
        association.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : associations;

  return (
    <div className="p-4 md:p-8 bg-[#F5F7FA] min-h-screen">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-medium">Associations</h1>
        <p className="text-[#666666] text-sm md:text-base">Manage all associations attendance</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-6 gap-3 md:gap-4">
        <div className="relative w-full md:w-1/2">
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="border border-gray-300 px-4 py-2 rounded-md flex items-center justify-center gap-2 w-full md:w-auto">
          <img src="/filter.svg" alt="filter"/>
          Filter
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-[#939393] border-b border-gray-200">
              <th className="px-3 md:px-6 py-3 md:py-4 font-normal text-xs md:text-sm">Name</th>
              <th className="px-3 md:px-6 py-3 md:py-4 font-normal text-xs md:text-sm">Members</th>
              <th className="px-3 md:px-6 py-3 md:py-4 font-normal text-xs md:text-sm">Loans</th>
              <th className="px-3 md:px-6 py-3 md:py-4 font-normal text-xs md:text-sm">Created</th>
              <th className="px-3 md:px-6 py-3 md:py-4 font-normal text-xs md:text-sm">Status</th>
              <th className="px-3 md:px-6 py-3 md:py-4 font-normal text-xs md:text-sm">Avg. Attendance</th>
              <th className="px-3 md:px-6 py-3 md:py-4 font-normal text-xs md:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssociations.map(association => (
              <tr key={association.id} className="border-b border-gray-100">
                <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">{association.name}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">{association.members}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">{association.loans}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">{association.created}</td>
                <td className="px-3 md:px-6 py-3 md:py-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {association.status}
                  </span>
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">{association.avgAttendance}</td>
                <td className="px-3 md:px-6 py-3 md:py-4">
                <button
                  onClick={() => handleViewAssociation(association.id)}
                  className="flex items-center gap-1 md:gap-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200"
                  >
                      <img src="/view.svg" alt="pic" width={16} height={16} className="md:w-[18px] md:h-[18px]"/> 
                      <span className='font-medium text-xs md:text-sm'>View</span>
                  </button>
             
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="flex  items-center justify-center py-4 gap-1 text-xs md:text-sm overflow-x-auto">
          <span className="text-[#939393] mx-1 md:mx-2 mb-2 md:mb-0 cursor-pointer">Previous page</span>
          <span className="text-blue-600 font-medium mx-1 cursor-pointer">1</span>
          <span className="text-[#939393] mx-1 cursor-pointer">2</span>
          <span className="text-[#939393] mx-1 cursor-pointer">3</span>
          <span className="text-[#939393] mx-1 cursor-pointer">...</span>
          <span className="text-[#939393] mx-1 cursor-pointer">20</span>
          <span className="text-[#939393] mx-1 md:mx-2 mt-2 md:mt-0 cursor-pointer">Next page</span>
        </div>
      </div>
    </div>
  );
}
