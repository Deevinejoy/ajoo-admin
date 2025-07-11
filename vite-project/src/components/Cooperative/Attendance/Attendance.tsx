import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Association {
  id: string;
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
  const [associations, setAssociations] = useState<Association[]>([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Fetching associations with token:', token);
    
    fetch('https://ajo.nickyai.online/api/v1/cooperative/associations/attendance/view', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => {
        console.log('Associations list response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Associations API Response:', data);
        console.log('Data type:', typeof data);
        console.log('Data keys:', Object.keys(data));
        
        type ApiAssociation = {
          id?: string;
          associationId?: string;
          _id?: string;
          name?: string;
          associationName?: string;
          membersCount?: number;
          loansCount?: number;
          dateCreated?: string;
          status?: string;
          averageAttendance?: string;
        };
        const apiAssociations = (data.data || []) as ApiAssociation[];
        console.log('Raw associations from API:', apiAssociations);
        console.log('Number of associations:', apiAssociations.length);
        
        if (apiAssociations.length > 0) {
          console.log('First association structure:', apiAssociations[0]);
          console.log('First association keys:', Object.keys(apiAssociations[0]));
        }
        
        const mapped = apiAssociations.map((a: ApiAssociation, idx: number) => {
          // Try to find the correct ID field
          const actualId = a.id || a.associationId || a._id;
          console.log(`Association ${idx} - Raw ID fields:`, {
            id: a.id,
            associationId: a.associationId,
            _id: a._id,
            actualId: actualId
          });
          
          const mappedAssociation = {
            id: actualId || `fallback-${idx + 1}`,
            name: a.name || a.associationName || '',
            members: a.membersCount || 0,
            loans: a.loansCount || 0,
            created: a.dateCreated || '',
            status: a.status || 'inactive',
            avgAttendance: a.averageAttendance || '',
          };
          console.log(`Mapping association ${idx}:`, a, '->', mappedAssociation);
          return mappedAssociation;
        });
        console.log('Final mapped associations:', mapped);
        setAssociations(mapped);
      })
      .catch(error => {
        console.error('Error fetching associations:', error);
      });
  }, []);
  
  // Handler to navigate to association details with the specific ID
  const handleViewAssociation = (id: string) => {
    console.log('Attempting to view association with ID:', id);
    // Check if this is a valid database ID (not a fallback index)
    const association = associations.find(a => a.id === id);
    if (association && association.name) {
      console.log('Navigating to association:', association.name, 'with ID:', id);
      navigate(`/attendance/${id}`);
    } else {
      console.error('Invalid association ID:', id);
      alert('Unable to view association details. Please try again.');
    }
  };

  // Filter associations based on search term
  const filteredAssociations = searchTerm 
    ? associations.filter(association => 
        association.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : associations;

  return (
    <div className="p-4 md:p-8 bg-[#F5F7FA] min-h-screen">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-medium">Attendance</h1>
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
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap min-w-[90px]">
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
