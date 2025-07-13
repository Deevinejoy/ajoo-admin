import React, { useState, useEffect } from "react";

interface Association {
  id: string;
  name: string;
}

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    address: "",
    associationId: "",
    photo: null as File | null,
  });
  const [associations, setAssociations] = useState<Association[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssociations = async () => {
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

        if (response.ok) {
          const result = await response.json();
          const data = result.data || result;
          const transformedAssociations = Array.isArray(data)
            ? data.map(
                (item: {
                  id?: string;
                  name?: string;
                  associationName?: string;
                }) => ({
                  id: item.id || "",
                  name:
                    item.name || item.associationName || "Unknown Association",
                })
              )
            : [];
          setAssociations(transformedAssociations);
        }
      } catch (err) {
        console.error("Error fetching associations:", err);
      }
    };

    if (isOpen) {
      fetchAssociations();
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          submitData.append(key, value);
        }
      });

      const response = await fetch(
        "https://ajo.nickyai.online/api/v1/cooperative/members",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: submitData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add member");
      }

      onClose();
      window.location.reload();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error adding member";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg w-[95%] md:w-full max-w-lg max-h-[90vh] text-white">
        <div className="p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-bold">Add New Member</h2>
          <p className="text-gray-400 text-sm">
            Register a new member into an association.
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
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                onChange={handleInputChange}
                required
                className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                onChange={handleInputChange}
                required
                className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter phone number"
                onChange={handleInputChange}
                required
                className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                onChange={handleInputChange}
                required
                className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Address *
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter full address"
              onChange={handleInputChange}
              required
              className="w-full p-2.5 bg-[#0D0D0D] border border-gray-700/50 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E5B93E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Association *
            </label>
            <select
              name="associationId"
              onChange={handleInputChange}
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
              Member's Photo
            </label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-700/50 file:text-gray-300 hover:file:bg-gray-600/50"
            />
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
            {submitting ? "Adding..." : "Add Member"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
