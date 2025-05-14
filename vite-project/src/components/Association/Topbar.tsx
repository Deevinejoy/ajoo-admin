import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
  const notifRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine current page title and description
  const pageInfo = pageTitles[location.pathname] || { title: 'Dashboard', description: 'Overview of the system' };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotif(false);
      }
    }
    if (showNotif) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotif]);

  return (
    <div className="flex flex-col bg-white sticky top-0 z-10">
      {/* Overlay for mobile when sidebar is open */}
      {sidebarVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      <div className="flex justify-between items-center p-4 md:p-5">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-3 focus:outline-none p-2 rounded-md hover:bg-gray-100 z-40 md:hidden block"
            aria-label="Toggle sidebar"
          >
            {sidebarVisible ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">{pageInfo.title}</h1>
            <p className="text-sm md:text-[16px] text-black hidden md:block">{pageInfo.description}</p>
          </div>
        </div>
        
        <div className="hidden md:block relative w-64 bg-[#F5F7FA]">
          <img
            src="/search.png"
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden"
            aria-label="Toggle search"
          >
            <img src="/search.png" alt="search" className="w-5 h-5" />
          </button>
          
          <div className="relative" ref={notifRef}>
            <button
              className="relative"
              onClick={() => setShowNotif((v) => !v)}
              aria-label="Show notifications"
            >
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              <img src="/notif.svg" alt="notification" />
            </button>
            {showNotif && (
              <div className="absolute right-0 mt-4 w-72 md:w-96 bg-white rounded-xl shadow-lg z-50 p-4">
                <div className="font-medium text-lg mb-4">Notification</div>
                <div>
                  {notificationList.map((n, i) => (
                    <div key={i} className="mb-4 last:mb-0">
                      <div className="font-medium">{n.title}</div>
                      <div className="text-[#373737] text-sm">{n.desc}</div>
                      <div className="text-[#939393] text-xs">{n.time}</div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full text-[#3161FF] text-center mt-2 font-medium hover:underline"
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
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm">JD</div>
            <span className="hidden md:inline">John Doe</span>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {showMobileSearch && (
        <div className="p-4 md:hidden">
          <div className="relative w-full bg-[#F5F7FA]">
            <img
              src="/search.png"
              alt="search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
