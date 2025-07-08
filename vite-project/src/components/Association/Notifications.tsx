import React, { useState, useEffect } from 'react';

interface ActivityLog {
  id: string;
  associationId: string;
  action: string;
  description: string;
  performedById: string | null;
  metadata: Record<string, string | number | boolean>;
  createdAt: string;
  performedBy: {
    id: string;
    name: string;
    email: string;
  } | null;
  association: {
    id: string;
    name: string;
    leaderName: string;
    leaderPhoneNumber: string;
    category: string;
    numberOfMembers: number;
    isActive: boolean;
    createdAt: string;
    monthlySavings: string;
    minimumLoanAmount: string;
    maximumLoanAmount: string;
    loanDuration: number;
    interestRate: string;
    cooperativeId: string;
    foundedDate: string;
    updatedAt: string;
  };
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // in seconds
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min${Math.floor(diff / 60) === 1 ? '' : 's'} ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) === 1 ? '' : 's'} ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) === 1 ? '' : 's'} ago`;
  return date.toLocaleString();
}

const frequencyOptions = ['Immediately', 'Daily', 'Weekly', 'Monthly'];

const AssNotifications: React.FC = () => {
  const [tab, setTab] = useState<'Notification' | 'Activity Log'>('Notification');
  const [showManage, setShowManage] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [frequency, setFrequency] = useState('Immediately');
  const [notificationLogs, setNotificationLogs] = useState<ActivityLog[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState('');
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityError, setActivityError] = useState('');

  // Fetch notifications when Notification tab is selected
  useEffect(() => {
    if (tab === 'Notification') {
      setNotifLoading(true);
      setNotifError('');
      fetch('https://ajo.nickyai.online/api/v1/admin/activity-logs/action/SETTINGS_UPDATED', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.data && data.data.logs) {
            setNotificationLogs(data.data.logs);
          } else {
            setNotificationLogs([]);
          }
        })
        .catch(() => setNotifError('Error fetching notifications'))
        .finally(() => setNotifLoading(false));
    }
  }, [tab]);

  // Fetch activity logs when Activity Log tab is selected
  useEffect(() => {
    if (tab === 'Activity Log') {
      setActivityLoading(true);
      setActivityError('');
      const associationId = localStorage.getItem('associationId');
      if (!associationId) {
        setActivityError('Association ID not found');
        setActivityLoading(false);
        return;
      }
      
      fetch(`https://ajo.nickyai.online/api/v1/admin/activity-logs/${associationId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.data) {
            // Handle single activity log response
            setActivityLogs([data.data]);
          } else {
            setActivityLogs([]);
          }
        })
        .catch(() => setActivityError('Error fetching activity logs'))
        .finally(() => setActivityLoading(false));
    }
  }, [tab]);

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
          <div className="mb-4 flex items-center justify-between border-b pb-4">
            <div>
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
          <div className="mb-4 flex items-center justify-between border-b pb-4">
            <div>
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
          <div className="mb-6 md:mb-8 flex items-center justify-between border-b pb-4">
            <div>
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
          <h3 className="text-lg md:text-xl font-semibold mb-4">Frequency Settings</h3>
          <div className="mb-6 md:mb-8">
            <select
              className="border border-gray-300 rounded-md p-2 w-full md:w-auto"
              value={frequency}
              onChange={e => setFrequency(e.target.value)}
            >
              {frequencyOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <button className="bg-[#111827] text-white px-4 md:px-6 py-2 rounded-lg w-full md:w-auto">Save Changes</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex gap-2 mb-4 md:mb-6">
        <button
          className={`px-3 md:px-6 py-2 rounded-t-lg font-medium text-sm md:text-base ${tab === 'Notification' ? 'bg-[#F5F7FA] text-[#22223B]' : 'bg-[#ECEFF1] text-[#939393]'}`}
          onClick={() => setTab('Notification')}
        >
          Notification
        </button>
        <button
          className={`px-3 md:px-6 py-2 rounded-t-lg font-medium text-sm md:text-base ${tab === 'Activity Log' ? 'bg-[#F5F7FA] text-[#22223B]' : 'bg-[#ECEFF1] text-[#939393]'}`}
          onClick={() => setTab('Activity Log')}
        >
          Activity Log
        </button>
      </div>
      <div className="bg-white rounded-xl p-4 md:p-8">
        {tab === 'Notification' && (
          <>
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-medium">Notifications</h2>
              <button className="text-[#3B82F6] font-medium text-sm md:text-base" onClick={() => setShowManage(true)}>Manage</button>
            </div>
            <div>
              {notifLoading ? (
                <div className="text-center text-gray-400 py-8">Loading...</div>
              ) : notifError ? (
                <div className="text-center text-red-500 py-8">{notifError}</div>
              ) : notificationLogs.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No notifications available</div>
              ) : (
                notificationLogs.map((log) => (
                  <div key={log.id} className="py-3 md:py-4 border-b border-[#ECECEC]">
                    <div className="font-medium text-base md:text-lg mb-1">{log.action}</div>
                    <div className="text-[#373737] text-sm md:text-base mb-1">{log.description}</div>
                    <div className="text-[#939393] text-xs md:text-sm">{formatTimeAgo(log.createdAt)}</div>
                  </div>
                ))
              )}
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 mt-6 md:mt-8 text-[#939393] text-sm md:text-base">
              <span className="cursor-pointer">Previous page</span>
              <span className="font-semibold text-black cursor-pointer">1</span>
              <span className="cursor-pointer">2</span>
              <span className="cursor-pointer">3</span>
              <span>...</span>
              <span className="cursor-pointer">20</span>
              <span className="cursor-pointer">Next page</span>
            </div>
          </>
        )}
        {tab === 'Activity Log' && (
          <>
            <h2 className="text-xl md:text-2xl font-medium mb-4 md:mb-6">Recent Activity</h2>
            <div>
              {activityLoading ? (
                <div className="text-center text-gray-400 py-8">Loading...</div>
              ) : activityError ? (
                <div className="text-center text-red-500 py-8">{activityError}</div>
              ) : activityLogs.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No recent activity</div>
              ) : (
                activityLogs.map((log) => (
                  <div key={log.id} className="py-3 md:py-4 border-b border-[#ECECEC] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <div className="font-medium text-base md:text-lg mb-1">{log.action}</div>
                      <div className="text-[#373737] text-sm md:text-base mb-1">{log.description}</div>
                      <div className="text-[#939393] text-xs md:text-sm">{formatTimeAgo(log.createdAt)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 mt-6 md:mt-8 text-[#939393] text-sm md:text-base">
              <span className="cursor-pointer">Previous page</span>
              <span className="font-semibold text-black cursor-pointer">1</span>
              <span className="cursor-pointer">2</span>
              <span className="cursor-pointer">3</span>
              <span>...</span>
              <span className="cursor-pointer">20</span>
              <span className="cursor-pointer">Next page</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssNotifications; 