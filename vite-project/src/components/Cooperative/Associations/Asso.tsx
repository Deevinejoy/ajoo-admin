import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Association {
  id: number;
  name: string;
  members: number;
  loans: number;
  created: string;
  status: string;
  defaultRate: string;
}

export default function Asso() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  // Mock data for associations
  const associations: Association[] = [
    { id: 1, name: 'Association X', members: 1200, loans: 64, created: '2022-01-15', status: 'active', defaultRate: '3%' },
    { id: 2, name: 'Association X', members: 1200, loans: 64, created: '2022-01-15', status: 'active', defaultRate: '3%' },
    { id: 3, name: 'Association X', members: 1200, loans: 64, created: '2022-01-15', status: 'active', defaultRate: '3%' },
    { id: 4, name: 'Association X', members: 1200, loans: 64, created: '2022-01-15', status: 'active', defaultRate: '3%' },
    { id: 5, name: 'Association X', members: 1200, loans: 64, created: '2022-01-15', status: 'active', defaultRate: '3%' },
  ];
  
  // Pagination logic
  const totalPages = 30;
  const pagesToShow = 3;
  
  // Handler to navigate to association details
  const handleViewAssociation = (id: number) => {
    navigate(`/associations/${id}`);
  };
  
  const renderPagination = () => {
    const pages = [];
    
    // Previous page button
    pages.push(
      <span key="prev" className="text-gray-500 mx-1 cursor-pointer">
        Previous page
      </span>
    );
    
    // First page
    pages.push(
      <span 
        key={1} 
        className={`mx-1 cursor-pointer ${currentPage === 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </span>
    );
    
    // Pages around current page
    for (let i = Math.max(2, currentPage - Math.floor(pagesToShow / 2)); 
         i <= Math.min(totalPages - 1, currentPage + Math.floor(pagesToShow / 2)); 
         i++) {
      pages.push(
        <span 
          key={i} 
          className={`mx-1 cursor-pointer ${currentPage === i ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </span>
      );
    }
    
    // Ellipsis if needed
    if (currentPage + Math.floor(pagesToShow / 2) < totalPages - 1) {
      pages.push(<span key="ellipsis" className="mx-1 text-gray-500">. . .</span>);
    }
    
    // Last page
    if (totalPages > 1) {
      pages.push(
        <span 
          key={totalPages} 
          className={`mx-1 cursor-pointer ${currentPage === totalPages ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </span>
      );
    }
    
    // Next page button
    pages.push(
      <span key="next" className="text-gray-500 mx-1 cursor-pointer">
        Next page
      </span>
    );
    
    return pages;
  };

  return (
    <div className="p-8 bg-[#F5F7FA]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Associations</h1>
          <p className="text-gray-500 text-sm">Manage all cooperative associations</p>
        </div>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <span className="text-lg">+</span>
          Add Association
        </button>
      </div>
      
      <div className="flex justify-between mb-6">
        <div className="relative w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
           <img src='/search.png' alt="search"/>
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
        <img src='filter.svg ' alt="filter"/>
          Filter
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="px-6 py-4 font-normal">Name</th>
              <th className="px-6 py-4 font-normal">Members</th>
              <th className="px-6 py-4 font-normal">Loans</th>
              <th className="px-6 py-4 font-normal">Created</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal">Default Rate</th>
              <th className="px-6 py-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {associations.map(association => (
              <tr key={association.id}>
                <td className="px-6 py-4">{association.name}</td>
                <td className="px-6 py-4">{association.members}</td>
                <td className="px-6 py-4">{association.loans}</td>
                <td className="px-6 py-4">{association.created}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {association.status}
                  </span>
                </td>
                <td className="px-6 py-4">{association.defaultRate}</td>
                <td className="px-6 py-4">
                  <button 
                    className="flex justify-between gap-x-4 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
                    onClick={() => handleViewAssociation(association.id)}
                  >
                      <img src="/view.svg" alt="pic" width={18} height={18}/> 
                      <span className='font-medium text-lg'>View</span>
                  </button>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="flex justify-center py-4">
          {renderPagination()}
        </div>
      </div>
      
      {/* Add New Association Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-100  bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-[540px] max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-1">Add New Association</h2>
              <p className="text-gray-600 text-sm mb-6">Create a new association under the cooperative. Fill in all required details below.</p>
              
              <form>
                {/* Association Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Association Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter association name"
                    className="w-full p-2.5 border border-gray-300 rounded-md"
                  />
                </div>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Association Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Association Category</label>
                    <select
                      name="category"
                      className="w-full p-2.5 border border-gray-300 rounded-md bg-white"
                    >
                      <option value="Class C (Large)">Class C (Large)</option>
                      <option value="Class B (Medium)">Class B (Medium)</option>
                      <option value="Class A (Small)">Class A (Small)</option>
                    </select>
                  </div>
                  
                  {/* Number of Members */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Members</label>
                    <input
                      type="text"
                      name="members"
                      placeholder="1,000,000"
                      className="w-full p-2.5 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                {/* Association Address */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Association Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter physical address"
                    className="w-full p-2.5 border border-gray-300 rounded-md"
                  />
                </div>
                
                {/* Date Established */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Established</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="established"
                      placeholder="March 26th,2025"
                      className="w-full p-2.5 border border-gray-300 rounded-md pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Monthly Savings */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Savings(₦)</label>
                    <select
                      name="monthlySavings"
                      className="w-full p-2.5 border border-gray-300 rounded-md bg-white"
                    >
                      <option value="Class C (Large)">Class C (Large)</option>
                      <option value="Class B (Medium)">Class B (Medium)</option>
                      <option value="Class A (Small)">Class A (Small)</option>
                    </select>
                  </div>
                  
                  {/* Loan Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Duration(months)</label>
                    <input
                      type="text"
                      name="loanDuration"
                      placeholder="1,000,000"
                      className="w-full p-2.5 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Minimum Loan Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Loan Amount(₦)</label>
                    <input
                      type="text"
                      name="minLoanAmount"
                      className="w-full p-2.5 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  {/* Maximum Loan Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Loan Amount(₦)</label>
                    <input
                      type="text"
                      name="maxLoanAmount"
                      className="w-full p-2.5 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Interest Rate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate(%)</label>
                    <input
                      type="text"
                      name="interestRate"
                      className="w-full p-2.5 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  {/* Interest Application */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interest Application</label>
                    <select
                      name="interestApplication"
                      className="w-full p-2.5 border border-gray-300 rounded-md bg-white"
                    >
                      <option value="Reducing Balance">Reducing Balance</option>
                      <option value="Flat Rate">Flat Rate</option>
                    </select>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1E293B] text-white rounded-md"
                  >
                    Submit Association
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
