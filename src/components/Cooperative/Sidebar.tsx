import { NavLink } from "react-router-dom";
// import { useUser } from "../../context/UserContext";

type SidebarProps = {
  visible: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ visible, toggleSidebar }: SidebarProps) => {
  // const { user } = useUser();

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
              to="/dashboard"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={toggleSidebar}
            >
              <img
                src="/dashboard1.svg"
                alt="Dashboard"
                className="h-5 w-5 mr-4 invert"
              />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/associations"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={toggleSidebar}
            >
              <img
                src="/briefcase1.svg"
                alt="Associations"
                className="h-5 w-5 mr-4 invert"
              />
              Associations
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/members"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={toggleSidebar}
            >
              <img
                src="/member.svg"
                alt="Members"
                className="h-5 w-5 mr-4 invert"
              />
              Members
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/loans"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={toggleSidebar}
            >
              <img
                src="/loans.svg"
                alt="Loans"
                className="h-5 w-5 mr-4 invert"
              />
              Loans
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/attendance"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={toggleSidebar}
            >
              <img
                src="/notification.svg"
                alt="Attendance"
                className="h-5 w-5 mr-4 invert"
              />
              Attendance
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={toggleSidebar}
            >
              <img
                src="/transactions.svg"
                alt="Transactions"
                className="h-5 w-5 mr-4 invert"
              />
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={toggleSidebar}
            >
              <img
                src="/reports.svg"
                alt="Reports"
                className="h-5 w-5 mr-4 invert"
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
              to="/settings"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
              onClick={toggleSidebar}
            >
              <img
                src="/settings.svg"
                alt="Settings"
                className="h-5 w-5 mr-4 invert"
              />
              Settings
            </NavLink>
          </li>
          <li>
          <button 
              className={`${navLinkClasses} w-full`}
            onClick={toggleSidebar}
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

export default Sidebar;
