import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send a recovery link to the phone number
    setIsSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col" style={{ background: 'linear-gradient(to bottom, #0B2249, #13335D)' }}>
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-[#E5B93E] mb-1">Ajoo.me</h1>
        <p className="text-white mb-4">Cooperative Management Platform</p>
      </div>

      <div className="bg-[#0C2D52] p-8 rounded-lg shadow-lg w-full max-w-md border border-[#143B69] relative">
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => navigate('/')} 
            className="text-[#E5B93E] hover:text-[#d1a736]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-[#E5B93E] mb-4">Recover Your Account</h2>
          
          <p className="text-white text-sm text-center mb-6">
            Enter the phone number linked to your account. We'll send you a recovery link.
          </p>

          {isSubmitted ? (
            <div className="text-green-400 text-center mb-4">
              Recovery link sent! Please check your phone.
              <p className="text-sm mt-2">Redirecting to login page...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-6">
                <label className="block text-white mb-2">Phone Number</label>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-300 text-[#07193A] px-4 py-2 rounded focus:outline-none"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="bg-transparent border border-[#E5B93E] text-[#E5B93E] px-4 py-2 rounded hover:bg-[#0B2249]"
                >
                  Back to Login
                </button>
                
                <button
                  type="submit"
                  className="bg-[#E5B93E] text-[#07193A] px-4 py-2 rounded font-medium hover:bg-[#d1a736]"
                >
                  Send Recovery Link
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="mt-6 text-white text-xs">
        © Ajoo.me. All Rights Reserved
      </div>
    </div>
  );
};

export default ForgotPassword;