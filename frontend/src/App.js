import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import UserDashboard from './components/UserDashboard';
import LandingPage from './components/LandingPage';

// Main App Component
const App = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // Check if token exists in localStorage on page load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        // Try to decode the token safely
        const decoded = jwtDecode(storedToken);
        setToken(storedToken);
        setRole(decoded.role);
      } catch (error) {
        console.error('Invalid token', error);
        // Optionally, clear the token if it's invalid
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRole(null);
  };

  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage/>} />

        {/* Public Routes */}
        <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={role === 'admin' ? <AdminPanel logout={logout} /> : <Navigate to="/" />}
        />
        <Route
          path="/user"
          element={role === 'user' ? <UserDashboard logout={logout} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
