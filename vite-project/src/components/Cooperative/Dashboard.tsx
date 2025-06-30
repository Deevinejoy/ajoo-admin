import React, { useEffect, useState } from 'react';

interface DashboardData {
  totalMembers: number;
  activeLoans: number;
  pendingLoans: number;
  loanRepayments: Array<{ name: string; value: number }>;
  loanStatusDistribution: Array<{ name: string; value: number }>;
  recentActivities: Array<{
    title: string;
    description: string;
    status: string;
    timeAgo: string;
  }>;
}

interface Association {
  id: string;
  name: string;
  memberCount: number;
  loanCount: number;
  totalAmount: string;
  defaultRate: string;
}

export default function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [associations, setAssociations] = useState<Association[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem('token');
                
                // Fetch dashboard data
                const dashboardResponse = await fetch('https://ajo.nickyai.online/api/v1/cooperative/dashboard/details', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                
                if (!dashboardResponse.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }
                
                const dashboardResult = await dashboardResponse.json();
                setData(dashboardResult.data || dashboardResult);
                
                // Fetch associations data
                const associationsResponse = await fetch('https://ajo.nickyai.online/api/v1/cooperative/associations/overview', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                
                if (associationsResponse.ok) {
                    const associationsResult = await associationsResponse.json();
                    const associationsData = associationsResult.data || associationsResult;
                    
                    // Transform associations data to match our interface
                    const transformedAssociations = Array.isArray(associationsData) ? associationsData.map((item: {
                        id?: string;
                        name?: string;
                        associationName?: string;
                        memberCount?: number;
                        totalMembers?: number;
                        loanCount?: number;
                        activeLoans?: number;
                        totalAmount?: string;
                        totalLoanAmount?: string;
                        defaultRate?: string;
                    }) => ({
                        id: item.id || '',
                        name: item.name || item.associationName || 'Unknown Association',
                        memberCount: item.memberCount || item.totalMembers || 0,
                        loanCount: item.loanCount || item.activeLoans || 0,
                        totalAmount: item.totalAmount || item.totalLoanAmount || '₦0',
                        defaultRate: item.defaultRate || '0%',
                    })) : [];
                    
                    setAssociations(transformedAssociations);
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Error fetching dashboard data';
                setError(errorMessage);
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-4">Loading dashboard...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!data) return <div className="p-4">No data available.</div>;

    // Fallbacks for empty arrays
    const loanRepaymentData = data.loanRepayments || [];
    const loanStatusDistribution = data.loanStatusDistribution || [];
    const recentActivities = data.recentActivities || [];
    
    return (
        <div className="p-2 sm:p-3 md:p-4 overflow-x-hidden bg-[#F5F7FA]">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                {/* Card 1 */}
                <div className="bg-white rounded-[10px] shadow-md flex justify-between p-3 sm:p-4 md:p-6">
                    <div className="self-center space-y-1">
                        <p className="text-[#373737] text-xs sm:text-sm md:text-base">Total Members</p>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{data.totalMembers}</h2>
                        <p className="text-[#373737] text-xs md:text-sm self-center">Across all regions</p>
            </div>
            <div className="self-center">
                        <img src="/people.svg" alt="Members" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </div>
          </div>
                {/* Card 2 */}
                <div className="bg-white rounded-[10px] shadow-md flex justify-between p-3 sm:p-4 md:p-6">
                    <div className="self-center space-y-1">
                        <p className="text-[#373737] text-xs sm:text-sm md:text-base">Active Loans</p>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{data.activeLoans}</h2>
                        <p className="text-[#373737] text-xs md:text-sm self-center">Active loans</p>
                    </div>
                    <div className="self-center">
                        <img src="/loans1.svg" alt="Loans" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    </div>
                </div>
                {/* Card 3 */}
                <div className="bg-white rounded-[10px] shadow-md flex justify-between p-3 sm:p-4 md:p-6">
                    <div className="self-center space-y-1">
                        <p className="text-[#373737] text-xs sm:text-sm md:text-base">Pending Approval</p>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{data.pendingLoans}</h2>
                        <p className="text-[#373737] text-xs md:text-sm self-center">Pending Approval</p>
            </div>
            <div className="self-center">
                        <img src="/pending.svg" alt="Pending" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    </div>
                </div>
                {/* Card 4: Associations */}
                <div className="bg-white rounded-[10px] shadow-md flex justify-between p-3 sm:p-4 md:p-6">
                    <div className="self-center space-y-1">
                        <p className="text-[#373737] text-xs sm:text-sm md:text-base">Total Associations</p>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{associations.length}</h2>
                        <p className="text-[#373737] text-xs md:text-sm self-center">Across all regions</p>
                    </div>
                    <div className="self-center">
                        <img src="/briefcase.svg" alt="Associations" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
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
                        <div className="flex items-end h-full justify-between min-w-[280px]">
                            {loanRepaymentData.length === 0 ? (
                                <div className="text-gray-400 text-center w-full">No data</div>
                            ) : loanRepaymentData.map((item, index: number) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div 
                                        className="w-4 sm:w-5 md:w-6 bg-gray-800 rounded-sm" 
                                        style={{ height: `${item.value || 0}%` }}
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
                        {loanStatusDistribution.length === 0 ? (
                            <div className="text-gray-400 text-center w-full">No data</div>
                        ) : (
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                                {/* You can add a chart here using the data */}
                            <div className="rounded-full border-[15px] sm:border-[18px] md:border-[20px] border-[#1f2937] w-full h-full"></div>
                        </div>
                        )}
                    </div>
                </div>
                {/* Recent Activity */}
                <div className="bg-white rounded-[10px] shadow-md p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-medium mb-2">Recent Activity</h3>
                    <div className="space-y-2 sm:space-y-3 mt-2 overflow-y-auto max-h-[240px] sm:max-h-[260px] md:max-h-none">
                        {recentActivities.length === 0 ? (
                            <div className="text-gray-400 text-center w-full">No recent activity</div>
                        ) : recentActivities.map((activity, idx: number) => (
                            <div key={idx} className="flex items-start gap-2">
                            <div className="bg-blue-100 rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-blue-500 flex-shrink-0">
                                <span className="text-[10px] sm:text-xs">⏱️</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center flex-wrap gap-1">
                                        <span className="font-medium text-xs sm:text-sm">{activity.title || 'Activity'}</span>
                                        <span className="text-[8px] sm:text-[10px] bg-yellow-100 text-yellow-800 py-0.5 px-1 rounded-full">{activity.status || ''}</span>
                                </div>
                                    <p className="text-[10px] sm:text-xs mt-0.5 line-clamp-2">{activity.description || ''}</p>
                                    <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">{activity.timeAgo || ''}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Associations Section */}
            <div className="bg-white rounded-[10px] shadow-md p-3 sm:p-4 mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-base md:text-lg font-medium mb-2 sm:mb-3">Associations</h3>
                <div className="space-y-2 sm:space-y-3 overflow-x-auto">
                    {associations.length === 0 ? (
                        <div className="text-gray-400 text-center w-full py-4">No associations available</div>
                    ) : associations.map((association) => (
                        <div key={association.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 sm:pb-3 border-b last:border-0">
                            <div>
                                <h4 className="font-medium text-xs sm:text-sm md:text-base">{association.name}</h4>
                                <div className="flex flex-wrap gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-500 mt-1">
                                    <span>{association.memberCount} Members</span>
                                    <span>{association.loanCount} Loans</span>
                                    <span>{association.totalAmount}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 mt-1 sm:mt-0">
                                <span className="text-[10px] sm:text-xs">Default Rate: <span className="text-green-600">{association.defaultRate}</span></span>
                                <span className="text-gray-400">❯</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
      </div>
    );
}