import Layout from './components/Layout';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import MemberProfile from './components/MemberProfile';
import Loans from './components/Loans';
import LoanDetails from './components/LoanDetails';
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
        </Routes>
      </div>
    </Layout>
  );
}