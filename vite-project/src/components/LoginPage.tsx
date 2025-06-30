import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const requestBody = {
        phoneNumber: phoneNumber,
        password: password
      };
      
      console.log('Sending login request with:', requestBody);
      
      const response = await fetch('https://ajo.nickyai.online/api/v1/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmODBmZWU4LWNlZjUtNDI0Ny1iZTVmLWZkMGEwZDFjZDZjMCIsImlhdCI6MTc1MDI0Mjg0NCwiZXhwIjoxNzUwMjQ2NDQ0fQ.Cy8OGaXvA5nM7nX-hyRgmOsOdYgaYrUVYLUcMA7_Mg'
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('Login API Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the token
      localStorage.setItem('token', data.data.token);
      
      // Map admin to user and login
      const admin = data.data.admin;
      const user = {
        id: admin.id,
        email: admin.email,
        role: admin.adminType, // This will be 'MAJORCOOPERATIVE', 'ASSOCIATE', etc.
        firstName: admin.firstName,
        lastName: admin.lastName,
        phoneNumber: admin.phoneNumber,
      };
      login(user);
      
      // Redirect based on role
      if (user.role === 'MAJORCOOPERATIVE') {
        navigate('/dashboard');
      } else if (user.role === 'MAJORASSOCIATE') {
        navigate('/association/dashboard');
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      // Clear any existing token on failed login
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
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

        {error && (
          <div className="w-full mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:border-[#E5B93E]"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              pattern="[0-9]{11,}"
              title="Please enter a valid phone number (minimum 11 digits)"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:border-[#E5B93E]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={5}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E5B93E] text-[#07193A] py-3 rounded font-medium hover:bg-[#d1a736] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log in'}
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

      <div className="mt-6 text-white text-xs">
        © Ajoo.me. All Rights Reserved
      </div>
    </div>
  );
};

export default LoginPage; 