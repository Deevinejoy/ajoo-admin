import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssLoanApplicationDetails: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen">
      {/* New Header Card */}
   
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-x-2 text-lg font-medium text-[#22223B]">
          <svg width="24" height="24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#22223B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Applications
        </button>
        <button className="text-white  bg-[#3161FF] px-6 py-2 rounded-lg font-medium">Print application</button>
      </div>
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg text-[#22223B]">Loan Application #LN-5342</span>
            <span className="bg-[#FFF4CC] text-[#806B00] px-3 py-1 rounded-full text-sm font-medium">Pending review</span>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-[#22223B] font-medium">Member 1</div>
          <span className="text-[#BDBDBD]">ID: 1234</span>
        </div>
        <div className="grid grid-cols-4 gap-8">
          <div>
            <div className="text-[#BDBDBD] text-sm">Loan Amount</div>
            <div className="font-semibold text-base">N500,000.00</div>
          </div>
          <div>
            <div className="text-[#BDBDBD] text-sm">Duration</div>
            <div className="font-semibold text-base">12 Months</div>
          </div>
          <div>
            <div className="text-[#BDBDBD] text-sm">Interest Rate</div>
            <div className="font-semibold text-base">5%</div>
          </div>
          <div>
            <div className="text-[#BDBDBD] text-sm">Submission Date</div>
            <div className="font-semibold text-base">Apr 05, 2025</div>
          </div>
        </div>
      </div>
      {/* 2x2 Info Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Applicant Information */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold text-lg mb-4">Applicant Information</div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-8">
            <div>
              <div className="text-[#BDBDBD] text-sm">Full Name</div>
              <div className="font-medium">John Doe</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Member ID</div>
              <div className="font-medium">1234</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Email Address</div>
              <div className="font-medium">Johndoe@gmail.com</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Phone number</div>
              <div className="font-medium">+234 8452426928</div>
            </div>
            <div className="col-span-1">
              <div className="text-[#BDBDBD] text-sm">Home Address</div>
              <div className="font-medium">123 Mainstreet, anytown, Lagos</div>
            </div>
            <div className="col-span-1">
              <div className="text-[#BDBDBD] text-sm">Membership Date</div>
              <div className="font-medium">Jan 15, 2023</div>
            </div>
          </div>
        </div>
        {/* Supporting Documents */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold text-lg mb-4">Supporting Documents</div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-8">
            <div>
              <div className="text-[#BDBDBD] text-sm">Member Since</div>
              <div className="font-medium">Jan 15,2023</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Payment History</div>
              <div className="font-medium">None</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Membership Status</div>
              <div className="font-medium">Active</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Previous loans</div>
              <div className="font-medium">None</div>
            </div>
          </div>
        </div>
        {/* Loan Details */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold text-lg mb-4">Loan Details</div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-8">
            <div>
              <div className="text-[#BDBDBD] text-sm">Loan Amount</div>
              <div className="font-medium">N500,000.00</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Loan Purpose</div>
              <div className="font-medium">Home Renovation</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Loan Duration</div>
              <div className="font-medium">12 Months</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Interest Rate</div>
              <div className="font-medium">5%</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Monthly Payment</div>
              <div className="font-medium">N55,000.00</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Total Repayment</div>
              <div className="font-medium">N550,000.00</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Preferred Payment Method</div>
              <div className="font-medium">Direct Debit</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Request Disbursement Date</div>
              <div className="font-medium">Apr 15,2025</div>
            </div>
          </div>
        </div>
        {/* Risk Assessment */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold text-lg mb-4">Risk Assessment</div>
          <div className="grid grid-cols-1 gap-y-2">
            <div>
              <div className="text-[#BDBDBD] text-sm">Debt to income ratio</div>
              <div className="font-medium">32% (good)</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Loan to income ratio</div>
              <div className="font-medium">9.9% (low risk)</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">Risk Score</div>
              <div className="font-medium">82/100 (low Risk)</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-sm">System Recommendation</div>
              <div className="font-medium">Approval Recommended</div>
            </div>
          </div>
        </div>
      </div>
     
      {/* Bottom Section: 2-column grid, 5 cards left, 3 cards right */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Left column: 5 stacked cards */}
        <div className="flex flex-col gap-6">
          {/* Financial Information */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold text-lg mb-4">Financial Information</div>
            <div className="grid grid-cols-2 gap-y-2 gap-x-8">
              <div>
                <div className="text-[#BDBDBD] text-sm">Employment Status</div>
                <div className="font-medium">Full time employee</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-sm">Current Employer</div>
                <div className="font-medium">AP global Tech</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-sm">Monthly Income</div>
                <div className="font-medium">₦650,000.00</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-sm">Length of Employment</div>
                <div className="font-medium">2 years, 1 month</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-sm">Additional Income source</div>
                <div className="font-medium">None</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-sm">Total Monthly Expenses</div>
                <div className="font-medium">₦380,000.00</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-sm">Existing loan</div>
                <div className="font-medium">None</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-sm">Credit Score</div>
                <div className="font-medium">720(good)</div>
              </div>
            </div>
          </div>
          {/* Supporting Documents */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold text-lg mb-4">Supporting Documents</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center">
                    <svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#E5E7EB"/></svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Proof of income.pdf</div>
                    <div className="text-[#939393] text-xs">1.2MB</div>
                  </div>
                </div>
                <button className="text-[#3161FF] font-medium text-sm">View</button>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center">
                    <svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#E5E7EB"/></svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Bank statement.pdf</div>
                    <div className="text-[#939393] text-xs">1.2MB</div>
                  </div>
                </div>
                <button className="text-[#3161FF] font-medium text-sm">View</button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center">
                    <svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#E5E7EB"/></svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm">ID Document.jpg</div>
                    <div className="text-[#939393] text-xs">1.2MB</div>
                  </div>
                </div>
                <button className="text-[#3161FF] font-medium text-sm">View</button>
              </div>
            </div>
          </div>
          {/* Review Decision */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold text-lg mb-4">Review Decision</div>
            <textarea className="w-full border border-gray-300 rounded-lg p-2 mb-4" rows={3} placeholder="Add your review comments here..." />
            <div className="flex gap-4">
              <button className="bg-[#FFE5E5] text-[#D30000] px-6 py-2 rounded-lg">Reject Application</button>
              <button className="bg-[#3161FF] text-white px-6 py-2 rounded-lg">Approve Application</button>
            </div>
          </div>
        </div>
        {/* Right column: 3 stacked cards */}
        <div className="flex flex-col gap-6">
          {/* Application Timeline */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold text-lg mb-4">Application Timeline</div>
            <ul className="ml-2">
              <li className="mb-2 flex items-start gap-2">
                <span className="w-3 h-3 rounded-full bg-[#3161FF] inline-block mt-1"></span>
                <div>
                  <span className="font-semibold">Apr 05,2025 -10:23AM</span><br/>
                  <span className="font-semibold">Application Submitted</span><br/>
                  <span className="text-[#939393] text-sm">Member submitted loan application online</span>
                </div>
              </li>
              <li className="mb-2 flex items-start gap-2">
                <span className="w-3 h-3 rounded-full bg-[#3161FF] inline-block mt-1"></span>
                <div>
                  <span className="font-semibold">Apr 05,2025 -10:24AM</span><br/>
                  <span className="font-semibold">Document Uploaded</span><br/>
                  <span className="text-[#939393] text-sm">3 Supporting documents uploaded</span>
                </div>
              </li>
              <li className="mb-2 flex items-start gap-2">
                <span className="w-3 h-3 rounded-full bg-[#3161FF] inline-block mt-1"></span>
                <div>
                  <span className="font-semibold">Apr 05,2025 -10:30AM</span><br/>
                  <span className="font-semibold">Initial Review</span><br/>
                  <span className="text-[#939393] text-sm">3 Supporting documents uploaded</span>
                </div>
              </li>
              <li className="mb-2 flex items-start gap-2">
                <span className="w-3 h-3 rounded-full bg-[#3161FF] inline-block mt-1"></span>
                <div>
                  <span className="font-semibold">Apr 05,2025 -10:30AM</span><br/>
                  <span className="font-semibold">Waiting for review</span><br/>
                  <span className="text-[#939393] text-sm">Application ready for admin review</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssLoanApplicationDetails; 