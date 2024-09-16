import React from 'react';

const UserDashboard = ({ logout }) => {
  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome, User!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
