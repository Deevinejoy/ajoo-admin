import React from 'react';

export type LoanApplication = {
  member: string;
  applicationId: string;
  amount: string;
  purpose: string;
  appliedOn: string;
  reviewedOn?: string;
  status: 'Pending review' | 'Approved' | 'Rejected';
};

interface LoanApplicationReviewsProps {
  pending: LoanApplication[];
  recent: LoanApplication[];
  onView: (applicationId: string) => void;
}

const statusStyle = (status: LoanApplication['status']) => {
  switch (status) {
    case 'Pending review':
      return 'bg-[#FFF4CC] text-[#806B00]';
    case 'Approved':
      return 'bg-[#B9FBC0] text-[#0F8B42]';
    case 'Rejected':
      return 'bg-[#FFE5E5] text-[#D30000]';
    default:
      return '';
  }
};

const AssLoanApplicationReviews: React.FC<LoanApplicationReviewsProps> = ({ pending, recent, onView }) => (
  <div className="space-y-6 md:space-y-8">
    {/* Pending Loan Applications */}
    <div className="bg-white rounded-lg shadow p-3 md:p-6 overflow-x-auto">
      <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Pending Loan Applications</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Member</th>
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Application ID</th>
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Amount</th>
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Purpose</th>
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Applied on</th>
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Status</th>
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((app, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{app.member}</td>
                <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{app.applicationId}</td>
                <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{app.amount}</td>
                <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{app.purpose}</td>
                <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{app.appliedOn}</td>
                <td className="py-3 md:py-4 px-2 md:px-6">
                  <span className={`px-2 md:px-3 py-1 rounded-full text-xs ${statusStyle(app.status)}`}>{app.status}</span>
                </td>
                <td className="py-3 md:py-4 px-2 md:px-6">
                  <button onClick={() => onView(app.applicationId)} className="flex items-center gap-1 md:gap-x-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200">
                    <img src="/view.svg" alt="view" width={16} height={16} className="md:w-[18px] md:h-[18px]" />
                    <span className="font-medium text-xs md:text-sm">View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 text-xs md:text-sm">
        <button className="text-gray-600 hover:text-gray-900 mb-2 md:mb-0">Previous page</button>
        <div className="flex items-center gap-1 md:gap-2">
          {[1, 2, 3, '...', 20].map((page, index) => (
            <button
              key={index}
              className={`px-2 md:px-3 py-1 rounded ${page === 1 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="text-gray-600 hover:text-gray-900 mt-2 md:mt-0">Next page</button>
      </div>
    </div>

    {/* Recent Applications */}
    <div className="bg-white rounded-lg shadow p-3 md:p-6 overflow-x-auto">
      <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Recent Applications</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Member</th>
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Application ID</th>
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Amount</th>
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Applied on</th>
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Reviewed on</th>
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Status</th>
              <th className="text-left py-3 md:py-4 px-2 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((app, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{app.member}</td>
                <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{app.applicationId}</td>
                <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{app.amount}</td>
                <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{app.appliedOn}</td>
                <td className="py-3 md:py-4 px-2 md:px-6 text-[#373737] text-xs md:text-sm">{app.reviewedOn}</td>
                <td className="py-3 md:py-4 px-2 md:px-6">
                  <span className={`px-2 md:px-3 py-1 rounded-full text-xs ${statusStyle(app.status)}`}>{app.status}</span>
                </td>
                <td className="py-3 md:py-4 px-2 md:px-6">
                  <button onClick={() => onView(app.applicationId)} className="flex items-center gap-1 md:gap-x-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-gray-200">
                    <img src="/view.svg" alt="view" width={16} height={16} className="md:w-[18px] md:h-[18px]" />
                    <span className="font-medium text-xs md:text-sm">View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 text-xs md:text-sm">
        <button className="text-gray-600 hover:text-gray-900 mb-2 md:mb-0">Previous page</button>
        <div className="flex items-center gap-1 md:gap-2">
          {[1, 2, 3, '...', 20].map((page, index) => (
            <button
              key={index}
              className={`px-2 md:px-3 py-1 rounded ${page === 1 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="text-gray-600 hover:text-gray-900 mt-2 md:mt-0">Next page</button>
      </div>
    </div>
  </div>
);

export default AssLoanApplicationReviews; 