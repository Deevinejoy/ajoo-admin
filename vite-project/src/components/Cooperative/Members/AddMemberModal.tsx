import React, { useState, useEffect } from 'react';

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Association {
    id: string;
    name: string;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        address: '',
        associationId: '',
        photo: null as File | null
    });
    const [associations, setAssociations] = useState<Association[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Fetch associations for the dropdown
    useEffect(() => {
        const fetchAssociations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('https://ajo.nickyai.online/api/v1/cooperative/associations/overview', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                
                if (response.ok) {
                    const result = await response.json();
                    const data = result.data || result;
                    
                    const transformedAssociations = Array.isArray(data) ? data.map((item: {
                        id?: string;
                        name?: string;
                        associationName?: string;
                    }) => ({
                        id: item.id || '',
                        name: item.name || item.associationName || 'Unknown Association',
                    })) : [];
                    
                    setAssociations(transformedAssociations);
                }
            } catch (err) {
                console.error('Error fetching associations:', err);
            }
        };

        if (isOpen) {
            fetchAssociations();
        }
    }, [isOpen]);

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            setError('Full name is required');
            return false;
        }
        if (!formData.dateOfBirth) {
            setError('Date of birth is required');
            return false;
        }
        if (!formData.phoneNumber.trim()) {
            setError('Phone number is required');
            return false;
        }
        if (!formData.address.trim()) {
            setError('Address is required');
            return false;
        }
        if (!formData.associationId) {
            setError('Please select an association');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (!validateForm()) {
            return;
        }

        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            
            // Create FormData for file upload
            const submitData = new FormData();
            submitData.append('fullName', formData.fullName);
            submitData.append('dateOfBirth', formData.dateOfBirth);
            submitData.append('phoneNumber', formData.phoneNumber);
            submitData.append('email', formData.email);
            submitData.append('address', formData.address);
            submitData.append('associationId', formData.associationId);
            
            if (formData.photo) {
                submitData.append('photo', formData.photo);
            }

            const response = await fetch('https://ajo.nickyai.online/api/v1/cooperative/members', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Don't set Content-Type for FormData, let the browser set it with boundary
                },
                body: submitData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add member');
            }

            // Reset form and close modal
            setFormData({
                fullName: '',
                dateOfBirth: '',
                phoneNumber: '',
                email: '',
                address: '',
                associationId: '',
                photo: null
            });
            
            // Close modal and refresh the members list
            onClose();
            
            // Optionally show success message or refresh the parent component
            window.location.reload(); // Simple refresh for now
            
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Error adding member';
            setError(errorMessage);
            console.error('Error adding member:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            fullName: '',
            dateOfBirth: '',
            phoneNumber: '',
            email: '',
            address: '',
            associationId: '',
            photo: null
        });
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay with blur effect */}
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={handleClose}></div>
            
            {/* Modal Content */}
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold">Add New Member</h2>
                        <p className="text-gray-600">Register a new member into an association.</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input
                                type="text"
                                placeholder="Enter member's full name"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={formData.fullName}
                                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                                required
                            />
                        </div>
                        <div className='flex gap-x-2'>
                            <div className='w-full'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className='w-full'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Association *</label>
                                <select
                                    className="w-full p-2 pr-8 border border-gray-300 rounded-lg"
                                    value={formData.associationId}
                                    onChange={(e) => setFormData(prev => ({ ...prev, associationId: e.target.value }))}
                                    required
                                >
                                    <option value="">Select an association</option>
                                    {associations.map((association) => (
                                        <option key={association.id} value={association.id}>
                                            {association.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div> 
                        <div className='flex gap-x-2'>
                            <div className='w-full'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    placeholder="Enter phone number"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                    required
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                            <input
                                type="text"
                                placeholder="Enter residential address"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={formData.address}
                                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                required
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
                                    accept="image/*"
                                />
                                <img className='self-center'  src='/upload.svg' alt='upload'/>
                                <label htmlFor="photo-upload" className="cursor-pointer text-gray-600">
                                    Click to upload or drag and drop<br />
                                    PNG, JPG or GIF
                                </label>
                            </div>
                            {formData.photo && (
                                <p className="text-sm text-green-600 mt-1">✓ {formData.photo.name} selected</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={submitting}
                        >
                            {submitting ? 'Adding Member...' : 'Register Member'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMemberModal; 