import React from "react";
import { NavLink } from "react-router-dom";

type AssociationSidebarProps = {
  visible: boolean;
  closeMobileSidebar: () => void;
};

const AssociationSidebar: React.FC<AssociationSidebarProps> = ({
  visible,
  closeMobileSidebar,
}) => {
  const navLinkClasses =
    "flex items-center p-3 text-gray-400 hover:text-[#E5B93E] hover:bg-gray-700/50 rounded-lg group transition-colors duration-200";
  const activeNavLinkClasses = "bg-gray-700/50 text-[#E5B93E]";

  const asideClasses = `
    w-64 bg-[#121212] p-4 flex flex-col
    fixed top-0 left-0 h-full z-20
    transition-transform duration-300 ease-in-out
    md:relative md:translate-x-0
    ${visible ? "translate-x-0" : "-translate-x-full"}
  `;
 
  return (
    <aside className={asideClasses}>
      <div className="text-white text-2xl font-bold mb-10 pl-2">
        Ajo<span className="text-[#E5B93E]">.</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/association/dashboard"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={closeMobileSidebar}
            >
              <img
                src="/dashboard1.svg"
                alt="Dashboard"
                className="h-5 w-5 mr-4"
              />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/association/members"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={closeMobileSidebar}
            >
              <img
                src="/briefcase1.svg"
                alt="Members"
                className="h-5 w-5 mr-4"
              />
              Members
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/association/loans"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={closeMobileSidebar}
            >
              <img src="/loans.svg" alt="Loans" className="h-5 w-5 mr-4" />
              Loans
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/association/attendance"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={closeMobileSidebar}
            >
              <img
                src="/attendance.svg"
                alt="Attendance"
                className="h-5 w-5 mr-4"
              />
              Attendance
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/association/transactions"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={closeMobileSidebar}
            >
              <img
                src="/transactions.svg"
                alt="Transactions"
                className="h-5 w-5 mr-4"
              />
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/association/reports"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={closeMobileSidebar}
            >
              <img
                src="/reports.svg"
                alt="Reports"
                className="h-5 w-5 mr-4"
              />
              Reports
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/association/settings"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={closeMobileSidebar}
            >
              <img
                src="/settings.svg"
                alt="Settings"
                className="h-5 w-5 mr-4"
              />
              Settings
            </NavLink>
          </li>
          <li>
          <button 
              className={`${navLinkClasses} w-full`}
              onClick={closeMobileSidebar}
            >
              <svg
                className="w-5 h-5 mr-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h11m0 0-4-4m4 4-4 4m-5-4v1a3 3 0 0 1-3 3H1a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1a3 3 0 0 1 3 3v1Z"
                />
              </svg>
              <span>Logout</span>
            </button>
            </li>
        </ul>
      </div>
    </aside>
  );
};

export default AssociationSidebar;
