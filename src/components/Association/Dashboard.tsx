import { useEffect, useState } from "react";
import Piechart from "../Piechart";
import MyChart from "../Linechart";
import LoadingSpinner from "../LoadingSpinner";

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
    const associationId = localStorage.getItem("associationId");
    const token = localStorage.getItem("token");
        if (!associationId || !token) {
            setLoading(false);
            return;
        }
    fetch(
      `https://ajo.nickyai.online/api/v1/admin/dashboard/${associationId}/overview`,
      {
            headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        console.log("Response status:", res.status);
                return res.json();
            })
      .then((data) => {
        console.log("Dashboard API Response:", data);
        if (data && typeof data === "object") {
                    setDashboard(data);
                } else {
          console.error("API returned error or no data:", data);
                    setDashboard(null);
                }
                setLoading(false);
            })
            .catch((error) => {
        console.error("Fetch error:", error);
                setLoading(false);
            });
    }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={60} />
      </div>
    );
  }
  
  if (!dashboard) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        No data found.
      </div>
    );
  }

    const pieChartData = (dashboard.loanRepaymentStatus || []).map((item) => ({
        name: item.status,
    value: Number(item.count),
    }));

    // Prepare attendance data for the line chart
    const attendanceLineData = [
    { name: "Total", value: dashboard.attendanceOverview?.totalRecords ?? 0 },
    { name: "Present", value: dashboard.attendanceOverview?.present ?? 0 },
    { name: "Absent", value: dashboard.attendanceOverview?.absent ?? 0 },
    { name: "Late", value: dashboard.attendanceOverview?.late ?? 0 },
    ];

    return (
    <div className="p-4 sm:p-6 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Cards */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
            <div className="self-center">
            <p className="text-gray-400 text-base">Total Members</p>
            <h2 className="text-4xl font-semibold text-white mt-1">
              {dashboard.totalMembers}
            </h2>
          </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/briefcase.svg" alt="pic" className="w-6 h-6 invert" />
              </div>
            </div>

        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
            <div className="self-center">
            <p className="text-gray-400 text-base">Active Loans</p>
            <h2 className="text-4xl font-semibold text-white mt-1">
              {dashboard.activeLoans}
            </h2>
          </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/people.svg" alt="pic" className="w-6 h-6 invert" />
              </div>
            </div>

        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
            <div className="self-center">
            <p className="text-gray-400 text-base">Pending Loans</p>
            <h2 className="text-4xl font-semibold text-white mt-1">
              {dashboard.pendingLoans}
            </h2>
          </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/card.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
          </div>
        </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Pie Chart */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-5 rounded-2xl shadow-lg w-full lg:w-1/3">
            <Piechart 
                title="Loan Repayment Status" 
                subtitle="Current period" 
                data={pieChartData} 
            theme="dark"
          />
        </div>
        <div className="w-full lg:w-2/3 bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-xl text-white">
              Debt Summary - Defaulted Loans
            </h3>
            <p className="text-sm font-semibold text-[#E5B93E] cursor-pointer hover:underline">
              View All
            </p>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-700/80">
                  <th className="p-3 text-left text-gray-400 font-semibold text-sm">
                    Member
                  </th>
                  <th className="p-3 text-left text-gray-400 font-semibold text-sm">
                    Amount
                  </th>
                  <th className="p-3 text-left text-gray-400 font-semibold text-sm">
                    Days left
                  </th>
                  <th className="p-3 text-left text-gray-400 font-semibold text-sm">
                    Actions
                  </th>
                  </tr>
                </thead>
                <tbody>
                {dashboard.debtSummary && dashboard.debtSummary.length > 0 ? (
                  dashboard.debtSummary.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-700/50">
                      <td className="p-3 text-left text-white font-medium text-sm">
                        {item.memberName}
                      </td>
                      <td className="p-3 text-left text-white font-medium text-sm">
                        ₦{Number(item.amount).toLocaleString()}
                      </td>
                      <td className="p-3 text-red-500 font-semibold text-sm">
                        {item.daysLeft}
                      </td>
                      <td className="p-3">
                        <button className="flex items-center gap-x-2 bg-gray-800/60 hover:bg-gray-700/60 py-2 px-3 rounded-lg cursor-pointer">
                          <img
                            src="/view.svg"
                            alt="view"
                            className="w-4 h-4 invert"
                          />
                          <p className="text-sm text-white font-medium">View</p>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 py-6">
                      No debt summary data
                    </td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      <div className="bg-[#1C1C1C] border border-gray-700/50 p-5 rounded-2xl shadow-lg w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h3 className="font-semibold text-xl text-white mb-2 sm:mb-0">
            Attendance Overview
          </h3>
          <button className="bg-gray-800/60 px-4 py-2 rounded-lg text-sm text-white hover:bg-gray-700/60 cursor-pointer">
            By year
          </button>
        </div>
        {/* Attendance Line Chart */}
        <MyChart data={attendanceLineData} theme="dark" />
      </div>
    </div>
  );
}
