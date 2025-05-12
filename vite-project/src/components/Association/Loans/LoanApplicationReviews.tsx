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
  <div className="space-y-8">
    {/* Pending Loan Applications */}
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Pending Loan Applications</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Member</th>
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Application ID</th>
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Amount</th>
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Purpose</th>
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Applied on</th>
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Status</th>
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pending.map((app, idx) => (
            <tr key={idx} className="border-b border-gray-200">
              <td className="py-4 px-6 text-[#373737]">{app.member}</td>
              <td className="py-4 px-6 text-[#373737]">{app.applicationId}</td>
              <td className="py-4 px-6 text-[#373737]">{app.amount}</td>
              <td className="py-4 px-6 text-[#373737]">{app.purpose}</td>
              <td className="py-4 px-6 text-[#373737]">{app.appliedOn}</td>
              <td className="py-4 px-6">
                <span className={`px-3 py-1 rounded-full text-sm ${statusStyle(app.status)}`}>{app.status}</span>
              </td>
              <td className="py-4 px-6">
                <button onClick={() => onView(app.applicationId)} className="flex items-center gap-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                  <img src="/view.svg" alt="view" width={18} height={18} />
                  <span className="font-medium">View</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex items-center justify-between p-4">
        <button className="text-gray-600 hover:text-gray-900">Previous page</button>
        <div className="flex items-center gap-2">
          {[1, 2, 3, '...', 20].map((page, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${page === 1 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="text-gray-600 hover:text-gray-900">Next page</button>
      </div>
    </div>

    {/* Recent Applications */}
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Member</th>
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Application ID</th>
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Amount</th>
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Applied on</th>
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Reviewed on</th>
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Status</th>
            <th className="text-left py-4 px-6 text-[#939393] font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((app, idx) => (
            <tr key={idx} className="border-b border-gray-200">
              <td className="py-4 px-6 text-[#373737]">{app.member}</td>
              <td className="py-4 px-6 text-[#373737]">{app.applicationId}</td>
              <td className="py-4 px-6 text-[#373737]">{app.amount}</td>
              <td className="py-4 px-6 text-[#373737]">{app.appliedOn}</td>
              <td className="py-4 px-6 text-[#373737]">{app.reviewedOn}</td>
              <td className="py-4 px-6">
                <span className={`px-3 py-1 rounded-full text-sm ${statusStyle(app.status)}`}>{app.status}</span>
              </td>
              <td className="py-4 px-6">
                <button onClick={() => onView(app.applicationId)} className="flex items-center gap-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                  <img src="/view.svg" alt="view" width={18} height={18} />
                  <span className="font-medium">View</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex items-center justify-between p-4">
        <button className="text-gray-600 hover:text-gray-900">Previous page</button>
        <div className="flex items-center gap-2">
          {[1, 2, 3, '...', 20].map((page, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${page === 1 ? 'bg-[#3161FF] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="text-gray-600 hover:text-gray-900">Next page</button>
      </div>
    </div>
  </div>
);

export default AssLoanApplicationReviews; 