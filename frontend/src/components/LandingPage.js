import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Importing the CSS file for styling
import Login from '../components/Login'; // Import the Login component
import Register from '../components/Register'; // Import the Register component
import Educator from '../components/Educator';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('login'); // State to toggle between login and register

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="landing-container">
      {/* Navbar */}
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

      {/* Main Section */}
      <div className="main-content">
        <h2>Welcome to the E-Learning Platform</h2>
        <p>Explore and enhance your skills with top-quality resources.</p>
        <Link to="/resources" className="cta-button">View Resources</Link>
      </div>

      {/* Modal for Login/Register */}
      
    </div>
  );
};

export default LandingPage;
