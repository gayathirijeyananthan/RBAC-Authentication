// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Make sure to create and include appropriate CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>E-Learning</h1>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/educator/register">Register as educator</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
