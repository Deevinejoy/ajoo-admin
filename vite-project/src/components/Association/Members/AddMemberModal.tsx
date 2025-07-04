import React, { useState, useEffect } from 'react';

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onMemberAdded?: () => void;
}

const AssAddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose, onMemberAdded }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        address: '',
        associationId: '',
        photo: null as File | null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            const associationId = localStorage.getItem('associationId') || '';
            setFormData(prev => ({ ...prev, associationId }));
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        console.log('Form data on submit:', formData);
        if (!formData.fullName || !formData.dateOfBirth || !formData.phoneNumber || !formData.address || !formData.associationId) {
            setError('Please fill in all required fields.');
            return;
        }
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const formPayload = new FormData();
            formPayload.append('fullName', formData.fullName);
            formPayload.append('dateOfBirth', formData.dateOfBirth);
            formPayload.append('phoneNumber', formData.phoneNumber);
            formPayload.append('email', formData.email);
            formPayload.append('address', formData.address);
            formPayload.append('associationId', formData.associationId);
            if (formData.photo) formPayload.append('photo', formData.photo);
            const response = await fetch('https://ajo.nickyai.online/api/v1/admin/create-member', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formPayload
            });
            const result = await response.json();
            if (!response.ok) {
                // Log backend error for debugging
                console.error('Backend error:', result);
                setError(result.message || 'Failed to add member');
                return;
            }
            if (typeof onMemberAdded === 'function') onMemberAdded();
            onClose();
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'message' in err) {
                setError((err as { message?: string }).message || 'An error occurred');
            } else {
                setError('An error occurred');
            }
        } finally {
            setLoading(false);
        }
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
                    {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Member ID or Photo (Optional)</label>
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
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register Member'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssAddMemberModal; 