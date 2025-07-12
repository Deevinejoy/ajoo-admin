import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import LoadingSpinner from '../../LoadingSpinner';
import Barchart from '../../Barchart';

interface MonthlySummaryData {
  stats: {
    totalMeetings: number;
    avgAttendance: string;
    totalAttendanceHour: number;
  };
  trends: {
    week: string;
    percentage: number;
  }[];
}

const MonthlySummary: React.FC = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<MonthlySummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://ajo.nickyai.online/api/v1/cooperative/attendance/monthly-summary?month=${month}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch monthly summary');
        return res.json();
      })
      .then((data) => {
        if (data.status === 'success') {
          setSummary(data.data);
        } else {
          throw new Error(data.message || 'Failed to parse summary data');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [month]);

  const barChartData = {
    labels: summary?.trends.map(t => t.week) || [],
    datasets: [
      {
        label: 'Attendance %',
        data: summary?.trends.map(t => t.percentage) || [],
        backgroundColor: '#E5B93E',
        borderColor: 'transparent',
        borderRadius: 5,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0D0D0D]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="p-6 text-white text-center">
        <h1 className="text-xl md:text-2xl font-medium text-red-500">
          Error Loading Summary
        </h1>
        <p className="text-gray-400 mt-2">{error || 'Monthly summary not found.'}</p>
        <button
          className="mt-4 bg-[#E5B93E] text-black px-4 py-2 rounded-lg font-bold"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 text-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-2">
                <ChevronLeft size={20} />
                Back
            </button>
            <h1 className="text-2xl font-bold">Monthly Summary</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <input 
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full md:w-auto border-2 border-gray-700/50 bg-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-gray-700/50 font-bold text-white"
            />
          <button className="bg-[#E5B93E] text-black px-6 py-2 rounded-lg font-bold w-full md:w-auto">Export</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-5 rounded-2xl flex justify-between items-center">
            <div>
              <h3 className="text-gray-400">Total Meetings</h3>
              <p className="text-3xl font-semibold">{summary.stats.totalMeetings}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-800/60">
              <img src="/briefcase.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-5 rounded-2xl flex justify-between items-center">
            <div>
              <h3 className="text-gray-400">Avg. Attendance</h3>
              <p className="text-3xl font-semibold">{summary.stats.avgAttendance}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-800/60">
              <img src="/people.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
        </div>
        <div className="bg-[#1C1C1C] border border-gray-700/50 p-5 rounded-2xl flex justify-between items-center">
            <div>
              <h3 className="text-gray-400">Total Attendance Hour</h3>
              <p className="text-3xl font-semibold">{summary.stats.totalAttendanceHour}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-800/60">
              <img src="/loans1.svg" alt="pic" className="w-6 h-6 invert" />
            </div>
        </div>
      </div>
      
      <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl p-6">
        <h2 className="font-semibold text-lg mb-4">Monthly Attendance Trends</h2>
        <div className="h-80">
            <Barchart data={barChartData} />
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary; 