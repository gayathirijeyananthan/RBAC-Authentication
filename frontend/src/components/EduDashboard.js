import React from 'react';
import { Link } from 'react-router-dom';
import '../components/css/EduDashboard.css'


const EduDashboard = ({ logout }) => {
  return (
    <>
    <div className='flex'>
    <div>
    <li><Link to="/educator/resources">Resource List</Link></li>
    <li><Link to="/educator/resources">Resource List</Link></li>
    <li><Link to="/educator/resources">Resource List</Link></li>
    </div>
    <div>
      <h2>Educator Dashboard</h2>
      <p>Welcome, Educator!</p>
      <button onClick={logout}>Logout</button>
    </div>
    </div>
    </>
  );
};

export default EduDashboard;
