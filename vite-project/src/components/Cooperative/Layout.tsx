import Sidebar from "./Sidebar";
import Topbar from "../Association/Topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-1 w-full bg-[#E7E7E7]">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex flex-col w-full flex-1" >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
