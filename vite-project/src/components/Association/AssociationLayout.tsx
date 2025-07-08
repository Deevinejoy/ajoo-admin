import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import AssociationSidebar from './AssociationSidebar';

// Define prop types for the components
type SidebarProps = {
  visible: boolean;
};

type TopbarProps = {
  toggleSidebar: () => void;
  sidebarVisible: boolean;
};

// Declare the components with their props
const SidebarWithProps = AssociationSidebar as React.ComponentType<SidebarProps>;
const TopbarWithProps = Topbar as React.ComponentType<TopbarProps>;

const AssociationLayout: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle sidebar toggle via custom event (for desktop)
  useEffect(() => {
    const handleToggleSidebar = () => {
      if (!isMobile) {
        setSidebarVisible(prev => !prev);
      }
    };
    
    window.addEventListener('toggle-sidebar', handleToggleSidebar);
    
    return () => {
      window.removeEventListener('toggle-sidebar', handleToggleSidebar);
    };
  }, [isMobile]);
  
  // Check if we're on mobile on initial load and handle resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on mobile only
      if (mobile) {
        setSidebarVisible(false);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    // Only toggle sidebar on mobile from the hamburger menu
    if (isMobile) {
      setSidebarVisible(!sidebarVisible);
    }
  };
  
  return (
    <div className="flex flex-1 w-full bg-[#E7E7E7] min-h-screen overflow-hidden">
      {/* Mobile backdrop overlay */}
      {isMobile && sidebarVisible && (
        <div 
          className="fixed inset-0 bg-white/70 backdrop-blur-sm z-10"
          onClick={toggleSidebar}
        />
      )}
      <SidebarWithProps visible={sidebarVisible} />
      <div className={`flex-1 flex flex-col w-full transition-all duration-300 ${sidebarVisible ? 'md:ml-64' : 'md:ml-14'}`}>
        <TopbarWithProps toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />
        <main className="flex flex-col w-full flex-1 overflow-x-hidden  bg-[#F5F7FA]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AssociationLayout; 