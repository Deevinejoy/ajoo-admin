import Linechart from '../Linechart';
import Piechart from '../Piechart';

export default function AssDashboard() {
    const pieChartData = [
        { name: 'Active Loans', value: 65 },
        { name: 'Completed', value: 30 },
        { name: 'Overdue', value: 15 },
    
      ];
    
    
    return (
        <div className="m-2 md:m-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          {/* Cards */}
          <div className="bg-white rounded-[10px] shadow-md flex justify-between p-4 md:p-8">
            <div className="self-center">
              <p className="text-[#373737] text-sm md:text-base">Total Members</p>
              <div className="flex gap-x-[10px]">
                <h2 className="text-xl md:text-3xl font-semibold">15</h2>
                <div className="flex gap-x-1">
                  <img src="/up.svg" alt="pic" width={14} height={14} />
                  <p className="text-[#0F8B42] text-[12px] self-center">15%</p>
                </div>
              </div>
            </div>
            <div className="self-center">
              <img src="/briefcase.svg" alt="pic" />
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow-md flex justify-between p-4 md:p-8">
            <div className="self-center">
              <p className="text-[#373737] text-sm md:text-base">Total Loans</p>
              <div className="flex gap-x-[10px]">
                <h2 className="text-xl md:text-3xl font-semibold">68</h2>
                <div className="flex gap-x-1">
                  <img src="/up.svg" alt="pic" width={14} height={14} />
                  <p className="text-[#0F8B42] text-[12px] self-center">8%</p>
                </div>
              </div>
            </div>
            <div className="self-center">
              <img src="/people.svg" alt="pic" />
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow-md flex justify-between p-4 md:p-8">
            <div className="self-center">
              <p className="text-[#373737] text-sm md:text-base">Attendance</p>
              <div className="flex gap-x-[10px]">
                <h2 className="text-xl md:text-3xl font-semibold">68</h2>
                <div className="flex gap-x-1">
                  <img src="/up.svg" alt="pic" width={14} height={14} />
                  <p className="text-[#0F8B42] text-[12px] self-center">8%</p>
                </div>
              </div>
            </div>
            <div className="self-center">
              <img src="/card.svg" alt="pic" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-10">
          {/* Pie Chart */}
          <div className="bg-white p-4 rounded-[10px] shadow mb-6 w-full md:w-1/2">
            <Piechart 
                title="Loan Repayment Status" 
                subtitle="Current period" 
                data={pieChartData} 
              />
          </div>
          <div className="w-full bg-white rounded-[10px] p-4 md:p-7 shadow mb-6">
            <div className="flex flex-col sm:flex-row justify-between mb-4">
              <h3 className="font-semibold text-lg md:text-xl text-[#373737]">Debt summary - defaulted loans</h3>
              <p className="text-base md:text-xl text-[#5090D1] cursor-pointer">View All</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead className="bg-white">
                  <tr>
                    <th className="border-b border-gray-300 px-2 md:px-4 py-2 text-left text-[#939393] font-semibold text-sm md:text-lg">Member</th>
                    <th className="border-b border-gray-300 px-2 md:px-4 py-2 text-left text-[#939393] font-semibold text-sm md:text-lg">Amount</th>
                    <th className="border-b border-gray-300 px-2 md:px-4 py-2 text-left text-[#939393] font-semibold text-sm md:text-lg">Days left</th>
                    <th className="border-b border-gray-300 px-2 md:px-4 py-2 text-left text-[#939393] font-semibold text-sm md:text-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-gray-300 px-2 md:px-4 py-2 text-left text-[#373737] font-semibold text-sm md:text-lg">John Doe</td>
                    <td className="border-b border-gray-300 px-2 md:px-4 py-2 text-left text-[#373737] font-semibold text-sm md:text-lg">$1,200</td>
                    <td className="border-b border-gray-300 px-2 md:px-4 py-2 text-red-500 font-semibold text-sm md:text-lg">40</td>
                    <td className="border-b border-gray-300 px-2 md:px-4 py-2">
                      <button className='flex gap-x-2 md:gap-x-6 bg-[#F2F2F2] p-2 md:p-[10px] rounded-[10px]'>
                        <img src='/view.svg' alt='view'/>
                        <p className='text-base md:text-xl text-[#373737] font-medium'>View</p>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-300 px-2 md:px-4 py-2 text-left text-[#373737] font-semibold text-sm md:text-lg">Jane Smith</td>
                    <td className="border-b border-gray-300 px-2 md:px-4 py-2 text-left text-[#373737] font-semibold text-sm md:text-lg">$800</td>
                    <td className="border-b border-gray-300 px-2 md:px-4 py-2 text-red-500 font-semibold text-sm md:text-lg">40</td>
                    <td className="border-b border-gray-300 px-2 md:px-4 py-2">
                      <button className='flex gap-x-2 md:gap-x-6 bg-[#F2F2F2] p-2 md:p-[10px] rounded-[10px]'>
                        <img src='/view.svg' alt='view'/>
                        <p className='text-base md:text-xl text-[#373737] font-medium'>View</p>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-[10px] shadow mb-6 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
              <h3 className="font-semibold text-lg md:text-xl text-[#373737] mb-2 sm:mb-0">Attendance Overview</h3>
              <button className="bg-gray-100 px-3 py-1 rounded text-base md:text-xl text-[#373737]">By year</button>
            </div>
            <Linechart/>
          </div>
      </div>
    )
}