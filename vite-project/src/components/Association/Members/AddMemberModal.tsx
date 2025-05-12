import React, { useState } from 'react';

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AssAddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        address: '',
        association: '',
        photo: null as File | null
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay with blur effect */}
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            
            {/* Modal Content */}
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold">Add New Member</h2>
                        <p className="text-gray-600">Register a new member into an association.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter member's full name"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={formData.fullName}
                                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                            />
                        </div>
                        <div className='flex gap-x-2'>
                            <div className='w-full'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                                />
                            </div>
                            <div className='w-full'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Association</label>
                                <select
                                    className="w-full p-2 pr-8 border border-gray-300 rounded-lg"
                                    value={formData.association}
                                    onChange={(e) => setFormData(prev => ({ ...prev, association: e.target.value }))}
                                >
                                    <option value="">Select an association</option>
                                    <option value="1">Association 1</option>
                                    <option value="2">Association 2</option>
                                </select>
                            </div>
                        </div> 
                        <div className='flex gap-x-2'>
                            <div className='w-full'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="Enter phone number"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                />
                            </div>
                            
                            <div className='w-full'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                        </div>   
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input
                                type="text"
                                placeholder="Enter residential address"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={formData.address}
                                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Member ID or Photo</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-[#F5F7FA99] flex flex-col">
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.files?.[0] || null }))}
                                    id="photo-upload"
                                />
                                <img className='self-center'  src='/upload.svg' alt='upload'/>
                                <label htmlFor="photo-upload" className="cursor-pointer text-gray-600">
                                    Click to upload or drag and drop<br />
                                    PNG, JPG or GIF
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded-lg"
                        >
                            Register Member
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssAddMemberModal; 