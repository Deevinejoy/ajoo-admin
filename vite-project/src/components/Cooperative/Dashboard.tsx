export default function Dashboard() {
    // Mock data for loan repayment trend
    const loanRepaymentData = [
        { name: 'Jan', value: 75 },
        { name: 'Feb', value: 25 },
        { name: 'Mar', value: 90 },
        { name: 'Apr', value: 65 },
        { name: 'May', value: 50 },
        { name: 'Jun', value: 45 },
        { name: 'Jul', value: 90 },
      ];
    
    return (
        <div className="p-2 sm:p-3 md:p-4 overflow-x-hidden bg-[#F5F7FA]">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                {/* Card 1 */}
                <div className="bg-white rounded-[10px] shadow-md flex justify-between p-3 sm:p-4 md:p-6">
                    <div className="self-center space-y-1">
                        <p className="text-[#373737] text-xs sm:text-sm md:text-base">Total Associations</p>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">15</h2>
                        <p className="text-[#373737] text-xs md:text-sm self-center">Across all regions</p>
                    </div>
                    <div className="self-center">
                        <img src="/briefcase.svg" alt="Associations" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-[10px] shadow-md flex justify-between p-3 sm:p-4 md:p-6">
                    <div className="self-center space-y-1">
                        <p className="text-[#373737] text-xs sm:text-sm md:text-base">Total Members</p>
                        <div className="flex gap-x-[6px] sm:gap-x-[10px] items-center">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">1200</h2>
                            <div className="flex gap-x-1">
                                <img src="/up.svg" alt="Increase" className="w-3 h-3 sm:w-4 sm:h-4" />
                                <p className="text-[#0F8B42] text-[8px] sm:text-[10px] md:text-[12px] self-center">8%</p>
                            </div>
                        </div>
                        <p className="text-[#373737] text-xs md:text-sm self-center">Active members</p>
                    </div>
                    <div className="self-center">
                        <img src="/people.svg" alt="Members" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-[10px] shadow-md flex justify-between p-3 sm:p-4 md:p-6">
                    <div className="self-center space-y-1">
                        <p className="text-[#373737] text-xs sm:text-sm md:text-base">Active Loans</p>
                        <div className="flex gap-x-[6px] sm:gap-x-[10px] items-center">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">340</h2>
                            <div className="flex gap-x-1">
                                <img src="/up.svg" alt="Increase" className="w-3 h-3 sm:w-4 sm:h-4" />
                                <p className="text-[#0F8B42] text-[8px] sm:text-[10px] md:text-[12px] self-center">8%</p>
                            </div>
                        </div>
                        <p className="text-[#373737] text-xs md:text-sm self-center">340</p>
                    </div>
                    <div className="self-center">
                        <img src="/loans1.svg" alt="Loans" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-[10px] shadow-md flex justify-between p-3 sm:p-4 md:p-6">
                    <div className="self-center space-y-1">
                        <p className="text-[#373737] text-xs sm:text-sm md:text-base">Pending Approval</p>
                        <div className="flex gap-x-[6px] sm:gap-x-[10px] items-center">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">25</h2>
                            <div className="flex gap-x-1">
                                <img src="/down.svg" alt="Decrease" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                <p className="text-[#EB4335] text-[8px] sm:text-[10px] md:text-[12px] self-center">3%</p>
                            </div>
                        </div>
                        <p className="text-[#373737] text-xs md:text-sm self-center">Pending Approval</p>
                    </div>
                    <div className="self-center">
                        <img src="/pending.svg" alt="Pending" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    </div>
                </div>
            </div>

            {/* Charts and Activity Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                {/* Loan Repayment Trend */}
                <div className="bg-white rounded-[10px] shadow-md p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-medium">Loan Repayment Trend</h3>
                    <p className="text-xs text-gray-500">Last 7 months</p>
                    <div className="h-[120px] sm:h-[140px] md:h-[160px] mt-3 overflow-x-auto">
                        {/* Custom bar chart that looks like the image */}
                        <div className="flex items-end h-full justify-between min-w-[280px]">
                            {loanRepaymentData.map((item, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div 
                                        className="w-4 sm:w-5 md:w-6 bg-gray-800 rounded-sm" 
                                        style={{ height: `${item.value}%` }}
                                    ></div>
                                    <span className="text-[10px] sm:text-xs mt-1 sm:mt-2">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Loan Status Distribution */}
                <div className="bg-white rounded-[10px] shadow-md p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-medium">Loan Status Distribution</h3>
                    <p className="text-xs text-gray-500">Current period</p>
                    <div className="flex justify-center items-center h-[120px] sm:h-[140px] md:h-[160px]">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                            <div className="rounded-full border-[15px] sm:border-[18px] md:border-[20px] border-[#1f2937] w-full h-full"></div>
                            <div className="absolute top-0 left-0 rounded-full border-[15px] sm:border-[18px] md:border-[20px] border-t-[#0F8B42] border-r-[#0F8B42] border-b-transparent border-l-transparent w-full h-full" style={{ transform: 'rotate(45deg)' }}></div>
                            <div className="absolute top-0 left-0 rounded-full border-[15px] sm:border-[18px] md:border-[20px] border-b-[#f59e0b] border-l-[#f59e0b] border-t-transparent border-r-transparent w-full h-full" style={{ transform: 'rotate(45deg)' }}></div>
                        </div>
                    </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-white rounded-[10px] shadow-md p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-medium mb-2">Recent Activity</h3>
                    <div className="space-y-2 sm:space-y-3 mt-2 overflow-y-auto max-h-[240px] sm:max-h-[260px] md:max-h-none">
                        <div className="flex items-start gap-2">
                            <div className="bg-blue-100 rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-blue-500 flex-shrink-0">
                                <span className="text-[10px] sm:text-xs">⏱️</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center flex-wrap gap-1">
                                    <span className="font-medium text-xs sm:text-sm">New Loan Request</span>
                                    <span className="text-[8px] sm:text-[10px] bg-yellow-100 text-yellow-800 py-0.5 px-1 rounded-full">Pending</span>
                                </div>
                                <p className="text-[10px] sm:text-xs mt-0.5 line-clamp-2">John Doe from Association X has requested new loan of ₦500,000.</p>
                                <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">2 hours ago</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                            <div className="bg-green-100 rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-green-500 flex-shrink-0">
                                <span className="text-[10px] sm:text-xs">₦</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center flex-wrap gap-1">
                                    <span className="font-medium text-xs sm:text-sm">Loan Repayment</span>
                                    <span className="text-[8px] sm:text-[10px] bg-green-100 text-green-800 py-0.5 px-1 rounded-full">Completed</span>
                                </div>
                                <p className="text-[10px] sm:text-xs mt-0.5 line-clamp-2">Jane Smith has repaid ₦20,000 for her loan.</p>
                                <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">5 hours ago</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="bg-purple-100 rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-purple-500 flex-shrink-0">
                                <span className="text-[10px] sm:text-xs">👤</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center flex-wrap gap-1">
                                    <span className="font-medium text-xs sm:text-sm">New Member</span>
                                    <span className="text-[8px] sm:text-[10px] bg-green-100 text-green-800 py-0.5 px-1 rounded-full">Completed</span>
                                </div>
                                <p className="text-[10px] sm:text-xs mt-0.5 line-clamp-2">Richard Roe has joined Association Y.</p>
                                <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">1 day ago</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                            <div className="bg-green-100 rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-green-500 flex-shrink-0">
                                <span className="text-[10px] sm:text-xs">✓</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center flex-wrap gap-1">
                                    <span className="font-medium text-xs sm:text-sm">Loan Approved</span>
                                    <span className="text-[8px] sm:text-[10px] bg-green-100 text-green-800 py-0.5 px-1 rounded-full">Completed</span>
                                </div>
                                <p className="text-[10px] sm:text-xs mt-0.5 line-clamp-2">You approved a loan request of ₦20,000 for Mary Johnson.</p>
                                <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">2 day ago</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="bg-red-100 rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-red-500 flex-shrink-0">
                                <span className="text-[10px] sm:text-xs">✕</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center flex-wrap gap-1">
                                    <span className="font-medium text-xs sm:text-sm">Loan Rejected</span>
                                    <span className="text-[8px] sm:text-[10px] bg-red-100 text-red-800 py-0.5 px-1 rounded-full">Rejected</span>
                                </div>
                                <p className="text-[10px] sm:text-xs mt-0.5 line-clamp-2">You rejected a loan request of ₦20,000 for Mary Johnson.</p>
                                <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">2 day ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Associations Section */}
            <div className="bg-white rounded-[10px] shadow-md p-3 sm:p-4 mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-base md:text-lg font-medium mb-2 sm:mb-3">Associations</h3>
                <div className="space-y-2 sm:space-y-3 overflow-x-auto">
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 sm:pb-3 border-b last:border-0">
                            <div>
                                <h4 className="font-medium text-xs sm:text-sm md:text-base">Association X</h4>
                                <div className="flex flex-wrap gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-500 mt-1">
                                    <span>120 Members</span>
                                    <span>45 Loans</span>
                                    <span>₦5,000,000</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 mt-1 sm:mt-0">
                                <span className="text-[10px] sm:text-xs">Default Rate: <span className="text-green-600">3%</span></span>
                                <span className="text-gray-400">❯</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}