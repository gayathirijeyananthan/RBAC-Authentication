import React from 'react';

const AdminPanel = ({ logout }) => {
  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Welcome, Admin!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminPanel;
