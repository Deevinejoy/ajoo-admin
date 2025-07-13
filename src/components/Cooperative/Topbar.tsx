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
const pageTitles: Record<string, { title: string; description: string }> = {
  "/association/dashboard": {
    title: "Dashboard",
    description: "Overview of registered associations and their performance",
  },
  "/association/members": {
    title: "Members",
    description: "Manage all members and their details",
  },
  "/association/loans": {
    title: "Loans",
    description: "Overview of all active and pending loans",
  },
  "/association/attendance": {
    title: "Attendance",
    description: "Track attendance for meetings",
  },
  "/association/transactions": {
    title: "Transactions",
    description: "View all financial transactions",
  },
  "/association/reports": {
    title: "Reports",
    description: "Generate and view reports",
  },
  "/association/settings": {
    title: "Settings",
    description: "Configure system settings and preferences",
  },
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
  const pageInfo = pageTitles[location.pathname] || {
    title: "Dashboard",
    description: "Overview of the system",
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotif(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
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
    navigate("/login");
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(
        0
      )}`.toUpperCase();
    }
    return "JD";
  };

  const getUserName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return "John Doe";
  };

  return (
    <div className="flex flex-col bg-[#1A1A1A] sticky top-0 z-10 border-b-2 border-purple-500/30">
      {/* Overlay for mobile when sidebar is open */}
      {sidebarVisible && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex justify-between items-center p-2 sm:p-3 md:p-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-2 focus:outline-none p-1 rounded-md hover:bg-gray-700/50 z-40 md:hidden block"
            aria-label="Toggle sidebar"
          >
            {sidebarVisible ? (
              <X size={18} color="white" />
            ) : (
              <Menu size={18} color="white" />
            )}
          </button>
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-white">
              {pageInfo.title}
            </h1>
            <p className="text-xs md:text-sm text-gray-400 hidden md:block">
              {pageInfo.description}
            </p>
          </div>
        </div>

        <div className="hidden md:block relative w-full max-w-xs">
          <img
            src="/search.png"
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 text-sm bg-[#0D0D0D] border-2 border-transparent text-white rounded-lg focus:outline-none focus:border-purple-500/50"
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
              className="relative hover:bg-gray-700/50 p-2 rounded-full"
              onClick={() => setShowNotif((v) => !v)}
              aria-label="Show notifications"
            >
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              <img
                src="/notif.svg"
                alt="notification"
                className="w-5 h-5 invert"
              />
            </button>
            {showNotif && (
              <div className="absolute right-0 mt-3 w-72 bg-[#1A1A1A] border-2 border-purple-500/30 rounded-xl shadow-lg z-50 p-3">
                <div className="font-medium text-base mb-3 text-white">
                  Notifications
                </div>
                <div>
                  {notificationList.map((n, i) => (
                    <div
                      key={i}
                      className="mb-2 sm:mb-3 last:mb-0 border-b border-gray-700/50 pb-2"
                    >
                      <div className="font-medium text-xs sm:text-sm text-white">
                        {n.title}
                      </div>
                      <div className="text-gray-300 text-[10px] sm:text-xs">
                        {n.desc}
                      </div>
                      <div className="text-gray-500 text-[8px] sm:text-[10px]">
                        {n.time}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full text-[#E5B93E] text-sm text-center mt-2 font-medium hover:underline"
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
              className="flex items-center gap-2 hover:bg-gray-700/50 rounded-full p-1 transition-colors"
            >
              <div className="w-8 h-8 bg-[#E5B93E] rounded-full flex items-center justify-center text-sm text-black font-bold">
                {getUserInitials()}
              </div>
              <span className="hidden md:inline text-sm text-white font-semibold">
                {getUserName()}
              </span>
              <ChevronDown
                size={16}
                className="hidden md:block text-gray-400"
              />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-[#1A1A1A] rounded-lg shadow-lg z-50 border-2 border-purple-500/30">
                <div className="p-3 border-b-2 border-purple-500/30">
                  <div className="text-sm font-medium text-white">
                    {getUserName()}
                  </div>
                  <div className="text-xs text-gray-400">
                    {user?.email || "user@example.com"}
                  </div>
                </div>
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-purple-500/20 transition-colors"
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
        <div className="p-3 md:hidden border-t-2 border-purple-500/30">
          <div className="relative w-full">
            <img
              src="/search.png"
              alt="search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 text-sm bg-[#0D0D0D] border-2 border-transparent text-white rounded-lg focus:outline-none focus:border-purple-500/50"
            />
          </div>
        </div>
      )}
    </div>
  );
}
