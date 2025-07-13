import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";

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
  const [_currentPage, _setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [associations, setAssociations] = useState<Association[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<CreateAssociationForm>({
    name: "",
    leaderName: "",
    leaderPhoneNumber: "",
    category: "Large",
    monthlySavings: "",
    minimumLoanAmount: "",
    maximumLoanAmount: "",
    loanDuration: "",
    interestRate: "",
    foundedDate: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchAssociations = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://ajo.nickyai.online/api/v1/cooperative/associations/overview",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch associations");
        }

        const result = await response.json();
        const data = result.data || result;

        // Transform the API data to match our interface
        const transformedAssociations = Array.isArray(data)
          ? data.map((item: ApiAssociation) => ({
              id: String(item.id || item.associationId || ""),
              name: item.name || item.associationName || "",
              members: item.members || item.totalMembers || 0,
              loans: item.loans || item.activeLoans || 0,
              created: item.created || item.createdAt || item.dateCreated || "",
              status: item.status || "active",
              defaultRate: item.defaultRate || item.interestRate || "0%",
            }))
          : [];

        setAssociations(transformedAssociations);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error fetching associations";
        setError(errorMessage);
        console.error("Error fetching associations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssociations();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const token = localStorage.getItem("token");
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

      const response = await fetch(
        "https://ajo.nickyai.online/api/v1/cooperative/associations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create association");
      }

      // Close modal and refresh associations list
      setShowModal(false);
      setFormData({
        name: "",
        leaderName: "",
        leaderPhoneNumber: "",
        category: "Large",
        monthlySavings: "",
        minimumLoanAmount: "",
        maximumLoanAmount: "",
        loanDuration: "",
        interestRate: "",
        foundedDate: "",
      });

      // Refresh the associations list
      window.location.reload();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error creating association";
      setSubmitError(errorMessage);
      console.error("Error creating association:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handler to navigate to association details
  const handleViewAssociation = (id: string) => {
    navigate(`/associations/${id}`);
  };

  // Filter associations based on search term
  const filteredAssociations = associations.filter((association) =>
    association.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 text-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Associations</h1>
          <p className="text-gray-400 text-sm">
            Manage all cooperative associations
          </p>
        </div>
        <button
          className="bg-[#E5B93E] text-black px-5 py-2 rounded-lg flex items-center justify-center gap-x-2 hover:bg-yellow-400 font-bold w-full md:w-auto cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          + Add Association
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search associations..."
            className="w-full pl-10 pr-4 py-2 bg-[#1C1C1C] border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#E5B93E]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src="/search.png"
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 invert opacity-50"
          />
        </div>
        <button className="flex items-center justify-center gap-x-2 border border-gray-700/50 bg-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-white w-full md:w-auto">
          <img src="filter.svg" alt="filter" className="w-4 h-4 invert" />
          <span>Filter</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="p-8 text-center">
          <div className="text-red-400">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#E5B93E] text-black rounded-lg font-bold hover:bg-yellow-400"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Members
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Loans
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Default Rate
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAssociations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      {searchTerm
                        ? "No associations found matching your search."
                        : "No associations available."}
                    </td>
                  </tr>
                ) : (
                  filteredAssociations.map((association) => (
                    <tr
                      key={association.id}
                      className="border-b border-gray-700/50 hover:bg-gray-800/40"
                    >
                      <td className="px-6 py-4 text-sm">{association.name}</td>
                      <td className="px-6 py-4 text-sm">
                        {association.members}
                      </td>
                      <td className="px-6 py-4 text-sm">{association.loans}</td>
                      <td className="px-6 py-4 text-sm">
                        {association.created}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-green-800/50 text-green-300 px-2 py-1 rounded-full text-xs">
                          {association.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {association.defaultRate}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-sm"
                          onClick={() => handleViewAssociation(association.id)}
                        >
                          <img
                            src="/view.svg"
                            alt="view"
                            className="w-4 h-4 invert"
                          />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">
            {filteredAssociations.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                {searchTerm
                  ? "No associations found matching your search."
                  : "No associations available."}
              </div>
            ) : (
              filteredAssociations.map((association) => (
                <div
                  key={association.id}
                  className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">
                      {association.name}
                    </span>
                    <span className="bg-green-800/50 text-green-300 px-2 py-1 rounded-full text-xs">
                      {association.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-400">Members</p>
                      <p>{association.members}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Loans</p>
                      <p>{association.loans}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Default Rate</p>
                      <p>{association.defaultRate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Created</p>
                      <p>
                        {new Date(association.created).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    className="w-full mt-2 flex items-center justify-center gap-x-2 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-sm"
                    onClick={() => handleViewAssociation(association.id)}
                  >
                    <img
                      src="/view.svg"
                      alt="view"
                      className="w-4 h-4 invert"
                    />
                    <span>View Details</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg w-[95%] md:w-full max-w-2xl max-h-[90vh] text-white">
            <div className="p-6 border-b border-gray-700/50">
              <h2 className="text-xl font-bold">Add New Association</h2>
              <p className="text-gray-400 text-sm">
                Create a new association under the cooperative.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]"
            >
              {submitError && (
                <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg text-sm">
                  {submitError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Association Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter association name"
                  className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Leader Name
                  </label>
                  <input
                    type="text"
                    name="leaderName"
                    placeholder="Enter leader's full name"
                    className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
                    value={formData.leaderName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Leader Phone Number
                  </label>
                  <input
                    type="tel"
                    name="leaderPhoneNumber"
                    placeholder="Enter phone number"
                    className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
                    value={formData.leaderPhoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Association Category
                  </label>
                  <select
                    name="category"
                    className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg focus:outline-none focus:border-[#E5B93E]"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Large">Large</option>
                    <option value="Medium">Medium</option>
                    <option value="Small">Small</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Founded Date
                  </label>
                  <input
                    type="date"
                    name="foundedDate"
                    className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg focus:outline-none focus:border-[#E5B93E]"
                    value={formData.foundedDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Monthly Savings (₦)
                  </label>
                  <input
                    type="number"
                    name="monthlySavings"
                    placeholder="e.g., 100000"
                    className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
                    value={formData.monthlySavings}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Loan Duration (months)
                  </label>
                  <input
                    type="number"
                    name="loanDuration"
                    placeholder="e.g., 10"
                    className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
                    value={formData.loanDuration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Minimum Loan Amount (₦)
                  </label>
                  <input
                    type="number"
                    name="minimumLoanAmount"
                    placeholder="e.g., 20000"
                    className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
                    value={formData.minimumLoanAmount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Maximum Loan Amount (₦)
                  </label>
                  <input
                    type="number"
                    name="maximumLoanAmount"
                    placeholder="e.g., 200000"
                    className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
                    value={formData.maximumLoanAmount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  name="interestRate"
                  placeholder="e.g., 4.2"
                  step="0.1"
                  className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
                  value={formData.interestRate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
            <div className="flex justify-end gap-4 p-6 border-t border-gray-700/50">
              <button
                type="button"
                className="px-6 py-2 border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50"
                onClick={() => setShowModal(false)}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="add-association-form" // This should match the form id if you add one
                onClick={handleSubmit} // Trigger form submit
                className="px-6 py-2 bg-[#E5B93E] text-black rounded-lg font-bold hover:bg-yellow-400 disabled:opacity-50"
                disabled={submitting}
              >
                {submitting ? "Creating..." : "Create Association"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
