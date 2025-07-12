import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const requestBody = {
        phoneNumber: phoneNumber,
        password: password,
      };

      console.log("Sending login request with:", requestBody);

      const response = await fetch(
        "https://ajo.nickyai.online/api/v1/admin/login",
        {
          method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmODBmZWU4LWNlZjUtNDI0Ny1iZTVmLWZkMGEwZDFjZDZjMCIsImlhdCI6MTc1MDI0Mjg0NCwiZXhwIjoxNzUwMjQ2NDQ0fQ.Cy8OGaXvA5nM7nX-hyRgmOsOdYgaYrUVYLUcMA7_Mg",
        },
        body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      console.log("Login API Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store the token
      localStorage.setItem("token", data.data.token);
      
      // Map admin to user and login
      const admin = data.data.admin;
      // Save associationId and cooperativeId to localStorage
      localStorage.setItem("associationId", admin.associationId);
      localStorage.setItem("cooperativeId", admin.cooperativeId);
      const user = {
        id: admin.id,
        email: admin.email,
        role: admin.adminType, // This will be 'MAJORCOOPERATIVE', 'ASSOCIATE', etc.
        firstName: admin.firstName,
        lastName: admin.lastName,
        phoneNumber: admin.phoneNumber,
        associationId: admin.associationId ?? null,
        cooperativeId: admin.cooperativeId ?? null,
      };
      login(user);
      
      // Redirect based on role
      if (user.role === "MAJORCOOPERATIVE") {
        navigate("/dashboard");
      } else if (user.role === "MAJORASSOCIATE") {
        navigate("/association/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
      // Clear any existing token on failed login
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
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
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-white">
                Welcome Back
              </h2>
              <p className="text-gray-400 mt-2">
                Sign in to access your dashboard
              </p>
            </div>

        {error && (
              <div className="w-full mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

            <form onSubmit={handleLogin} className="space-y-8">
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

              <div>
                <div className="relative pt-4">
            <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="peer w-full bg-transparent border-b-2 border-gray-600 text-white px-1 py-2 focus:outline-none focus:border-[#E5B93E] transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={5}
            />
                  <label
                    htmlFor="password"
                    className={`absolute left-1 -top-4 text-gray-400 text-sm transition-all 
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-6
                                peer-focus:-top-4 peer-focus:text-[#E5B93E] peer-focus:text-sm
                                ${
                                  password
                                    ? "-top-4 text-sm text-[#E5B93E]"
                                    : ""
                                }`}
                  >
                    Password
                  </label>
          <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-6 text-gray-400 hover:text-[#E5B93E] cursor-pointer"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .95-3.036 3.6-5.408 6.9-6.236M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.598 15.202A12.933 12.933 0 0019.542 12C18.268 7.943 14.478 5 10 5a12.9 12.9 0 00-3 .402m-1.298 1.298A10.01 10.01 0 004.458 12c1.274 4.057 5.064 7 9.542 7a10.01 10.01 0 003.356-.642"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1l22 22"
                        />
                      </svg>
                    )}
          </button>
                </div>
                <div className="text-right mt-2">
        <div 
                    className="text-sm text-gray-400 cursor-pointer hover:text-[#E5B93E] hover:underline inline-block"
          onClick={handleForgotPassword}
        >
          Forgot password?
        </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E5B93E] text-[#161616] py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-yellow-500/20"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Logging in...</span>
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            <p className="text-gray-500 text-xs text-center mt-8">
          Only authorized cooperative and association admins can log in.
        </p>
          </div>
      </div>

        <div className="mt-8 text-center text-gray-500 text-xs relative z-10">
          © {new Date().getFullYear()} Ajoo.me. All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 
