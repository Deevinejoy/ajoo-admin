import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const AssLoanDetails: React.FC = () => {
    const { loanId } = useParams();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1)
    };

    // Pie chart data
    const data = [
        { name: 'Principal', value: 25000 },
        { name: 'Interest', value: 2500 },
    ];
    const COLORS = ['#3161FF', '#FFB800'];

    return (
        <div className="p-3 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-x-2 mb-4 md:mb-6">
                <button 
                    onClick={handleBack}
                    className="text-[#373737] flex items-center gap-x-2 text-lg md:text-2xl font-medium"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Loan Details
                </button>
                <button className='bg-[#3161FF] text-white px-4 md:px-6 py-1 md:py-2 rounded-md text-sm md:text-base'>
                    Export
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
                {/* Stats Cards */}
                <div className="bg-white p-4 md:p-6 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-[#373737] text-xs md:text-sm mb-1 md:mb-2">Total Amount</h3>
                            <p className="text-xl md:text-2xl font-semibold">₦600,000</p>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#E5EBFF] rounded-full flex items-center justify-center">
                            <img src="/loans1.svg" alt="amount" className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-[#373737] text-xs md:text-sm mb-1 md:mb-2">Amount Paid</h3>
                            <p className="text-xl md:text-2xl font-semibold">₦82,500</p>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#E5EBFF] rounded-full flex items-center justify-center">
                            <img src="/loans1.svg" alt="paid" className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-[#373737] text-xs md:text-sm mb-1 md:mb-2">Amount Due</h3>
                            <p className="text-xl md:text-2xl font-semibold">₦517,500</p>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#E5EBFF] rounded-full flex items-center justify-center">
                            <img src="/loans1.svg" alt="due" className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-4 md:space-y-6">
                    {/* Loan Information Card */}
                    <div className="bg-white rounded-lg p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Loan Information */}
                            <div className="space-y-3 md:space-y-4">
                                <h3 className="text-base md:text-lg font-semibold">Loan Information</h3>
                                <div className="space-y-1 md:space-y-2 text-sm md:text-base">
                                    <p><span className="font-medium">Loan ID:</span> {loanId}</p>
                                    <p><span className="font-medium">Amount:</span> ₦600,000</p>
                                    <p><span className="font-medium">Interest Rate:</span> 5% per annum</p>
                                    <p><span className="font-medium">Term:</span> 24 months</p>
                                    <p><span className="font-medium">Issue Date:</span> Jan 10, 2023</p>
                                    <p><span className="font-medium">Due Date:</span> Jan 10, 2025</p>
                                </div>
                            </div>

                            {/* Borrower Information */}
                            <div className="space-y-3 md:space-y-4">
                                <h3 className="text-base md:text-lg font-semibold">Borrower Information</h3>
                                <div className="space-y-1 md:space-y-2 text-sm md:text-base">
                                    <p><span className="font-medium">Member:</span> John Doe</p>
                                    <p><span className="font-medium">Member ID:</span> MOD234</p>
                                    <p><span className="font-medium">Phone:</span> +234 123 456 7890</p>
                                    <p><span className="font-medium">Email:</span> john.doe@example.com</p>
                                    <p><span className="font-medium">Credit Score:</span> 720</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Repayment Schedule */}
                    <div className="bg-white rounded-lg p-4 md:p-6 overflow-x-auto">
                        <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Repayment Schedule</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Due Date</th>
                                        <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Amount</th>
                                        <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Principal</th>
                                        <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Interest</th>
                                        <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3].map((_, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">Feb 10, 2024</td>
                                            <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">₦27,500</td>
                                            <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">₦25,000</td>
                                            <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">₦2,500</td>
                                            <td className="py-3 md:py-4 px-2 md:px-6">
                                                <span className="px-2 md:px-3 py-1 rounded-full text-xs bg-[#B9FBC0] text-[#0F8B42]">
                                                    Paid
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4 md:space-y-6">
                    {/* Loan Breakdown Chart */}
                    <div className="bg-white rounded-lg p-4 md:p-6">
                        <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Loan Breakdown</h3>
                        <div className="h-[250px] md:h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend 
                                        verticalAlign="bottom" 
                                        height={36}
                                        iconType="circle"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Payment History */}
                    <div className="bg-white rounded-lg p-4 md:p-6 overflow-x-auto">
                        <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Payment History</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[400px]">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Date</th>
                                        <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Amount</th>
                                        <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3].map((_, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">Feb 10, 2024</td>
                                            <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">₦27,500</td>
                                            <td className="py-3 md:py-4 px-2 md:px-6">
                                                <span className="px-2 md:px-3 py-1 rounded-full text-xs bg-[#B9FBC0] text-[#0F8B42]">
                                                    Successful
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssLoanDetails; 