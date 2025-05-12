import { useState } from 'react';
import { 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
    <div className="flex ">
     
      <div 
        className={`
          bg-white text-white 
          transition-all duration-300 ease-in-out
          flex flex-col 
          ${isOpen ? 'w-74' : 'w-20'}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 mt-10 ml-2">
          {isOpen && (
            <div className="flex items-center">
              
            <p className='text-white text-2xl bg-[#1A202C] rounded-[10px] px-4 py-2 font-extrabold'>C</p>
              <span className="ml-2 font-bold text-2xl text-[#373737]">Association</span>
            </div>
          )}
         
          <button 
            onClick={toggleSidebar} 
            className="focus:outline-none p-2 rounded-full hover:bg-[#6a6b6e]"
          >
            {isOpen ? <ChevronLeft size={22} color='black'/> : <ChevronRight size={22} color='black' />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-grow py-4 gap-x-4">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.path}
                  className={`
                    flex items-center justify-between px-4 py-3 
                    transition-colors rounded-md m-3
                    ${isOpen ? '' : 'justify-center'}
                    ${location.pathname === item.path 
                      ? 'bg-[#1A202C] text-white' 
                      : 'hover:bg-[#1A202C] text-[#373737] hover:text-white'}
                  `}
                >
                    <div className='flex gap-x-2'>
                        <span className={`${location.pathname === item.path ? 'invert' : ''}`}>{item.icon}</span>
                        {isOpen && <span className={`ml-3 text-2xl font-normal ${location.pathname === item.path ? 'text-white' : ''}`}>{item.title}</span>}
                    </div>
                     {isOpen &&  <p className={`p-0.5 rounded-sm ${location.pathname === item.path ? 'bg-white text-black' : 'bg-[#F7FAFC] text-black'}`}>108</p>}
                </a>
                
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700 flex gap-x-2">
        
          <p className='text-black  font-medium text-2xl bg-[#F7FAFC] p-4'>JD</p> 
          <div>
          <p className='text-black font-medium text-2xl'>John Doe</p>
          <p className='text-black text-lg'>Admin</p>

          </div>
       
        </div>
      </div>

    </div>
  );
};

export default Sidebar;