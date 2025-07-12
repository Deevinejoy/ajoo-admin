import { useEffect, useState } from "react";

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
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");

        // Fetch dashboard data
        const dashboardResponse = await fetch(
          "https://ajo.nickyai.online/api/v1/cooperative/dashboard/details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!dashboardResponse.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const dashboardResult = await dashboardResponse.json();
        setData(dashboardResult.data || dashboardResult);

        // Fetch associations data
        const associationsResponse = await fetch(
          "https://ajo.nickyai.online/api/v1/cooperative/associations/overview",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (associationsResponse.ok) {
          const associationsResult = await associationsResponse.json();
          const associationsData =
            associationsResult.data || associationsResult;

          // Transform associations data to match our interface
          const transformedAssociations = Array.isArray(associationsData)
            ? associationsData.map(
                (item: {
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
                  id: item.id || "",
                  name:
                    item.name || item.associationName || "Unknown Association",
                  memberCount: item.memberCount || item.totalMembers || 0,
                  loanCount: item.loanCount || item.activeLoans || 0,
                  totalAmount: item.totalAmount || item.totalLoanAmount || "₦0",
                  defaultRate: item.defaultRate || "0%",
                })
              )
            : [];

          setAssociations(transformedAssociations);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error fetching dashboard data";
        setError(errorMessage);
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <div className="p-4 text-white">Loading dashboard...</div>;
  if (error) return <div className="p-4 text-red-400">{error}</div>;
  if (!data) return <div className="p-4 text-white">No data available.</div>;

  // Fallbacks for empty arrays
  const loanRepaymentData = data.loanRepayments || [];
  const loanStatusDistribution = data.loanStatusDistribution || [];
  const recentActivities = data.recentActivities || [];

  return (
    <div className="p-4 md:p-6 text-white">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1 */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
          <div className="self-center">
            <p className="text-gray-400 text-base">Total Members</p>
            <h2 className="text-4xl font-semibold text-white mt-1">
              {data.totalMembers}
            </h2>
          </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/people.svg" alt="Members" className="w-6 h-6 invert" />
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
          <div className="self-center">
            <p className="text-gray-400 text-base">Active Loans</p>
            <h2 className="text-4xl font-semibold text-white mt-1">
              {data.activeLoans}
            </h2>
          </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/loans1.svg" alt="Loans" className="w-6 h-6 invert" />
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
          <div className="self-center">
            <p className="text-gray-400 text-base">Pending Approval</p>
            <h2 className="text-4xl font-semibold text-white mt-1">
              {data.pendingLoans}
            </h2>
          </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img src="/pending.svg" alt="Pending" className="w-6 h-6 invert" />
          </div>
        </div>
        {/* Card 4: Associations */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg flex justify-between p-5">
          <div className="self-center">
            <p className="text-gray-400 text-base">Total Associations</p>
            <h2 className="text-4xl font-semibold text-white mt-1">
              {associations.length}
            </h2>
          </div>
          <div className="self-start bg-gray-800/60 p-3 rounded-lg">
            <img
              src="/briefcase.svg"
              alt="Associations"
              className="w-6 h-6 invert"
            />
          </div>
        </div>
      </div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Loan Repayment Trend */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-white">
            Loan Repayment Trend
          </h3>
          <p className="text-sm text-gray-400">Last 7 months</p>
          <div className="h-[200px] mt-4 overflow-x-auto">
            <div className="flex items-end h-full justify-between min-w-[280px]">
              {loanRepaymentData.length === 0 ? (
                <div className="text-gray-400 text-center w-full">No data</div>
              ) : (
                loanRepaymentData.map((item, index: number) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-6 bg-[#E5B93E] rounded-sm"
                      style={{ height: `${item.value || 0}%` }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-2">
                      {item.name}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* Loan Status Distribution */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-white">
            Loan Status Distribution
          </h3>
          <p className="text-sm text-gray-400">Current period</p>
          <div className="flex justify-center items-center h-[200px]">
            {loanStatusDistribution.length === 0 ? (
              <div className="text-gray-400 text-center w-full">No data</div>
            ) : (
              <div className="relative w-32 h-32">
                <div className="rounded-full border-[20px] border-[#E5B93E] w-full h-full"></div>
              </div>
            )}
          </div>
        </div>
        {/* Recent Activity */}
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4 overflow-y-auto max-h-[240px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {recentActivities.length === 0 ? (
              <div className="text-gray-400 text-center w-full">
                No recent activity
              </div>
            ) : (
              recentActivities.map((activity, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="bg-gray-800/60 rounded-lg h-8 w-8 flex items-center justify-center text-[#E5B93E] flex-shrink-0">
                    <span className="text-sm">⏱️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="font-medium text-sm text-white">
                        {activity.title || "Activity"}
                      </span>
                      <span className="text-xs bg-[#E5B93E]/20 text-[#E5B93E] py-1 px-2 rounded-full">
                        {activity.status || ""}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {activity.description || ""}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.timeAgo || ""}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Associations Section */}
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Associations</h3>
        <div className="space-y-4">
          {associations.length === 0 ? (
            <div className="text-gray-400 text-center w-full py-4">
              No associations available
            </div>
          ) : (
            associations.map((association) => (
              <div
                key={association.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 border-b border-gray-700/50 last:border-0"
              >
                <div>
                  <h4 className="font-medium text-white">{association.name}</h4>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2">
                    <span>{association.memberCount} Members</span>
                    <span>{association.loanCount} Loans</span>
                    <span>{association.totalAmount}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <span className="text-sm">
                    Default Rate:{" "}
                    <span className="text-[#E5B93E]">
                      {association.defaultRate}
                    </span>
                  </span>
                  <span className="text-gray-400">❯</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
