import React, { useEffect, useState } from 'react';
import Piechart from '../Piechart';
import MyChart from '../Linechart';

interface LoanRepaymentStatus {
  status: string;
  count: string;
}

interface DebtSummary {
  memberName: string;
  amount: string;
  daysLeft: number;
}

interface AttendanceOverview {
  totalRecords: number;
  present: number;
  absent: number;
  late: number;
}

interface DashboardData {
  totalMembers: number;
  activeLoans: number;
  pendingLoans: number;
  loanRepaymentStatus: LoanRepaymentStatus[];
  debtSummary: DebtSummary[];
  attendanceOverview: AttendanceOverview;
}

export default function AssDashboard() {
    const [dashboard, setDashboard] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const associationId = localStorage.getItem('associationId');
        const token = localStorage.getItem('token');
        if (!associationId || !token) {
            setLoading(false);
            return;
        }
        fetch(`https://ajo.nickyai.online/api/v1/admin/dashboard/${associationId}/overview`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(res => {
                console.log('Response status:', res.status);
                return res.json();
            })
            .then(data => {
                console.log('Dashboard API Response:', data);
                if (data && typeof data === 'object') {
                    setDashboard(data);
                } else {
                    console.error('API returned error or no data:', data);
                    setDashboard(null);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!dashboard) return <div>No data found.</div>;

    const pieChartData = (dashboard.loanRepaymentStatus || []).map((item) => ({
        name: item.status,
        value: Number(item.count)
    }));

    // Prepare attendance data for the line chart
    const attendanceLineData = [
        { name: 'Total', value: dashboard.attendanceOverview?.totalRecords ?? 0 },
        { name: 'Present', value: dashboard.attendanceOverview?.present ?? 0 },
        { name: 'Absent', value: dashboard.attendanceOverview?.absent ?? 0 },
        { name: 'Late', value: dashboard.attendanceOverview?.late ?? 0 },
    ];

    return (
        <div className="m-1 sm:m-2 md:m-4 lg:m-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4">
          {/* Cards */}
          <div className="bg-white rounded-[10px] shadow-md flex justify-between p-3 sm:p-4 md:p-6">
            <div className="self-center">
              <p className="text-[#373737] text-xs sm:text-sm md:text-base">Total Members</p>
              <div className="flex gap-x-[10px]">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{dashboard.totalMembers}</h2>
              </div>
            </div>
            <div className="self-center">
              <img src="/briefcase.svg" alt="pic" className="w-6 h-6 sm:w-8 sm:h-8 md:w-auto md:h-auto" />
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow-md flex justify-between p-3 sm:p-4 md:p-6">
            <div className="self-center">
              <p className="text-[#373737] text-xs sm:text-sm md:text-base">Active Loans</p>
              <div className="flex gap-x-[10px]">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{dashboard.activeLoans}</h2>
              </div>
            </div>
            <div className="self-center">
              <img src="/people.svg" alt="pic" className="w-6 h-6 sm:w-8 sm:h-8 md:w-auto md:h-auto" />
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow-md flex justify-between p-3 sm:p-4 md:p-6">
            <div className="self-center">
              <p className="text-[#373737] text-xs sm:text-sm md:text-base">Pending Loans</p>
              <div className="flex gap-x-[10px]">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{dashboard.pendingLoans}</h2>
              </div>
            </div>
            <div className="self-center">
              <img src="/card.svg" alt="pic" className="w-6 h-6 sm:w-8 sm:h-8 md:w-auto md:h-auto" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-4 lg:gap-6">
          {/* Pie Chart */}
          <div className="bg-white p-3 sm:p-4 rounded-[10px] shadow mb-3 sm:mb-4 w-full md:w-1/2">
            <Piechart 
                title="Loan Repayment Status" 
                subtitle="Current period" 
                data={pieChartData} 
              />
          </div>
          <div className="w-full bg-white rounded-[10px] p-3 sm:p-4 md:p-5 shadow mb-3 sm:mb-4">
            <div className="flex flex-col sm:flex-row justify-between mb-3">
              <h3 className="font-semibold text-base sm:text-lg md:text-xl text-[#373737]">Debt summary - defaulted loans</h3>
              <p className="text-sm sm:text-base md:text-lg text-[#5090D1] cursor-pointer">View All</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px]">
                <thead className="bg-white">
                  <tr>
                    <th className="border-b border-gray-300 px-2 py-2 text-left text-[#939393] font-semibold text-xs sm:text-sm md:text-base">Member</th>
                    <th className="border-b border-gray-300 px-2 py-2 text-left text-[#939393] font-semibold text-xs sm:text-sm md:text-base">Amount</th>
                    <th className="border-b border-gray-300 px-2 py-2 text-left text-[#939393] font-semibold text-xs sm:text-sm md:text-base">Days left</th>
                    <th className="border-b border-gray-300 px-2 py-2 text-left text-[#939393] font-semibold text-xs sm:text-sm md:text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.debtSummary && dashboard.debtSummary.length > 0 ? dashboard.debtSummary.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border-b border-gray-300 px-2 py-2 text-left text-[#373737] font-semibold text-xs sm:text-sm md:text-base">{item.memberName}</td>
                      <td className="border-b border-gray-300 px-2 py-2 text-left text-[#373737] font-semibold text-xs sm:text-sm md:text-base">₦{Number(item.amount).toLocaleString()}</td>
                      <td className="border-b border-gray-300 px-2 py-2 text-red-500 font-semibold text-xs sm:text-sm md:text-base">{item.daysLeft}</td>
                      <td className="border-b border-gray-300 px-2 py-2">
                        <button className='flex gap-x-1 sm:gap-x-2 md:gap-x-3 bg-[#F2F2F2] p-1 sm:p-2 md:p-[10px] rounded-[10px]'>
                          <img src='/view.svg' alt='view' className="w-3 h-3 sm:w-4 sm:h-4 md:w-auto md:h-auto"/>
                          <p className='text-xs sm:text-sm md:text-base text-[#373737] font-medium'>View</p>
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={4} className="text-center text-gray-400 py-4">No debt summary data</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-[10px] shadow mb-3 sm:mb-4 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
              <h3 className="font-semibold text-base sm:text-lg md:text-xl text-[#373737] mb-2 sm:mb-0">Attendance Overview</h3>
              <button className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm md:text-base text-[#373737]">By year</button>
            </div>
            {/* Attendance Line Chart */}
            <MyChart data={attendanceLineData} />
        </div>
      </div>
    )
}