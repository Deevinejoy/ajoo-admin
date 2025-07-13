import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import AssociationSidebar from "./AssociationSidebar";

// Define prop types for the components
type SidebarProps = {
  visible: boolean;
  closeMobileSidebar: () => void; // Add this prop
};

type TopbarProps = {
  toggleSidebar: () => void;
  sidebarVisible: boolean;
};

// Declare the components with their props
const SidebarWithProps = AssociationSidebar as React.ComponentType<
  SidebarProps & { toggleSidebar: () => void }
>;
const TopbarWithProps = Topbar as React.ComponentType<TopbarProps>;

const AssociationLayout: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle sidebar toggle via custom event (for desktop)
  useEffect(() => {
    const handleToggleSidebar = () => {
      if (!isMobile) {
        setSidebarVisible((prev) => !prev);
      }
    };
    
    window.addEventListener("toggle-sidebar", handleToggleSidebar);
    
    return () => {
      window.removeEventListener("toggle-sidebar", handleToggleSidebar);
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
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    // Only toggle sidebar on mobile from the hamburger menu
    if (isMobile) {
      setSidebarVisible(!sidebarVisible);
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile && sidebarVisible) {
      setSidebarVisible(false);
    }
  };
  
  return (
    <div className="flex h-screen bg-[#0D0D0D]">
      <SidebarWithProps
        visible={sidebarVisible}
        toggleSidebar={toggleSidebar}
        closeMobileSidebar={closeMobileSidebar}
      />
      <div className="flex-1 flex flex-col">
        <TopbarWithProps
          toggleSidebar={toggleSidebar}
          sidebarVisible={sidebarVisible}
        />
        <main className="flex-1 overflow-y-auto bg-[#0D0D0D] text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AssociationLayout; 
