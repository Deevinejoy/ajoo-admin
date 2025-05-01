import Layout from './components/Layout';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import MemberProfile from './components/MemberProfile';
import Loans from './components/Loans';
import LoanDetails from './components/LoanDetails';
import Attendance from './components/Attendance';
import MeetingDetails from './components/MeetingDetails';
import Transaction from './components/Transaction';
import TransactionDetails from './components/TransactionDetails';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Notifications from './components/Notifications';
import { Routes, Route } from 'react-router-dom';

// import { Bar, Line } from '@shadcn/ui'; // Import Bar and Line chart components

export default function App() {
  return (
    <Layout>
      <div className="bg-[#F5F7FA]">
        <Topbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:memberId" element={<MemberProfile />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/loans/:loanId" element={<LoanDetails />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/attendance/meeting/:id" element={<MeetingDetails />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/transactions/:id" element={<TransactionDetails />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </Layout>
  );
}