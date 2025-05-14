import { useLocation, Link } from 'react-router-dom';
import { 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

type SidebarProps = {
  visible: boolean;
};

const Sidebar = ({ visible }: SidebarProps) => {
  const location = useLocation();

  // Function to check if current path matches or starts with menu item path
  const isActiveRoute = (itemPath: string) => {
    return location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`);
  };

  const menuItems = [
    { title: 'Dashboard', icon: <img src='/dashboard1.svg' className="menu-icon"/>, path: '/association/dashboard' },
    { title: 'Members', icon: <img src='/member.svg' className="menu-icon"/>, path: '/association/members' },
    { title: 'Loans', icon: <img src='/loans.svg' className="menu-icon"/>, path: '/association/loans' },
    { title: 'Attendance', icon: <img src='/notification.svg' className="menu-icon"/>, path: '/association/attendance' },
    { title: 'Transactions', icon: <img src='/transactions.svg' className="menu-icon"/>, path: '/association/transactions' },
    { title: 'Reports', icon: <img src='/reports.svg' className="menu-icon"/>, path: '/association/reports' },
    { title: 'Settings', icon: <img src='/settings.svg' className="menu-icon"/>, path: '/association/settings' },
  ];
 
  return (
    <aside 
      className={`
        bg-white h-screen fixed left-0 top-0 z-20
        transition-all duration-300 ease-in-out
        ${visible ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 md:w-20'} 
        shadow-lg
      `}
    >
      {/* Sidebar Header */}
      <div className={`flex items-center p-4 mt-5 ${visible ? 'justify-between ml-2' : 'justify-center'}`}>
        {visible ? (
          <>
            <div className="flex items-center">
              <div className="bg-[#1A202C] rounded-[10px] w-12 h-12 flex items-center justify-center">
                <span className="text-white text-2xl font-extrabold">C</span>
              </div>
              <span className="ml-2 font-bold text-2xl text-[#373737]">Association</span>
            </div>
            
            {/* Toggle button when sidebar is visible */}
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-sidebar'))}
              className="focus:outline-none flex items-center justify-center rounded-full hover:bg-gray-100 w-8 h-8"
            >
              <ChevronLeft size={20} color='#1A202C'/>
            </button>
          </>
        ) : (
          // Toggle button that replaces the logo when collapsed
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-sidebar'))}
            className="bg-[#1A202C] rounded-[10px] w-12 h-12 flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <ChevronRight size={20} color='white'/>
          </button>
        )}
      </div>

      {/* Sidebar Menu */}
      <div className="flex-grow py-4 gap-x-4 overflow-y-auto mt-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.path}
                className={`
                  flex items-center justify-between 
                  px-4 py-3 mx-3 my-1
                  transition-colors rounded-lg
                  ${visible ? '' : 'justify-center'}
                  ${isActiveRoute(item.path) 
                    ? 'bg-[#1A202C] text-white' 
                    : 'hover:bg-gray-100 text-[#373737]'}
                `}
              >
                <div className='flex items-center gap-x-3'>
                  <div className={`flex items-center justify-center w-6 h-6 ${isActiveRoute(item.path) ? 'invert' : ''}`}>
                    {item.icon}
                  </div>
                  {visible && <span className={`ml-3 text-2xl font-normal ${isActiveRoute(item.path) ? 'text-white' : ''}`}>{item.title}</span>}
                </div>
                {visible && (
                  <p className={`p-0.5 rounded-sm ${isActiveRoute(item.path) ? 'bg-white text-black' : 'bg-[#F7FAFC] text-black'}`}>108</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Footer */}
      {visible ? (
        <div className="p-4 border-t border-gray-200 flex gap-x-2">
          <p className='text-black font-medium text-2xl bg-[#F7FAFC] p-4'>JD</p> 
          <div>
            <p className='text-black font-medium text-2xl'>John Doe</p>
            <p className='text-black text-lg'>Admin</p>
          </div>
        </div>
      ) : (
        <div className="p-4 border-t border-gray-200 flex justify-center">
          <p className='text-black font-medium text-2xl bg-[#F7FAFC] p-4'>JD</p> 
        </div>
      )}
    </aside>
  );
};

export default Sidebar;