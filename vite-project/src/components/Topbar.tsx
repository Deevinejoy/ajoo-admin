import { useState } from "react";
export default function Topbar() {
    const [searchQuery, setSearchQuery] = useState("");
  return (
  
   
      <div className="flex justify-between items-center mb-6 bg-white p-5">
        <div className="pl-5">
          <h1 className="text-2xl font-bold ">Dashboard</h1>
          <p className="text-[16px] text-black">Overview of registered associations and their performance</p>
        </div>
        <div className="relative w-64 bg-[#F5F7FA]">
          <img
            src="/search.png"
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative">
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            🔔
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full text-center">JD</div>
            <span>John Doe</span>
          </div>
        </div>
      </div>
    
  );
}
