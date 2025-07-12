import React, { useState, useEffect } from "react";

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onMemberAdded?: () => void;
}

const AssAddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onMemberAdded,
}) => {
    const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    address: "",
    associationId: "",
    photo: null as File | null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
      const associationId = localStorage.getItem("associationId") || "";
      setFormData((prev) => ({ ...prev, associationId }));
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
    if (
      !formData.fullName ||
      !formData.dateOfBirth ||
      !formData.phoneNumber ||
      !formData.address ||
      !formData.associationId
    ) {
      setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        try {
      const token = localStorage.getItem("token");
            const formPayload = new FormData();
      formPayload.append("fullName", formData.fullName);
      formPayload.append("dateOfBirth", formData.dateOfBirth);
      formPayload.append("phoneNumber", formData.phoneNumber);
      formPayload.append("email", formData.email);
      formPayload.append("address", formData.address);
      formPayload.append("associationId", formData.associationId);
      if (formData.photo) formPayload.append("photo", formData.photo);

      const response = await fetch(
        "https://ajo.nickyai.online/api/v1/admin/create-member",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formPayload,
        }
      );

            const result = await response.json();
            if (!response.ok) {
        console.error("Backend error:", result);
        setError(result.message || "Failed to add member");
                return;
            }

      if (typeof onMemberAdded === "function") onMemberAdded();
            onClose();
        } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto text-white"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Add New Member</h2>
            <p className="text-gray-400 text-sm">
              Register a new member into the association.
            </p>
                    </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
                </div>

                <form onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-400 text-sm mb-4 p-2 bg-red-900/50 border border-red-400/50 rounded-lg">
              {error}
            </div>
          )}
                    <div className="space-y-4">
                        <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
                            <input
                                type="text"
                                placeholder="Enter member's full name"
                className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                }
                required
                            />
                        </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date of Birth
                </label>
                                <input
                                    type="date"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                                    value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dateOfBirth: e.target.value,
                    }))
                  }
                  required
                                />
                            </div>
                        </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                                <input
                                    type="tel"
                                    placeholder="Enter phone number"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                                    value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  required
                                />
                            </div>
                            
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address (Optional)
                </label>
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                                    value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                                />
                            </div>
                        </div>   
                        <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Address
              </label>
                            <input
                                type="text"
                                placeholder="Enter residential address"
                className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                required
                            />
                        </div>
                        <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Upload Member ID or Photo (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-700/50 rounded-lg p-4 text-center bg-[#0D0D0D] flex flex-col items-center justify-center">
                                <input
                                    type="file"
                                    className="hidden"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      photo: e.target.files?.[0] || null,
                    }))
                  }
                                    id="photo-upload"
                                />
                <img
                  className="self-center mb-2 invert"
                  src="/upload.svg"
                  alt="upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer text-gray-400 text-sm"
                >
                  <span className="text-[#E5B93E] font-semibold">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                  <br />
                  <span className="text-xs text-gray-500">PNG, JPG or GIF</span>
                                </label>
                            </div>
              {formData.photo && (
                <p className="text-xs text-gray-400 mt-2">
                  File selected: {formData.photo.name}
                </p>
              )}
                        </div>
                    </div>

          <div className="flex flex-col md:flex-row justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
              className="px-6 py-2 border-2 border-gray-700/50 rounded-lg font-bold hover:bg-gray-800/60"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
              className="px-6 py-2 bg-[#E5B93E] text-black rounded-lg font-bold hover:bg-yellow-400 disabled:opacity-60"
                            disabled={loading}
                        >
              {loading ? "Registering..." : "Register Member"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssAddMemberModal; 
