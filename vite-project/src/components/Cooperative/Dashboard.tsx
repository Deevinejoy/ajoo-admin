import Linechart from '../Linechart';
import Piechart from '../Piechart';

export default function Dashboard() {
    const pieChartData = [
        { name: 'Active Loans', value: 65 },
        { name: 'Completed', value: 30 },
        { name: 'Overdue', value: 15 },
    ];
    
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
        <div className="m-8">
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          {/* Cards */}
          <div className="bg-white rounded-[10px] shadow-md  flex justify-between p-8">
            <div className="self-center space-y-2">
              <p className="text-[#373737]">Total Associations</p>
                <h2 className="text-3xl font-semibold">15</h2>
                <p className="text-[#373737] text-[14px] self-center">Across all regions</p>
            </div>
            <div className="self-center">
              <img src="/briefcase.svg" alt="pic" />
            </div>
          </div>
          <div className="bg-white rounded-[10px] shadow-md flex justify-between p-8">
            <div className="self-center space-y-1.5">
              <p className="text-[#373737]">Total Members</p>
              <div className="flex gap-x-[10px]">
                <h2 className="text-3xl font-semibold">1200</h2>
               
                <div className="flex gap-x-1">
                  <img src="/up.svg" alt="pic" width={14} height={14} />
                  <p className="text-[#0F8B42] text-[12px] self-center">8%</p>
                </div>
              </div>
              <p className="text-[#373737] text-[14px] self-center">Active members</p>

            </div>
            <div className="self-center">
              <img src="/people.svg" alt="pic" />
            </div>
          </div>
          <div className="bg-white rounded-[10px] shadow-md flex justify-between p-8">
            <div className="self-center space-y-1.5">
              <p className="text-[#373737]">Active Loans</p>
              <div className="flex gap-x-[10px]">
                <h2 className="text-3xl font-semibold">340</h2>
               
                <div className="flex gap-x-1">
                  <img src="/up.svg" alt="pic" width={14} height={14} />
                  <p className="text-[#0F8B42] text-[12px] self-center">8%</p>
                </div>
              </div>
              <p className="text-[#373737] text-[14px] self-center">340</p>

            </div>
            <div className="self-center">
              <img src="/loans1.svg" alt="pic" />
            </div>
          </div>
          <div className="bg-white rounded-[10px] shadow-md flex justify-between p-8">
            <div className="self-center space-y-1.5">
              <p className="text-[#373737]">Pending Approval</p>
              <div className="flex gap-x-[10px]">
                <h2 className="text-3xl font-semibold">25</h2>
               
                <div className="flex gap-x-1">
                  <img src="/down.svg" alt="pic" width={25} height={25} />
                  <p className="text-[#EB4335] text-[12px] self-center">3%</p>
                </div>
              </div>
              <p className="text-[#373737] text-[14px] self-center">Pending Approval</p>

            </div>
            <div className="self-center">
              <img src="/pending.svg" alt="pic" />
            </div>
          </div>
        </div>

        {/* Charts and Activity Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Loan Repayment Trend */}
          <div className="bg-white rounded-[10px] shadow-md p-6">
            <h3 className="text-lg font-medium">Loan Repayment Trend</h3>
            <p className="text-sm text-gray-500">Last 7 months</p>
            <div className="h-[180px] mt-4">
              {/* Custom bar chart that looks like the image */}
              <div className="flex items-end h-full justify-between">
                {loanRepaymentData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-gray-800 rounded-sm" 
                      style={{ height: `${item.value}%` }}
                    ></div>
                    <span className="text-xs mt-2">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Loan Status Distribution */}
          <div className="bg-white rounded-[10px] shadow-md p-6">
            <h3 className="text-lg font-medium">Loan Status Distribution</h3>
            <p className="text-sm text-gray-500">Current period</p>
            <div className="flex justify-center items-center h-[180px]">
              <div className="relative w-36 h-36">
                <div className="rounded-full border-[25px] border-[#1f2937] w-full h-full"></div>
                <div className="absolute top-0 left-0 rounded-full border-[25px] border-t-[#0F8B42] border-r-[#0F8B42] border-b-transparent border-l-transparent w-full h-full" style={{ transform: 'rotate(45deg)' }}></div>
                <div className="absolute top-0 left-0 rounded-full border-[25px] border-b-[#f59e0b] border-l-[#f59e0b] border-t-transparent border-r-transparent w-full h-full" style={{ transform: 'rotate(45deg)' }}></div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-[10px] shadow-md p-6">
            <h3 className="text-lg font-medium">Recent Activity</h3>
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center text-blue-500">
                  <span>⏱️</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">New Loan Request</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full">Pending</span>
                  </div>
                  <p className="text-sm mt-1">John Doe from Association X has requested new loan of ₦500,000.</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-green-100 rounded-full h-8 w-8 flex items-center justify-center text-green-500">
                  <span>₦</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Loan Repayment</span>
                    <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Completed</span>
                  </div>
                  <p className="text-sm mt-1">Jane Smith has repaid ₦20,000 for her loan.</p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-full h-8 w-8 flex items-center justify-center text-purple-500">
                  <span>👤</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">New Member</span>
                    <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Completed</span>
                  </div>
                  <p className="text-sm mt-1">Richard Roe has joined Association Y.</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-green-100 rounded-full h-8 w-8 flex items-center justify-center text-green-500">
                  <span>✓</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Loan Approved</span>
                    <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Completed</span>
                  </div>
                  <p className="text-sm mt-1">You approved a loan request of ₦20,000 for Mary Johnson.</p>
                  <p className="text-xs text-gray-500 mt-1">2 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-red-100 rounded-full h-8 w-8 flex items-center justify-center text-red-500">
                  <span>✕</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Loan Rejected</span>
                    <span className="text-xs bg-red-100 text-red-800 py-1 px-2 rounded-full">Rejected</span>
                  </div>
                  <p className="text-sm mt-1">You rejected a loan request of ₦20,000 for Mary Johnson.</p>
                  <p className="text-xs text-gray-500 mt-1">2 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Associations Section */}
        <div className="bg-white rounded-[10px] shadow-md p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">Associations</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex justify-between items-center pb-4 border-b last:border-0">
                <div>
                  <h4 className="font-medium">Association X</h4>
                  <div className="flex gap-6 text-sm text-gray-500 mt-1">
                    <span>120 Members</span>
                    <span>45 Loans</span>
                    <span>₦5,000,000</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Default Rate: <span className="text-green-600">3%</span></span>
                  <span className="text-gray-400">❯</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}