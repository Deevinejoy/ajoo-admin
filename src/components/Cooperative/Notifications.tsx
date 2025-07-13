import React, { useState, useEffect } from 'react';

// Utility to format date as 'x hours ago' or readable date
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

interface NotificationLog {
  id: string;
  action: string;
  description: string;
  createdAt: string;
}

type TabType = 'Notification' | 'Activity Log';
const NOTIFICATION_ACTIONS = [
  'NOTIFICATION_RECEIVED',
  'NOTIFICATION_SENT',
  'NOTIFICATION_VIEWED',
  // Add more notification action types if needed
];

const Notifications: React.FC = () => {
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [tab, setTab] = useState<TabType>('Notification');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://ajo.nickyai.online/api/v1/cooperative/notifications/view-all', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch notifications');
        const result = await response.json();
        setLogs(result.data?.logs || []);
      } catch {
        setError('Error fetching notifications');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

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

  // Separate logs for tabs
  const notificationLogs = logs.filter(log => NOTIFICATION_ACTIONS.includes(log.action));
  const activityLogs = logs;

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
            </div>
            <div className="overflow-y-auto max-h-[70vh] md:max-h-none">
              {notificationLogs.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No notifications available</div>
              ) : (
                notificationLogs.map((log: NotificationLog) => (
                  <div key={log.id} className="py-3 md:py-4 border-b border-[#ECECEC]">
                    <div className="font-medium text-base md:text-lg mb-1">{log.action}</div>
                    <div className="text-[#373737] text-sm md:text-base mb-1">{log.description}</div>
                    <div className="text-[#939393] text-xs md:text-sm">{formatTimeAgo(log.createdAt)}</div>
                  </div>
                ))
              )}
            </div>
            {notificationLogs.length > 0 && (
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
              {activityLogs.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No recent activity</div>
              ) : (
                activityLogs.map((log: NotificationLog) => (
                  <div key={log.id} className="py-3 md:py-4 border-b border-[#ECECEC] flex flex-wrap md:flex-nowrap items-start md:items-center justify-between">
                    <div className="w-full md:w-auto mb-2 md:mb-0">
                      <div className="font-medium text-base md:text-lg mb-1">{log.action}</div>
                      <div className="text-[#373737] text-sm md:text-base mb-1">{log.description}</div>
                      <div className="text-[#939393] text-xs md:text-sm">{formatTimeAgo(log.createdAt)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {activityLogs.length > 0 && (
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