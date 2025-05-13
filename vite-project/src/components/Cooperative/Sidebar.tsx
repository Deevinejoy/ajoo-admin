import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type SidebarProps = {
  visible: boolean;
};

const Sidebar = ({ visible }: SidebarProps) => {
  const location = useLocation();

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
        bg-white text-white h-screen fixed left-0 top-0 z-20
        transition-all duration-300 ease-in-out
        ${visible ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'} 
        ${visible ? 'w-72' : 'w-0 md:w-20'}
        shadow-lg
      `}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 mt-10 ml-2">
        {visible ? (
          <div className="flex items-center">
            <p className='text-white text-2xl bg-[#1A202C] rounded-[10px] px-4 py-2 font-extrabold'>C</p>
            <span className="ml-2 font-bold text-2xl text-[#373737]">Association</span>
          </div>
        ) : (
          <div className="hidden md:flex md:items-center md:justify-center w-full">
            <p className='text-white text-2xl bg-[#1A202C] rounded-[10px] px-4 py-2 font-extrabold'>C</p>
          </div>
        )}
        
        {/* Desktop toggle button - hidden on mobile */}
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('toggle-sidebar'))}
          className="focus:outline-none p-2 rounded-full hover:bg-gray-200 hidden md:block"
        >
          {visible ? <ChevronLeft size={22} color='black'/> : <ChevronRight size={22} color='black' />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="flex-grow py-4 gap-x-4 overflow-y-auto">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a 
                href={item.path}
                className={`
                  flex items-center justify-between px-4 py-3 
                  transition-colors rounded-md m-3
                  ${visible ? '' : 'md:justify-center'}
                  ${location.pathname === item.path 
                    ? 'bg-[#1A202C] text-white' 
                    : 'hover:bg-[#1A202C] text-[#373737] hover:text-white'}
                `}
              >
                <div className='flex gap-x-2'>
                  <span className={`${location.pathname === item.path ? 'invert' : ''}`}>{item.icon}</span>
                  {visible && <span className={`ml-3 text-2xl font-normal ${location.pathname === item.path ? 'text-white' : ''}`}>{item.title}</span>}
                </div>
                {visible && (
                  <p className={`p-0.5 rounded-sm ${location.pathname === item.path ? 'bg-white text-black' : 'bg-[#F7FAFC] text-black'}`}>108</p>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Footer */}
      {visible ? (
        <div className="p-4 border-t border-gray-700 flex gap-x-2">
          <p className='text-black font-medium text-2xl bg-[#F7FAFC] p-4'>JD</p> 
          <div>
            <p className='text-black font-medium text-2xl'>John Doe</p>
            <p className='text-black text-lg'>Admin</p>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex md:justify-center p-4 border-t border-gray-700">
          <p className='text-black font-medium text-2xl bg-[#F7FAFC] p-4'>JD</p> 
        </div>
      )}
    </aside>
  );
};

export default Sidebar;