import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, ChevronDown } from "lucide-react";
import { useUser } from "../../context/UserContext";

interface NotificationLog {
  id: string;
  action: string;
  description: string;
  createdAt: string;
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

// Map to convert URL paths to readable page titles
const pageTitles: Record<string, { title: string, description: string }> = {
  '/dashboard': {
    title: 'Dashboard',
    description: 'Overview of registered associations and their performance'
  },
  '/associations': {
    title: 'Associations',
    description: 'Manage all associations and their details'
  },
  '/members': {
    title: 'Members',
    description: 'Manage all members and their details'
  },
  '/loans': {
    title: 'Loans',
    description: 'Overview of all active and pending loans'
  },
  '/attendance': {
    title: 'Attendance',
    description: 'Track attendance for meetings'
  },
  '/transactions': {
    title: 'Transactions',
    description: 'View all financial transactions'
  },
  '/reports': {
    title: 'Reports',
    description: 'Generate and view reports'
  },
  '/settings': {
    title: 'Settings',
    description: 'Configure system settings and preferences'
  }
};

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [notifLogs, setNotifLogs] = useState<NotificationLog[]>([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState("");
  const { user, logout } = useUser();

  // Determine current page title and description
  const matchedKey = Object.keys(pageTitles).find(key => location.pathname.startsWith(key));
  const pageInfo = (matchedKey && pageTitles[matchedKey]) || { title: 'Dashboard', description: 'Overview of the system' };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotif(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    if (showNotif || showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotif, showUserMenu]);

  useEffect(() => {
    if (showNotif) {
      const fetchLogs = async () => {
        setNotifLoading(true);
        setNotifError("");
        try {
          const token = localStorage.getItem("token");
          const response = await fetch('https://ajo.nickyai.online/api/v1/cooperative/notifications/view', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          });
          if (!response.ok) throw new Error('Failed to fetch notifications');
          const result = await response.json();
          // Try logs, fallback to notifications
          setNotifLogs(result.data?.logs?.slice(0, 5) || result.data?.notifications?.slice(0, 5) || []);
        } catch {
          setNotifError('Error fetching notifications');
        } finally {
          setNotifLoading(false);
        }
      };
      fetchLogs();
    }
  }, [showNotif]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    return 'JD';
  };

  const getUserName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return 'John Doe';
  };

  return (
    <div className="flex justify-between items-center bg-white p-2 sm:p-3 md:p-4">
      <div className="pl-2 sm:pl-3">
        <h1 className="text-lg sm:text-xl font-bold">{pageInfo.title}</h1>
        <p className="text-xs sm:text-sm text-black">{pageInfo.description}</p>
      </div>
      <div className="relative w-40 sm:w-48 md:w-56 bg-[#F5F7FA]">
        <img
          src="/search.png"
          alt="search"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-1 sm:p-1.5 pl-6 sm:pl-8 text-xs sm:text-sm border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative" ref={notifRef}>
          <button
            className="relative"
            onClick={() => setShowNotif((v) => !v)}
            aria-label="Show notifications"
          >
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            <img src="/notif.svg" alt="notification" className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 sm:mt-3 w-56 sm:w-64 md:w-72 bg-white rounded-xl shadow-lg z-50 p-2 sm:p-3">
              <div className="font-medium text-sm sm:text-base mb-2 sm:mb-3">Notification</div>
              <div>
                {notifLoading ? (
                  <div className="text-center text-gray-400 py-4">Loading...</div>
                ) : notifError ? (
                  <div className="text-center text-red-500 py-4">{notifError}</div>
                ) : notifLogs.length === 0 ? (
                  <div className="text-center text-gray-400 py-4">No notifications</div>
                ) : (
                  notifLogs.map((log) => (
                    <div key={log.id} className="mb-2 sm:mb-3 last:mb-0">
                      <div className="font-medium text-xs sm:text-sm">{log.action || 'Notification'}</div>
                      <div className="text-[#373737] text-[10px] sm:text-xs">{log.description}</div>
                      <div className="text-[#939393] text-[8px] sm:text-[10px]">{formatTimeAgo(log.createdAt)}</div>
                    </div>
                  ))
                )}
              </div>
              <button
                className="w-full text-[#3161FF] text-xs sm:text-sm text-center mt-1 sm:mt-2 font-medium hover:underline"
                onClick={() => {
                  setShowNotif(false);
                  navigate("/notifications");
                }}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-1 sm:gap-2 hover:bg-gray-100 rounded-lg p-1 transition-colors"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-300 rounded-full flex items-center justify-center text-xs sm:text-sm">
              {getUserInitials()}
            </div>
            <span className="text-xs sm:text-sm">{getUserName()}</span>
            <ChevronDown size={14} className="hidden md:block" />
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
              <div className="p-3 border-b border-gray-200">
                <div className="text-sm font-medium text-gray-900">{getUserName()}</div>
                <div className="text-xs text-gray-500">{user?.email || 'user@example.com'}</div>
              </div>
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
