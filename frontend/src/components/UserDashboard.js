import React from 'react';
import '../components/css/Login.css';


const UserDashboard = ({ logout }) => {
  return (
    <div className="main-container">
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome, User!</p>
      <button onClick={logout}>Logout</button>
    </div>
    </div>
  );
};

export default UserDashboard;
