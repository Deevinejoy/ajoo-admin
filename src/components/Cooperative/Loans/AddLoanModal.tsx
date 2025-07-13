import React, { useState, useEffect } from "react";

interface Member {
  id: string;
  name: string;
  associationId: string;
}

interface Association {
  id: string;
  name: string;
}

interface AddLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddLoanModal: React.FC<AddLoanModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    associationId: "",
    memberId: "",
    purpose: "",
    amount: "",
    repaymentPlan: "Monthly",
    termMonths: "",
    interestRate: "",
    issueDate: "",
    dueDate: "",
  });

  const [associations, setAssociations] = useState<Association[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      try {
        const token = localStorage.getItem("token");
        const [assocRes, membersRes] = await Promise.all([
          fetch(
            "https://ajo.nickyai.online/api/v1/cooperative/associations/overview",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          fetch("https://ajo.nickyai.online/api/v1/cooperative/members/view", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (assocRes.ok) {
          const assocResult = await assocRes.json();
          const transformedAssociations = (assocResult.data || assocResult).map(
            (a: any) => ({
              id: a.id,
              name: a.name || a.associationName,
            })
          );
          setAssociations(transformedAssociations);
        }

        if (membersRes.ok) {
          const membersResult = await membersRes.json();
          const transformedMembers =
            membersResult.data?.members?.map((m: any) => ({
              id: m.id,
              name: m.fullName,
              associationId: m.associationId,
            })) || [];
          setMembers(transformedMembers);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load necessary data.");
      }
    };

    fetchData();
  }, [isOpen]);

  const handleAssociationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, memberId: "" }));
    const associatedMembers = members.filter((m) => m.associationId === value);
    setFilteredMembers(associatedMembers);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://ajo.nickyai.online/api/v1/cooperative/loans/apply",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            memberId: formData.memberId,
            amount: parseFloat(formData.amount),
            purpose: formData.purpose,
            interestRate: parseFloat(formData.interestRate),
            term: parseInt(formData.termMonths),
            issueDate: formData.issueDate,
            dueDate: formData.dueDate,
            repaymentPlan: formData.repaymentPlan,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add loan");
      }

      onClose();
      window.location.reload();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error adding loan";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg w-[95%] md:w-full max-w-2xl max-h-[90vh] text-white">
        <div className="p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-bold">Add New Loan</h2>
          <p className="text-gray-400 text-sm">
            Submit a loan application for a cooperative member.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Member Association *
              </label>
              <select
                name="associationId"
                value={formData.associationId}
                onChange={handleAssociationChange}
                required
                className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg focus:outline-none focus:border-[#E5B93E]"
              >
                <option value="">Select Association</option>
                {associations.map((assoc) => (
                  <option key={assoc.id} value={assoc.id}>
                    {assoc.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Member *
              </label>
              <select
                name="memberId"
                value={formData.memberId}
                onChange={handleInputChange}
                required
                disabled={!formData.associationId}
                className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg focus:outline-none focus:border-[#E5B93E] disabled:opacity-50"
              >
                <option value="">Select Member</option>
                {filteredMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Loan Type *
            </label>
            <input
              type="text"
              name="purpose"
              placeholder="Enter loan purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              required
              className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Loan Amount (₦) *
              </label>
              <input
                type="number"
                name="amount"
                placeholder="e.g., 50000"
                value={formData.amount}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Repayment Plan *
              </label>
              <select
                name="repaymentPlan"
                value={formData.repaymentPlan}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg focus:outline-none focus:border-[#E5B93E]"
              >
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Bi-Weekly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Term (Months) *
              </label>
              <input
                type="number"
                name="termMonths"
                placeholder="e.g., 12"
                value={formData.termMonths}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Interest Rate (%) *
              </label>
              <input
                type="number"
                name="interestRate"
                placeholder="e.g., 5"
                step="0.1"
                value={formData.interestRate}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Issue Date *
              </label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
              />
            </div>
          </div>
        </form>
        <div className="flex justify-end gap-4 p-6 border-t border-gray-700/50">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-6 py-2 border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2 bg-[#E5B93E] text-black rounded-lg font-bold hover:bg-yellow-400 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Loan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLoanModal;
