import { useState, useRef, useEffect } from "react";
import {  useNavigate } from "react-router-dom";

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

export default function AssTopbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
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
    <div className="flex justify-between items-center  bg-white p-5">
      <div className="pl-5">
        <h1 className="text-2xl font-bold ">Dashboard</h1>
        <p className="text-[16px] text-black">Overview of registered associations and their performance</p>
      </div>
      <div className="relative w-64 bg-[#F5F7FA]">
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
            <div className="absolute right-0 mt-4 w-96 bg-white rounded-xl shadow-lg z-50 p-4">
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
          <div className="w-8 h-8 bg-gray-300 rounded-full text-center">JD</div>
          <span>John Doe</span>
        </div>
      </div>
    </div>
  );
}
