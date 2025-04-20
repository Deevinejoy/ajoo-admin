
import Sidebar from "./Sidebar";


import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {


  return (
    <div className="flex flex-1 w-full">
      <Sidebar/>
     
      <main className="flex flex-col w-full flex-1" >
        {children}
      </main>
    </div>
  );
}
