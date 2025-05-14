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
  
  // Handler to navigate to association details
  const handleViewAssociation = (id: number) => {
    navigate(`/associations/${id}`);
  };
  
  return (
    <div className="p-3 md:p-8 bg-[#F5F7FA]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0 mb-4 md:mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">Associations</h1>
          <p className="text-gray-500 text-xs md:text-sm">Manage all cooperative associations</p>
        </div>
        <button 
          className="bg-blue-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-md flex items-center justify-center gap-2 w-full md:w-auto"
          onClick={() => setShowModal(true)}
        >
          <span className="text-lg">+</span>
          Add Association
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-0 mb-4 md:mb-6">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
           <img src='/search.png' alt="search" className="w-4 h-4 md:w-5 md:h-5"/>
          </div>
          <input
            type="text"
            placeholder="Search associations..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="border border-gray-300 px-3 md:px-4 py-1 md:py-2 rounded-md flex items-center justify-center gap-2 w-full md:w-auto">
          <img src='filter.svg' alt="filter" className="w-4 h-4 md:w-5 md:h-5"/>
          Filter
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="px-2 md:px-6 py-2 md:py-4 font-normal text-xs md:text-sm">Name</th>
              <th className="px-2 md:px-6 py-2 md:py-4 font-normal text-xs md:text-sm">Members</th>
              <th className="px-2 md:px-6 py-2 md:py-4 font-normal text-xs md:text-sm">Loans</th>
              <th className="px-2 md:px-6 py-2 md:py-4 font-normal text-xs md:text-sm">Created</th>
              <th className="px-2 md:px-6 py-2 md:py-4 font-normal text-xs md:text-sm">Status</th>
              <th className="px-2 md:px-6 py-2 md:py-4 font-normal text-xs md:text-sm">Default Rate</th>
              <th className="px-2 md:px-6 py-2 md:py-4 font-normal text-xs md:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {associations.map(association => (
              <tr key={association.id}>
                <td className="px-2 md:px-6 py-2 md:py-4 text-xs md:text-sm">{association.name}</td>
                <td className="px-2 md:px-6 py-2 md:py-4 text-xs md:text-sm">{association.members}</td>
                <td className="px-2 md:px-6 py-2 md:py-4 text-xs md:text-sm">{association.loans}</td>
                <td className="px-2 md:px-6 py-2 md:py-4 text-xs md:text-sm">{association.created}</td>
                <td className="px-2 md:px-6 py-2 md:py-4 text-xs md:text-sm">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-[10px] md:text-xs">
                    {association.status}
                  </span>
                </td>
                <td className="px-2 md:px-6 py-2 md:py-4 text-xs md:text-sm">{association.defaultRate}</td>
                <td className="px-2 md:px-6 py-2 md:py-4">
                  <button 
                    className="flex items-center justify-center gap-1 md:gap-x-4 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200 w-full md:w-auto"
                    onClick={() => handleViewAssociation(association.id)}
                  >
                      <img src="/view.svg" alt="pic" width={16} height={16} className="md:w-[18px] md:h-[18px]"/> 
                      <span className='font-medium text-xs md:text-lg'>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 text-xs md:text-sm">
          <span className="text-gray-600 mb-2 md:mb-0">Previous page</span>
          <div className="flex items-center gap-1 md:gap-2">
            {[1, 2, 3, '...', 30].map((page, index) => (
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
      </div>
      
      {/* Add New Association Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-100 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[540px] max-h-[90vh] overflow-y-auto m-3 md:m-0">
            <div className="p-3 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-1">Add New Association</h2>
              <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6">Create a new association under the cooperative. Fill in all required details below.</p>
              
              <form>
                {/* Association Name */}
                <div className="mb-3 md:mb-4">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Association Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter association name"
                    className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                  />
                </div>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                  {/* Association Category */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Association Category</label>
                    <select
                      name="category"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md bg-white text-xs md:text-sm"
                    >
                      <option value="Class C (Large)">Class C (Large)</option>
                      <option value="Class B (Medium)">Class B (Medium)</option>
                      <option value="Class A (Small)">Class A (Small)</option>
                    </select>
                  </div>
                  
                  {/* Number of Members */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Number of Members</label>
                    <input
                      type="text"
                      name="members"
                      placeholder="1,000,000"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                    />
                  </div>
                </div>
                
                {/* Association Address */}
                <div className="mb-3 md:mb-4">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Association Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter physical address"
                    className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                  />
                </div>
                
                {/* Date Established */}
                <div className="mb-3 md:mb-4">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Date Established</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="established"
                      placeholder="March 26th,2025"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md pr-10 text-xs md:text-sm"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                  {/* Monthly Savings */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Monthly Savings(₦)</label>
                    <select
                      name="monthlySavings"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md bg-white text-xs md:text-sm"
                    >
                      <option value="Class C (Large)">Class C (Large)</option>
                      <option value="Class B (Medium)">Class B (Medium)</option>
                      <option value="Class A (Small)">Class A (Small)</option>
                    </select>
                  </div>
                  
                  {/* Loan Duration */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Loan Duration(months)</label>
                    <input
                      type="text"
                      name="loanDuration"
                      placeholder="1,000,000"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                    />
                  </div>
                </div>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                  {/* Minimum Loan Amount */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Minimum Loan Amount(₦)</label>
                    <input
                      type="text"
                      name="minLoanAmount"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                    />
                  </div>
                  
                  {/* Maximum Loan Amount */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Maximum Loan Amount(₦)</label>
                    <input
                      type="text"
                      name="maxLoanAmount"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                    />
                  </div>
                </div>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  {/* Interest Rate */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Interest Rate(%)</label>
                    <input
                      type="text"
                      name="interestRate"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                    />
                  </div>
                  
                  {/* Interest Application */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Interest Application</label>
                    <select
                      name="interestApplication"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md bg-white text-xs md:text-sm"
                    >
                      <option value="Reducing Balance">Reducing Balance</option>
                      <option value="Flat Rate">Flat Rate</option>
                    </select>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col md:flex-row md:justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-xs md:text-sm w-full md:w-auto order-2 md:order-1"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1E293B] text-white rounded-md text-xs md:text-sm w-full md:w-auto order-1 md:order-2"
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
