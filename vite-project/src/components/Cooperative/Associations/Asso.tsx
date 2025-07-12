import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Association {
  id: string;
  name: string;
  members: number;
  loans: number;
  created: string;
  status: string;
  defaultRate: string;
}

interface ApiAssociation {
  id?: string | number;
  associationId?: string | number;
  name?: string;
  associationName?: string;
  members?: number;
  totalMembers?: number;
  loans?: number;
  activeLoans?: number;
  created?: string;
  createdAt?: string;
  dateCreated?: string;
  status?: string;
  defaultRate?: string;
  interestRate?: string;
}

interface CreateAssociationForm {
  name: string;
  leaderName: string;
  leaderPhoneNumber: string;
  category: string;
  monthlySavings: string;
  minimumLoanAmount: string;
  maximumLoanAmount: string;
  loanDuration: string;
  interestRate: string;
  foundedDate: string;
}

export default function Asso() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [associations, setAssociations] = useState<Association[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<CreateAssociationForm>({
    name: '',
    leaderName: '',
    leaderPhoneNumber: '',
    category: 'Large',
    monthlySavings: '',
    minimumLoanAmount: '',
    maximumLoanAmount: '',
    loanDuration: '',
    interestRate: '',
    foundedDate: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const fetchAssociations = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://ajo.nickyai.online/api/v1/cooperative/associations/overview', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch associations');
        }
        
        const result = await response.json();
        const data = result.data || result;
        
        // Transform the API data to match our interface
        const transformedAssociations = Array.isArray(data) ? data.map((item: ApiAssociation) => ({
          id: String(item.id || item.associationId || ''),
          name: item.name || item.associationName || '',
          members: item.members || item.totalMembers || 0,
          loans: item.loans || item.activeLoans || 0,
          created: item.created || item.createdAt || item.dateCreated || '',
          status: item.status || 'active',
          defaultRate: item.defaultRate || item.interestRate || '0%',
        })) : [];
        
        setAssociations(transformedAssociations);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error fetching associations';
        setError(errorMessage);
        console.error('Error fetching associations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssociations();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const token = localStorage.getItem('token');
      const requestBody = {
        name: formData.name,
        leaderName: formData.leaderName,
        leaderPhoneNumber: formData.leaderPhoneNumber,
        category: formData.category,
        monthlySavings: parseFloat(formData.monthlySavings) || 0,
        minimumLoanAmount: parseFloat(formData.minimumLoanAmount) || 0,
        maximumLoanAmount: parseFloat(formData.maximumLoanAmount) || 0,
        loanDuration: parseInt(formData.loanDuration) || 0,
        interestRate: parseFloat(formData.interestRate) || 0,
        foundedDate: formData.foundedDate,
      };

      const response = await fetch('https://ajo.nickyai.online/api/v1/cooperative/associations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create association');
      }

      // Close modal and refresh associations list
      setShowModal(false);
      setFormData({
        name: '',
        leaderName: '',
        leaderPhoneNumber: '',
        category: 'Large',
        monthlySavings: '',
        minimumLoanAmount: '',
        maximumLoanAmount: '',
        loanDuration: '',
        interestRate: '',
        foundedDate: '',
      });
      
      // Refresh the associations list
      window.location.reload();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error creating association';
      setSubmitError(errorMessage);
      console.error('Error creating association:', err);
    } finally {
      setSubmitting(false);
    }
  };
  
  // Handler to navigate to association details
  const handleViewAssociation = (id: string) => {
    navigate(`/associations/${id}`);
  };

  // Filter associations based on search term
  const filteredAssociations = associations.filter(association =>
    association.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
        {loading ? (
          <div className="p-8 text-center">
            <div className="text-gray-500">Loading associations...</div>
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
                {filteredAssociations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-2 md:px-6 py-8 text-center text-gray-500">
                      {searchTerm ? 'No associations found matching your search.' : 'No associations available.'}
                    </td>
                  </tr>
                ) : (
                  filteredAssociations.map(association => (
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
                <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap min-w-[90px]">
                  <button 
                    className="flex items-center justify-center gap-1 md:gap-x-4 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200 w-full md:w-auto"
                    onClick={() => handleViewAssociation(association.id)}
                  >
                      <img src="/view.svg" alt="pic" width={16} height={16} className="md:w-[18px] md:h-[18px]"/> 
                      <span className='font-medium text-xs md:text-lg'>View</span>
                  </button>
                </td>
              </tr>
                  ))
                )}
          </tbody>
        </table>
        
            {filteredAssociations.length > 0 && (
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
            )}
          </>
        )}
      </div>
      
      {/* Add New Association Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-100 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[540px] max-h-[90vh] overflow-y-auto m-3 md:m-0">
            <div className="p-3 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-1">Add New Association</h2>
              <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6">Create a new association under the cooperative. Fill in all required details below.</p>
              
              {submitError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {/* Association Name */}
                <div className="mb-3 md:mb-4">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Association Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter association name"
                    className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                  {/* Leader Name */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Leader Name</label>
                    <input
                      type="text"
                      name="leaderName"
                      placeholder="Enter leader name"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                      value={formData.leaderName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  {/* Leader Phone Number */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Leader Phone Number</label>
                    <input
                      type="tel"
                      name="leaderPhoneNumber"
                      placeholder="Enter phone number"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                      value={formData.leaderPhoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                  {/* Association Category */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Association Category</label>
                    <select
                      name="category"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md bg-white text-xs md:text-sm"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Large">Large</option>
                      <option value="Medium">Medium</option>
                      <option value="Small">Small</option>
                    </select>
                  </div>
                  
                  {/* Founded Date */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Founded Date</label>
                    <input
                      type="date"
                      name="foundedDate"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                      value={formData.foundedDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                  {/* Monthly Savings */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Monthly Savings(₦)</label>
                    <input
                      type="number"
                      name="monthlySavings"
                      placeholder="100000"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                      value={formData.monthlySavings}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  {/* Loan Duration */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Loan Duration(months)</label>
                    <input
                      type="number"
                      name="loanDuration"
                      placeholder="10"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                      value={formData.loanDuration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                  {/* Minimum Loan Amount */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Minimum Loan Amount(₦)</label>
                    <input
                      type="number"
                      name="minimumLoanAmount"
                      placeholder="20000"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                      value={formData.minimumLoanAmount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  {/* Maximum Loan Amount */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Maximum Loan Amount(₦)</label>
                    <input
                      type="number"
                      name="maximumLoanAmount"
                      placeholder="200000"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                      value={formData.maximumLoanAmount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                  {/* Interest Rate */}
                <div className="mb-4 md:mb-6">
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Interest Rate(%)</label>
                    <input
                    type="number"
                      name="interestRate"
                    placeholder="4.2"
                    step="0.1"
                      className="w-full p-2 md:p-2.5 border border-gray-300 rounded-md text-xs md:text-sm"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col md:flex-row md:justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-xs md:text-sm w-full md:w-auto order-2 md:order-1"
                    onClick={() => setShowModal(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1E293B] text-white rounded-md text-xs md:text-sm w-full md:w-auto order-1 md:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting}
                  >
                    {submitting ? 'Creating...' : 'Submit Association'}
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
