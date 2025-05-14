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
    <div className="p-8 bg-[#F5F7FA] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Associations</h1>
        <p className="text-gray-500 text-sm">Manage all associations attendance</p>
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="border border-gray-300 px-4 py-2 rounded-md flex items-center gap-2">
       <img src="/filter.svg" alt="filter"/>
          Filter
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="px-6 py-4 font-normal">Name</th>
              <th className="px-6 py-4 font-normal">Members</th>
              <th className="px-6 py-4 font-normal">Loans</th>
              <th className="px-6 py-4 font-normal">Created</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal">Avg. Attendance</th>
              <th className="px-6 py-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssociations.map(association => (
              <tr key={association.id} className="border-b border-gray-100">
                <td className="px-6 py-4">{association.name}</td>
                <td className="px-6 py-4">{association.members}</td>
                <td className="px-6 py-4">{association.loans}</td>
                <td className="px-6 py-4">{association.created}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {association.status}
                  </span>
                </td>
                <td className="px-6 py-4">{association.avgAttendance}</td>
                <td className="px-6 py-4">
                <button
                  onClick={() => handleViewAssociation(association.id)}
                   className="flex justify-between gap-x-4 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
                  >
                      <img src="/view.svg" alt="pic" width={18} height={18}/> 
                      <span className='font-medium text-lg'>View</span>
                  </button>
             
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="flex justify-center py-4 gap-1">
          <span className="text-gray-500 mx-1 cursor-pointer">Previous page</span>
          <span className="text-blue-600 font-medium mx-1 cursor-pointer">1</span>
          <span className="text-gray-500 mx-1 cursor-pointer">2</span>
          <span className="text-gray-500 mx-1 cursor-pointer">3</span>
          <span className="text-gray-500 mx-1 cursor-pointer">. . .</span>
          <span className="text-gray-500 mx-1 cursor-pointer">20</span>
          <span className="text-gray-500 mx-1 cursor-pointer">Next page</span>
        </div>
      </div>
    </div>
  );
}
