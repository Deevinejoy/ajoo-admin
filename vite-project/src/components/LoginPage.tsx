import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Skip authentication for now
    navigate('/dashboard');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col" style={{ background: 'linear-gradient(to bottom, #0B2249, #13335D)' }}>
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-[#E5B93E] mb-1">Ajoo.me</h1>
        <p className="text-white mb-4">Cooperative Management Platform</p>
      </div>

      <div className="bg-[#0C2D52] p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center border border-[#143B69]">
        <div className="bg-[#E5B93E] rounded-full p-4 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#07193A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-[#E5B93E] mb-2">Welcome Back</h2>
        <p className="text-white text-sm mb-6">Sign in to access your dashboard</p>

        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:border-[#E5B93E]"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:border-[#E5B93E]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#E5B93E] text-[#07193A] py-3 rounded font-medium hover:bg-[#d1a736]"
          >
            Log in
          </button>
        </form>

        <div 
          className="mt-4 text-[#E5B93E] text-sm cursor-pointer hover:underline"
          onClick={handleForgotPassword}
        >
          Forgot password?
        </div>

        <p className="text-white text-sm mt-6">
          Only authorized cooperative and association admins can log in.
        </p>
      </div>

      <div className="mt-6">
        <button 
          className="text-[#E5B93E] text-sm hover:underline"
          onClick={() => navigate('/home')}
        >
          Back to homepage
        </button>
      </div>

      <div className="mt-6 text-white text-xs">
        © Ajoo.me. All Rights Reserved
      </div>
    </div>
  );
};

export default LoginPage; 