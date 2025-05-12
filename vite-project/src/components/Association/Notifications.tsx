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
      <div className="p-8">
        <div className="flex items-center mb-6">
          <button onClick={() => setShowManage(false)} className="mr-2 p-2 rounded hover:bg-gray-100">
            <svg width="24" height="24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#22223B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <h2 className="text-2xl font-medium">Manage Notifications</h2>
        </div>
        <div className="bg-white rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-6">Notifications Preferences</h3>
          <div className="mb-4 flex items-center justify-between border-b pb-4">
            <div>
              <div className="font-medium text-lg">Email Notifications</div>
              <div className="text-[#939393] text-sm">Receive notifications via email</div>
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
          <div className="mb-4 flex items-center justify-between border-b pb-4">
            <div>
              <div className="font-medium text-lg">Push Notifications</div>
              <div className="text-[#939393] text-sm">Receive notifications via email</div>
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
          <div className="mb-8 flex items-center justify-between border-b pb-4">
            <div>
              <div className="font-medium text-lg">SMS Notifications</div>
              <div className="text-[#939393] text-sm">Receive notifications via email</div>
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
          <h3 className="text-xl font-semibold mb-4">Frequency Settings</h3>
          <div className="mb-8">
            <select
              className="border border-gray-300 rounded-md p-2"
              value={frequency}
              onChange={e => setFrequency(e.target.value)}
            >
              {frequencyOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <button className="bg-[#111827] text-white px-6 py-2 rounded-lg">Save Changes</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex gap-2 mb-6">
        <button
          className={`px-6 py-2 rounded-t-lg font-medium ${tab === 'Notification' ? 'bg-[#F5F7FA] text-[#22223B]' : 'bg-[#ECEFF1] text-[#939393]'}`}
          onClick={() => setTab('Notification')}
        >
          Notification
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg font-medium ${tab === 'Activity Log' ? 'bg-[#F5F7FA] text-[#22223B]' : 'bg-[#ECEFF1] text-[#939393]'}`}
          onClick={() => setTab('Activity Log')}
        >
          Activity Log
        </button>
      </div>
      <div className="bg-white rounded-xl p-8">
        {tab === 'Notification' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium">Notifications</h2>
              <button className="text-[#3B82F6] font-medium" onClick={() => setShowManage(true)}>Manage</button>
            </div>
            <div>
              {notifications.map((n, i) => (
                <div key={i} className="py-4 border-b border-[#ECECEC]">
                  <div className="font-medium text-lg mb-1">{n.title}</div>
                  <div className="text-[#373737] mb-1">{n.desc}</div>
                  <div className="text-[#939393] text-sm">{n.time}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-8 text-[#939393]">
              <span>Previous page</span>
              <span className="font-semibold text-black">1</span>
              <span>2</span>
              <span>3</span>
              <span>...</span>
              <span>20</span>
              <span>Next page</span>
            </div>
          </>
        )}
        {tab === 'Activity Log' && (
          <>
            <h2 className="text-2xl font-medium mb-6">Recent Activity</h2>
            <div>
              {activities.map((a, i) => (
                <div key={i} className="py-4 border-b border-[#ECECEC] flex items-center justify-between">
                  <div>
                    <div className="font-medium text-lg mb-1">{a.title}</div>
                    <div className="text-[#373737] mb-1">{a.desc}</div>
                    <div className="text-[#939393] text-sm">{a.time}</div>
                  </div>
                  <span className="bg-[#FFF9DB] text-[#EAB308] px-4 py-1 rounded-full text-sm font-medium">{a.status}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-8 text-[#939393]">
              <span>Previous page</span>
              <span className="font-semibold text-black">1</span>
              <span>2</span>
              <span>3</span>
              <span>...</span>
              <span>20</span>
              <span>Next page</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications; 