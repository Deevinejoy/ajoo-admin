import React, { useState, useEffect } from 'react';

interface Notification {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: string;
  status?: string;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  status: string;
}

const frequencyOptions = ['Immediately', 'Hourly', 'Daily', 'Weekly'];

const Notifications: React.FC = () => {
  const [tab, setTab] = useState<'Notification' | 'Activity Log'>('Notification');
  const [showManage, setShowManage] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [frequency, setFrequency] = useState('Immediately');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://ajo.nickyai.online/api/v1/cooperative/dashboard/notifications', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        
        const result = await response.json();
        const data = result.data || result;
        
        // Transform the API data to match our interfaces
        if (data.notifications) {
          const transformedNotifications = Array.isArray(data.notifications) ? data.notifications.map((item: {
            id?: string;
            title?: string;
            type?: string;
            description?: string;
            message?: string;
            desc?: string;
            timeAgo?: string;
            createdAt?: string;
            time?: string;
            status?: string;
          }) => ({
            id: item.id || '',
            title: item.title || item.type || 'Notification',
            description: item.description || item.message || item.desc || '',
            timeAgo: item.timeAgo || item.createdAt || item.time || 'Just now',
            type: item.type || 'general',
            status: item.status || 'unread',
          })) : [];
          setNotifications(transformedNotifications);
        }
        
        if (data.activities) {
          const transformedActivities = Array.isArray(data.activities) ? data.activities.map((item: {
            id?: string;
            title?: string;
            action?: string;
            description?: string;
            message?: string;
            desc?: string;
            timeAgo?: string;
            createdAt?: string;
            time?: string;
            status?: string;
          }) => ({
            id: item.id || '',
            title: item.title || item.action || 'Activity',
            description: item.description || item.message || item.desc || '',
            timeAgo: item.timeAgo || item.createdAt || item.time || 'Just now',
            status: item.status || 'pending',
          })) : [];
          setActivities(transformedActivities);
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error fetching notifications';
        setError(errorMessage);
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

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
              <div className="text-[#939393] text-xs md:text-sm">Receive notifications via push</div>
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
              <div className="text-[#939393] text-xs md:text-sm">Receive notifications via SMS</div>
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

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="text-center text-gray-500">Loading notifications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="text-center text-red-500">
          {error}
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md block mx-auto"
          >
            Retry
          </button>
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
              {notifications.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No notifications available</div>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="py-3 md:py-4 border-b border-[#ECECEC]">
                    <div className="font-medium text-base md:text-lg mb-1">{n.title}</div>
                    <div className="text-[#373737] text-sm md:text-base mb-1">{n.description}</div>
                    <div className="text-[#939393] text-xs md:text-sm">{n.timeAgo}</div>
                  </div>
                ))
              )}
            </div>
            {notifications.length > 0 && (
              <div className="flex justify-center items-center gap-1 md:gap-2 mt-6 md:mt-8 text-xs md:text-sm text-[#939393] overflow-x-auto">
                <span className="whitespace-nowrap">Previous page</span>
                <span className="font-semibold text-black">1</span>
                <span>2</span>
                <span>3</span>
                <span>...</span>
                <span>20</span>
                <span className="whitespace-nowrap">Next page</span>
              </div>
            )}
          </>
        )}
        {tab === 'Activity Log' && (
          <>
            <h2 className="text-xl md:text-2xl font-medium mb-4 md:mb-6">Recent Activity</h2>
            <div className="overflow-y-auto max-h-[70vh] md:max-h-none">
              {activities.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No recent activity</div>
              ) : (
                activities.map((a) => (
                  <div key={a.id} className="py-3 md:py-4 border-b border-[#ECECEC] flex flex-wrap md:flex-nowrap items-start md:items-center justify-between">
                    <div className="w-full md:w-auto mb-2 md:mb-0">
                      <div className="font-medium text-base md:text-lg mb-1">{a.title}</div>
                      <div className="text-[#373737] text-sm md:text-base mb-1">{a.description}</div>
                      <div className="text-[#939393] text-xs md:text-sm">{a.timeAgo}</div>
                    </div>
                    <span className="bg-[#FFF9DB] text-[#EAB308] px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-medium">{a.status}</span>
                  </div>
                ))
              )}
            </div>
            {activities.length > 0 && (
              <div className="flex justify-center items-center gap-1 md:gap-2 mt-6 md:mt-8 text-xs md:text-sm text-[#939393] overflow-x-auto">
                <span className="whitespace-nowrap">Previous page</span>
                <span className="font-semibold text-black">1</span>
                <span>2</span>
                <span>3</span>
                <span>...</span>
                <span>20</span>
                <span className="whitespace-nowrap">Next page</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications; 