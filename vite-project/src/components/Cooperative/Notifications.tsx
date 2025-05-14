import React, { useState } from 'react';

const notifications = [
  { title: 'Missed Repayment', desc: 'John Doe missed loan repayment.', time: '2 hours ago' },
  { title: 'Loan Approval', desc: 'New loan for John doe approved', time: '5 hours ago' },
  { title: 'New Member', desc: 'John Doe just joined the association.', time: '1 day ago' },
  { title: 'New Member', desc: 'John Doe just joined the association.', time: '1 day ago' },
  { title: 'New Loan Request', desc: 'John Doe from Association X has requested new loan of ₦500,000.', time: '2 hours ago' },
];

const activities = [
  { title: 'New Loan Request', desc: 'John Doe has requested a new loan of ₦5,000,000.', time: '2 hours ago', status: 'pending' },
  { title: 'Loan Repayment', desc: 'John Doe has repaid ₦5,000,000 for his loan.', time: '5 hours ago', status: 'pending' },
  { title: 'New Member', desc: 'John Doe just joined the association.', time: '1 day ago', status: 'pending' },
];

const frequencyOptions = ['Immediately', 'Hourly', 'Daily', 'Weekly'];

const Notifications: React.FC = () => {
  const [tab, setTab] = useState<'Notification' | 'Activity Log'>('Notification');
  const [showManage, setShowManage] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [frequency, setFrequency] = useState('Immediately');

  if (showManage) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center mb-4 md:mb-6">
          <button onClick={() => setShowManage(false)} className="mr-2 p-2 rounded hover:bg-gray-100">
            <svg width="24" height="24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#22223B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <h2 className="text-xl md:text-2xl font-medium">Manage Notifications</h2>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-8">
          <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Notifications Preferences</h3>
          <div className="mb-4 flex flex-wrap md:flex-nowrap items-center justify-between border-b pb-4">
            <div className="w-full md:w-auto mb-2 md:mb-0">
              <div className="font-medium text-base md:text-lg">Email Notifications</div>
              <div className="text-[#939393] text-xs md:text-sm">Receive notifications via email</div>
            </div>
            <button
              type="button"
              className={`w-12 h-7 flex items-center rounded-full p-1 duration-300 ease-in-out ${emailNotif ? 'bg-[#22223B]' : 'bg-gray-300'}`}
              onClick={() => setEmailNotif(v => !v)}
              aria-pressed={emailNotif}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${emailNotif ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
          </div>
          <div className="mb-4 flex flex-wrap md:flex-nowrap items-center justify-between border-b pb-4">
            <div className="w-full md:w-auto mb-2 md:mb-0">
              <div className="font-medium text-base md:text-lg">Push Notifications</div>
              <div className="text-[#939393] text-xs md:text-sm">Receive notifications via email</div>
            </div>
            <button
              type="button"
              className={`w-12 h-7 flex items-center rounded-full p-1 duration-300 ease-in-out ${pushNotif ? 'bg-[#22223B]' : 'bg-gray-300'}`}
              onClick={() => setPushNotif(v => !v)}
              aria-pressed={pushNotif}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${pushNotif ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
          </div>
          <div className="mb-6 md:mb-8 flex flex-wrap md:flex-nowrap items-center justify-between border-b pb-4">
            <div className="w-full md:w-auto mb-2 md:mb-0">
              <div className="font-medium text-base md:text-lg">SMS Notifications</div>
              <div className="text-[#939393] text-xs md:text-sm">Receive notifications via email</div>
            </div>
            <button
              type="button"
              className={`w-12 h-7 flex items-center rounded-full p-1 duration-300 ease-in-out ${smsNotif ? 'bg-[#22223B]' : 'bg-gray-300'}`}
              onClick={() => setSmsNotif(v => !v)}
              aria-pressed={smsNotif}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${smsNotif ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Frequency Settings</h3>
          <div className="mb-6 md:mb-8">
            <select
              className="w-full md:w-auto border border-gray-300 rounded-md p-2"
              value={frequency}
              onChange={e => setFrequency(e.target.value)}
            >
              {frequencyOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <button className="w-full md:w-auto bg-[#111827] text-white px-4 md:px-6 py-2 rounded-lg">Save Changes</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto">
        <button
          className={`px-4 md:px-6 py-2 rounded-t-lg font-medium whitespace-nowrap ${tab === 'Notification' ? 'bg-[#F5F7FA] text-[#22223B]' : 'bg-[#ECEFF1] text-[#939393]'}`}
          onClick={() => setTab('Notification')}
        >
          Notification
        </button>
        <button
          className={`px-4 md:px-6 py-2 rounded-t-lg font-medium whitespace-nowrap ${tab === 'Activity Log' ? 'bg-[#F5F7FA] text-[#22223B]' : 'bg-[#ECEFF1] text-[#939393]'}`}
          onClick={() => setTab('Activity Log')}
        >
          Activity Log
        </button>
      </div>
      <div className="bg-white rounded-xl p-4 md:p-8">
        {tab === 'Notification' && (
          <>
            <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-medium w-full md:w-auto mb-2 md:mb-0">Notifications</h2>
              <button className="text-[#3B82F6] font-medium" onClick={() => setShowManage(true)}>Manage</button>
            </div>
            <div className="overflow-y-auto max-h-[70vh] md:max-h-none">
              {notifications.map((n, i) => (
                <div key={i} className="py-3 md:py-4 border-b border-[#ECECEC]">
                  <div className="font-medium text-base md:text-lg mb-1">{n.title}</div>
                  <div className="text-[#373737] text-sm md:text-base mb-1">{n.desc}</div>
                  <div className="text-[#939393] text-xs md:text-sm">{n.time}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-1 md:gap-2 mt-6 md:mt-8 text-xs md:text-sm text-[#939393] overflow-x-auto">
              <span className="whitespace-nowrap">Previous page</span>
              <span className="font-semibold text-black">1</span>
              <span>2</span>
              <span>3</span>
              <span>...</span>
              <span>20</span>
              <span className="whitespace-nowrap">Next page</span>
            </div>
          </>
        )}
        {tab === 'Activity Log' && (
          <>
            <h2 className="text-xl md:text-2xl font-medium mb-4 md:mb-6">Recent Activity</h2>
            <div className="overflow-y-auto max-h-[70vh] md:max-h-none">
              {activities.map((a, i) => (
                <div key={i} className="py-3 md:py-4 border-b border-[#ECECEC] flex flex-wrap md:flex-nowrap items-start md:items-center justify-between">
                  <div className="w-full md:w-auto mb-2 md:mb-0">
                    <div className="font-medium text-base md:text-lg mb-1">{a.title}</div>
                    <div className="text-[#373737] text-sm md:text-base mb-1">{a.desc}</div>
                    <div className="text-[#939393] text-xs md:text-sm">{a.time}</div>
                  </div>
                  <span className="bg-[#FFF9DB] text-[#EAB308] px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-medium">{a.status}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-1 md:gap-2 mt-6 md:mt-8 text-xs md:text-sm text-[#939393] overflow-x-auto">
              <span className="whitespace-nowrap">Previous page</span>
              <span className="font-semibold text-black">1</span>
              <span>2</span>
              <span>3</span>
              <span>...</span>
              <span>20</span>
              <span className="whitespace-nowrap">Next page</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications; 