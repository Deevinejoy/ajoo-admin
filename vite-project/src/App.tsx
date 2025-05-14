import Layout from './components/Cooperative/Layout';
import Dashboard from './components/Cooperative/Dashboard';
import Members from './components/Cooperative/Members/Members';
import MemberProfile from './components/Cooperative/Members/MemberProfile';
import Loans from './components/Cooperative/Loans/Loans';
import LoanDetails from './components/Cooperative/Loans/LoanDetails';
import Attendance from './components/Cooperative/Attendance/Attendance';
import AttendanceDetails from './components/Cooperative/Attendance/AttendanceDetails';
import MeetingDetails from './components/Cooperative/Attendance/MeetingDetails';
import Transaction from './components/Cooperative/Transactions/Transaction';
import TransactionDetails from './components/Cooperative/Transactions/TransactionDetails';
import Reports from './components/Cooperative/Reports';
import Settings from './components/Cooperative/Settings';
import Notifications from './components/Cooperative/Notifications';
import LoanApplicationDetails from './components/Cooperative/Loans/LoanApplicationDetails';
import MonthlySummary from './components/Cooperative/Attendance/MonthlySummary';
import AttendanceTrends from './components/Cooperative/Attendance/AttendanceTrends';
import MemberAttendanceReport from './components/Cooperative/Attendance/MemberAttendanceReport';
import LoginPage from './components/LoginPage';
import ForgotPassword from './components/ForgotPassword';

import { Routes, Route } from 'react-router-dom';
import Asso from "./components/Cooperative/Associations/Asso";
import AssociationDetails from "./components/Cooperative/Associations/AssociationDetails";

//association
import AssociationLayout from './components/Association/AssociationLayout';
import AssDashboard from './components/Association/Dashboard';
import AssMembers from './components/Association/Members/Members';
import AssMemberProfile from './components/Association/Members/MemberProfile';
import AssMemberAttendanceReport from './components/Association/Attendance/MemberAttendanceReport';
import AssMeetingDetails from './components/Association/Attendance/MeetingDetails';
import AssAttendance from './components/Association/Attendance/Attendance';
import AssMonthlySummary from './components/Association/Attendance/MonthlySummary';
import AssAttendanceTrends from './components/Association/Attendance/AttendanceTrends';
import AssTransaction from './components/Association/Transactions/Transaction';
import AssTransactionDetails from './components/Association/Transactions/TransactionDetails';
import AssLoans from './components/Association/Loans/Loans';
import AssLoanApplicationDetails from './components/Association/Loans/LoanApplicationDetails';
import AssLoanDetails from './components/Association/Loans/LoanDetails';
import AssReports from './components/Association/Reports';
import AssSettings from './components/Association/Settings';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Regular Admin Routes */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/associations" element={<Asso />} />
        <Route path="/associations/:id" element={<AssociationDetails />} />
        <Route path="/members" element={<Members />} />
        <Route path="/members/:memberId" element={<MemberProfile />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/loans/:loanId" element={<LoanDetails />} />
        
        {/* Attendance routes - specific routes first */}
        <Route path="/attendance/meeting/:id" element={<MeetingDetails />} />
        <Route path="/attendance/monthly-summary/:id" element={<MonthlySummary />} />
        <Route path="/attendance/trends/:id" element={<AttendanceTrends />} />
        <Route path="/attendance/member-report/:id" element={<MemberAttendanceReport />} />
        <Route path="/attendance/member/:memberId" element={<MemberAttendanceReport />} />
        <Route path="/attendance/:id" element={<AttendanceDetails />} />
        <Route path="/attendance" element={<Attendance />} />
        
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/transactions/:id" element={<TransactionDetails />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/loan-applications/:id" element={<LoanApplicationDetails />} />
      </Route>

      {/* Association Routes */}
      <Route element={<AssociationLayout />}>
        <Route path="/association/dashboard" element={<AssDashboard />} />
        
        {/* Association members routes */}
        <Route path="/association/members/:memberId" element={<AssMemberProfile />} />
        <Route path="/association/members" element={<AssMembers />} />
        
        {/* Association attendance routes */}
        <Route path="/association/attendance/meeting/:id" element={<AssMeetingDetails />} />
        <Route path="/association/attendance/monthly-summary" element={<AssMonthlySummary />} />
        <Route path="/association/attendance/trends" element={<AssAttendanceTrends />} />
        <Route path="/association/attendance/member-report/:memberId" element={<AssMemberAttendanceReport />} />
        <Route path="/association/attendance" element={<AssAttendance />} />
        
        <Route path="/association/transactions" element={<AssTransaction />} />
        <Route path="/association/transactions/:id" element={<AssTransactionDetails />} />
        <Route path="/association/loans" element={<AssLoans />} />
        <Route path="/association/loans/:loanId" element={<AssLoanDetails />} />
        <Route path="/association/loan-applications/:id" element={<AssLoanApplicationDetails />} />
        <Route path="/association/reports" element={<AssReports />} />
        <Route path="/association/settings" element={<AssSettings />} />
      </Route>
    </Routes>
  );
};

export default App;