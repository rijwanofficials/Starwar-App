import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./BasicLayout/Layout.jsx";
import ProfilePage from "./Page/ProfilePage.jsx";
import { AppProvider } from "./context/ApiContext.jsx";
import HomePage from "./Page/Home.jsx";
import Signup from "./Page/Signup.jsx";
import Login from "./Page/LoginPage.jsx";
import PageNotFound from "./Page/PageNotfound.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import UserProfile from "./Page/UserProfile.jsx";

function AppRoutes() {
  const { user } = useAuth(); // get current user from context

  return (
    <Routes>
      {user ? (
        // Routes visible only to logged-in users
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes */}
        </>
      ) : (
        // Routes visible only to guests
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect unknown routes */}
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
