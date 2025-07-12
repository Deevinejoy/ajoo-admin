import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import { useScrollToTop } from "../../../lib/utils";

export type LoanApplication = {
  member: string;
  applicationId: string;
  amount: string;
  purpose: string;
  appliedOn: string;
  reviewedOn?: string;
  status: "Pending review" | "Approved" | "Rejected";
};

interface LoanApplicationReviewsProps {
  onView: (applicationId: string) => void;
}

const statusStyle = (status: LoanApplication["status"]) => {
  switch (status) {
    case "Pending review":
      return "bg-yellow-800/50 text-yellow-300";
    case "Approved":
      return "bg-green-800/50 text-green-300";
    case "Rejected":
      return "bg-red-800/50 text-red-300";
    default:
      return "bg-gray-700 text-gray-300";
  }
};

const AssLoanApplicationReviews: React.FC<LoanApplicationReviewsProps> = ({
  onView,
}) => {
  useScrollToTop();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token)
          throw new Error("No authentication token found. Please log in.");
        console.log("Token being sent:", token);
        const response = await fetch(
          "https://ajo.nickyai.online/api/v1/admin/get-all-applied-loans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch loan applications");
        const data = await response.json();
        setApplications(data.data || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Split applications into pending and recent for display
  const pending = applications.filter((app) => app.status === "Pending review");
  const recent = applications.filter((app) => app.status !== "Pending review");

  return (
    <div className="space-y-6 md:space-y-8 text-white">
      {loading && (
        <div className="flex justify-center items-center p-8">
          <LoadingSpinner />
        </div>
      )}
      {error && <div className="p-4 text-center text-red-500">{error}</div>}

      {/* Pending Loan Applications */}
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-3 md:p-6">
        <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
          Pending Loan Applications
        </h2>
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-gray-700/80">
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Member
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Application ID
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Amount
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Purpose
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Applied on
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Status
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pending.map((app, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-700/50 hover:bg-gray-800/40"
                >
                  <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                    {app.member?.fullName || "-"}
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                    {app.applicationId}
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                    ₦{Number(app.amount).toLocaleString()}
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                    {app.purpose}
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                    {new Date(app.appliedOn).toLocaleDateString()}
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6">
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                        "Pending review"
                      )}`}
                    >
                      Pending review
                    </span>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6">
                    <button
                      onClick={() => onView(app.applicationId)}
                      className="flex items-center gap-1 md:gap-x-2 bg-gray-700/50 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-600/50"
                    >
                      <img
                        src="/view.svg"
                        alt="view"
                        width={16}
                        height={16}
                        className="md:w-[18px] md:h-[18px] invert"
                      />
                      <span className="font-medium text-xs md:text-sm text-white">
                        View
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile Cards */}
        <div className="block md:hidden">
          <div className="space-y-4">
            {pending.map((app, idx) => (
              <div key={idx} className="bg-[#0D0D0D] p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-base">
                      {app.member?.fullName || "-"}
                    </p>
                    <p className="text-xs text-gray-400">
                      ID: {app.applicationId}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 mt-1 rounded-full text-xs font-semibold ${statusStyle(
                      "Pending review"
                    )}`}
                  >
                    Pending review
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <p>
                    Amount:{" "}
                    <span className="font-semibold text-white">
                      ₦{Number(app.amount).toLocaleString()}
                    </span>
                  </p>
                  <p>
                    Purpose:{" "}
                    <span className="font-semibold text-white">
                      {app.purpose}
                    </span>
                  </p>
                  <p>
                    Applied on:{" "}
                    <span className="font-semibold text-white">
                      {new Date(app.appliedOn).toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <div className="flex pt-2">
                  <button
                    onClick={() => onView(app.applicationId)}
                    className="w-full flex items-center justify-center gap-x-2 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 text-sm font-medium"
                  >
                    <img
                      src="/view.svg"
                      alt="view"
                      width={16}
                      height={16}
                      className="invert"
                    />
                    <span>View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 text-xs md:text-sm">
          <button className="text-gray-400 hover:text-white mb-2 md:mb-0">
            Previous page
          </button>
          <div className="flex items-center gap-1 md:gap-2">
            {[1, 2, 3, "...", 20].map((page, index) => (
              <button
                key={index}
                className={`px-2 md:px-3 py-1 rounded-md ${
                  page === 1
                    ? "bg-[#E5B93E] text-black"
                    : "text-gray-400 hover:bg-gray-700/50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="text-gray-400 hover:text-white mt-2 md:mt-0">
            Next page
          </button>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-3 md:p-6">
        <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
          Recent Applications
        </h2>
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-gray-700/80">
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Member
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Application ID
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Amount
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Applied on
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Reviewed on
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Status
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-6 text-gray-400 font-semibold text-xs md:text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recent.map((app, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-700/50 hover:bg-gray-800/40"
                >
                  <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                    {app.member?.fullName || "-"}
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                    {app.applicationId}
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                    ₦{Number(app.amount).toLocaleString()}
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                    {new Date(app.appliedOn).toLocaleDateString()}
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6 text-gray-300 text-xs md:text-sm">
                    -
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6">
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                        app.status === "APPROVED"
                          ? "Approved"
                          : app.status === "REJECTED"
                          ? "Rejected"
                          : "Pending review"
                      )}`}
                    >
                      {app.status === "APPROVED"
                        ? "Approved"
                        : app.status === "REJECTED"
                        ? "Rejected"
                        : "Pending review"}
                    </span>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-6">
                    <button
                      onClick={() => onView(app.applicationId)}
                      className="flex items-center gap-1 md:gap-x-2 bg-gray-700/50 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-600/50"
                    >
                      <img
                        src="/view.svg"
                        alt="view"
                        width={16}
                        height={16}
                        className="md:w-[18px] md:h-[18px] invert"
                      />
                      <span className="font-medium text-xs md:text-sm text-white">
                        View
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile Cards */}
        <div className="block md:hidden">
          <div className="space-y-4">
            {recent.map((app, idx) => (
              <div key={idx} className="bg-[#0D0D0D] p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-base">
                      {app.member?.fullName || "-"}
                    </p>
                    <p className="text-xs text-gray-400">
                      ID: {app.applicationId}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 mt-1 rounded-full text-xs font-semibold ${statusStyle(
                      app.status === "APPROVED"
                        ? "Approved"
                        : app.status === "REJECTED"
                        ? "Rejected"
                        : "Pending review"
                    )}`}
                  >
                    {app.status === "APPROVED"
                      ? "Approved"
                      : app.status === "REJECTED"
                      ? "Rejected"
                      : "Pending review"}
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <p>
                    Amount:{" "}
                    <span className="font-semibold text-white">
                      ₦{Number(app.amount).toLocaleString()}
                    </span>
                  </p>
                  <p>
                    Applied on:{" "}
                    <span className="font-semibold text-white">
                      {new Date(app.appliedOn).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    Reviewed on:{" "}
                    <span className="font-semibold text-white">-</span>
                  </p>
                </div>
                <div className="flex pt-2">
                  <button
                    onClick={() => onView(app.applicationId)}
                    className="w-full flex items-center justify-center gap-x-2 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-600/50 text-sm font-medium"
                  >
                    <img
                      src="/view.svg"
                      alt="view"
                      width={16}
                      height={16}
                      className="invert"
                    />
                    <span>View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 text-xs md:text-sm">
          <button className="text-gray-400 hover:text-white mb-2 md:mb-0">
            Previous page
          </button>
          <div className="flex items-center gap-1 md:gap-2">
            {[1, 2, 3, "...", 20].map((page, index) => (
              <button
                key={index}
                className={`px-2 md:px-3 py-1 rounded-md ${
                  page === 1
                    ? "bg-[#E5B93E] text-black"
                    : "text-gray-400 hover:bg-gray-700/50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="text-gray-400 hover:text-white mt-2 md:mt-0">
            Next page
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssLoanApplicationReviews;
