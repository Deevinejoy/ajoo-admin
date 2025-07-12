import React from "react";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../../lib/utils";

const AssAttendanceTrends: React.FC = () => {
  useScrollToTop();
  const navigate = useNavigate();
  return (
    <div className="p-3 md:p-6 text-white min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-4 md:mb-6">
        <button
          className="flex items-center gap-x-1 md:gap-x-2 text-base md:text-lg font-medium text-gray-300 hover:text-white"
          onClick={() => navigate(-1)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Attendance Trends analysis
        </button>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <button className="flex items-center justify-center gap-2 border-2 border-gray-700/50 bg-[#1C1C1C] px-3 md:px-4 py-1 md:py-2 rounded-lg text-white text-sm md:text-base w-full md:w-auto">
            <svg
              width="16"
              height="16"
              className="md:w-[18px] md:h-[18px]"
              fill="none"
            >
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            Last 12 months
          </button>
          <button className="bg-[#E5B93E] text-black px-4 md:px-6 py-1 md:py-2 rounded-lg font-bold text-sm md:text-base w-full md:w-auto">
            Export
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-3 md:p-6">
          <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">
            Attendance Rate
          </div>
          {/* Mock line chart */}
          <div className="overflow-x-auto">
            <div className="w-full h-48 md:h-64 flex items-end">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 700 200"
                className="h-36 md:h-48 min-w-[700px]"
              >
                <polyline
                  fill="none"
                  stroke="#E5B93E"
                  strokeWidth="3"
                  points="20,120 80,80 140,100 200,90 260,130 320,60 380,100 440,80 500,150 560,120 620,140"
                />
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((m, i) => (
                  <text
                    key={m}
                    x={20 + i * 60}
                    y={190}
                    fontSize="14"
                    fill="#6B7280"
                  >
                    {m}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-3 md:p-6">
          <div className="font-semibold text-base md:text-lg mb-3 md:mb-4">
            Attendance by meeting type
          </div>
          {/* Mock donut chart */}
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <svg
              width="80"
              height="80"
              className="md:w-[100px] md:h-[100px] flex-shrink-0"
              viewBox="0 0 36 36"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#E5B93E"
                strokeWidth="4"
                strokeDasharray="60, 40"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeDasharray="10, 90"
                strokeDashoffset="-60"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#F87171"
                strokeWidth="4"
                strokeDasharray="30, 70"
                strokeDashoffset="-70"
              />
            </svg>
            <div className="flex flex-col gap-2 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E5B93E] inline-block"></span>{" "}
                General (60%)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#3B82F6] inline-block"></span>{" "}
                Board (10%)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#F87171] inline-block"></span>{" "}
                Committee (30%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssAttendanceTrends;
