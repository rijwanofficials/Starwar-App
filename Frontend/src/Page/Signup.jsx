import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";

const SignupPage = () => {
  const { signup, sendOtp } = useAuth();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      ShowErrorToast("Email is required!");
      return;
    }
    if (!isValidEmail(email)) {
      ShowErrorToast("Please enter a valid email!");
      return;
    }
    try {
      setOtpLoading(true);
      await sendOtp(email.trim());
      setIsOtpSent(true);
      ShowSuccessToast("OTP sent successfully!"); // <-- Success toast
    } catch (err) {
      console.error(err);
      ShowErrorToast(err.message || "Failed to send OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!otp.trim() || !name.trim() || !password) {
      ShowErrorToast("All fields are required!");
      return;
    }
    try {
      setSignupLoading(true);
      const user = await signup(name.trim(), email.trim(), password, otp.trim());
      if (user) {
        ShowSuccessToast("Account created successfully!"); // <-- Success toast
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      ShowErrorToast(err.message || "Signup failed!");
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="min-h-[84vh] flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-gray-900 shadow-lg rounded-xl w-full max-w-md px-6 py-8 text-white">
        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
          Create Account
        </h2>

        <form
          onSubmit={isOtpSent ? handleSignup : handleSendOtp}
          className="space-y-5"
        >
          {!isOtpSent ? (
            <>
              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-300">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-400 bg-gray-800 text-white"
                  required
                  disabled={otpLoading}
                />
              </div>

              <button
                type="submit"
                disabled={otpLoading}
                className={`w-full py-2 rounded-md text-gray-900 ${
                  otpLoading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-500"
                } flex justify-center items-center`}
              >
                {otpLoading ? <ClipLoader size={20} color="white" /> : "Send OTP"}
              </button>

              <p className="mt-2 text-center text-gray-300">
                Already have an account?{" "}
                <Link to="/login" className="text-yellow-400 hover:underline">
                  Login
                </Link>
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-300">OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border-2 border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-400 bg-gray-800 text-white"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-300">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-2 border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-400 bg-gray-800 text-white"
                  required
                />
              </div>

              <div className="flex flex-col relative">
                <label className="mb-1 text-sm text-gray-300">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-400 pr-10 bg-gray-800 text-white"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-400 hover:text-yellow-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="mt-7" size={18} /> : <Eye className="mt-7" size={18} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={signupLoading || !otp || !name || !password}
                className={`w-full py-2 rounded-md ${
                  signupLoading
                    ? "bg-gray-600 cursor-not-allowed text-white"
                    : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                } flex justify-center items-center`}
              >
                {signupLoading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
