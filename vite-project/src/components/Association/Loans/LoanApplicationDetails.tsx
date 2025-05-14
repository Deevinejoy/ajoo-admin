import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssLoanApplicationDetails: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-3 md:p-6 bg-[#F5F7FA] min-h-screen">
      {/* New Header Card */}
   
      {/* Header */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-x-1 md:gap-x-2 text-base md:text-lg font-medium text-[#22223B]">
          <svg width="20" height="20" className="md:w-6 md:h-6" fill="none"><path d="M15 18l-6-6 6-6" stroke="#22223B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Applications
        </button>
        <button className="text-white bg-[#3161FF] px-3 md:px-6 py-1 md:py-2 rounded-lg font-medium text-sm md:text-base">Print application</button>
      </div>
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow p-3 md:p-6 mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="font-semibold text-base md:text-lg text-[#22223B]">Loan Application #LN-5342</span>
            <span className="bg-[#FFF4CC] text-[#806B00] px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">Pending review</span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
          <div className="text-[#22223B] text-sm md:text-base font-medium">Member 1</div>
          <span className="text-[#BDBDBD] text-xs md:text-sm">ID: 1234</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div>
            <div className="text-[#BDBDBD] text-xs md:text-sm">Loan Amount</div>
            <div className="font-semibold text-sm md:text-base">N500,000.00</div>
          </div>
          <div>
            <div className="text-[#BDBDBD] text-xs md:text-sm">Duration</div>
            <div className="font-semibold text-sm md:text-base">12 Months</div>
          </div>
          <div>
            <div className="text-[#BDBDBD] text-xs md:text-sm">Interest Rate</div>
            <div className="font-semibold text-sm md:text-base">5%</div>
          </div>
          <div>
            <div className="text-[#BDBDBD] text-xs md:text-sm">Submission Date</div>
            <div className="font-semibold text-sm md:text-base">Apr 05, 2025</div>
          </div>
        </div>
      </div>
      {/* 2x2 Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-8">
        {/* Applicant Information */}
        <div className="bg-white rounded-xl shadow p-3 md:p-6">
          <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">Applicant Information</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 md:gap-x-8">
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Full Name</div>
              <div className="font-medium text-sm md:text-base">John Doe</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Member ID</div>
              <div className="font-medium text-sm md:text-base">1234</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Email Address</div>
              <div className="font-medium text-sm md:text-base">Johndoe@gmail.com</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Phone number</div>
              <div className="font-medium text-sm md:text-base">+234 8452426928</div>
            </div>
            <div className="col-span-1">
              <div className="text-[#BDBDBD] text-xs md:text-sm">Home Address</div>
              <div className="font-medium text-sm md:text-base">123 Mainstreet, anytown, Lagos</div>
            </div>
            <div className="col-span-1">
              <div className="text-[#BDBDBD] text-xs md:text-sm">Membership Date</div>
              <div className="font-medium text-sm md:text-base">Jan 15, 2023</div>
            </div>
          </div>
        </div>
        {/* Supporting Documents */}
        <div className="bg-white rounded-xl shadow p-3 md:p-6">
          <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">Supporting Documents</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 md:gap-x-8">
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Member Since</div>
              <div className="font-medium text-sm md:text-base">Jan 15,2023</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Payment History</div>
              <div className="font-medium text-sm md:text-base">None</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Membership Status</div>
              <div className="font-medium text-sm md:text-base">Active</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Previous loans</div>
              <div className="font-medium text-sm md:text-base">None</div>
            </div>
          </div>
        </div>
        {/* Loan Details */}
        <div className="bg-white rounded-xl shadow p-3 md:p-6">
          <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">Loan Details</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 md:gap-x-8">
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Loan Amount</div>
              <div className="font-medium text-sm md:text-base">N500,000.00</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Loan Purpose</div>
              <div className="font-medium text-sm md:text-base">Home Renovation</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Loan Duration</div>
              <div className="font-medium text-sm md:text-base">12 Months</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Interest Rate</div>
              <div className="font-medium text-sm md:text-base">5%</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Monthly Payment</div>
              <div className="font-medium text-sm md:text-base">N55,000.00</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Total Repayment</div>
              <div className="font-medium text-sm md:text-base">N550,000.00</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Preferred Payment Method</div>
              <div className="font-medium text-sm md:text-base">Direct Debit</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Request Disbursement Date</div>
              <div className="font-medium text-sm md:text-base">Apr 15,2025</div>
            </div>
          </div>
        </div>
        {/* Risk Assessment */}
        <div className="bg-white rounded-xl shadow p-3 md:p-6">
          <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">Risk Assessment</div>
          <div className="grid grid-cols-1 gap-y-2">
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Debt to income ratio</div>
              <div className="font-medium text-sm md:text-base">32% (good)</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Loan to income ratio</div>
              <div className="font-medium text-sm md:text-base">9.9% (low risk)</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">Risk Score</div>
              <div className="font-medium text-sm md:text-base">82/100 (low Risk)</div>
            </div>
            <div>
              <div className="text-[#BDBDBD] text-xs md:text-sm">System Recommendation</div>
              <div className="font-medium text-sm md:text-base">Approval Recommended</div>
            </div>
          </div>
        </div>
      </div>
     
      {/* Bottom Section: 2-column grid, 5 cards left, 3 cards right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
        {/* Left column: 5 stacked cards */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Financial Information */}
          <div className="bg-white rounded-xl shadow p-3 md:p-6">
            <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">Financial Information</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 md:gap-x-8">
              <div>
                <div className="text-[#BDBDBD] text-xs md:text-sm">Employment Status</div>
                <div className="font-medium text-sm md:text-base">Full time employee</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-xs md:text-sm">Current Employer</div>
                <div className="font-medium text-sm md:text-base">AP global Tech</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-xs md:text-sm">Monthly Income</div>
                <div className="font-medium text-sm md:text-base">₦650,000.00</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-xs md:text-sm">Length of Employment</div>
                <div className="font-medium text-sm md:text-base">2 years, 1 month</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-xs md:text-sm">Additional Income source</div>
                <div className="font-medium text-sm md:text-base">None</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-xs md:text-sm">Total Monthly Expenses</div>
                <div className="font-medium text-sm md:text-base">₦380,000.00</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-xs md:text-sm">Existing loan</div>
                <div className="font-medium text-sm md:text-base">None</div>
              </div>
              <div>
                <div className="text-[#BDBDBD] text-xs md:text-sm">Credit Score</div>
                <div className="font-medium text-sm md:text-base">720(good)</div>
              </div>
            </div>
          </div>
          {/* Supporting Documents */}
          <div className="bg-white rounded-xl shadow p-3 md:p-6">
            <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">Supporting Documents</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-gray-200 flex items-center justify-center">
                    <svg width="16" height="16" className="md:w-5 md:h-5" fill="none"><rect width="16" height="16" className="md:w-20 md:h-20" rx="4" fill="#E5E7EB"/></svg>
                  </div>
                  <div>
                    <div className="font-medium text-xs md:text-sm">Proof of income.pdf</div>
                    <div className="text-[#939393] text-[10px] md:text-xs">1.2MB</div>
                  </div>
                </div>
                <button className="text-[#3161FF] font-medium text-xs md:text-sm">View</button>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-gray-200 flex items-center justify-center">
                    <svg width="16" height="16" className="md:w-5 md:h-5" fill="none"><rect width="16" height="16" className="md:w-20 md:h-20" rx="4" fill="#E5E7EB"/></svg>
                  </div>
                  <div>
                    <div className="font-medium text-xs md:text-sm">Bank statement.pdf</div>
                    <div className="text-[#939393] text-[10px] md:text-xs">1.2MB</div>
                  </div>
                </div>
                <button className="text-[#3161FF] font-medium text-xs md:text-sm">View</button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-gray-200 flex items-center justify-center">
                    <svg width="16" height="16" className="md:w-5 md:h-5" fill="none"><rect width="16" height="16" className="md:w-20 md:h-20" rx="4" fill="#E5E7EB"/></svg>
                  </div>
                  <div>
                    <div className="font-medium text-xs md:text-sm">ID Document.jpg</div>
                    <div className="text-[#939393] text-[10px] md:text-xs">1.2MB</div>
                  </div>
                </div>
                <button className="text-[#3161FF] font-medium text-xs md:text-sm">View</button>
              </div>
            </div>
          </div>
          {/* Review Decision */}
          <div className="bg-white rounded-xl shadow p-3 md:p-6">
            <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">Review Decision</div>
            <div className="mb-3 md:mb-5">
              <div className="text-[#BDBDBD] text-xs md:text-sm mb-1 md:mb-2">Decision</div>
              <div className="flex gap-2 md:gap-4">
                <button className="bg-[#B9FBC0] px-3 md:px-4 py-1 md:py-2 rounded-lg text-[#0F8B42] font-medium text-sm md:text-base">Approve</button>
                <button className="bg-[#FFE5E5] px-3 md:px-4 py-1 md:py-2 rounded-lg text-[#D30000] font-medium text-sm md:text-base">Reject</button>
                <button className="bg-[#F5F7FA] px-3 md:px-4 py-1 md:py-2 rounded-lg text-[#666] border border-[#C4C4C4] font-medium text-sm md:text-base">Request more info</button>
              </div>
            </div>
            <div className="mb-3 md:mb-5">
              <div className="text-[#BDBDBD] text-xs md:text-sm mb-1 md:mb-2">Decision Notes (optional)</div>
              <textarea className="w-full h-24 md:h-32 border border-[#C4C4C4] rounded-lg p-2 md:p-3" placeholder="Add notes about your decision..."></textarea>
            </div>
            <div className="mb-3 md:mb-5">
              <div className="text-[#BDBDBD] text-xs md:text-sm mb-1 md:mb-2">Loan Terms (if approved)</div>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div>
                  <label className="text-[#373737] text-xs md:text-sm block mb-1 md:mb-2">Interest Rate</label>
                  <input type="text" defaultValue="5%" className="w-full border border-[#C4C4C4] rounded-lg p-2" />
                </div>
                <div>
                  <label className="text-[#373737] text-xs md:text-sm block mb-1 md:mb-2">Term (months)</label>
                  <input type="text" defaultValue="12" className="w-full border border-[#C4C4C4] rounded-lg p-2" />
                </div>
              </div>
            </div>
            <div>
              <button className="bg-[#3161FF] text-white w-full py-2 md:py-3 rounded-lg font-semibold">Submit Decision</button>
            </div>
          </div>
        </div>
        {/* Right column: 3 stacked cards */}
        <div className="space-y-4 md:space-y-6">
          <div className="bg-white rounded-xl shadow p-3 md:p-6">
            <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">Borrowing History</div>
            <div className="space-y-2 md:space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#F0F0F0]">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#E5EBFF] rounded-full flex items-center justify-center">
                    <svg width="16" height="16" className="md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6v12m-6-6h12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm md:text-base">No previous loans</div>
                    <div className="text-[#BDBDBD] text-xs md:text-sm">First time borrowing</div>
                  </div>
                </div>
                <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-3 md:p-6">
            <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">Credit Assessment</div>
            <div className="space-y-2 md:space-y-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-[#373737] text-xs md:text-sm">Credit Score</span>
                  <span className="text-[#373737] font-medium text-xs md:text-sm">720/850</span>
                </div>
                <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                  <div className="bg-[#3161FF] h-2 rounded-full w-[85%]"></div>
                </div>
                <div className="flex justify-between text-[10px] md:text-xs text-[#939393]">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Very Good</span>
                  <span>Excellent</span>
                </div>
              </div>
              
              <div className="mt-3 md:mt-5 space-y-2 md:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#373737] text-xs md:text-sm">Payment History</span>
                  <span className="px-2 py-1 rounded-lg bg-[#E5EBFF] text-[#3161FF] text-xs md:text-sm">N/A</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#373737] text-xs md:text-sm">Credit Utilization</span>
                  <span className="px-2 py-1 rounded-lg bg-[#B9FBC0] text-[#0F8B42] text-xs md:text-sm">Low (5%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#373737] text-xs md:text-sm">Debt-to-Income Ratio</span>
                  <span className="px-2 py-1 rounded-lg bg-[#B9FBC0] text-[#0F8B42] text-xs md:text-sm">Good (32%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#373737] text-xs md:text-sm">Length of Credit History</span>
                  <span className="px-2 py-1 rounded-lg bg-[#FFF4CC] text-[#806B00] text-xs md:text-sm">New</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-3 md:p-6">
            <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">Loan Affordability</div>
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#373737] text-xs md:text-sm">Monthly Income</span>
                <span className="text-[#373737] font-medium text-xs md:text-sm">₦650,000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#373737] text-xs md:text-sm">Current Monthly Expenses</span>
                <span className="text-[#373737] font-medium text-xs md:text-sm">₦380,000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#373737] text-xs md:text-sm">Disposable Income</span>
                <span className="text-[#373737] font-medium text-xs md:text-sm">₦270,000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#373737] text-xs md:text-sm">Proposed Monthly Payment</span>
                <span className="text-[#373737] font-medium text-xs md:text-sm">₦55,000.00</span>
              </div>
              <div className="border-t border-[#F0F0F0] pt-2 mt-2 md:pt-3 md:mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#373737] font-medium text-xs md:text-sm">Payment to Income Ratio</span>
                  <span className="px-2 py-1 rounded-lg bg-[#B9FBC0] text-[#0F8B42] text-xs md:text-sm">8.5% (Good)</span>
                </div>
                <div className="flex justify-between items-center mt-2 md:mt-3">
                  <span className="text-[#373737] font-medium text-xs md:text-sm">Affordability Assessment</span>
                  <span className="px-2 py-1 rounded-lg bg-[#B9FBC0] text-[#0F8B42] text-xs md:text-sm">Affordable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssLoanApplicationDetails; 