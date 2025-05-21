import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = (role: 'admin' | 'association' | 'member') => {
    login(role);
    // Redirect based on role
    if (role === 'admin') {
      navigate('/dashboard');
    } else if (role === 'association') {
      navigate('/association/dashboard');
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-[#22223B] mb-6">Login</h1>
        
        <div className="space-y-4">
          <button
            onClick={() => handleLogin('admin')}
            className="w-full bg-[#3161FF] text-white py-3 rounded-lg font-medium hover:bg-[#2B4FD8]"
          >
            Login as Admin
          </button>
          
          <button
            onClick={() => handleLogin('association')}
            className="w-full bg-[#3161FF] text-white py-3 rounded-lg font-medium hover:bg-[#2B4FD8]"
          >
            Login as Association
          </button>
          
          <button
            onClick={() => handleLogin('member')}
            className="w-full bg-[#3161FF] text-white py-3 rounded-lg font-medium hover:bg-[#2B4FD8]"
          >
            Login as Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 