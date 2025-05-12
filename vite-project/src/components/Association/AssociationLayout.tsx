import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import AssociationSidebar from './AssociationSidebar';

const AssociationLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#E7E7E7] ">
      <AssociationSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AssociationLayout; 