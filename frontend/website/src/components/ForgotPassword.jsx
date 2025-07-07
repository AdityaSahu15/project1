import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false); // for loader

  const sendOTP = async () => {
    setLoadingOtp(true); // start loader
    setMessage("");
    try {
      const res = await fetch("/api/forgot-password/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep(2);
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setLoadingOtp(false); 
    }
  };

  const verifyAndReset = async () => {
    try {
      const res = await fetch("/api/forgot-password/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        setMessage("Password reset successful, Login now");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md p-10 bg-white shadow-xl rounded-xl space-y-5">
        <h2 className="text-3xl font-bold text-center text-blue-600 underline">
          Forgot Password?
        </h2>

        {message && (
          <p
            className={`text-center ${
              isSuccess
                ? "text-green-600 text-lg font-semibold"
                : "text-gray-700 text-sm"
            } animate-pulse`}
          >
            {message}
          </p>
        )}

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-00"
            />
            <button
              onClick={sendOTP}
              disabled={loadingOtp}
              className={`w-full ${
                loadingOtp ? "bg-gradient-to-r from-blue-300 to-purple-300" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700"
              } text-white font-semibold py-2 rounded-lg cursor-pointer transition transform hover:scale-105`}
            >
              {loadingOtp ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={verifyAndReset}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg cursor-pointer transition transform hover:scale-105"
            >
              Verify & Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
