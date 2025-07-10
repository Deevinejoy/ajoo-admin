import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';

type SidebarProps = {
  visible: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ visible, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const { user } = useUser();

  // Function to check if current path matches or starts with menu item path
  const isActiveRoute = (itemPath: string) => {
    return location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`);
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

  const menuItems = [
    { title: 'Dashboard', icon: <img src='/dashboard1.svg' className="menu-icon"/>, path: '/dashboard' },
    { title: 'Associations', icon: <img src='/briefcase1.svg' className="menu-icon"/>, path: '/associations' },
    { title: 'Members', icon: <img src='/member.svg' className="menu-icon"/>, path: '/members' },
    { title: 'Loans', icon: <img src='/loans.svg' className="menu-icon"/>, path: '/loans' },
    { title: 'Attendance', icon: <img src='/notification.svg' className="menu-icon"/>, path: '/attendance' },
    { title: 'Transactions', icon: <img src='/transactions.svg' className="menu-icon"/>, path: '/transactions' },
    { title: 'Reports', icon: <img src='/reports.svg' className="menu-icon"/>, path: '/reports' },
    { title: 'Settings', icon: <img src='/settings.svg' className="menu-icon"/>, path: '/settings' },
  ];

  return (
    <aside 
      className={`
        bg-white h-screen fixed left-0 top-0 z-20
        transition-all duration-300 ease-in-out
        ${visible ? 'translate-x-0 w-56 sm:w-64' : '-translate-x-full md:translate-x-0 md:w-16'} 
        shadow-lg
      `}
    >
      {/* Sidebar Header */}
      <div className={`flex items-center p-2 sm:p-3 mt-3 ${visible ? 'justify-between ml-1 sm:ml-2' : 'justify-center'}`}>
        {visible ? (
          <>
            <div className="flex items-center">
              <div className="bg-[#1A202C] rounded-[8px] w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <span className="text-white text-base sm:text-xl font-extrabold">C</span>
              </div>
              <span className="ml-2 font-bold text-base sm:text-xl text-[#373737]">Association</span>
            </div>
            
            {/* Toggle button when sidebar is visible */}
            <button 
              onClick={toggleSidebar}
              className="focus:outline-none flex items-center justify-center rounded-full hover:bg-gray-100 w-6 h-6 sm:w-7 sm:h-7"
            >
              <ChevronLeft size={16} color='#1A202C'/>
            </button>
          </>
        ) : (
          // Toggle button that replaces the logo when collapsed
          <button 
            onClick={toggleSidebar}
            className="bg-[#1A202C] rounded-[8px] w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <ChevronRight size={16} color='white'/>
          </button>
        )}
      </div>

      {/* Sidebar Menu */}
      <div className="flex-grow py-2 sm:py-3 gap-x-2 sm:gap-x-3 overflow-y-auto mt-2 sm:mt-3">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.path}
                className={`
                  flex items-center justify-between 
                  px-2 sm:px-3 py-2 mx-2 my-0.5 sm:my-1
                  transition-colors rounded-lg
                  ${visible ? '' : 'justify-center'}
                  ${isActiveRoute(item.path) 
                    ? 'bg-[#1A202C] text-white' 
                    : 'hover:bg-gray-100 text-[#373737]'}
                `}
              >
                <div className='flex items-center gap-x-2'>
                  <div className={`flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 ${isActiveRoute(item.path) ? 'invert' : ''}`}>
                    {item.icon}
                  </div>
                  {visible && <span className={`ml-2 text-sm sm:text-base font-medium ${isActiveRoute(item.path) ? 'text-white' : ''}`}>{item.title}</span>}
                </div>
                {visible && (
                  <p className={`p-0.5 text-xs rounded-sm ${isActiveRoute(item.path) ? 'bg-white text-black' : 'bg-[#F7FAFC] text-black'}`}>108</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Footer */}
      {visible ? (
        <div className="p-2 sm:p-3 border-t border-gray-200 flex gap-x-2">
          <p className='text-black font-medium text-sm sm:text-base bg-[#F7FAFC] p-2 sm:p-3'>{getUserInitials()}</p> 
          <div>
            <p className='text-black font-medium text-sm sm:text-base'>{getUserName()}</p>
            <p className='text-black text-xs sm:text-sm'>Admin</p>
          </div>
        </div>
      ) : (
        <div className="p-2 sm:p-3 border-t border-gray-200 flex justify-center">
          <p className='text-black font-medium text-xs sm:text-sm bg-[#F7FAFC] p-2'>{getUserInitials()}</p> 
        </div>
      )}
    </aside>
  );
};

export default Sidebar;