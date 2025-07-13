import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send a recovery link to the phone number
    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/prototyping.svg')" }}
      ></div>
      <div className="w-full max-w-sm relative">
        <div className="text-center mb-8 z-10 relative">
          <h1 className="text-5xl font-bold text-white mb-2 tracking-wide">
            Ajoo.me
          </h1>
          <p className="text-gray-300 text-lg">
            Cooperative Management Platform
          </p>
        </div>

        <div className="relative z-10">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-gray-800 rounded-xl blur-lg opacity-50"></div>
          <div className="bg-[#161616] p-8 rounded-xl shadow-2xl border border-gray-700/50 relative">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-semibold text-white">
                Forgot Password?
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                {isSubmitted
                  ? "A recovery link has been sent!"
                  : "We'll send you reset instructions."}
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center">
                <div className="text-green-400 bg-green-900/50 border border-green-500/30 p-4 rounded-lg">
                  <p>Recovery link sent to your phone!</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Redirecting to login...
                  </p>
                </div>
            </div>
          ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative pt-4">
                <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    className="peer w-full bg-transparent border-b-2 border-gray-600 text-white px-1 py-2 focus:outline-none focus:border-[#E5B93E] transition-colors"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                    pattern="[0-9]{11,}"
                    title="Please enter a valid 11-digit phone number"
                  />
                  <label
                    htmlFor="phoneNumber"
                    className={`absolute left-1 -top-4 text-gray-400 text-sm transition-all 
                                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-6
                                  peer-focus:-top-4 peer-focus:text-[#E5B93E] peer-focus:text-sm
                                  ${
                                    phoneNumber
                                      ? "-top-4 text-sm text-[#E5B93E]"
                                      : ""
                                  }`}
                  >
                    Phone Number
                  </label>
              </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#E5B93E] text-[#161616] py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all duration-300 shadow-lg shadow-yellow-500/20 cursor-pointer"
                >
                  Send Recovery Link
                </button>
            </form>
          )}

            <div className="text-center mt-8">
              <button
                onClick={() => navigate("/")}
                className="text-sm text-gray-400 hover:text-[#E5B93E] hover:underline cursor-pointer"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-xs relative z-10">
          © {new Date().getFullYear()} Ajoo.me. All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
