import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const TransactionDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="p-4 md:p-6 bg-[#F5F7FA] min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate(-1)} className="text-[#373737] flex items-center gap-x-1 md:gap-x-2 text-base md:text-lg font-medium">
          <svg width="20" height="20" fill="none" className="md:w-6 md:h-6"><path d="M15 18l-6-6 6-6" stroke="#373737" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-xl md:text-2xl font-medium">Transaction Details</span>
        <span className="text-[#939393] ml-2 text-sm md:text-base">ID:{id}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Transaction Summary */}
        <div className="bg-white rounded-lg p-4 md:p-6 flex flex-col gap-3 md:gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-semibold text-[#373737]">Transaction Summary</h2>
            <span className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm bg-[#B9FBC0] text-[#0F8B42]">completed</span>
          </div>
          <div>
            <div className="text-[#939393] text-xs md:text-sm mb-1">Transaction Type</div>
            <div className="text-[#373737] text-sm md:text-base font-medium">Repayment</div>
          </div>
          <div>
            <div className="text-[#939393] text-xs md:text-sm mb-1">Date</div>
            <div className="text-[#373737] text-sm md:text-base font-medium">2022-12-15</div>
          </div>
          <div>
            <div className="text-[#939393] text-xs md:text-sm mb-1">Amount</div>
            <div className="text-[#373737] text-sm md:text-base font-medium">₦500,000</div>
          </div>
          <div>
            <div className="text-[#939393] text-xs md:text-sm mb-1">Related Loan</div>
            <Link to="/loans/1" className="text-[#3161FF] underline text-sm md:text-base">Loan #1</Link>
          </div>
          <button className="mt-2 md:mt-4 bg-[#111827] text-white py-2 md:py-3 rounded-lg flex items-center justify-center gap-1 md:gap-2 text-sm md:text-lg font-medium">
            <img src="/download.svg" alt="pic" width={16} height={16} className="md:w-5 md:h-5"/>
            Download Receipt
          </button>
        </div>
        {/* Payment Details */}
        <div className="bg-white rounded-lg p-4 md:p-5 flex flex-col gap-3 md:gap-4">
          <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-[#373737]">Payment Details</h2>
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex gap-2 border border-[#E7E7E7] rounded-lg flex-col p-3">
              <p className='text-[#373737] text-sm md:text-base'>From</p>
              <div className='flex gap-x-3 md:gap-x-4'>
                <div className="bg-[#E5EBFF] w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-base md:text-lg font-bold text-[#3161FF]">J</div>
                <div>
                    <div className="font-medium text-[#373737] text-sm md:text-base">John Doe</div>
                    <div className="text-[#939393] text-xs md:text-sm">ID: 1</div>  
                </div>
              </div>
            </div>
            <div className="flex gap-2 border border-[#E7E7E7] rounded-lg flex-col p-3">
              <p className='text-[#373737] text-sm md:text-base'>To</p>
              <div className='flex gap-x-3 md:gap-x-4'>
                <div className="bg-[#E5EBFF] w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-base md:text-lg font-bold text-[#3161FF]">J</div>
                <div>
                    <div className="font-medium text-[#373737] text-sm md:text-base">Association</div>
                    <div className="text-[#939393] text-xs md:text-sm">ID: 1</div>  
                </div>
              </div>
            </div>
          
            <div className="border-t border-[#E7E7E7] pt-3 md:pt-4 mt-1 md:mt-2">
                <p className='mb-2 text-sm md:text-base'>Additional information</p>

              <div className="flex justify-between text-[#939393] text-xs md:text-sm mb-1">
                <span>Payment Method</span>
                <span className="text-[#373737] font-medium">Bank Transfer</span>
              </div>
              <div className="flex justify-between text-[#939393] text-xs md:text-sm mb-1">
                <span>Reference</span>
                <span className="text-[#373737] font-medium">TRX-1</span>
              </div>
              <div className="flex justify-between text-[#939393] text-xs md:text-sm">
                <span>Payment Cycle</span>
                <span className="text-[#373737] font-medium">Monthly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails; 