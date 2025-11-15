import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";

const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      ShowErrorToast("Please fill in all fields!");
      return;
    }

    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser) {
        ShowSuccessToast("Login successful!");
        navigate("/"); // <-- Redirect to home page
      } else {
        ShowErrorToast("Invalid credentials!");
      }
    } catch (err) {
      console.error(err);
      ShowErrorToast(err.message || "Login failed!");
    }
  };

  return (
    <div className="flex min-h-[84vh] justify-center items-center bg-gray-100 px-4">
      <div className="bg-gray-900 shadow-lg rounded-xl w-full max-w-md px-6 py-8 text-white">
        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-400 bg-gray-800 text-white"
              required
              disabled={loading}
            />
          </div>

          <div className="flex flex-col relative">
            <label className="mb-1 text-sm text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-400 pr-10 bg-gray-800 text-white"
              required
              disabled={loading}
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
            disabled={loading}
            className={`w-full py-2 rounded-md text-gray-900 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            } flex justify-center items-center transition`}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Login"}
          </button>

          <p className="text-sm text-gray-300 mt-3 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-yellow-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
