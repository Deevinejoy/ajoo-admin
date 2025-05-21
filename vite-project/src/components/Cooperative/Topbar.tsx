import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    <div className="flex justify-between items-center bg-white p-2 sm:p-3 md:p-4">
      <div className="pl-2 sm:pl-3">
        <h1 className="text-lg sm:text-xl font-bold">Dashboard</h1>
        <p className="text-xs sm:text-sm text-black">Overview of registered associations and their performance</p>
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
                  navigate("/notifications");
                }}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-300 rounded-full flex items-center justify-center text-xs sm:text-sm">JD</div>
          <span className="text-xs sm:text-sm">John Doe</span>
        </div>
      </div>
    </div>
  );
}
