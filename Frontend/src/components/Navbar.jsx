import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ searchCharacters }) => {
  const { user, isLoggedIn, logout, appLoading } = useAuth();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchCharacters(query);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/"); // redirect home after logout
  };

  if (appLoading) return null;

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Brand */}
      <Link
        to="/"
        className="text-xl font-bold hover:text-yellow-400 transition"
      >
        Star Wars Characters
      </Link>

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search characters by name..."
        className="w-full md:w-1/3 px-4 py-2 rounded-lg shadow-sm bg-white/90 text-black outline-none"
      />

      {/* Auth Buttons */}
      <div className="flex gap-4 mt-2 md:mt-0">
        {isLoggedIn ? (
          <>
            <span className="px-4 py-2 rounded bg-yellow-400 text-gray-900">
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded border border-white/20 hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded transition border border-white/20 hover:bg-gray-700"
            >
              <FaSignInAlt /> Login
            </Link>

            <Link
              to="/signup"
              className="flex items-center gap-2 px-4 py-2 rounded transition border border-white/20 hover:bg-gray-700"
            >
              <FaUserPlus /> Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
