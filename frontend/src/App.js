import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import UserDashboard from './components/UserDashboard';
import axios from 'axios';

// Main App Component
const App = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // Check if token exists in localStorage on page load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = jwt_decode(storedToken);
      setToken(storedToken);
      setRole(decoded.role);
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
      <Switch>
        {/* Public Routes */}
        <Route exact path="/" component={() => <Login setToken={setToken} setRole={setRole} />} />
        <Route path="/register" component={Register} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          render={() => (role === 'admin' ? <AdminPanel logout={logout} /> : <Redirect to="/" />)}
        />
        <Route
          path="/user"
          render={() => (role === 'user' ? <UserDashboard logout={logout} /> : <Redirect to="/" />)}
        />
      </Switch>
    </Router>
  );
};

export default App;
