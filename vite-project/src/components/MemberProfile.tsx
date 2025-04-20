import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const MemberProfile: React.FC = () => {
    const { memberId } = useParams();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/members');
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-x-2 mb-6">
                <button 
                    onClick={handleBack}
                    className="text-[#373737] flex items-center gap-x-2 text-2xl font-medium"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Members Profile
                </button>
                <button className='bg-[#3161FF] text-white px-6 py-2 rounded-md'>
                    Export
                </button>
            </div>

            <div className="bg-white rounded-lg p-6">
                <div className="grid grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Personal Information</h3>
                        <div className="space-y-2">
                            <p><span className="font-medium">Name:</span> John Doe</p>
                            <p><span className="font-medium">Member ID:</span> {memberId}</p>
                            <p><span className="font-medium">Date Joined:</span> Jan 10, 2023</p>
                            <p><span className="font-medium">Phone:</span> +234 123 456 7890</p>
                            <p><span className="font-medium">Email:</span> john.doe@example.com</p>
                            <p><span className="font-medium">Address:</span> 123 Main St, Lagos</p>
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Financial Summary</h3>
                        <div className="space-y-2">
                            <p><span className="font-medium">Total Loans:</span> ₦2,500,000</p>
                            <p><span className="font-medium">Active Loans:</span> 2</p>
                            <p><span className="font-medium">Repayment Rate:</span> 95%</p>
                            <p><span className="font-medium">Credit Score:</span> 720</p>
                            <p><span className="font-medium">Last Payment:</span> ₦50,000 (Jan 15, 2024)</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="border-b pb-4">
                            <p className="font-medium">Loan Application</p>
                            <p className="text-sm text-gray-600">Applied for ₦500,000 loan on Jan 15, 2024</p>
                            <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#B9FBC0] text-[#0F8B42]">Approved</span>
                        </div>
                        <div className="border-b pb-4">
                            <p className="font-medium">Repayment</p>
                            <p className="text-sm text-gray-600">Made payment of ₦50,000 on Jan 10, 2024</p>
                            <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#B9FBC0] text-[#0F8B42]">Completed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberProfile; 