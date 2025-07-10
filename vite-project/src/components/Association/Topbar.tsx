import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import { useUser } from "../../context/UserContext";

type TopbarProps = {
  toggleSidebar: () => void;
  sidebarVisible: boolean;
};

const notificationList = [
  {
    title: "New Loan Request",
    desc: "John Doe from Association X has requested new loan of ₦500,000.",
    time: "2 hours ago",
  },
  {
    title: "New Loan Request",
    desc: "John Doe from Association X has requested new loan of ₦500,000.",
    time: "2 hours ago",
  },
  {
    title: "New Loan Request",
    desc: "John Doe from Association X has requested new loan of ₦500,000.",
    time: "2 hours ago",
  },
];

// Map to convert URL paths to readable page titles
const pageTitles: Record<string, { title: string, description: string }> = {
  '/association/dashboard': { 
    title: 'Dashboard', 
    description: 'Overview of registered associations and their performance' 
  },
  '/association/members': { 
    title: 'Members', 
    description: 'Manage all members and their details' 
  },
  '/association/loans': { 
    title: 'Loans', 
    description: 'Overview of all active and pending loans' 
  },
  '/association/attendance': { 
    title: 'Attendance', 
    description: 'Track attendance for meetings' 
  },
  '/association/transactions': { 
    title: 'Transactions', 
    description: 'View all financial transactions' 
  },
  '/association/reports': { 
    title: 'Reports', 
    description: 'Generate and view reports' 
  },
  '/association/settings': { 
    title: 'Settings', 
    description: 'Configure system settings and preferences' 
  }
};

export default function Topbar({ toggleSidebar, sidebarVisible }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();
  
  // Determine current page title and description
  const pageInfo = pageTitles[location.pathname] || { title: 'Dashboard', description: 'Overview of the system' };

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
    <div className="flex flex-col bg-white sticky top-0 z-10">
      {/* Overlay for mobile when sidebar is open */}
      {sidebarVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      <div className="flex justify-between items-center p-2 sm:p-3 md:p-4">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-2 focus:outline-none p-1 rounded-md hover:bg-gray-100 z-40 md:hidden block"
            aria-label="Toggle sidebar"
          >
            {sidebarVisible ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-bold">{pageInfo.title}</h1>
            <p className="text-xs md:text-sm text-black hidden md:block">{pageInfo.description}</p>
          </div>
        </div>
        
        <div className="hidden md:block relative w-40 sm:w-48 md:w-56 bg-[#F5F7FA]">
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
          <button 
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden"
            aria-label="Toggle search"
          >
            <img src="/search.png" alt="search" className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          
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
                  {notificationList.map((n, i) => (
                    <div key={i} className="mb-2 sm:mb-3 last:mb-0">
                      <div className="font-medium text-xs sm:text-sm">{n.title}</div>
                      <div className="text-[#373737] text-[10px] sm:text-xs">{n.desc}</div>
                      <div className="text-[#939393] text-[8px] sm:text-[10px]">{n.time}</div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full text-[#3161FF] text-xs sm:text-sm text-center mt-1 sm:mt-2 font-medium hover:underline"
                  onClick={() => {
                    setShowNotif(false);
                    navigate("association/notifications");
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
              <span className="hidden md:inline text-xs sm:text-sm">{getUserName()}</span>
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

      {/* Mobile search bar */}
      {showMobileSearch && (
        <div className="p-2 md:hidden">
          <div className="relative w-full bg-[#F5F7FA]">
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
        </div>
      )}
    </div>
  );
}
