import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";

const UserProfile = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      ShowSuccessToast("Logout successful!"); // <-- Success toast
      navigate("/"); 
    } catch (err) {
      console.error("Logout failed:", err);
      ShowErrorToast(err.message || "Logout failed!"); // <-- Error toast
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <ClipLoader />
      </div>
    );
  }

  return (
    <div className="flex min-h-[84vh] justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md px-6 py-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Profile
        </h2>
        <div className="space-y-3 text-gray-700">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          disabled={loading}
          className={`mt-6 w-full py-2 rounded-md text-white ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          } flex justify-center items-center transition`}
        >
          {loading ? <ClipLoader size={20} color="white" /> : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
