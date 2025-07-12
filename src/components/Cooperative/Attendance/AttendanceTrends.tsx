import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import LineChart from "../../Linechart";
import PieChart from "../../Piechart";

const AttendanceTrends: React.FC = () => {
  const navigate = useNavigate();

  const lineChartData = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Attendance Rate",
        data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 75, 85, 90],
        borderColor: "#E5B93E",
        backgroundColor: "rgba(229, 185, 62, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const pieChartData = {
    labels: ["General", "Board", "Committee"],
    datasets: [
      {
        data: [60, 10, 30],
        backgroundColor: ["#E5B93E", "#4B5563", "#F9FAFB"],
        borderColor: ["#E5B93E", "#4B5563", "#F9FAFB"],
      },
    ],
  };

  return (
    <div className="p-4 md:p-6 text-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-2"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold">Attendance Trends Analysis</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <button className="flex items-center justify-center gap-x-2 border-2 border-gray-700/50 bg-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-gray-700/50 font-bold w-full md:w-auto">
            <img src="/filter.svg" alt="filter" className="w-4 h-4 invert" />
            <span className="text-sm">Last 12 months</span>
          </button>
          <button className="bg-[#E5B93E] text-black px-6 py-2 rounded-lg font-bold w-full md:w-auto">
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold text-lg mb-4 text-white">
            Attendance Rate
          </h2>
          <div className="h-80">
            <LineChart data={lineChartData} />
          </div>
        </div>

        <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold text-lg mb-4 text-white">
            Attendance by Meeting Type
          </h2>
          <div className="h-80 flex items-center justify-center">
            <PieChart data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTrends;
