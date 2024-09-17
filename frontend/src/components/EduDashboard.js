import React from 'react';

const EduDashboard = ({ logout }) => {
  return (
    <div>
      <h2>Educator Dashboard</h2>
      <p>Welcome, Educator!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default EduDashboard;
